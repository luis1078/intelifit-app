import { useState } from 'react';
import { ArrowLeft, Globe } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
} from 'recharts';
import { translations, Language } from '../translations';
import BottomNav from './BottomNav';

const data1M = [
  { month: 'May', weight: 65, volume: 58 },
];
const data3M = [
  { month: 'Mar', weight: 68, volume: 61 },
  { month: 'Abr', weight: 67, volume: 60 },
  { month: 'May', weight: 65, volume: 58 },
];
const data6M = [
  { month: 'Ene', weight: 72, volume: 65 },
  { month: 'Feb', weight: 70, volume: 63 },
  { month: 'Mar', weight: 68, volume: 61 },
  { month: 'Abr', weight: 67, volume: 60 },
  { month: 'May', weight: 65, volume: 58 },
  { month: 'Jun', weight: 64, volume: 57 },
];

interface ProgressProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl px-3 py-2 shadow-md" style={{ background: '#1A1A1A', color: '#FFFFFF' }}>
        <p className="text-[11px] font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="text-[11px]">
            {p.name}: <span className="font-semibold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Progress({ language, toggleLanguage, navigate }: ProgressProps) {
  const t = translations[language];
  const [period, setPeriod] = useState<'1M' | '3M' | '6M'>('3M');

  const chartData = period === '1M' ? data1M : period === '3M' ? data3M : data6M;

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate('dashboard')}>
            <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
          </button>
          <h1 className="text-[22px] font-semibold flex-1" style={{ color: '#1A1A1A' }}>{t.myProgress}</h1>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg"
            style={{ border: '1px solid #C4C4C4' }}
          >
            <Globe className="w-4 h-4" style={{ color: '#767676' }} />
            <span className="text-sm font-medium" style={{ color: '#3D3D3D' }}>{language === 'en' ? 'EN' : 'ES'}</span>
          </button>
        </div>
        <p className="text-[12px] ml-9" style={{ color: '#767676' }}>{t.lastEvaluation}: 15 mayo, 2026</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-[88px]">
        {/* Period Selector */}
        <div className="flex gap-2 justify-center">
          {(['1M', '3M', '6M'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-6 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                background: period === p ? '#1A6B4A' : '#FFFFFF',
                color: period === p ? '#FFFFFF' : '#767676',
                border: period === p ? 'none' : '0.5px solid #C4C4C4',
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-4" style={{ border: '0.5px solid #C4C4C4' }}>
          <p className="text-[13px] font-medium mb-4" style={{ color: '#1A1A1A' }}>{t.weightBodyVolume}</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#767676' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#767676' }} axisLine={false} tickLine={false} unit=" kg" width={40} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone" dataKey="weight" name={t.weightKg}
                stroke="#1A6B4A" strokeWidth={2}
                dot={{ fill: '#1A6B4A', r: 4 }} activeDot={{ r: 6 }}
              />
              <Line
                type="monotone" dataKey="volume" name={t.bodyVolume}
                stroke="#F0A500" strokeWidth={2}
                dot={{ fill: '#F0A500', r: 4 }} activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#1A6B4A' }} />
              <span className="text-[12px]" style={{ color: '#767676' }}>{t.weightKg}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#F0A500' }} />
              <span className="text-[12px]" style={{ color: '#767676' }}>{t.bodyVolume}</span>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: t.bmi, value: '21.5' },
            { label: t.bodyFat, value: '18%' },
            { label: t.muscle, value: '42%' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-3" style={{ border: '0.5px solid #C4C4C4' }}>
              <p className="text-[11px] font-medium uppercase tracking-[0.8px] mb-2" style={{ color: '#767676' }}>{label}</p>
              <p className="text-[22px] font-semibold" style={{ color: '#1A1A1A' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* AI Summary */}
        <div className="rounded-2xl p-4" style={{ background: '#E8F5EE', border: '0.5px solid #C4C4C4' }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.8px] mb-2" style={{ color: '#0D3D2A' }}>{t.aiSummary}</p>
          <p className="text-[13px]" style={{ color: '#3D3D3D', lineHeight: 1.6 }}>{t.aiSummaryText}</p>
        </div>

        {/* CTA — navigate to ReporteCompleto */}
        <button
          onClick={() => navigate('reporteCompleto')}
          className="w-full text-white rounded-xl flex items-center justify-center"
          style={{ background: '#1A6B4A', height: 52 }}
        >
          <span className="text-[15px] font-medium">{t.viewFullReport}</span>
        </button>
      </div>

      <BottomNav language={language} currentScreen="progress" navigate={navigate} />
    </div>
  );
}
