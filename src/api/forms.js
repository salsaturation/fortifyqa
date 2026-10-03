const ENDPOINT = "/api/submit.php";
const FALLBACK_ERROR = "Something went wrong. Please try again or email hello@fortifyqa.com.";

/**
 * Posts a form submission to the PHP endpoint on the host.
 * `formEl` supplies the honeypot field; `startedAt` is when the form was first rendered.
 * Throws an Error with a user-safe message on failure.
 */
export async function submitForm(type, data, formEl, startedAt) {
  const honeypot = new FormData(formEl).get("website") || "";
  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ form: type, data, website: honeypot, elapsed_ms: Date.now() - startedAt }),
    });
  } catch {
    throw new Error(FALLBACK_ERROR);
  }
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) throw new Error(body?.error || FALLBACK_ERROR);
}
