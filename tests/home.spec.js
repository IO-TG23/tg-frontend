import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Home page should be accessible", async ({ page }) => {
  const heading = await page.getByRole('heading', { name: 'Strona domowa' });

  await expect(heading).toBeVisible();
});

test("My account redirection when not logged in", async ({ page }) => {
  const myAccount = await page.getByRole('button', { name: 'Moje konto Moje konto' });
  await myAccount.click();

  //normally I will never do that but in this case I haven't come up with quick solution for testing
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(/3000\/?$/);
});

test("Account menu interaction", async ({ page }) => {
  const accountBtn = await page.getByRole('banner').getByRole('button').nth(1);
  await accountBtn.click();

  await page.getByRole('menuitem', { name: 'Zaloguj się' }).click();
  await page.goBack();

  await accountBtn.click();
  await page.getByRole('menuitem', { name: 'Zarejestruj' }).click();

  const loginOption = page.getByText('Posiadasz konto? Zaloguj się');

  await expect(loginOption).toHaveText(/Posiadasz.+/gi);
});

test("Protected route test", async ({ page, context }) => {
  await page.goto("/offerlist");

  const btn = await page.getByRole('button', { name: 'Dodaj ofertę' });

  await btn.click();

  await page.waitForURL('/');

  const privacy = await page.getByRole('button', { name: 'Prywatność Prywatność' });

  await privacy.click();

  await expect(page).toHaveURL(/.*privacy.*/gi);
});