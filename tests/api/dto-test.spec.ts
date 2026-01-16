import { expect, test } from '@playwright/test'
import { OrderDto } from '../dto/OrderDTO'

test('Dto test', async ({request}) => {
  const requestBody = OrderDto.createOrderWithRandomData()
  console.log(requestBody);

  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  await expect(response).toBeOK();
  const responseBody = await response.json()
  expect.soft(responseBody.status).toBe(requestBody.status)
  expect.soft(responseBody.courierId).toBe(requestBody.courierId)
  expect.soft(responseBody.customerName).toBe(requestBody.customerName)
})
