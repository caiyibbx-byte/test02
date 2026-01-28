
import React, { useState } from 'react';
import { analyzeTenderDocument } from '../services/geminiService';
import { AnalysisResult } from '../types';

const AnalysisTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeTenderDocument(inputText);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('分析失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto space-y-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h2 className="text-2xl font-bold text-slate-800">标书智能分析</h2>
          <p className="text-slate-500">粘贴招标文件文本，Gemini AI 将为您提取核心条款和竞标风险</p>
        </header>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <textarea
            className="w-full h-48 p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-sm leading-relaxed"
            placeholder="请在此粘贴招标公告或技术规范书内容..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-400">支持电网施工、物资采购、信息化服务等多种标书类型</p>
            <button
              onClick={handleAnalyze}
              disabled={loading || !inputText}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                loading ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-sky-600 text-white hover:bg-sky-700'
              }`}
            >
              {loading ? 'AI 正在深度解析中...' : '开始智能分析'}
            </button>
          </div>
        </div>

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {/* Summary */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 md:col-span-2">
              <h3 className="text-emerald-800 font-bold mb-2 flex items-center gap-2">
                <span>🎯</span> 核心概要
              </h3>
              <p className="text-emerald-900 text-sm leading-relaxed">{result.summary}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                <span>📋</span> 关键技术/商务要求
              </h3>
              <ul className="space-y-3">
                {result.requirements.map((req, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <span className="text-sky-500 font-bold">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                <span>⚠️</span> 潜在风险预警
              </h3>
              <ul className="space-y-3">
                {result.risks.map((risk, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <span className="text-amber-500 font-bold">!</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Winning Strategy */}
            <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 md:col-span-2">
              <h3 className="text-sky-800 font-bold mb-2 flex items-center gap-2">
                <span>💡</span> AI 推荐竞争策略
              </h3>
              <p className="text-sky-900 text-sm leading-relaxed">{result.winningStrategy}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisTool;
