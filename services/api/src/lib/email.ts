export class EmailConfigurationError extends Error {
  constructor() {
    super("Gym Admin email delivery is not configured.");
    this.name = "EmailConfigurationError";
  }
}

export class EmailDeliveryError extends Error {
  constructor(readonly status?: number) {
    super("The welcome email could not be delivered.");
    this.name = "EmailDeliveryError";
  }
}

type GymAdminWelcomeEmail = {
  name: string;
  email: string;
  password: string;
};

function getEmailConfiguration() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const appUrl = process.env.APP_URL?.trim();
  if (!apiKey || !from || !appUrl) throw new EmailConfigurationError();

  let applicationUrl: URL;
  try {
    applicationUrl = new URL(appUrl);
  } catch {
    throw new EmailConfigurationError();
  }
  if (!["http:", "https:"].includes(applicationUrl.protocol)) {
    throw new EmailConfigurationError();
  }

  return {
    apiKey,
    from,
    loginUrl: `${applicationUrl.toString().replace(/\/+$/, "")}/login`,
  };
}

export function assertWelcomeEmailConfigured(): void {
  getEmailConfiguration();
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function sendGymAdminWelcomeEmail({
  name,
  email,
  password,
}: GymAdminWelcomeEmail): Promise<void> {
  const { apiKey, from, loginUrl } = getEmailConfiguration();
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePassword = escapeHtml(password);
  const safeLoginUrl = escapeHtml(loginUrl);

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Your Clieto Fit Gym Admin account",
        text: [
          `Hello ${name},`,
          "",
          "Your Gym Admin account is ready.",
          `Login email: ${email}`,
          `Temporary password: ${password}`,
          `Application URL: ${loginUrl}`,
          "",
          "Please change your temporary password after signing in.",
        ].join("\n"),
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#17211b"><h1 style="font-size:22px">Your Gym Admin account is ready</h1><p>Hello ${safeName},</p><p>Use these credentials to sign in to Clieto Fit:</p><p><strong>Login email:</strong> ${safeEmail}<br><strong>Temporary password:</strong> ${safePassword}<br><strong>Application URL:</strong> <a href="${safeLoginUrl}">${safeLoginUrl}</a></p><p>Please change your temporary password after signing in.</p></div>`,
      }),
    });
  } catch {
    throw new EmailDeliveryError();
  }

  if (!response.ok) throw new EmailDeliveryError(response.status);
}
