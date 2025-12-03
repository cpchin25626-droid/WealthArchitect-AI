export interface FinancialProfile {
  monthlyIncome: number;
  monthlyExpenses: number;
  totalAssets: number;
  totalLiabilities: number;
  financialGoal: string;
  age: number;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

export interface AnalysisResult {
  markdownReport: string;
  timestamp: Date;
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}