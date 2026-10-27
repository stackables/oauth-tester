import { publicKey } from "@/lib/jwk";

export const onRequestGet: PagesFunction = () =>
  Response.json({
    keys: [
      {
        kid: "f1",
        ...publicKey,
      },
    ],
  });
