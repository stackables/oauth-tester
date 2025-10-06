import {
  UsersIcon,
  InfinityIcon,
  ZapIcon,
  LockIcon,
  WorkflowIcon,
  ShieldCheckIcon,
  BotIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function USPs() {
  return (
    <div className="mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        <Card className="flex-1 min-w-[250px] max-w-[500px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon />
              <span>Stable Test Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>Same PIN always generates the same users.</CardContent>
        </Card>

        <Card className="flex-1 min-w-[250px] max-w-[500px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <InfinityIcon />
              <span>No API Quotas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            Unlimited test runs without rate limits or excessive security
            checks.
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[250px] max-w-[500px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ZapIcon />
              <span>Instant Setup</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            Get your entire team up and running in seconds.
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[250px] max-w-[500px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheckIcon />
              <span>No Secrets</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            No API keys to manage, all data is fake/generated.
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[250px] max-w-[500px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BotIcon />
              <span>CI/CD Friendly</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            Perfect for automated pipelines without OAuth app setup
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
