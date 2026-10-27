import { publicKey } from "@/lib/jwk";

export const jwks = () =>
  Response.json({
    keys: [
      {
        kid: "f1",
        ...publicKey,
      },
    ],
  });
