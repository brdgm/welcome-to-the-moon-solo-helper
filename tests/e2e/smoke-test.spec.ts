import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Welcome to the Moon Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('button', { name: 'Start Game' }).click()

  // play a few turns
  await page.getByTestId('card-permutation-0').getByRole('button', { name: 'Select' }).click()
  await page.getByRole('button', { name: 'OK' }).click()
  await page.getByTestId('card-permutation-1').getByRole('button', { name: 'Select' }).click()
  await page.getByRole('button', { name: 'OK' }).click()

  // finish game
  await page.getByRole('button', { name: 'End Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'End Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Welcome to the Moon Solo Helper')
})
