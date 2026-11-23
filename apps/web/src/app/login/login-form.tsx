"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { readApiJson } from "@/lib/api-response";
import { apiUrl } from "@/lib/api-url";

// Minimal type for the Google GSI credential response
interface GoogleCredentialResponse {
  credential: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            auto_select?: boolean;
            use_fedcm_for_prompt?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              width?: number;
              text?: string;
              shape?: string;
            },
          ) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

  // Called by GSI after the user picks a Google account
  const handleGoogleCredential = useCallback(
    async (response: GoogleCredentialResponse) => {
      setError("");
      setGoogleLoading(true);
      try {
        const apiResponse = await fetch(apiUrl("/api/auth/google"), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: response.credential }),
        });
        const result = await readApiJson<{ error?: string; redirectTo?: string }>(apiResponse);
        if (!apiResponse.ok) throw new Error(result.error ?? "Google sign-in failed.");
        router.replace(result.redirectTo ?? "/dashboard");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Google sign-in failed.");
      } finally {
        setGoogleLoading(false);
      }
    },
    [router],
  );

  // Load the GSI script once and render the button when ready
  useEffect(() => {
    if (!clientId) return;

    function initGoogle() {
      if (!window.google || !googleButtonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredential,
        auto_select: false,
        use_fedcm_for_prompt: true,
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: googleButtonRef.current.offsetWidth || 360,
        text: "signin_with",
        shape: "rectangular",
      });
    }

    if (window.google) {
      initGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGoogle;
    document.head.appendChild(script);

    return () => {
      window.google?.accounts.id.disableAutoSelect();
    };
  }, [clientId, handleGoogleCredential]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await readApiJson<{ error?: string; redirectTo?: string }>(response);
      if (!response.ok) throw new Error(result.error ?? "Unable to sign in.");
      router.replace(result.redirectTo ?? "/dashboard");
      router.refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-aside" aria-label="Clieto Fit">
        <Link className="brand brand-light" href="/">
          <span className="brand-mark">C</span>
          <span>clieto<span className="brand-accent">fit</span></span>
        </Link>
        <div className="aside-copy">
          <span className="eyebrow eyebrow-light">STRONGER, TOGETHER</span>
          <h1>Your gym.<br />Your momentum.</h1>
          <p>One calm, connected place to train, coach, and grow your community.</p>
        </div>
        <div className="aside-footer"><span className="pulse-dot" /> Built for the everyday work.</div>
        <div className="aside-orbit orbit-one" />
        <div className="aside-orbit orbit-two" />
      </section>

      <section className="login-main">
        <div className="login-mobile-brand">
          <Link className="brand" href="/">
            <span className="brand-mark">C</span>
            <span>clieto<span className="brand-accent">fit</span></span>
          </Link>
        </div>
        <div className="login-card">
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in to your account</h2>
          <p className="muted">Enter your credentials or continue with Google.</p>

          {/* Google Sign-In button rendered by GSI */}
          {clientId && (
            <div className="google-sso">
              <div
                ref={googleButtonRef}
                className="google-sso-button"
                aria-label="Sign in with Google"
              />
              {googleLoading && (
                <p className="google-sso-loading" aria-live="polite">Signing in with Google…</p>
              )}
            </div>
          )}

          {/* Divider */}
          {clientId && (
            <div className="login-divider" aria-hidden="true">
              <span>or</span>
            </div>
          )}

          <form onSubmit={submit} className="form-stack">
            <label className="field">
              <span>Email address</span>
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@yourgym.com"
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
              />
            </label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button button-primary button-wide" disabled={loading || googleLoading}>
              {loading ? "Signing in..." : "Sign in"}
              <span aria-hidden="true">→</span>
            </button>
          </form>
          <p className="login-help">Need access? Ask your gym administrator to set up your account.</p>
          <div className="login-security"><span aria-hidden="true">◈</span> Secure sign-in · Your gym data stays private</div>
        </div>
      </section>
    </main>
  );
}
