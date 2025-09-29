import { publicKey } from "@/lib/jwk";

export async function GET() {
  return Response.json({
    keys: [
      {
        kid: "f1",
        ...publicKey,
      },
    ],
  });
}

export const runtime = 'edge';