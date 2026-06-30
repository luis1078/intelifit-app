import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Download, Info, Minus } from 'lucide-react';
import { translations, Language } from '../translations';

interface ReporteCompletoProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="absolute bottom-6 left-4 right-4 rounded-xl px-4 py-3 text-center text-[14px] text-white"
      style={{ background: '#1A1A1A', zIndex: 60 }}
    >
      {message}
    </div>
  );
}

export default function ReporteCompleto({ language, navigate }: ReporteCompletoProps) {
  const t = translations[language];
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const anthro = [
    { label: t.weight, value: '65 kg', prev: '72 kg', trend: 'down' as const },
    { label: t.height, value: '1.65 m', prev: '1.65 m', trend: 'neutral' as const },
    { label: t.bmi, value: '23.9', prev: '26.4', trend: 'down' as const },
    { label: t.bodyFat, value: '18%', prev: '22%', trend: 'down' as const },
    { label: t.muscle, value: '42%', prev: '38%', trend: 'up' as const },
    { label: t.waistCircumference, value: '72 cm', prev: '76 cm', trend: 'down' as const },
    { label: t.hipCircumference, value: '96 cm', prev: '100 cm', trend: 'down' as const },
  ];

  const tests = [
    { label: t.testCardioLabel, value: language === 'es' ? 'Bueno (VO₂ 38.2)' : 'Good (VO₂ 38.2)', score: 75 },
    { label: t.testFlexLabel, value: language === 'es' ? 'Muy bueno (32 cm)' : 'Very good (32 cm)', score: 85 },
    { label: t.testStrengthLabel, value: language === 'es' ? 'Bueno (8 rep / 50%)' : 'Good (8 rep / 50%)', score: 70 },
    { label: t.testCoreLabel, value: language === 'es' ? 'Excelente (90 s)' : 'Excellent (90 s)', score: 90 },
    { label: t.testBalanceLabel, value: language === 'es' ? 'Mejorable (28 s)' : 'Needs work (28 s)', score: 55 },
  ];

  const SectionLabel = ({ title }: { title: string }) => (
    <p className="text-[11px] font-medium uppercase tracking-[0.8px] mb-3" style={{ color: '#767676' }}>{title}</p>
  );

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <div className="flex items-center gap-3 mb-0.5">
          <button onClick={() => navigate('progress')}>
            <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
          </button>
          <h1 className="text-[22px] font-semibold flex-1" style={{ color: '#1A1A1A' }}>{t.fullReport}</h1>
        </div>
        <p className="text-[12px] ml-9" style={{ color: '#767676' }}>{t.lastEvaluation}: 15 mayo, 2026</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-6">
        {/* Info Banner */}
        <div
          className="flex items-start gap-3 rounded-xl p-3"
          style={{ background: '#FEF3D0', border: '0.5px solid #F0A500' }}
        >
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#F0A500' }} />
          <p className="text-[12px]" style={{ color: '#3D3D3D' }}>{t.reportBanner}</p>
        </div>

        {/* General Summary */}
        <div>
          <SectionLabel title={t.generalSummary} />
          <div className="bg-white rounded-2xl p-4" style={{ border: '0.5px solid #C4C4C4' }}>
            <p className="text-[14px]" style={{ color: '#3D3D3D', lineHeight: 1.7 }}>{t.generalSummaryText}</p>
          </div>
        </div>

        {/* Anthropometry */}
        <div>
          <SectionLabel title={t.anthropometry} />
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '0.5px solid #C4C4C4' }}>
            {anthro.map(({ label, value, prev, trend }, i) => (
              <div
                key={label}
                className="flex items-center px-4 py-3 gap-3"
                style={{ borderBottom: i < anthro.length - 1 ? '0.5px solid #C4C4C4' : 'none' }}
              >
                <p className="text-[14px] flex-1" style={{ color: '#1A1A1A' }}>{label}</p>
                <p className="text-[14px] font-semibold" style={{ color: '#1A1A1A' }}>{value}</p>
                <div className="flex items-center gap-1 w-20 justify-end">
                  {trend === 'up' && <TrendingUp className="w-4 h-4" style={{ color: '#2E7D32' }} />}
                  {trend === 'down' && <TrendingDown className="w-4 h-4" style={{ color: '#C62828' }} />}
                  {trend === 'neutral' && <Minus className="w-4 h-4" style={{ color: '#767676' }} />}
                  <span className="text-[11px]" style={{ color: '#767676' }}>vs {prev}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Posturometry */}
        <div>
          <SectionLabel title={t.posturometry} />
          <div className="bg-white rounded-2xl p-4" style={{ border: '0.5px solid #C4C4C4' }}>
            <p className="text-[14px]" style={{ color: '#3D3D3D', lineHeight: 1.7 }}>{t.postureText}</p>
          </div>
        </div>

        {/* Physical Tests */}
        <div>
          <SectionLabel title={t.physicalTests} />
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '0.5px solid #C4C4C4' }}>
            {tests.map(({ label, value, score }, i) => (
              <div
                key={label}
                className="px-4 py-3"
                style={{ borderBottom: i < tests.length - 1 ? '0.5px solid #C4C4C4' : 'none' }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[14px]" style={{ color: '#1A1A1A' }}>{label}</p>
                  <p className="text-[12px]" style={{ color: '#767676' }}>{value}</p>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F5F5F5' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${score}%`,
                      background: score >= 80 ? '#2E7D32' : score >= 60 ? '#F0A500' : '#C62828',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download PDF */}
        <button
          className="w-full rounded-xl flex items-center justify-center gap-2"
          style={{ height: 52, border: '1.5px solid #1A6B4A', color: '#1A6B4A', background: '#FFFFFF' }}
          onClick={() => showToast(t.comingSoon)}
        >
          <Download className="w-5 h-5" />
          <span className="text-[15px] font-medium">{t.downloadPdf}</span>
        </button>
      </div>

      <Toast message={toast} visible={!!toast} />
    </div>
  );
}
