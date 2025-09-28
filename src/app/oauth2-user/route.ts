import * as jose from "jose";

async function jwtVerify(token: string, secretPlaintext: string) {
  const secret = new TextEncoder().encode(secretPlaintext);

  const { payload } = await jose.jwtVerify(token, secret);
  return payload;
}

export async function GET(request: Request) {
  const user = request.headers.get("authorization");

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const [, token] = user.split(" ");

  return Response.json(await jwtVerify(token, "unknown-to-others"));
}

export const runtime = "edge";
