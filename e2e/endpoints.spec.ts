import { expect, test } from "@playwright/test";

for (const path of [
  "/.well-known/openid-configuration",
  "/.well-known/oauth-authorization-server",
  "/.well-known/jwks.json",
]) {
  test(`${path} answers with JSON`, async ({ request }) => {
    const response = await request.get(path);

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");
    expect(await response.json()).toBeTruthy();
  });
}

test("jwks.json has the key the id_token is signed with", async ({
  request,
}) => {
  const code = Buffer.from(JSON.stringify({ sub: "u1", name: "N" })).toString(
    "base64",
  );
  const token = await request.post("/token", {
    form: { grant_type: "authorization_code", code },
  });
  const { id_token } = await token.json();
  const header = JSON.parse(
    Buffer.from(id_token.split(".")[0], "base64url").toString(),
  );
  const { keys } = await (await request.get("/.well-known/jwks.json")).json();

  expect(keys.map((key: { kid: string }) => key.kid)).toContain(header.kid);
});

test("userinfo without a token is unauthorized", async ({ request }) => {
  const response = await request.get("/userinfo");

  expect(response.status()).toBe(401);
});

test("an unknown path answers 404, not the home page", async ({ request }) => {
  const response = await request.get("/nonexistent");

  expect(response.status()).toBe(404);
});
