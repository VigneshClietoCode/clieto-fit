import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

const webOrigin = "https://clietofit.clietocode.com";

test("allows credentialed CORS requests from the production web origin", () => {
  const response = proxy(
    new NextRequest("https://api.clietofit.clietocode.com/api/portal", {
      headers: { origin: webOrigin },
    }),
  );

  assert.equal(response.headers.get("Access-Control-Allow-Origin"), webOrigin);
  assert.equal(response.headers.get("Access-Control-Allow-Credentials"), "true");
  assert.match(response.headers.get("Vary") ?? "", /Origin/);
});

test("does not grant CORS permission to other origins", () => {
  const response = proxy(
    new NextRequest("https://api.clietofit.clietocode.com/api/portal", {
      headers: { origin: "https://untrusted.example" },
    }),
  );

  assert.equal(response.headers.get("Access-Control-Allow-Origin"), null);
  assert.equal(response.headers.get("Access-Control-Allow-Credentials"), null);
});

test("answers allowed-origin preflight requests", () => {
  const response = proxy(
    new NextRequest("https://api.clietofit.clietocode.com/api/portal", {
      method: "OPTIONS",
      headers: {
        origin: webOrigin,
        "access-control-request-method": "GET",
      },
    }),
  );

  assert.equal(response.status, 204);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), webOrigin);
  assert.match(response.headers.get("Access-Control-Allow-Methods") ?? "", /GET/);
});
