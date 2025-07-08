import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await page.getByPlaceholder('Username').fill('mluukkai');
  await page.getByPlaceholder('Password').fill('salainen');
  await page.getByRole('button', { name: 'login' }).click();
  await expect(page.getByText('mluukkai logged in')).toBeVisible();
});
