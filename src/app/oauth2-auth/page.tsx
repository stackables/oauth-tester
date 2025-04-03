"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Faker, en } from "@faker-js/faker";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { InfoIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLocalStorage } from 'usehooks-ts'
import dynamic from 'next/dynamic'

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
      iss: faker.internet.domainName(),
      sub,
      iat: faker.date.recent().getTime() / 1000,
      exp: faker.date.future().getTime() / 1000,
      email,
      name,
      given_name: firstName,
      family_name: lastName,
      profile_picture: profilePicture,
      stable: stable,
    };
  };

  const users = [];

  if (start !== 0) {
    stable += unstable - 1;
    unstable = 1;
  }

  for (let i = 0; i < stable; i++) {
    faker.seed(start + 849 + i);
    users.push(generate(true));
  }

  // reset stable seed
  faker.seed();
  for (let i = 0; i < unstable; i++) users.push(generate(false));

  return users;
}

function objectToBase64(value: Record<string, any>) {
  return btoa(JSON.stringify(value));
}

function Oauth2Auth() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const [pin, setPin] = useLocalStorage("pin", 0);
  const [dialog, setDialog] = useState<Record<string, any> | null>(null);
  

  const params = [];
  if (searchParams) {
    for (const [key, value] of searchParams) {
      params.push({ key, value });
    }
  }

  const users = useMemo(() => {
    return getTestUsers(pin, 4, 3)
  }, [pin]);

  return (
    <div>
      <h1>
        User Picker
      </h1>
      <Input
        id="pin"
        placeholder={`PIN = ${pin}`}
        onChange={(v) => {
          setPin(parseInt(v.target.value) || 0);
        }}
      />
      <Separator />
      <div>
        <Button asChild>
          <a href={`${searchParams?.get("redirect_uri")}?error=access_denied&state=${state}`}>Decline</a>
        </Button>
        <Button


          onClick={() => {
            setPin(0);
          }}
        >
          Clear PIN
        </Button>
      </div>
      <Separator />
      {users.map((user, i) => (
        <div key={user.sub}>
          <div>
            <Button
              key={user.sub}
              data-testid={`test-user-${i}`}
              asChild
            >
              <a href={`${searchParams?.get("redirect_uri")}?code=${objectToBase64(user)}&state=${state}`}>{user.name}</a>
            </Button>
            <Button
              onClick={() => setDialog(user)}
            >
              <InfoIcon color="info" />
            </Button>
          </div>
        </div>
      ))}
      <Dialog open={dialog !== null} onOpenChange={(open) => setDialog(open === false ? null : dialog)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
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
  ssr: false
})
