"use client";

import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocumentationPage() {
  return (
    <main>
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #dfe3e8",
          padding: "24px max(24px, calc((100vw - 1200px) / 2))",
        }}
      >
        <h1 style={{ margin: "0 0 8px", fontSize: 28 }}>Clieto Fit API</h1>
        <p style={{ margin: "0 0 8px", color: "#46505a" }}>
          Interactive API reference. Sign in with <code>client: "mobile"</code> to
          receive a Bearer token, then use <strong>Authorize</strong> to try protected
          operations.
        </p>
        <a href="/openapi.json">OpenAPI JSON</a>
      </header>
      <SwaggerUI
        url="/openapi.json"
        docExpansion="list"
        defaultModelsExpandDepth={-1}
        persistAuthorization={false}
        withCredentials
      />
    </main>
  );
}
