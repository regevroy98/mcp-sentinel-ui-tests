import { test, expect } from '@playwright/test';

test.describe('Analytics Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/analytics');
  });

  test('should display key performance metrics cards', async ({ page }) => {
    // Top-level heading
    await expect(page.getByRole('heading', { name: 'Performance & Semantic Analytics' })).toBeVisible();

    // Check time range filters
    await expect(page.getByRole('button', { name: '6h' })).toBeVisible();
    await expect(page.getByRole('button', { name: '24h' })).toBeVisible();
    await expect(page.getByRole('button', { name: '7d' })).toBeVisible();

    // Metric titles
    await expect(page.getByText('Avg Latency').first()).toBeVisible();
    await expect(page.getByText('P99 Latency').first()).toBeVisible();
    await expect(page.getByText('Cache Hit Rate').first()).toBeVisible();
    await expect(page.getByText('Tokens Saved').first()).toBeVisible();
    await expect(page.getByText('Cost Saved').first()).toBeVisible();

    // Metric components
    await expect(page.getByText('72µs')).toBeVisible();
    await expect(page.getByText('84.7%')).toBeVisible();
  });

  test('should display Proxy Latency Overhead section', async ({ page }) => {
    await expect(page.getByText('Proxy Latency Overhead')).first().toBeVisible();
    await expect(page.getByText('Target: <10µs')).first().toBeVisible();
    await expect(page.getByText('P50')).first().toBeVisible();
    await expect(page.getByText('P95')).first().toBeVisible();
    await expect(page.getByText('P99')).nth(1).toBeVisible(); // P99 appears twice
  });

  test('should display Semantic Cache Savings and Tokens sections', async ({ page }) => {
    await expect(page.getByText('Semantic Cache Savings')).first().toBeVisible();
    await expect(page.getByText('Tokens Saved (Semantic Tax)')).first().toBeVisible();
  });
});