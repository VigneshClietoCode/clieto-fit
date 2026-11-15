import type { Metadata } from "next";
import type { ReactNode } from "react";
import "swagger-ui-react/swagger-ui.css";

export const metadata: Metadata = {
  title: "Clieto Fit API",
  description: "Interactive OpenAPI documentation for the Clieto Fit API.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f7f8fa" }}>{children}</body>
    </html>
  );
}
