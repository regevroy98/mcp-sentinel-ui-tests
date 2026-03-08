import { test, expect } from '@playwright/test';

test.describe('Discovery Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/discovery');
  });

  test('should display topology controls and filter buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Refresh' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'all' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'shadow' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'managed' })).toBeVisible();
  });

  test('should display legend', async ({ page }) => {
    await expect(page.getByText('Low risk / Compliant')).toBeVisible();
    await expect(page.getByText('High risk / Unauthorized')).toBeVisible();
  });
});