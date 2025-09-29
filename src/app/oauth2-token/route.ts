import { privateKey } from "@/lib/jwk";
import * as jose from "jose";

const alg = "RS256";

function base64ToObject(value: string) {
  return JSON.parse(atob(value));
}

async function jwtSign(data: Record<string, unknown>) {
  const signingKey = await jose.importJWK(privateKey, alg);

  const jwt = await new jose.SignJWT(data)
    .setProtectedHeader({ alg, kid: "f1" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(signingKey);

  return jwt;
}

export async function POST(request: Request) {
  const form = await request.formData();
  const data = base64ToObject(form.get("code") as string);

  return Response.json({
    id_token: await jwtSign(data),
  });
}

export const runtime = "edge";
