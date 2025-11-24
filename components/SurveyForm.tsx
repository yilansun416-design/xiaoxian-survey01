import React, { useState } from 'react';
import { SURVEY_SECTIONS } from '../constants';
import { SurveyData } from '../types';
import { Send, CheckCircle2 } from 'lucide-react';

interface SurveyFormProps {
  onSubmit: (data: SurveyData) => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<SurveyData>>({
    f4_offlineActivities: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id: keyof SurveyData, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id: keyof SurveyData, value: string, checked: boolean) => {
    const currentList = (formData[id] as string[]) || [];
    if (checked) {
      handleChange(id, [...currentList, value]);
    } else {
      handleChange(id, currentList.filter((item) => item !== value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation could go here
    const finalData = {
      ...formData,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    } as SurveyData;
    
    onSubmit(finalData);
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-fade-in">
        <div className="bg-green-100 p-6 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-stone-800 mb-4">感谢您的参与！</h2>
        <p className="text-stone-600 max-w-md mx-auto text-lg">
          您的反馈对《啸仙丹心》的优化至关重要。我们将认真阅读您的建议，致力于打造更好的红色沉浸体验。
        </p>
        <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-6 py-2 text-stone-500 hover:text-red-700 underline"
        >
            填写新问卷
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-10 pb-20">
      {/* Introduction Card */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 text-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4 tracking-tight">《啸仙丹心》体验调研</h1>
        <p className="opacity-90 leading-relaxed text-lg">
          感谢体验《啸仙丹心》红色推理游戏！本问卷约需 3–5 分钟，主要用于改进游戏和线下展馆体验，所有数据仅用于学术研究，匿名填写。
        </p>
      </div>

      {SURVEY_SECTIONS.map((section) => (
        <div key={section.id} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-stone-100">
          <div className="border-b border-stone-100 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700 text-sm font-bold">
                {section.id}
              </span>
              {section.title}
            </h2>
            {section.description && (
              <p className="text-stone-500 mt-2 text-sm">{section.description}</p>
            )}
          </div>

          <div className="space-y-8">
            {section.questions.map((q) => (
              <div key={q.id} className="space-y-3">
                <label className="block text-lg font-medium text-stone-700">
                  {q.text}
                </label>

                {/* Scale 1-5 */}
                {q.type === 'scale' && (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2">
                     <div className="flex justify-between w-full bg-stone-50 p-2 rounded-lg">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <label key={val} className="flex flex-col items-center cursor-pointer group flex-1">
                          <input
                            type="radio"
                            name={q.id as string}
                            required
                            value={val}
                            checked={formData[q.id] === val}
                            onChange={() => handleChange(q.id, val)}
                            className="peer sr-only"
                          />
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-stone-200 peer-checked:border-red-600 peer-checked:bg-red-600 peer-checked:text-white flex items-center justify-center font-bold text-stone-400 transition-all group-hover:border-red-300">
                            {val}
                          </div>
                          <span className="text-xs mt-2 text-stone-400 font-medium hidden sm:block">
                            {val === 1 ? '非常不同意' : val === 5 ? '非常同意' : ''}
                          </span>
                        </label>
                      ))}
                     </div>
                     <div className="flex justify-between sm:hidden text-xs text-stone-400 px-2">
                        <span>非常不同意</span>
                        <span>非常同意</span>
                     </div>
                  </div>
                )}

                {/* Radio Options */}
                {q.type === 'radio' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options?.map((opt) => (
                      <label
                        key={opt.value}
                        className={`
                          flex items-center p-4 border rounded-lg cursor-pointer transition-all
                          ${formData[q.id] === opt.value 
                            ? 'border-red-600 bg-red-50 text-red-800' 
                            : 'border-stone-200 hover:border-red-200 hover:bg-stone-50'}
                        `}
                      >
                        <input
                          type="radio"
                          name={q.id as string}
                          value={opt.value}
                          required
                          checked={formData[q.id] === opt.value}
                          onChange={() => handleChange(q.id, opt.value)}
                          className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 accent-red-600"
                        />
                        <span className="ml-3 font-medium">{opt.label}</span>
                      </label>
                    ))}
                    {q.allowOther && (
                      <div className="flex items-center p-3 border rounded-lg border-stone-200 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500">
                         <span className="text-stone-700 mr-2 whitespace-nowrap">其他:</span>
                         <input 
                            type="text" 
                            className="w-full outline-none bg-transparent text-stone-800 placeholder-stone-400"
                            placeholder="请输入..."
                            onChange={(e) => {
                                handleChange(q.id, 'Other');
                                handleChange((q.id + 'Other') as keyof SurveyData, e.target.value);
                            }}
                            onFocus={() => handleChange(q.id, 'Other')}
                         />
                      </div>
                    )}
                  </div>
                )}

                {/* Checkbox */}
                {q.type === 'checkbox' && (
                  <div className="grid grid-cols-1 gap-3">
                    {q.options?.map((opt) => (
                      <label key={opt.value} className="flex items-center p-3 hover:bg-stone-50 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          value={opt.value}
                          checked={(formData[q.id] as string[])?.includes(String(opt.value))}
                          onChange={(e) => handleCheckboxChange(q.id, String(opt.value), e.target.checked)}
                          className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500 accent-red-600"
                        />
                        <span className="ml-3 text-stone-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Text Area */}
                {q.type === 'textarea' && (
                  <textarea
                    rows={4}
                    className="w-full p-4 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none bg-stone-50 focus:bg-white transition-all"
                    placeholder="请输入您的想法..."
                    value={(formData[q.id] as string) || ''}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-center pt-8">
        <button
          type="submit"
          className="bg-stone-900 hover:bg-red-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg shadow-red-900/20 transform hover:-translate-y-1 transition-all flex items-center gap-3"
        >
          提交问卷 <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default SurveyForm;
