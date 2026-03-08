import { test, expect } from '@playwright/test';

test.describe('Policies Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/policies');
  });

  test('should allow interacting with unmanaged servers', async ({ page }) => {
    // Wait for the servers list to load
    await expect(page.getByText('Unmanaged Servers Require Review')).toBeVisible();
    // Click Approve on the first one
    const approveButton = page.getByRole('button', { name: 'Approve' }).first();
    await approveButton.click();
    // In our stateful mock, this updates topology and invalidates queries, refreshing the screen
  });

  test('should create a new policy rule', async ({ page }) => {
    // Scroll down to Rule Builder
    await page.click('button:has-text("New Rule")');

    // Fill the Rule Builder Form
    const toolInput = page.getByPlaceholder('e.g. read_filesystem');
    await toolInput.fill('my_custom_tool');

    const rpmInput = page.locator('input[type="number"]');
    await rpmInput.fill('50');

    // Select allow action
    await page.getByRole('button', { name: 'allow' }).click();

    // Submit rule
    await page.getByRole('button', { name: 'Add Rule' }).click();

    // Verify it was added to the list (after loading spinner/invalidation)
    await expect(page.getByText('tool = \"my_custom_tool\"')).toBeVisible();
  });
});