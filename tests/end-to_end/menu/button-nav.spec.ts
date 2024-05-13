import { test, expect } from '@playwright/test';


test('profile link in portfolio website', async ({ page }) => {
  await page.goto('/');

  // Click the contact link in nav.
  await page.locator('nav').first().getByRole('link', { name: 'Profil' }).click()

  // Waits for the URL to become the expected one
  await page.waitForURL('http://127.0.0.1:3000/#profile');

  // Expects the page to have a url with #profile
  expect(page.url()).toBe('http://127.0.0.1:3000/#profile');

});

test('about link in portfolio website', async ({ page }) => {
  await page.goto('/');

  // Click the contact link in nav.
  await page.locator('nav').first().getByRole('link', { name: 'À propos' }).click()

  // Waits for the URL to become the expected one
  await page.waitForURL('http://127.0.0.1:3000/#about');

  // Expects the page to have a url with #contact
  expect(page.url()).toBe('http://127.0.0.1:3000/#about')

});

test('projects link in portfolio website', async ({ page }) => {
  await page.goto('/');

  // Click the contact link in nav.
  await page.locator('nav').first().getByRole('link', { name: 'Projets' }).click()

  // Waits for the URL to become the expected one
  await page.waitForURL('http://127.0.0.1:3000/#projects');

  // Expects the page to have a url with #contact
  expect(page.url()).toBe('http://127.0.0.1:3000/#projects')

});
test('contact link in portfolio website', async ({ page }) => {
    await page.goto('/');
  
    // Click the contact link in nav.
    await page.locator('nav').first().getByRole('link', { name: 'Contact' }).click()

    // Waits for the URL to become the expected one
    await page.waitForURL('http://127.0.0.1:3000/#contact');

    // Expects the page to have a url with #contact
    expect(page.url()).toBe('http://127.0.0.1:3000/#contact')

  });