import { test, expect } from "@playwright/test";

test("About test", async ({ page }) => {
    await page.goto("/about");
    await page.locator('.MuiGrid-root > div:nth-child(3)').click();

    await expect(page).toHaveURL("https://isocpp.org/");
});

test("Privacy test", async ({ page }) => {
    await page.goto("/");
    await page.getByRole('button', { name: 'menu' }).click();
    await page.getByRole('button', { name: 'Prywatność' }).click();
    await page.reload();

    await expect(page.getByRole('heading', { name: 'Polityka prywatności' })).toHaveText(/Polityka.+/);
});