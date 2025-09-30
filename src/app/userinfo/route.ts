import { publicKey } from "@/lib/jwk";
import * as jose from "jose";

const JWKS = jose.createLocalJWKSet({
  keys: [
    {
      kid: "f1",
      ...publicKey,
    },
  ],
});

async function jwtVerify(token: string) {
  const { payload } = await jose.jwtVerify(token, JWKS);
  return payload;
}

export async function GET(request: Request) {
  const user = request.headers.get("authorization");

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const [, token] = user.split(" ");
    return Response.json(await jwtVerify(token));
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
}

export const runtime = "edge";
