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


