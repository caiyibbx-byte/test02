
export interface Tender {
  id: string;
  title: string;
  code: string;
  owner: string;
  budget: string;
  deadline: string;
  status: 'Drafting' | 'Reviewing' | 'Submitted' | 'Archived';
  category: 'Construction' | 'Equipment' | 'Service';
}

export interface AnalysisResult {
  summary: string;
  requirements: string[];
  risks: string[];
  competitors: string[];
  winningStrategy: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ProposalSection {
  title: string;
  content: string;
  isGenerated: boolean;
}
