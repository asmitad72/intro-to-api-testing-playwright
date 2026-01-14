import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

/* =========================
   GET – Get Order Details
   ========================= */

test('GET order with valid ID (1–10) should return 200', async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/1'
  )
  expect(response.status()).toBe(StatusCodes.OK)
})

test('GET order with ID less than 1 should return client error', async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/0'
  )
  expect([StatusCodes.BAD_REQUEST, StatusCodes.NOT_FOUND]).toContain(
    response.status()
  )
})

test('GET order with ID greater than 10 should return client error', async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/15'
  )

  expect([StatusCodes.BAD_REQUEST, StatusCodes.NOT_FOUND]).toContain(
    response.status()
  )
})


test('GET test order time without headers should return 400', async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/time/1'
  )
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

/* =========================
   POST – Create Order
   ========================= */

test('POST order with valid data should return 200', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/test-orders',
    {
      data: {
        status: 'OPEN',
        courierId: 0,
        customerName: 'Test User',
        customerPhone: '1234567890',
        comment: 'test order',
        id: 0,
      },
    }
  )

  expect(response.status()).toBe(StatusCodes.OK)
})

test('POST order with invalid data should return 400', async ({ request }) => {
  const response = await request.post(
    'https://backend.tallinn-learning.ee/test-orders',
    {
      data: {
        status: '123',
        courierId: 0,
        customerPhone: '1234567890',
        comment: 'invalid order',
        id: 0,
      },
    }
  )

  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

/* =========================
   PUT – Update Existing Order
   ========================= */

test('PUT update order with valid ID and valid API key should return 200', async ({ request }) => {
  const response = await request.put(
    'https://backend.tallinn-learning.ee/test-orders/1',
    {
      headers: { api_key: '1234567890123456' },
      data: { status: 'OPEN' },
    }
  )

  expect(response.status()).toBe(StatusCodes.OK)
})

test('PUT update order without API key should return client error', async ({ request }) => {
  const response = await request.put(
    'https://backend.tallinn-learning.ee/test-orders/1',
    {
      data: { status: 'OPEN' },
    }
  )

  expect([StatusCodes.UNAUTHORIZED, StatusCodes.BAD_REQUEST]).toContain(
    response.status()
  )
})

test('PUT update order with invalid API key should return 401', async ({ request }) => {
  const response = await request.put(
    'https://backend.tallinn-learning.ee/test-orders/1',
    {
      headers: { api_key: 'abc123' },
      data: { status: 'OPEN' },
    }
  )

  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('PUT update order with empty request body should return client error', async ({ request }) => {
  const response = await request.put(
    'https://backend.tallinn-learning.ee/test-orders/1',
    {
      headers: { api_key: '1234567890123456' },
    }
  )

  expect([StatusCodes.BAD_REQUEST, StatusCodes.NOT_FOUND]).toContain(
    response.status()
  )
})
test('PUT update order with invalid ID should return client error', async ({ request }) => {
  const response = await request.put(
    'https://backend.tallinn-learning.ee/test-orders/20',
    {
      headers: { api_key: '1234567890123456' },
      data: { status: 'OPEN' },
    }
  )

  expect([StatusCodes.BAD_REQUEST, StatusCodes.NOT_FOUND]).toContain(
    response.status()
  )
})

/* =========================
   DELETE – Delete Order
   ========================= */

test('DELETE order without API key should return client error', async ({ request }) => {
  const response = await request.delete(
    'https://backend.tallinn-learning.ee/test-orders/25'
  )

  expect([StatusCodes.UNAUTHORIZED, StatusCodes.BAD_REQUEST]).toContain(
    response.status()
  )
})

test('DELETE order with invalid API key should return client error', async ({ request }) => {
  const response = await request.delete(
    'https://backend.tallinn-learning.ee/test-orders/25',
    {
      headers: { api_key: 'invalidkey' },
    }
  )

  expect([StatusCodes.UNAUTHORIZED, StatusCodes.BAD_REQUEST]).toContain(
    response.status()
  )
})


test('DELETE order with invalid ID should return client error', async ({ request }) => {
  const response = await request.delete(
    'https://backend.tallinn-learning.ee/test-orders/25',
    {
      headers: { api_key: '1234567890123456' },
    }
  )

  expect([StatusCodes.NOT_FOUND, StatusCodes.BAD_REQUEST]).toContain(
    response.status()
  )
})
