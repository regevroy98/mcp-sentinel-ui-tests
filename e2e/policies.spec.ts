import { test, expect } from '@playwright/test';

test.describe('Policies Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/policies');
  });

  test('should render active policy rules section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Active Policy Rules' })).toBeVisible();
    // Rule definitions
    await expect(page.getByText('tool = \"read_filesystem\"')).toBeVisible();
    await expect(page.getByText('tool = \"exec_code\"')).toBeVisible();
  });

  test('should render unmanaged servers review section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Unmanaged Servers Require Review/i })).toBeVisible();
    // Should have Approve and Quarantine actions
    await expect(page.getByRole('button', { name: 'Approve' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Quarantine' }).first()).toBeVisible();
  });

  test('should render Rule Builder form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Rule Builder' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Rule' })).toBeVisible();
  });
});