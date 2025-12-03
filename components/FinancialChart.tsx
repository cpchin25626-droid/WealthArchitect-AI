import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { FinancialProfile } from '../types';

interface FinancialChartProps {
  profile: FinancialProfile;
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

export const FinancialChart: React.FC<FinancialChartProps> = ({ profile }) => {
  const cashFlowData = [
    { name: '結餘 (Potential Savings)', value: Math.max(0, profile.monthlyIncome - profile.monthlyExpenses) },
    { name: '支出 (Expenses)', value: profile.monthlyExpenses },
  ];

  const netWorthData = [
    { name: '資產', amount: profile.totalAssets },
    { name: '負債', amount: profile.totalLiabilities },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Cash Flow Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider text-center">月度收支分析</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cashFlowData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell key="cell-savings" fill="#10b981" />
                <Cell key="cell-expenses" fill="#ef4444" />
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-sm text-slate-600 mt-2">
            儲蓄率: <span className="font-bold text-slate-900">{Math.round((Math.max(0, profile.monthlyIncome - profile.monthlyExpenses) / profile.monthlyIncome) * 100)}%</span>
        </div>
      </div>

      {/* Net Worth Chart */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider text-center">資產負債結構</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={netWorthData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#64748b'}} axisLine={false} tickLine={false} tickFormatter={(value) => `${value / 10000}萬`} />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                 {
                    netWorthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#f59e0b'} />
                    ))
                 }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
         <div className="text-center text-sm text-slate-600 mt-2">
            淨資產: <span className="font-bold text-slate-900">${(profile.totalAssets - profile.totalLiabilities).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};