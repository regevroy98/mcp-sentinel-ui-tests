import { test, expect } from '@playwright/test';

test.describe('Discovery & Topology Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/discovery');
  });

  test('should display topology and side panel when clicking a node', async ({ page }) => {
    // Wait for canvas to load
    await expect(page.locator('.react-flow')).toBeVisible();

    // Click on a managed server node. The ReactFlow nodes have titles or data-id, but we can just click the visual node text.
    await page.locator('.react-flow__node-server').filter({ hasText: 'prod-db-mcp' }).click();

    // Side panel should appear
    const panel = page.locator('text=Server Details').locator('..').locator('..');
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('prod-db-mcp');
    await expect(panel).toContainText('Endpoint URL');
    
    // Close panel
    await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).click();
    await expect(panel).toBeHidden();
  });
});