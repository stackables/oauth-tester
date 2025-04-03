import assert from "assert";
import * as jose from "jose";

async function jwtVerify(
    token: string,
    secretPlaintext: string,
) {
    const secret = new TextEncoder().encode(secretPlaintext);

    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
}


export async function POST(request: Request) {
    const user = request.headers.get("Authorization");
    assert(user, "Authorization header is required");

    const [,token] = user.split(" ");

    return Response.json(await jwtVerify(token, "unknown-to-others"));
}
