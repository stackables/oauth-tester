import { expect, test } from "@playwright/test";

test("the demo card logs out and back in as the user picked in the flow", async ({
  page,
}) => {
  await page.goto("/");

  // a user is logged in by default
  const logout = page.getByRole("button", { name: "Logout" });
  await expect(logout).toBeVisible();
  await expect(page.getByText(/^\S+@\S+$/).first()).toBeVisible();

  await logout.click();
  await expect(page.getByRole("heading", { name: "Try it here" })).toBeVisible();

  await page.getByRole("link", { name: "Start" }).click();
  await page.waitForURL(/\/authorize\?/);

  await page.locator("#pin").fill("4242");
  const user = page.getByTestId("test-user-1");
  const name = (await user.innerText()).trim();
  await user.click();

  await page.waitForURL("/");
  await expect(page.getByRole("heading", { name })).toBeVisible();
  await expect(
    page.getByText("user created based on pin (use 4242 to log in again)"),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
