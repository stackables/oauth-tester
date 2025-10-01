"use client";

import { Card, CardContent } from "@/components/ui/card";
import Demo from "@/components/Demo";
import Image from "next/image";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { Faq1 } from "@/components/FAQ";

const domain =
  typeof window !== "undefined" ? window.origin : "https://oauth.sdk42.com/";

export default function Route() {
  return (
    <>
      <main className="flex flex-col gap-2">
        <div className="mx-auto container p-6">
          <h1 className="text-7xl font-semibold text-muted-foreground py-10">
            Fake Identity Provider
          </h1>
          <p className="text-lg">
            Use me instead of your real identity provider (Google or Facebook
            etc.) in development and testing to easily create test users for
            your application.
          </p>
          <p className="text-lg pt-4">
            On the authorization screen you can select a randomly generated
            username or enter a numeric PIN that will &quot;seed&quot; the
            username generation giving you a stable selection of
            &quot;random&quot; usernames.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto container p-6">
          <Card>
            <CardContent className="space-y-2">
              <p className="text-xl font-bold">Configuration document</p>
              <div className="flex items-center gap-1">
                <span>{domain}/.well-known/openid-configuration</span>
                <CopyToClipboard
                  text={`${domain}/.well-known/openid-configuration`}
                />
              </div>
              <p>
                Test it out with OIDC Debugger client at{" "}
                <a
                  href="https://openidconnect.net/"
                  className="text-blue-500 hover:underline"
                >
                  https://openidconnect.net/
                </a>
              </p>
              <p className="text-xl font-bold pt-6">Manual Configuration</p>
              <span className="font-semibold">Authorization Endpoint:</span>
              <p>{domain}/authorize</p>
              <span className="font-semibold">Token Endpoint:</span>
              <p>{domain}/token</p>
              <span className="font-semibold">User Info Endpoint:</span>
              <p>{domain}/userinfo</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-full">
              <Demo />
            </CardContent>
          </Card>
        </div>

        <div className="text-lg flex flex-col gap-6 bg-gray-100/50">
          <div className="mx-auto container p-6">
            <h2 className="text-4xl font-semibold text-muted-foreground">
              Frequently Asked Questions
            </h2>
            <Faq1 />
          </div>
        </div>
        <div className="mx-auto container p-6">
          <p className="text-muted-foreground">
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
            KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </div>
      </main>
      <footer className="mt-auto border-t">
        <div className="container mx-auto p-4 text-center text-sm text-muted-foreground">
          Made with ❤️{" "}
          <a
            href="https://bsky.app/profile/aarnelaur.bsky.social"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            AA
          </a>
        </div>
      </footer>
    </>
  );
}
