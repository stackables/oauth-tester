"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const domain =
  typeof window !== "undefined" ? window.origin : "https://oauth.sdk42.com/";

async function fetchToken(code: string) {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);

  const response = await fetch(domain + "/oauth2-token", {
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
  const response = await fetch(domain + "/oauth2-user", {
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

export default function Route() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [token, setToken] = useState<Record<string, unknown>>();
  const [info, setInfo] = useState<Record<string, unknown>>();

  async function onCode(code: string) {
    try {
      const tokenData = await fetchToken(code);
      setToken(tokenData);
      const userInfo = await fetchUserInfo(tokenData.id_token);
      setInfo(userInfo);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (code) {
      onCode(code);
    }
  }, [code]);

  return (
    <>
      <main className="container mx-auto p-6">
        <h1 className="text-7xl font-semibold text-muted-foreground py-10">
          Fake Identity Provider
        </h1>
        <p className="text-lg">
          Use me to easily create automation users and test your application
          locally. Once the authorization screen is loaded you have an option to
          use a randomly generated username or you can enter a numeric PIN that
          will &quot;seed&quot; the username generation giving you a stable
          selection of &quot;random&quot; usernames.
        </p>
        <p className="text-muted-foreground pt-6">
          THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
          KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
          LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
          OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
          WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
        <div className="pt-16 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          <Card className="w-full min-w-sm h-fit">
            <CardHeader>
              <CardTitle>Configure Your Application</CardTitle>
              <CardDescription>
                Use any client_id and client_secret. All redirect_uris are
                supported. No additional security checks are performed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <span className="font-semibold">Authorization Endpoint:</span>
              <p>{domain}/oauth2-auth</p>
              <span className="font-semibold">Token Endpoint:</span>
              <p>{domain}/oauth2-token</p>
              <span className="font-semibold">User Info Endpoint:</span>
              <p>{domain}/oauth2-user</p>
            </CardContent>
          </Card>
          <div>
            <h2 className="text-2xl font-bold">Try it here!</h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={code ? "token" : "start"}
            >
              <AccordionItem value="start">
                <AccordionTrigger>
                  Step 1. Redirect user to authorization url
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    <a
                      className="text-blue-500 hover:underline"
                      href={`${domain}/oauth2-auth?response_type=code&client_id=my-client-id&redirect_uri=${domain}`}
                    >
                      {`${domain}/oauth2-auth?response_type=code&client_id=my-client-id&redirect_uri=${domain}`}
                    </a>
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="token" disabled={!code}>
                <AccordionTrigger>
                  Step 2. Exchange authorization code for access token
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>Response from token endpoint:</p>
                  <pre className="wrap-anywhere whitespace-pre-wrap">
                    {JSON.stringify(token, null, 2) || "Fetching..."}
                  </pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="info" disabled={!code}>
                <AccordionTrigger>
                  Step 3. Access userinfo api (optional)
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>Response from userinfo endpoint:</p>
                  <pre className="wrap-anywhere whitespace-pre-wrap">
                    {JSON.stringify(info, null, 2) || "Fetching..."}
                  </pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <footer className="mt-auto border-t">
        <div className="container mx-auto p-4 text-center text-sm text-muted-foreground">
          Made with ❤️ AA
        </div>
      </footer>
    </>
  );
}
