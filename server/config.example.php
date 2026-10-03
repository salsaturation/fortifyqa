<?php
// Lives OUTSIDE the web root on the host: ~/fortifyqa/config.php (chmod 600).
// deploy.sh creates it from this template on first deploy and never overwrites it.
return [
    'notify_to' => 'hello@fortifyqa.com',
    'mail_from' => 'hello@fortifyqa.com',
    'allowed_origins' => ['https://fortifyqa.com', 'https://www.fortifyqa.com'],
    'data_dir' => __DIR__ . '/data',
    'ip_salt' => '__IP_SALT__',
    'rate_limit' => [
        'per_ip' => 5,
        'per_ip_window' => 600,
        'global' => 60,
        'global_window' => 3600,
    ],
];
