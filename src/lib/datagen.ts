import { Faker, en } from "@faker-js/faker";
import { privateKey } from "@/lib/jwk";
import * as jose from "jose";

const alg = "RS256";
const faker = new Faker({ locale: [en] });

export async function jwtSign(data: Record<string, unknown>) {
  const signingKey = await jose.importJWK(privateKey, alg);

  const jwt = await new jose.SignJWT(data)
    .setProtectedHeader({ alg, kid: "f1" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(signingKey);

  return jwt;
}

export function getTestUsers(start: number, stable: number, unstable: number) {
  const generate = (stable: boolean) => {
    const sub = faker.string.uuid();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const name = `${firstName} ${lastName}`;
    const profilePicture = faker.image.avatarGitHub();
    return {
      iss: "https://oauth.sdk42.com/",
      sub,
      iat: faker.date.recent().getTime() / 1000,
      exp: faker.date.future().getTime() / 1000,
      email,
      name,
      given_name: firstName,
      family_name: lastName,
      profile_picture: profilePicture,
      stable: stable,
      pin: start,
    };
  };

  const users = [];

  for (let i = 0; i < stable; i++) {
    faker.seed(start + 849 + i);
    users.push(generate(true));
  }

  // reset stable seed
  faker.seed();
  for (let i = 0; i < unstable; i++) users.push(generate(false));

  return users;
}
