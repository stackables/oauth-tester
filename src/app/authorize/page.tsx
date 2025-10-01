"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Faker, en } from "@faker-js/faker";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { InfoIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocalStorage } from "usehooks-ts";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const faker = new Faker({ locale: [en] });

function getTestUsers(start: number, stable: number, unstable: number) {
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

function objectToBase64(value: Record<string, unknown>) {
  return btoa(JSON.stringify(value));
}

function Oauth2Auth() {
  const searchParams = useSearchParams();
  const state = searchParams?.get("state");
  const [pin, setPin] = useLocalStorage("pin", 0);
  const [dialog, setDialog] = useState<Record<string, unknown> | null>(null);

  const params = [];
  if (searchParams) {
    for (const [key, value] of searchParams) {
      params.push({ key, value });
    }
  }

  const users = useMemo(() => {
    const total = 9;
    const unstable = pin > 0 ? 2 : 9;

    return getTestUsers(pin, total - unstable, unstable);
  }, [pin]);

  return (
    <div className="grid grid-cols-1 gap-2 p-4 max-w-4xl mx-auto w-full">
      <h1 className="text-2xl font-bold">User Picker</h1>
      <Input
        id="pin"
        placeholder={`PIN = ${pin}`}
        onChange={(v) => {
          setPin(parseInt(v.target.value) || 0);
        }}
      />
      <Separator />
      <div className="flex flex-row gap-2">
        <Button asChild variant={"destructive"} className="flex-grow">
          <a
            href={`${searchParams?.get("redirect_uri")}?error=access_denied&state=${state}`}
          >
            Decline
          </a>
        </Button>
        <Button
          className="flex-grow"
          variant={"default"}
          onClick={() => {
            setPin(0);
          }}
        >
          Clear PIN
        </Button>
      </div>
      <Separator />
      {users.map((user, i) => (
        <div key={user.sub} className="flex flex-row gap-2">
          <Button
            key={user.sub}
            data-testid={`test-user-${i}`}
            asChild
            variant={"outline"}
            className={cn("flex-grow", {
              "border-amber-500/50": user.stable,
            })}
          >
            <a
              href={`${searchParams?.get("redirect_uri")}?code=${objectToBase64(user)}&state=${state}`}
            >
              {user.name}
            </a>
          </Button>
          <Button onClick={() => setDialog(user)} variant={"ghost"}>
            <InfoIcon />
          </Button>
        </div>
      ))}
      <Dialog
        open={dialog !== null}
        onOpenChange={(open) => setDialog(open === false ? null : dialog)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          <div>
            <pre style={{ padding: 10 }}>{JSON.stringify(dialog, null, 2)}</pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Oauth2Auth), {
  ssr: false,
});
