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
    
    // Verify clicked outside logic
    await page.click('button:has-text("globex")');
    await expect(page.getByRole('button', { name: 'initech' })).toBeVisible();
    await page.click('body', { position: { x: 0, y: 0 } }); // click outside
    await expect(page.getByRole('button', { name: 'initech' })).toBeHidden();
  });

  test('should operate toggle switches in Settings', async ({ page }) => {
    await page.click('text=Settings');
    
    // Test Auto-Refresh toggle
    const autoRefreshToggle = page.locator('div').filter({ hasText: /^Auto-refresh TopologyAutomatically update the Shadow Fleet map every 5s$/ }).locator('input[type="checkbox"]');
    await expect(autoRefreshToggle).toBeChecked();
    await autoRefreshToggle.uncheck({ force: true });
    await expect(autoRefreshToggle).not.toBeChecked();

    // Test Dark Mode toggle
    const darkModeToggle = page.locator('div').filter({ hasText: /^Dark ModeUse the dark theme for the interface$/ }).locator('input[type="checkbox"]');
    await expect(darkModeToggle).toBeChecked();
    await darkModeToggle.uncheck({ force: true });
    await expect(darkModeToggle).not.toBeChecked();
  });
});