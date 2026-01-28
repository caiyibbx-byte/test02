
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_TENDERS } from '../constants';

const Dashboard: React.FC = () => {
  const data = [
    { name: '1月', value: 45 },
    { name: '2月', value: 52 },
    { name: '3月', value: 48 },
    { name: '4月', value: 70 },
    { name: '5月', value: 61 },
  ];

  const pieData = [
    { name: '变电工程', value: 400 },
    { name: '线路工程', value: 300 },
    { name: '自动化', value: 300 },
    { name: '咨询服务', value: 200 },
  ];

  const COLORS = ['#0EA5E9', '#10B981', '#F59E0B', '#6366F1'];

  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">投标数据总览</h2>
          <p className="text-slate-500">欢迎回来，今日有 2 个项目即将截止</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">下载报告</button>
          <button className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700">+ 新建项目</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '在投项目', val: '12', trend: '+2', color: 'border-sky-500' },
          { label: '累计中标率', val: '64.5%', trend: '+3.2%', color: 'border-emerald-500' },
          { label: '本月投标额', val: '￥1.24亿', trend: '+12%', color: 'border-indigo-500' },
          { label: '待处理风险', val: '3', trend: '-2', color: 'border-amber-500' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-xl border-l-4 shadow-sm ${stat.color}`}>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-bold text-slate-800">{stat.val}</span>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-amber-500'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">历史投标活跃度</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="value" fill="#0EA5E9" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">项目领域分布</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">进行中的投标</h3>
          <button className="text-sky-600 text-sm font-medium">查看全部</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase font-medium text-xs">
            <tr>
              <th className="px-6 py-4">项目名称</th>
              <th className="px-6 py-4">业主单位</th>
              <th className="px-6 py-4">投标金额</th>
              <th className="px-6 py-4">当前状态</th>
              <th className="px-6 py-4">截止日期</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_TENDERS.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-medium text-slate-800">{t.title}</td>
                <td className="px-6 py-4 text-slate-500">{t.owner}</td>
                <td className="px-6 py-4 font-semibold text-slate-800">{t.budget}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    t.status === 'Drafting' ? 'bg-amber-100 text-amber-700' :
                    t.status === 'Reviewing' ? 'bg-sky-100 text-sky-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{t.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
