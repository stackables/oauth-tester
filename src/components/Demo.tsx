"use client";

import { useSessionStorage } from "@uidotdev/usehooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import dynamic from "next/dynamic";

const domain =
  typeof window !== "undefined" ? window.origin : "https://oauth.sdk42.com/";

async function fetchToken(code: string) {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);

  const response = await fetch(domain + "/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  return response.json();
}

async function fetchUserInfo(token: string) {
  const response = await fetch(domain + "/userinfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
}

function Demo() {
  const [token, setToken] = useSessionStorage<{ id_token: string } | null>(
    "auth_demo",
    null
  );
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [info, setInfo] = useState<Record<string, string>>();
  const router = useRouter();

  useEffect(() => {
    if (code) {
      fetchToken(code)
        .then((tokenData) => {
          setToken(tokenData);
          router.replace("/", undefined);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [router, code, setToken]);

  useEffect(() => {
    if (token && !info) {
      fetchUserInfo(token.id_token)
        .then((userInfo) => setInfo(userInfo))
        .catch((error) => console.error("Error:", error));
    }
  }, [info, token]);

  if (code) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">Getting user token...</h1>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">Try it here</h1>
        <p className="mb-4">
          Start the mock login flow to select your username.
        </p>
        <Button asChild>
          <a
            href={
              domain +
              "/authorize?response_type=code&client_id=demo&redirect_uri=" +
              encodeURIComponent(domain) +
              "&scope=openid profile email"
            }
          >
            Authenticate
          </a>
        </Button>
      </div>
    );
  }

  if (token && !info) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">Getting user info...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <Avatar className="size-16">
        <AvatarImage src={info?.profile_picture} />
      </Avatar>
      <h1 className="text-3xl font-bold">{info?.name}</h1>
      <span>{info?.email}</span>
      <span>
        {info?.stable
          ? "user created based on pin"
          : "user is randomly created"}
      </span>
      <Button onClick={() => setToken(null)}>Logout</Button>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Demo), {
  ssr: false,
});
