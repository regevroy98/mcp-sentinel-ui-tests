import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Discovery (default)', async ({ page }) => {
    // Should redirect to discovery
    await expect(page).toHaveURL(/.*\/discovery/);
    await expect(page.getByRole('heading', { name: 'Shadow Fleet Topology' })).toBeVisible();
  });

  test('should navigate to Audit page', async ({ page }) => {
    await page.getByRole('link', { name: /Compliance/i }).click();
    await expect(page).toHaveURL(/.*\/audit/);
    await expect(page.getByRole('heading', { name: 'Thread-of-Thought Compliance Explorer' })).toBeVisible();
  });

  test('should navigate to Policies page', async ({ page }) => {
    await page.getByRole('link', { name: /Policies/i }).click();
    await expect(page).toHaveURL(/.*\/policies/);
    await expect(page.getByRole('heading', { name: 'Policy & Governance Engine' })).toBeVisible();
  });

  test('should navigate to Analytics page', async ({ page }) => {
    await page.getByRole('link', { name: /Analytics/i }).click();
    await expect(page).toHaveURL(/.*\/analytics/);
    await expect(page.getByRole('heading', { name: 'Performance & Semantic Analytics' })).toBeVisible();
  });
});