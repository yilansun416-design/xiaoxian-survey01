import React, { useMemo } from 'react';
import { SurveyData } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { Users, Star, BrainCircuit, Heart, ShoppingBag } from 'lucide-react';

interface AnalysisDashboardProps {
  data: SurveyData[];
}

const COLORS = ['#991b1b', '#b91c1c', '#dc2626', '#ef4444', '#f87171', '#fca5a5'];
const PIE_COLORS = ['#78350f', '#92400e', '#b45309', '#d97706', '#f59e0b'];

const Card: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex flex-col h-full">
    <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    <div className="flex-1 min-h-[250px]">{children}</div>
  </div>
);

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ data }) => {
  if (data.length === 0) {
    return <div className="p-10 text-center text-stone-500">暂无数据，请先提交几份问卷。</div>;
  }

  // --- Statistics Logic ---

  // 1. Demographics: Age
  const ageData = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach(d => { counts[d.ageGroup] = (counts[d.ageGroup] || 0) + 1; });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [data]);

  // 2. Averages for Scales
  const calculateAvg = (keys: (keyof SurveyData)[]) => {
    let total = 0;
    let count = 0;
    data.forEach(d => {
      keys.forEach(k => {
        total += (d[k] as number);
        count++;
      });
    });
    return count === 0 ? 0 : parseFloat((total / count).toFixed(1));
  };

  // Dimension Scores
  const immersionScore = calculateAvg(['c4_immersion', 'c5_funFactor']);
  const narrativeScore = calculateAvg(['d1_plotHook', 'd2_historySense']);
  const emotionalScore = calculateAvg(['e1_resonance', 'e2_empathy']);
  const valueScore = calculateAvg(['e3_values']);
  const consumptionScore = calculateAvg(['f3_buyIntent']);

  const radarData = [
    { subject: '沉浸趣味', A: immersionScore, fullMark: 5 },
    { subject: '历史叙事', A: narrativeScore, fullMark: 5 },
    { subject: '情感共鸣', A: emotionalScore, fullMark: 5 },
    { subject: '价值认同', A: valueScore, fullMark: 5 },
    { subject: '消费意愿', A: consumptionScore, fullMark: 5 },
  ];

  // Satisfaction Distribution
  const satisfactionData = useMemo(() => {
     const counts: Record<string, number> = {1:0, 2:0, 3:0, 4:0, 5:0};
     data.forEach(d => { counts[d.g1_overallSatisfaction] = (counts[d.g1_overallSatisfaction] || 0) + 1 });
     return Object.keys(counts).map(k => ({ name: `${k}分`, value: counts[k] }));
  }, [data]);

  // Offline Activities Interest
  const offlineActivityData = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach(d => {
      d.f4_offlineActivities?.forEach(act => {
        counts[act] = (counts[act] || 0) + 1;
      });
    });
    return Object.keys(counts)
      .map(key => ({ name: key, value: counts[key] }))
      .sort((a, b) => b.value - a.value);
  }, [data]);


  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-red-900 text-white p-6 rounded-xl shadow-lg">
          <p className="text-red-200 text-sm font-medium uppercase tracking-wider">总样本量</p>
          <p className="text-4xl font-bold mt-2">{data.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 text-sm font-medium uppercase tracking-wider">平均满意度 (G1)</p>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-4xl font-bold text-stone-800">
               {calculateAvg(['g1_overallSatisfaction'])}
            </p>
            <p className="text-stone-400 mb-1">/ 5.0</p>
          </div>
        </div>
         <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 text-sm font-medium uppercase tracking-wider">购买转化意向 (F3)</p>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-4xl font-bold text-stone-800">
               {calculateAvg(['f3_buyIntent'])}
            </p>
            <p className="text-stone-400 mb-1">/ 5.0</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 text-sm font-medium uppercase tracking-wider">净推荐倾向 (E4)</p>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-4xl font-bold text-stone-800">
               {calculateAvg(['e4_recommend'])}
            </p>
            <p className="text-stone-400 mb-1">/ 5.0</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="用户体验五维模型 (RQ1 & RQ2)" icon={<BrainCircuit className="text-red-600" size={20}/>}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#44403c', fontSize: 12, fontWeight: 'bold' }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
              <Radar name="平均得分" dataKey="A" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="玩家年龄分布" icon={<Users className="text-red-600" size={20}/>}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {ageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="线下互动意向 (RQ3 & RQ4)" icon={<ShoppingBag className="text-red-600" size={20}/>}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={offlineActivityData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" fill="#b91c1c" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="整体满意度分布" icon={<Star className="text-red-600" size={20}/>}>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={satisfactionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{fill: '#f5f5f4'}} />
              <Bar dataKey="value" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
        <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
            <Heart className="text-red-600" size={20}/> 最新玩家留言
        </h3>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {data.slice().reverse().slice(0, 5).map((d) => (
                <div key={d.id} className="p-4 bg-stone-50 rounded-lg border border-stone-100">
                    <div className="flex justify-between text-xs text-stone-500 mb-2">
                        <span>{d.ageGroup} · {d.identity}</span>
                        <span>{new Date(d.timestamp).toLocaleDateString()}</span>
                    </div>
                    {d.g2_likedPoint && (
                        <p className="text-sm text-stone-700 mb-1"><span className="font-bold text-red-700">喜欢：</span>{d.g2_likedPoint}</p>
                    )}
                    {d.g3_improvementPoint && (
                        <p className="text-sm text-stone-700"><span className="font-bold text-stone-500">建议：</span>{d.g3_improvementPoint}</p>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
