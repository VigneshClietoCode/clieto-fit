import assert from "node:assert/strict";
import test from "node:test";
import {
  assertWelcomeEmailConfigured,
  EmailConfigurationError,
  EmailDeliveryError,
  sendGymAdminWelcomeEmail,
} from "./email";

const emailEnvironmentKeys = ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "APP_URL"] as const;

function saveEmailEnvironment(): Record<(typeof emailEnvironmentKeys)[number], string | undefined> {
  return Object.fromEntries(emailEnvironmentKeys.map((key) => [key, process.env[key]])) as Record<
    (typeof emailEnvironmentKeys)[number],
    string | undefined
  >;
}

function restoreEmailEnvironment(
  original: Record<(typeof emailEnvironmentKeys)[number], string | undefined>,
): void {
  for (const key of emailEnvironmentKeys) {
    if (original[key] === undefined) delete process.env[key];
    else process.env[key] = original[key];
  }
}

test("Gym Admin welcome email requires Resend and application configuration", () => {
  const originalEnvironment = saveEmailEnvironment();
  for (const key of emailEnvironmentKeys) delete process.env[key];
  try {
    assert.throws(assertWelcomeEmailConfigured, EmailConfigurationError);
  } finally {
    restoreEmailEnvironment(originalEnvironment);
  }
});

test("Gym Admin welcome email sends credentials and login URL through Resend", async () => {
  const originalEnvironment = saveEmailEnvironment();
  const originalFetch = globalThis.fetch;
  process.env.RESEND_API_KEY = "test-resend-key";
  process.env.RESEND_FROM_EMAIL = "Clieto Fit <no-reply@example.com>";
  process.env.APP_URL = "https://fit.example/";
  let requestUrl = "";
  let requestInit: RequestInit | undefined;
  globalThis.fetch = async (input, init) => {
    requestUrl = String(input);
    requestInit = init;
    return new Response(null, { status: 200 });
  };

  try {
    await sendGymAdminWelcomeEmail({
      name: "<Admin>",
      email: "admin@example.com",
      password: `Temp<&"'`,
    });

    assert.equal(requestUrl, "https://api.resend.com/emails");
    assert.equal(
      new Headers(requestInit?.headers).get("Authorization"),
      "Bearer test-resend-key",
    );
    const payload = JSON.parse(String(requestInit?.body)) as {
      to: string[];
      text: string;
      html: string;
    };
    assert.deepEqual(payload.to, ["admin@example.com"]);
    assert.match(payload.text, /Login email: admin@example\.com/);
    assert.match(payload.text, /Temporary password: Temp<&"'/);
    assert.match(payload.text, /Application URL: https:\/\/fit\.example\/login/);
    assert.match(payload.html, /&lt;Admin&gt;/);
    assert.match(payload.html, /Temp&lt;&amp;&quot;&#39;/);
  } finally {
    globalThis.fetch = originalFetch;
    restoreEmailEnvironment(originalEnvironment);
  }
});

test("Gym Admin welcome email reports Resend delivery failures", async () => {
  const originalEnvironment = saveEmailEnvironment();
  const originalFetch = globalThis.fetch;
  process.env.RESEND_API_KEY = "test-resend-key";
  process.env.RESEND_FROM_EMAIL = "Clieto Fit <no-reply@example.com>";
  process.env.APP_URL = "https://fit.example";
  globalThis.fetch = async () => new Response(null, { status: 403 });

  try {
    await assert.rejects(
      sendGymAdminWelcomeEmail({
        name: "Gym Admin",
        email: "admin@example.com",
        password: "temporary-password",
      }),
      (error: unknown) => error instanceof EmailDeliveryError && error.status === 403,
    );
  } finally {
    globalThis.fetch = originalFetch;
    restoreEmailEnvironment(originalEnvironment);
  }
});
