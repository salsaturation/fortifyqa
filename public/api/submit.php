<?php
declare(strict_types=1);

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const MAX_BODY_BYTES = 16384;
const MIN_FILL_MS = 2500;
const GENERIC_ERROR = 'Something went wrong. Please try again or email hello@fortifyqa.com.';

const PACKAGE_OPTIONS = ['Not sure', 'Persona Test Map', 'Playwright Suite', 'Security Bundle', 'Retainer'];
const SLOT_OPTIONS = [
    'Mon 09:00–11:00 UK',
    'Tue 14:00–17:00 UK',
    'Wed 09:00–12:00 UK',
    'Thu 15:00–18:00 UK',
    'Fri 10:00–13:00 UK',
];

const FORMS = [
    'contact' => [
        'subject' => 'New contact request',
        'fields' => [
            'name' => ['required' => true, 'max' => 120],
            'email' => ['required' => true, 'max' => 254, 'type' => 'email'],
            'company' => ['max' => 160],
            'tech_stack' => ['max' => 200],
            'worry' => ['max' => 4000, 'multiline' => true],
            'package_interest' => ['enum' => PACKAGE_OPTIONS],
        ],
    ],
    'audit' => [
        'subject' => 'New QA audit booking request',
        'fields' => [
            'name' => ['required' => true, 'max' => 120],
            'email' => ['required' => true, 'max' => 254, 'type' => 'email'],
            'app_url' => ['max' => 500, 'type' => 'url'],
            'preferred_slot' => ['enum' => SLOT_OPTIONS],
            'riskiest_flow' => ['max' => 4000, 'multiline' => true],
        ],
    ],
    'lead' => [
        'subject' => 'New Persona Test Planner download',
        'fields' => [
            'email' => ['required' => true, 'max' => 254, 'type' => 'email'],
            'source' => ['enum' => ['home', 'blog', 'contact']],
        ],
    ],
];

const CSV_COLUMNS = [
    'received_at', 'form', 'name', 'email', 'company', 'tech_stack', 'worry',
    'package_interest', 'app_url', 'preferred_slot', 'riskiest_flow', 'source',
];

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function fail(int $status, string $message = GENERIC_ERROR): void
{
    respond($status, ['ok' => false, 'error' => $message]);
}

function char_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : (int) preg_match_all('/./su', $value);
}

/** Returns the cleaned value, or null when it fails validation. */
function clean_field($value, array $rule): ?string
{
    if (!is_string($value) || preg_match('//u', $value) !== 1) {
        return null;
    }
    $value = !empty($rule['multiline'])
        ? preg_replace('/[^\P{C}\n]/u', '', str_replace(["\r\n", "\r"], "\n", $value))
        : preg_replace('/\p{C}/u', '', $value);
    $value = trim((string) $value);

    if ($value === '') {
        return empty($rule['required']) ? '' : null;
    }
    if (isset($rule['enum'])) {
        return in_array($value, $rule['enum'], true) ? $value : null;
    }
    if (char_length($value) > $rule['max']) {
        return null;
    }
    $type = $rule['type'] ?? 'text';
    if ($type === 'email' && filter_var($value, FILTER_VALIDATE_EMAIL) === false) {
        return null;
    }
    if ($type === 'url') {
        $scheme = strtolower((string) parse_url($value, PHP_URL_SCHEME));
        if (filter_var($value, FILTER_VALIDATE_URL) === false || !in_array($scheme, ['http', 'https'], true)) {
            return null;
        }
    }
    return $value;
}

/** Sliding-window counter stored as a JSON list of timestamps; returns false once the limit is reached. */
function rate_limit_allows(string $dir, string $key, int $limit, int $window): bool
{
    $file = $dir . '/' . hash('sha256', $key) . '.json';
    $handle = fopen($file, 'c+');
    if ($handle === false) {
        return true;
    }
    flock($handle, LOCK_EX);
    $now = time();
    $hits = json_decode((string) stream_get_contents($handle), true);
    $hits = array_values(array_filter(is_array($hits) ? $hits : [], function ($t) use ($now, $window) {
        return is_int($t) && $t > $now - $window;
    }));
    $allowed = count($hits) < $limit;
    if ($allowed) {
        $hits[] = $now;
    }
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($hits));
    flock($handle, LOCK_UN);
    fclose($handle);
    return $allowed;
}

/** Occasionally removes counters untouched for a day so the directory doesn't grow without bound. */
function prune_rate_limits(string $dir): void
{
    if (random_int(1, 50) !== 1) {
        return;
    }
    foreach (glob($dir . '/*.json') ?: [] as $file) {
        if (filemtime($file) < time() - 86400) {
            @unlink($file);
        }
    }
}

function csv_safe(string $value): string
{
    return preg_match('/^[=+\-@\t\r]/', $value) === 1 ? "'" . $value : $value;
}

function append_csv(string $file, array $row): bool
{
    $isNew = !is_file($file);
    $handle = fopen($file, 'a');
    if ($handle === false) {
        return false;
    }
    if ($isNew) {
        chmod($file, 0600);
    }
    flock($handle, LOCK_EX);
    if ($isNew || filesize($file) === 0) {
        fputcsv($handle, CSV_COLUMNS, ',', '"', '');
    }
    $ok = fputcsv($handle, array_map('csv_safe', $row), ',', '"', '') !== false;
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
    return $ok;
}

function send_notification(array $config, string $subject, array $fields, string $receivedAt): bool
{
    $lines = ["Received: {$receivedAt}", ''];
    foreach ($fields as $name => $value) {
        $label = ucwords(str_replace('_', ' ', $name));
        $lines[] = strpos($value, "\n") !== false ? "{$label}:\n{$value}\n" : "{$label}: {$value}";
    }
    $headers = [
        'From: Fortify QA Website <' . $config['mail_from'] . '>',
        'Reply-To: ' . $fields['email'],
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    return mail(
        $config['notify_to'],
        '[Fortify QA] ' . $subject,
        implode("\r\n", $lines),
        implode("\r\n", $headers),
        '-f' . $config['mail_from']
    );
}

$configPath = getenv('FORTIFYQA_CONFIG') ?: dirname(__DIR__, 2) . '/fortifyqa/config.php';
if (!is_file($configPath)) {
    error_log('fortifyqa: config file missing');
    fail(500);
}
$config = require $configPath;
foreach (['notify_to', 'mail_from'] as $key) {
    if (filter_var($config[$key] ?? '', FILTER_VALIDATE_EMAIL) === false) {
        error_log("fortifyqa: invalid config value for {$key}");
        fail(500);
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Method not allowed.');
}
if (!in_array($_SERVER['HTTP_ORIGIN'] ?? '', $config['allowed_origins'] ?? [], true)) {
    fail(403, 'Forbidden.');
}
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    fail(415, 'Unsupported content type.');
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) {
    fail(413, 'Submission too large.');
}
$raw = (string) file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if (strlen($raw) > MAX_BODY_BYTES) {
    fail(413, 'Submission too large.');
}

try {
    $payload = json_decode($raw, true, 4, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    fail(400, 'Invalid submission.');
}
if (!is_array($payload) || array_diff(array_keys($payload), ['form', 'data', 'website', 'elapsed_ms'])) {
    fail(400, 'Invalid submission.');
}

$formType = $payload['form'] ?? null;
$data = $payload['data'] ?? null;
if (!is_string($formType) || !isset(FORMS[$formType]) || !is_array($data)) {
    fail(400, 'Invalid submission.');
}

$honeypot = $payload['website'] ?? '';
$elapsed = $payload['elapsed_ms'] ?? 0;
if ((is_string($honeypot) && $honeypot !== '') || !is_int($elapsed) || $elapsed < MIN_FILL_MS) {
    respond(200, ['ok' => true]);
}

$schema = FORMS[$formType]['fields'];
if (array_diff(array_keys($data), array_keys($schema))) {
    fail(400, 'Invalid submission.');
}
$fields = [];
foreach ($schema as $name => $rule) {
    $value = clean_field($data[$name] ?? '', $rule);
    if ($value === null) {
        fail(422, 'Please check the ' . str_replace('_', ' ', $name) . ' field.');
    }
    $fields[$name] = $value;
}

$dataDir = rtrim((string) ($config['data_dir'] ?? ''), '/');
$rateDir = $dataDir . '/ratelimit';
if ($dataDir === '' || (!is_dir($rateDir) && !mkdir($rateDir, 0700, true))) {
    error_log('fortifyqa: data directory unavailable');
    fail(500);
}
prune_rate_limits($rateDir);
$limits = $config['rate_limit'] ?? [];
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$salt = (string) ($config['ip_salt'] ?? '');
if (
    !rate_limit_allows($rateDir, 'ip:' . $salt . $ip, (int) ($limits['per_ip'] ?? 5), (int) ($limits['per_ip_window'] ?? 600)) ||
    !rate_limit_allows($rateDir, 'global', (int) ($limits['global'] ?? 60), (int) ($limits['global_window'] ?? 3600))
) {
    header('Retry-After: 600');
    fail(429, 'Too many submissions. Please try again later or email hello@fortifyqa.com.');
}

$receivedAt = gmdate('c');
$row = array_map(function ($column) use ($receivedAt, $formType, $fields) {
    if ($column === 'received_at') {
        return $receivedAt;
    }
    return $column === 'form' ? $formType : ($fields[$column] ?? '');
}, CSV_COLUMNS);

$stored = append_csv($dataDir . '/submissions.csv', $row);
$mailed = send_notification($config, FORMS[$formType]['subject'], $fields, $receivedAt);
if (!$stored) {
    error_log("fortifyqa: failed to append {$formType} submission to CSV");
}
if (!$mailed) {
    error_log("fortifyqa: failed to send {$formType} notification email");
}
if (!$stored && !$mailed) {
    fail(500);
}

respond(200, ['ok' => true]);
