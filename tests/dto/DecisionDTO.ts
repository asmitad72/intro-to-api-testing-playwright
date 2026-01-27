export class DecisionDTO {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  // Positive Scenarios
  static negativeDecision(): DecisionDTO {
    return new DecisionDTO(
      100, // income
      0, // debt
      17, // age
      true, // employed
      1000, // loanAmount
      12, // loanPeriod
    )
  }

  static positiveDecisionMediumRisk(): DecisionDTO {
    return new DecisionDTO(20000, 0, 30, true, 500, 6)
  }

  static positiveDecisionLowRisk(): DecisionDTO {
    return new DecisionDTO(20000, 0, 30, true, 500, 12)
  }

  // Negative scenarios
  static underageApplicant(): DecisionDTO {
    return new DecisionDTO(50000, 0, 16, true, 500, 12)
  }

  static zeroIncome(): DecisionDTO {
    return new DecisionDTO(0, 0, 25, true, 500, 12)
  }

  static negativeDebt(): DecisionDTO {
    return new DecisionDTO(20000, -1, 30, true, 500, 12)
  }
}
