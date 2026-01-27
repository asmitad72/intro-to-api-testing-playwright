# API Testing Checklist- homework 10

This checklist is based on the implemented Playwright API tests.
GET / POST / PUT / DELETE all covered.

# GET – Get Order Details

| No. | Scenario Name | Status |
|----|---------------|--------|
| 1 | Get order with valid ID (1–10) | Done |
| 2 | Get order with ID less than 1 | Done |
| 3 | Get order with ID greater than 10 | Done |
| 4 | Get test order time without required headers | Done |

## POST – Create Order

| No. | Scenario Name | Status |
|----|---------------|--------|
| 5 | Create order with valid request data | Done |
| 6 | Create order with invalid request data | Done |

# PUT – Update Existing Order

| No. | Scenario Name | Status |
|----|---------------|--------|
| 7 | Update order with valid ID and valid API key | Done |
| 8 | Update order without API key | Done |
| 9 | Update order with invalid API key | Done |
| 10 | Update order with empty request body | Done |
| 11 | Update order with invalid ID | Done |

# DELETE – Delete Order

| No. | Scenario Name | Status |
|----|---------------|--------|
| 12 | Delete order without API key | Done |
| 13 | Delete order with invalid API key | Done |
| 14 | Delete order with invalid ID | Done |


# Loan Risk Decision API – Homework 11
All API test scenarios created for the Loan Risk Decision service.
# API Test Checklist 

| No | Scenario Name | Test Data |
|----|---------------|-----------|
| 1 | API accepts POST request to loan decision endpoint | `positiveDecisionMediumRisk()` |
| 2 | Request body is accepted with valid JSON structure | `positiveDecisionMediumRisk()` |
| 3 | Response status code is 200 OK | `positiveDecisionMediumRisk()` |
| 4 | Response contains `riskScore` field | `positiveDecisionMediumRisk()` |
| 5 | Response contains `riskLevel` field | `positiveDecisionMediumRisk()` |
| 6 | Response contains `riskPeriods` field | `positiveDecisionMediumRisk()` |
| 7 | Response contains `applicationId` field | `positiveDecisionMediumRisk()` |
| 8 | Response contains `riskDecision` field | `positiveDecisionMediumRisk()` |
| 9 | Negative decision for underage applicant | `negativeDecision()` |
| 10 | Negative decision returns `Very High Risk` | `negativeDecision()` |
| 11 | Negative decision returns empty `riskPeriods` array | `negativeDecision()` |
| 12 | Positive decision with Medium Risk | `positiveDecisionMediumRisk()` |
| 13 | Medium Risk returns `[6, 9, 12]` risk periods | `positiveDecisionMediumRisk()` |
| 14 | Positive decision with Low Risk | `positiveDecisionLowRisk()` |
| 15 | Low Risk returns `[12, 18, 24, 30, 36]` risk periods | `positiveDecisionLowRisk()` |




