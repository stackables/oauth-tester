import { Card, CardContent } from "@/components/ui/card";
import Demo from "@/components/Demo";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import { Faq1 } from "@/components/FAQ";
import { USPs } from "@/components/USPs";
import { ShineBorder } from "@/components/ui/shine-border";
import { FeedbackWidget } from "@/components/FeedbackWidget";

const domain = "https://oauth.sdk42.com";

export default function Route() {
  return (
    <>
      <main className="flex flex-col gap-2">
        <div className="mx-auto container p-6">
          <h1 className="text-7xl font-semibold text-muted-foreground py-10">
            Mock OAuth &amp; OIDC Provider
          </h1>
          <p className="text-xl text-muted-foreground">
            A free fake identity provider for development and testing
          </p>
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

        {/* USPs */}
        <div className="text-lg flex flex-col gap-6 bg-gray-100/50">
          <div className="mx-auto container p-6">
            <USPs />
          </div>
        </div>

        <div className="mx-auto container p-6 space-y-6">
          <h2 className="text-4xl font-semibold text-muted-foreground">
            Everything You Need to Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="space-y-2">
                <p className="text-xl font-bold">Configuration documents</p>
                <div className="flex items-center gap-1">
                  <span>{domain}/.well-known/openid-configuration</span>
                  <CopyToClipboard
                    text={`${domain}/.well-known/openid-configuration`}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span>{domain}/.well-known/oauth-authorization-server</span>
                  <CopyToClipboard
                    text={`${domain}/.well-known/oauth-authorization-server`}
                  />
                </div>
                <p className="pt-4">
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
            <Card className="relative overflow-hidden">
              <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
              {/* Demo Banner */}
              <div className="absolute -left-12 top-6 -rotate-45 bg-red-600 text-white text-xs font-bold py-1 px-16 shadow-lg z-10">
                DEMO
              </div>
              <CardContent className="h-full">
                <Demo />
              </CardContent>
            </Card>
          </div>
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
          Made with ❤️ in Europe
        </div>
      </footer>
      <FeedbackWidget
        side="right"
        attribution="button"
        src="https://youropinion.is/snap/#/1:8a98d7b5-314b-47ae-8c94-e47b47d8572f:m3tdj26xj:4ae438ef-ab40-4bf7-88d5-71fc270ce698/pFe5"
      />
    </>
  );
}
