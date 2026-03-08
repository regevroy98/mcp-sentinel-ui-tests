import { test, expect } from '@playwright/test';

test.describe('Global Navigation & Settings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate between all pages', async ({ page }) => {
    await page.click('text=Compliance');
    await expect(page).toHaveURL(/\/audit/);

    await page.click('text=Policies');
    await expect(page).toHaveURL(/\/policies/);

    await page.click('text=Analytics');
    await expect(page).toHaveURL(/\/analytics/);
  });

  test('should open and use tenant switcher', async ({ page }) => {
    await page.click('button:has-text("acme-corp")');
    await expect(page.getByRole('button', { name: 'globex' })).toBeVisible();
    await page.getByRole('button', { name: 'globex' }).click();
    await expect(page.locator('aside').filter({ hasText: 'globex' }).first()).toBeVisible();
  });

  test('should navigate to valid Settings page', async ({ page }) => {
    await page.click('text=Settings');
    await expect(page).toHaveURL(/\/settings/);
    await expect(page.getByRole('heading', { name: 'Global Settings' })).toBeVisible();
    await page.click('button:has-text("Save Changes")');
    await expect(page.getByText('Saved!')).toBeVisible();
  });
});