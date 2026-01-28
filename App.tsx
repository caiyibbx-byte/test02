
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AnalysisTool from './components/AnalysisTool';
import ProposalGenerator from './components/ProposalGenerator';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'analysis': return <AnalysisTool />;
      case 'proposal': return <ProposalGenerator />;
      default: return (
        <div className="h-full flex items-center justify-center text-slate-400">
          <div className="text-center">
            <span className="text-6xl block mb-4">🚧</span>
            <p className="text-xl font-medium">模块建设中...</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 relative h-full flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-slate-200"></div>
            <nav className="text-sm text-slate-500 flex gap-2">
              <span className="hover:text-slate-800 cursor-pointer">应标工作台</span>
              <span>/</span>
              <span className="text-slate-800 font-medium capitalize">
                {activeView === 'dashboard' ? '总览看板' : 
                 activeView === 'analysis' ? '智能分析' : 
                 activeView === 'proposal' ? '方案生成' : activeView}
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://picsum.photos/100?random=1" alt="avatar" />
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://picsum.photos/100?random=2" alt="avatar" />
              <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+3</div>
            </div>
            <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer transition-colors">
              🔔
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>

        <ChatAssistant />
      </main>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
