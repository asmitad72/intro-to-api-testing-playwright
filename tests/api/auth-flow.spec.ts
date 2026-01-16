import { expect, test } from '@playwright/test'
import { LoginDto } from '../dto/LoginDto'

test('should not be able to login with incorrect credentials', async ({ request }) => {
  const requestBody = LoginDto.createLoginWithInorrectData()
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  expect(response.status()).toBe(401)
})

test('should be able to login with correct credentials', async ({ request }) => {
  const requestBody = LoginDto.createLoginWithCorrectData()
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  expect(response.status()).toBe(200)

  const token = await response.text()
  const orderResponse = await request.get('https://backend.tallinn-learning.ee/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  expect(orderResponse.status()).toBe(200)
})