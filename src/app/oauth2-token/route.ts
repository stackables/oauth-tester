import * as jose from "jose";

const alg = "HS256";

function base64ToObject(value: string) {
    return JSON.parse(atob(value));
}

async function jwtSign(data: Record<string, any>, secretPlaintext: string) {
    const secret = new TextEncoder().encode(secretPlaintext);

    const jwt = await new jose.SignJWT(data)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);

    return jwt;
}

export async function POST(request: Request) {
    const form = await request.formData();
    const data = base64ToObject(form.get("code") as string);

    return Response.json({
        id_token: await jwtSign(data, "unknown-to-others"),
    });
}
