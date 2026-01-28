
import React from 'react';

export const COLORS = {
  primary: '#0F172A', // Slate 900
  accent: '#0EA5E9',  // Sky 500
  gridGreen: '#10B981', // Emerald 500
  gridYellow: '#F59E0B' // Amber 500
};

export const MOCK_TENDERS: any[] = [
  {
    id: '1',
    title: '特高压交流输变电工程（一标段）施工招标',
    code: 'SG-2024-UHV-001',
    owner: '国家电网公司',
    budget: '￥2.45亿',
    deadline: '2024-05-20',
    status: 'Drafting',
    category: 'Construction'
  },
  {
    id: '2',
    title: '配电自动化终端（DTU/FTU）年度采购项目',
    code: 'EQ-2024-DIST-055',
    owner: '南方电网',
    budget: '￥8500万',
    deadline: '2024-06-15',
    status: 'Reviewing',
    category: 'Equipment'
  },
  {
    id: '3',
    title: '数字孪生变电站三维建模及运维平台开发',
    code: 'SV-2024-DIGI-102',
    owner: '省电力公司',
    budget: '￥1200万',
    deadline: '2024-05-12',
    status: 'Submitted',
    category: 'Service'
  }
];
