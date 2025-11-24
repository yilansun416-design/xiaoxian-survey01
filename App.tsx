import React, { useState, useEffect } from 'react';
import SurveyForm from './components/SurveyForm';
import AnalysisDashboard from './components/AnalysisDashboard';
import ShareModal from './components/ShareModal';
import { SurveyData } from './types';
import { LayoutDashboard, FileText, Database, Share2 } from 'lucide-react';

// Mock data generator for demonstration
const generateMockData = (count: number): SurveyData[] => {
  const mockData: SurveyData[] = [];
  const ages = ['12岁以下', '12-18岁', '19-25岁', '26-35岁', '36岁以上'];
  const identities = ['中小学生', '高校学生', '上班族', '家长'];
  
  for (let i = 0; i < count; i++) {
    mockData.push({
      id: crypto.randomUUID(),
      timestamp: Date.now() - Math.random() * 100000000,
      ageGroup: ages[Math.floor(Math.random() * ages.length)],
      identity: identities[Math.floor(Math.random() * identities.length)],
      redInterest: Math.floor(Math.random() * 5) + 1,
      firstTime: Math.random() > 0.5 ? '是' : '否',
      c1_easyToPlay: Math.floor(Math.random() * 2) + 4, // skewed high
      c2_smoothUI: Math.floor(Math.random() * 3) + 3,
      c3_duration: Math.floor(Math.random() * 2) + 4,
      c4_immersion: Math.floor(Math.random() * 3) + 3,
      c5_funFactor: Math.floor(Math.random() * 2) + 4,
      d1_plotHook: Math.floor(Math.random() * 2) + 4,
      d2_historySense: Math.floor(Math.random() * 3) + 3,
      d3_balance: Math.floor(Math.random() * 2) + 4,
      d4_curiosity: Math.floor(Math.random() * 3) + 3,
      e1_resonance: Math.floor(Math.random() * 3) + 3,
      e2_empathy: Math.floor(Math.random() * 2) + 4,
      e3_values: 5,
      e4_recommend: Math.floor(Math.random() * 3) + 3,
      f1_visitIntent: Math.floor(Math.random() * 3) + 3,
      f2_checkinIntent: Math.floor(Math.random() * 2) + 4,
      f3_buyIntent: Math.floor(Math.random() * 4) + 2, // varied
      f4_offlineActivities: ['打卡路线', '文创纪念品'],
      g1_overallSatisfaction: Math.random() > 0.8 ? 5 : 4,
      g2_likedPoint: "剧情反转很精彩，代入感很强。",
      g3_improvementPoint: "有时候加载稍微有点慢。",
      g4_futureContent: "希望有更多角色视角。",
    });
  }
  return mockData;
};

const App: React.FC = () => {
  const [view, setView] = useState<'survey' | 'analysis'>('survey');
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem('xiaoxian_survey_data');
    if (saved) {
      setSurveyData(JSON.parse(saved));
    }
  }, []);

  const handleSurveySubmit = (data: SurveyData) => {
    const newData = [...surveyData, data];
    setSurveyData(newData);
    localStorage.setItem('xiaoxian_survey_data', JSON.stringify(newData));
  };

  const generateData = () => {
    const mock = generateMockData(50);
    const newData = [...surveyData, ...mock];
    setSurveyData(newData);
    localStorage.setItem('xiaoxian_survey_data', JSON.stringify(newData));
    alert("已生成 50 条模拟数据用于演示分析大屏效果");
    setView('analysis');
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans selection:bg-red-200">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center text-white font-bold">
              啸
            </div>
            <span className="font-bold text-lg tracking-tight">啸仙丹心 <span className="text-stone-400 font-normal">| 数据调研平台</span></span>
          </div>
          
          <nav className="flex gap-2">
             <button
              onClick={() => setView('survey')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                ${view === 'survey' ? 'bg-red-50 text-red-700' : 'text-stone-500 hover:bg-stone-50'}
              `}
            >
              <FileText size={18} />
              <span className="hidden sm:inline">填写问卷</span>
            </button>
            <button
              onClick={() => setView('analysis')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                ${view === 'analysis' ? 'bg-red-50 text-red-700' : 'text-stone-500 hover:bg-stone-50'}
              `}
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">数据分析</span>
            </button>
            <div className="w-px h-6 bg-stone-200 mx-1 self-center"></div>
            <button
              onClick={() => setShowShare(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors flex items-center gap-2"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">分享</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {view === 'survey' ? (
          <SurveyForm onSubmit={handleSurveySubmit} />
        ) : (
          <AnalysisDashboard data={surveyData} />
        )}
      </main>

      {/* Footer / Debug Tool */}
      <footer className="fixed bottom-4 right-4 z-40">
        <button 
          onClick={generateData}
          title="生成测试数据"
          className="bg-stone-800 text-stone-400 hover:text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <Database size={20} />
        </button>
      </footer>

      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} />
    </div>
  );
};

export default App;