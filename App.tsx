import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppState, FinancialProfile } from './types';
import { InputForm } from './components/InputForm';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { analyzeProfile } from './services/geminiService';
import { FinancialChart } from './components/FinancialChart';
import { Briefcase, ChevronLeft, RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [report, setReport] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (data: FinancialProfile) => {
    setProfile(data);
    setAppState(AppState.LOADING);
    setError(null);

    try {
      const result = await analyzeProfile(data);
      setReport(result);
      setAppState(AppState.RESULT);
    } catch (err: any) {
      setError(err.message || '發生未知錯誤');
      setAppState(AppState.INPUT); // Go back to input on error but keep data ideally
    }
  };

  const reset = () => {
    setAppState(AppState.INPUT);
    setReport('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-900">
                WealthArchitect AI
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">AI 智能財務顧問</p>
            </div>
          </div>
          {appState === AppState.RESULT && (
            <button 
              onClick={reset}
              className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" /> 重新診斷
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        
        {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        )}

        {appState === AppState.INPUT && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">專屬您的 AI 財務長</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                只需 1 分鐘輸入，立即運用大數據演算法，為您提供包含<span className="font-bold text-blue-700">收支管理、風險防護、資產增值</span>的全方位財務策略。
              </p>
            </div>
            <InputForm onSubmit={handleAnalysis} isLoading={false} />
          </div>
        )}

        {appState === AppState.LOADING && (
           <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                <Briefcase className="absolute inset-0 m-auto w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">正在分析您的財務體質...</h3>
              <p className="text-slate-500">正在計算複利效應、評估風險缺口、篩選最佳方案</p>
           </div>
        )}

        {appState === AppState.RESULT && profile && (
          <div className="animate-fade-in">
             <div className="flex items-center mb-6">
                <button 
                  onClick={reset}
                  className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-600" />
                </button>
                <h2 className="text-2xl font-bold text-slate-900">財務診斷報告書</h2>
             </div>

             <FinancialChart profile={profile} />

             <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                
                {/* Simulated Consultant Avatar Header */}
                <div className="flex items-start gap-4 mb-8 pb-8 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Briefcase className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">WealthArchitect AI</h3>
                        <div className="text-sm text-blue-600 font-semibold mb-1">資深財務規劃顧問</div>
                        <p className="text-sm text-slate-500 italic">
                            "根據您的數據，我已經為您擬定了一份專屬策略。財務自由不是夢，關鍵在於紀律與工具的選擇。"
                        </p>
                    </div>
                </div>

                <div className="financial-report-content">
                  <MarkdownRenderer content={report} />
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 text-xs text-slate-400 text-center">
                    免責聲明：本報告由 AI 生成，僅供財務規劃參考，不代表對未來投資績效之保證。
                    實際保險商品內容與條款請以保險公司公告為主。投資理財有賺有賠，購買前請審慎評估風險。
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;