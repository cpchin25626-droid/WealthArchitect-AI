import React, { useState } from 'react';
import { FinancialProfile } from '../types';
import { ArrowRight, DollarSign, Wallet, Target, ShieldAlert, CreditCard } from 'lucide-react';

interface InputFormProps {
  onSubmit: (profile: FinancialProfile) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FinancialProfile>({
    monthlyIncome: 50000,
    monthlyExpenses: 30000,
    totalAssets: 500000,
    totalLiabilities: 0,
    financialGoal: '',
    age: 30,
    riskTolerance: 'moderate'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'financialGoal' || name === 'riskTolerance' ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-slate-900 px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
           <Wallet className="w-6 h-6 text-blue-400" />
           財務健檢資料表
        </h2>
        <p className="text-slate-400 mt-2 text-sm">請輸入您的真實數據，AI 顧問將為您量身打造財務策略。</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
              年齡
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
              風險承受度
            </label>
            <select
              name="riskTolerance"
              value={formData.riskTolerance}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none bg-white"
            >
              <option value="conservative">保守 (保本為主)</option>
              <option value="moderate">穩健 (股債平衡)</option>
              <option value="aggressive">積極 (追求高報酬)</option>
            </select>
          </div>
        </div>

        {/* Cash Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    每月稅後收入 (TWD)
                </label>
                <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                    placeholder="50000"
                    required
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-red-500" />
                    每月總支出 (TWD)
                </label>
                <input
                    type="number"
                    name="monthlyExpenses"
                    value={formData.monthlyExpenses}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none"
                    placeholder="30000"
                    required
                />
            </div>
        </div>

        {/* Balance Sheet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-blue-500" />
                    目前總資產 (TWD)
                </label>
                <p className="text-xs text-slate-400">現金、存款、股票市值、房產價值</p>
                <input
                    type="number"
                    name="totalAssets"
                    value={formData.totalAssets}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    placeholder="500000"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    目前總負債 (TWD)
                </label>
                <p className="text-xs text-slate-400">房貸、車貸、信貸餘額</p>
                <input
                    type="number"
                    name="totalLiabilities"
                    value={formData.totalLiabilities}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all outline-none"
                    placeholder="0"
                />
            </div>
        </div>

        {/* Goal */}
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                您的主要財務目標
            </label>
            <input
                type="text"
                name="financialGoal"
                value={formData.financialGoal}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none"
                placeholder="例如：5年後存到200萬買房頭期款、60歲退休月領5萬..."
                required
            />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AI 顧問分析中...
            </>
          ) : (
            <>
              開始診斷規劃 <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};