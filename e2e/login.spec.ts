import { expect, test, type Page } from "@playwright/test";

const PIN = 4242;

// Starts the mock login flow the way the "Pick new user" button does.
async function openUserPicker(page: Page, baseURL: string) {
  await page.goto(
    `/authorize?response_type=code&client_id=demo&redirect_uri=${encodeURIComponent(
      baseURL + "/",
    )}&scope=openid%20profile%20email`,
  );
}

async function loginAs(
  page: Page,
  baseURL: string,
  pin: number | null,
  userIndex: number,
) {
  await openUserPicker(page, baseURL);
  if (pin !== null) {
    await page.locator("#pin").fill(String(pin));
  }
  const user = page.getByTestId(`test-user-${userIndex}`);
  const name = (await user.innerText()).trim();
  await user.click();
  await page.waitForURL("/");
  return name;
}

test("login with a pinned user gives the same user every run", async ({
  browser,
  baseURL,
}) => {
  const names: string[] = [];
  const emails: string[] = [];

  for (let run = 0; run < 2; run++) {
    // a fresh context per run: no local storage or session left over
    const context = await browser.newContext({ baseURL });
    const page = await context.newPage();

    const name = await loginAs(page, baseURL!, PIN, 1);
    await expect(page.getByRole("heading", { name })).toBeVisible();
    await expect(
      page.getByText(`user created based on pin (use ${PIN} to log in again)`),
    ).toBeVisible();

    names.push(name);
    emails.push(
      (await page.getByText(/^\S+@\S+$/).first().innerText()).trim(),
    );
    await context.close();
  }

  expect(names[0]).toBe(names[1]);
  expect(emails[0]).toBe(emails[1]);
});

test("login without a pin gives a randomly created user", async ({
  page,
  baseURL,
}) => {
  const name = await loginAs(page, baseURL!, null, 1);

  await expect(page.getByRole("heading", { name })).toBeVisible();
  await expect(
    page.getByText("user is randomly created, use pin to create stable users"),
  ).toBeVisible();
});
