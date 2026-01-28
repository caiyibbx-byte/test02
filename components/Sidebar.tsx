
import React from 'react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: '总览看板', icon: '📊' },
    { id: 'tenders', label: '项目管理', icon: '项目' },
    { id: 'analysis', label: '标书智能分析', icon: '🔍' },
    { id: 'proposal', label: '应标方案生成', icon: '📝' },
    { id: 'knowledge', label: '知识库/案例', icon: '📚' },
  ];

  return (
    <div className="w-64 bg-slate-900 h-screen flex flex-col text-slate-300">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="bg-sky-500 w-8 h-8 rounded flex items-center justify-center text-sm">GB</span>
          GridBid AI
        </h1>
        <p className="text-xs text-slate-500 mt-1">智能电网投标平台</p>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeView === item.id 
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/20' 
                : 'hover:bg-slate-800'
            }`}
          >
            <span>{item.icon}</span>
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-slate-400">Gemini 3.0 Pro 已就绪</p>
          <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="w-full h-full bg-emerald-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
