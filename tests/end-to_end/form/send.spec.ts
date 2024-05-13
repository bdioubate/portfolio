import { test, expect } from '@playwright/test';


test('Send form without filling in any fields', async ({ page }) => {
    await page.goto('/');
  
    // Click on the "Send" button without filling any field
    await page.locator('#formulaire').getByRole('button', { name: 'Envoyer' }).click()
  
    // Wait for the error message to appear for the "Nom*" field
    await page.locator('#formulaire li:first-child[data-error="Le champ ne doit pas etre vide "]').waitFor()
  
    // Assertion to check that the error message is displayed
    expect(await page.locator('#formulaire li:first-child[data-error="Le champ ne doit pas etre vide "]').isVisible()).toBeTruthy()
  });
  
  test('User path - send the form without filling in the required fields', async ({ page }) => {
    await page.goto('/');
  
    // Fill the "Nom*" field
    await page.locator('#formulaire').getByPlaceholder('Nom*').fill('test');
  
    // Click on the "Send" button after filling only the "Nom*" field
    await page.locator('#formulaire').getByRole('button', { name: 'Envoyer' }).click();
  
    // Wait for the error message to appear for the "E-mail*" field
    await page.locator('#formulaire li:nth-child(2)[data-error="Le champ ne doit pas etre vide "]').waitFor();
  
    // Assertion to check that the error message is displayed
    expect(await page.locator('#formulaire li:nth-child(2)[data-error="Le champ ne doit pas etre vide "]').isVisible()).toBeTruthy();
  
    // Fill the "E-mail*" field
    await page.locator('#formulaire').getByPlaceholder('E-mail*').fill('test@test.com');
  
    // Click on the "Send" button after filling the "Nom*" and "E-mail*" fields
    await page.locator('#formulaire').getByRole('button', { name: 'Envoyer' }).click();
  
    // Wait for the error message to appear for the "Message*" field
    await page.locator('#formulaire li:nth-child(4)[data-error="Le champ ne doit pas etre vide "]').waitFor();
  
    // Assertion to check that the error message is displayed
    expect(await page.locator('#formulaire li:nth-child(4)[data-error="Le champ ne doit pas etre vide "]').isVisible()).toBeTruthy();
  
    // Fill the "Message*" field
    await page.locator('#formulaire').getByPlaceholder('Message*').fill('Test end to end');
  
    // Click on the "Send" button after filling all the required fields
    await page.locator('#formulaire').getByRole('button', { name: 'Envoyer' }).click();
  
    // Wait for the confirmation message to appear
    await page.locator('#formulaire div[id="message-form"][style="display: flex;"]').getByText('Message envoyé !').waitFor();
  
    // Assertion to check that the confirmation message is displayed
    expect(await page.locator('#formulaire div[id="message-form"][style="display: flex;"]').isVisible()).toBeTruthy();
  });
  
