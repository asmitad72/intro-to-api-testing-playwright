import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { DecisionDTO } from '../dto/DecisionDTO'
import { LoginDto } from '../dto/LoginDto'

const BASE_URL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test.describe('Loan Risk Decision API – Checklist Based Tests', () => {
  // ---------- COMMON API BEHAVIOR ----------

  test('1. API accepts POST request to loan decision endpoint', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionMediumRisk(),
    })

    expect.soft(response.status()).toBe(StatusCodes.OK)
  })

  test('2. Request body is accepted with valid JSON structure', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionMediumRisk(),
    })

    const body = await response.json()
    expect.soft(body).toBeDefined()
  })

  test('3. Response status code is 200', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionMediumRisk(),
    })

    expect.soft(response.status()).toBe(StatusCodes.OK)
  })

  test('4. Response contains riskScore field', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionMediumRisk(),
    })

    const body = await response.json()
    expect.soft(body.riskScore).toBeDefined()
  })

  test('5. Response contains riskLevel field', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionMediumRisk(),
    })

    const body = await response.json()
    expect.soft(body.riskLevel).toBeDefined()
  })

  test('6. Response contains riskPeriods field', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionMediumRisk(),
    })

    const body = await response.json()
    expect.soft(Array.isArray(body.riskPeriods)).toBe(true)
  })

  test('7. Response contains applicationId field', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionMediumRisk(),
    })

    const body = await response.json()
    expect.soft(body.applicationId).toBeTruthy()
  })

  test('8. Response contains riskDecision field', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionMediumRisk(),
    })

    const body = await response.json()
    expect.soft(body.riskDecision).toBeDefined()
  })

  // ---------- NEGATIVE DECISION ----------

  test('9. Negative decision for underage applicant', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.negativeDecision(),
    })

    const body = await response.json()
    expect.soft(body.riskDecision).toBe('negative')
  })

  test('10. Negative decision returns Very High Risk level', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.negativeDecision(),
    })

    const body = await response.json()
    expect.soft(body.riskLevel).toBe('Very High Risk')
  })

  test('11. Negative decision returns empty riskPeriods', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.negativeDecision(),
    })

    const body = await response.json()
    expect.soft(body.riskPeriods).toHaveLength(0)
  })

  // ---------- POSITIVE – MEDIUM RISK ----------

  test('12. Positive decision with Medium Risk', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionMediumRisk(),
    })

    const body = await response.json()
    expect.soft(body.riskDecision).toBe('positive')
    expect.soft(body.riskLevel).toBe('Medium Risk')
  })

  test('13. Medium Risk returns [6, 9, 12] risk periods', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionMediumRisk(),
    })

    const body = await response.json()
    expect.soft(body.riskPeriods).toEqual([6, 9, 12])
  })

  // ---------- POSITIVE – LOW RISK ----------

  test('14. Positive decision with Low Risk', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionLowRisk(),
    })

    const body = await response.json()
    expect.soft(body.riskDecision).toBe('positive')
    expect.soft(body.riskLevel).toBe('Low Risk')
  })

  test('15. Low Risk returns [12, 18, 24, 30, 36] risk periods', async ({ request }) => {
    const response = await request.post(BASE_URL, {
      data: DecisionDTO.positiveDecisionLowRisk(),
    })

    const body = await response.json()
    expect.soft(body.riskPeriods).toEqual([12, 18, 24, 30, 36])
  })

  test('16. API accepts POST request and returns valid JWT token', async ({ request }) => {
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDto.createLoginWithCorrectData(),
    })

    // Status check
    expect.soft(response.status()).toBe(StatusCodes.OK)

    // JWT token is returned as plain text
    const jwtValue = await response.text()

    // JWT regex pattern
    const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

    // Verify valid JWT
    expect.soft(jwtValue).toMatch(jwtRegex)
  })

  test('17. Negative: Incorrect HTTP method (GET instead of POST)', async ({ request }) => {
    const response = await request.get(BASE_URL)

    // Accept actual backend behavior
    expect([StatusCodes.METHOD_NOT_ALLOWED, StatusCodes.BAD_REQUEST]).toContain(response.status())
  })

  test('18. Negative: Incorrect request body structure', async ({ request }) => {
    const invalidBody = {
      age: 'twenty', // wrong type
      income: null, // invalid value
      loanAmount: '10000', // wrong type
    }
    const response = await request.post(BASE_URL, {
      data: invalidBody,
    })
    expect([StatusCodes.BAD_REQUEST, StatusCodes.UNPROCESSABLE_ENTITY]).toContain(response.status())
  })
})
