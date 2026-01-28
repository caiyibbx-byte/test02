
import React, { useState } from 'react';
import { generateProposalSection } from '../services/geminiService';

const ProposalGenerator: React.FC = () => {
  const [context, setContext] = useState('');
  const [currentSection, setCurrentSection] = useState('技术实施方案');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draft, setDraft] = useState('');

  const sections = [
    '技术实施方案',
    '质量保证措施',
    '施工进度计划',
    '应急处理预案',
    '企业实力与业绩'
  ];

  const handleGenerate = async () => {
    if (!context.trim()) return;
    setIsGenerating(true);
    try {
      const result = await generateProposalSection(currentSection, context);
      setDraft(result);
    } catch (error) {
      console.error(error);
      alert('生成失败');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50">
      <div className="max-w-5xl mx-auto flex gap-8">
        {/* Settings Panel */}
        <div className="w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">生成设置</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">选择章节</label>
                <select 
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50"
                  value={currentSection}
                  onChange={(e) => setCurrentSection(e.target.value)}
                >
                  {sections.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase">项目背景/要求</label>
                <textarea 
                  className="w-full h-32 p-3 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="输入标书中对应的具体要求或项目背景..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !context}
                className="w-full py-3 bg-sky-600 text-white rounded-lg font-bold hover:bg-sky-700 transition-colors disabled:opacity-50"
              >
                {isGenerating ? 'AI 书写中...' : '生成专业草案'}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-300 p-6 rounded-xl">
            <h4 className="font-bold text-white mb-2 text-sm">💡 AI 撰写提示</h4>
            <ul className="text-xs space-y-2 opacity-80">
              <li>• 引用具体的 GB/T 行业标准将提高专业度</li>
              <li>• 强调在国网同类项目中的成功案例</li>
              <li>• 技术方案应覆盖：准备、实施、调试、验收</li>
            </ul>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[600px]">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
            <h3 className="font-bold text-slate-700">{currentSection} - 文档编辑器</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-slate-200 rounded bg-white text-xs font-medium hover:bg-slate-50">保存草稿</button>
              <button className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700">导出 Word</button>
            </div>
          </div>
          <div className="flex-1 p-8">
            {isGenerating ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
              </div>
            ) : draft ? (
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-slate-800 text-sm leading-relaxed font-serif">
                  {draft}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-300">
                <span className="text-4xl mb-4">✍️</span>
                <p>配置左侧参数并点击生成以开始创作</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalGenerator;
