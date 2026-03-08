import { test, expect } from '@playwright/test';

test.describe('Audit Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/audit');
  });

  test('should show event table and filters', async ({ page }) => {
    // Ensure table headers are present
    await expect(page.getByRole('columnheader', { name: 'Trace ID' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Decision' })).toBeVisible();
    
    // Check filter buttons
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'allowed', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'denied', exact: true })).toBeVisible();
  });

  test('should open split pane trace viewer when row is clicked', async ({ page }) => {
    // Click the first row in the table body
    const firstRow = page.locator('tbody tr').first();
    await firstRow.click();
    
    // The details pane should open
    await expect(page.getByText('Thread-of-Thought Trace')).toBeVisible();
    await expect(page.getByRole('button', { name: /Generate Audit Evidence/i })).toBeVisible();
    await expect(page.getByText('AI Reasoning Trace')).toBeVisible();
    await expect(page.getByText('Tool Call Chain')).toBeVisible();
  });
});