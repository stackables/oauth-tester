export async function GET() {
  return Response.json({
    issuer: "https://oauth.sdk42.com/",
    authorization_endpoint: "https://oauth.sdk42.com/oauth2-auth",
    token_endpoint: "https://oauth.sdk42.com/oauth2-token",
    userinfo_endpoint: "https://oauth.sdk42.com/oauth2-user",
    jwks_uri: "https://oauth.sdk42.com/.well-known/jwks.json",
    response_types_supported: ["code", "id_token", "id_token token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
  });
}
