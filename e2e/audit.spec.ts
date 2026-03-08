import { test, expect } from '@playwright/test';

test.describe('Audit Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/audit');
  });

  test('should filter the audit logs', async ({ page }) => {
    // Ensure table is loaded
    await expect(page.getByRole('table')).toBeVisible();
    
    // Type in search filter
    const searchInput = page.getByPlaceholder('Filter by tool…');
    await searchInput.fill('query_db');

    // Select decision filter
    await page.getByRole('button', { name: 'allowed' }).click();

    // Verify results
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();

    // Select trace
    await rows.first().click();

    // Ensure pane opens
    await expect(page.getByText('Thread-of-Thought Trace')).toBeVisible();

    // Trigger PDF Export download
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Generate Audit Evidence' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('compliance-trace-');
  });
});