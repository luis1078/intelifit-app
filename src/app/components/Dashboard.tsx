import { useState } from 'react';
import { Globe, TrendingUp, Calendar, Bot, Dumbbell, Users } from 'lucide-react';
import { translations, Language } from '../translations';
import BottomNav from './BottomNav';

interface DashboardProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="absolute bottom-24 left-4 right-4 rounded-xl px-4 py-3 text-center text-[14px] text-white z-50"
      style={{ background: '#1A1A1A' }}>
      {message}
    </div>
  );
}

export default function Dashboard({ language, toggleLanguage, navigate }: DashboardProps) {
  const t = translations[language];
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [classCancelled, setClassCancelled] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    setClassCancelled(true);
    showToast(t.bookingCancelled);
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        {/* Avatar — tap → Mi Perfil */}
        <button onClick={() => navigate('profile')} className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: '#1A6B4A' }}>
            MA
          </div>
          <div className="text-left">
            <p className="text-[13px]" style={{ color: '#767676' }}>{t.goodMorning}</p>
            <p className="text-[15px] font-medium" style={{ color: '#1A1A1A' }}>Maria</p>
          </div>
        </button>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg"
          style={{ border: '1px solid #C4C4C4' }}
        >
          <Globe className="w-4 h-4" style={{ color: '#767676' }} />
          <span className="text-sm font-medium" style={{ color: '#3D3D3D' }}>{language === 'en' ? 'EN' : 'ES'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-[88px]">
        {/* Última evaluación → Mi Progreso */}
        <button
          onClick={() => navigate('progress')}
          className="w-full bg-white rounded-2xl p-4 text-left"
          style={{ border: '0.5px solid #C4C4C4' }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.8px] mb-1" style={{ color: '#767676' }}>{t.lastEvaluation}</p>
          <p className="text-[13px] mb-2" style={{ color: '#767676' }}>15 mayo, 2026</p>
          <p className="text-[22px] font-bold mb-1" style={{ color: '#F0A500' }}>{t.improvementDetail}</p>
          <p className="text-[13px]" style={{ color: '#3D3D3D', lineHeight: 1.5 }}>{t.improvementSummary}</p>
        </button>

        {/* Próxima clase */}
        {classCancelled ? (
          <div className="bg-white rounded-2xl p-4 text-center" style={{ border: '0.5px solid #C4C4C4' }}>
            <p className="text-[11px] font-medium uppercase tracking-[0.8px] mb-3" style={{ color: '#767676' }}>{t.nextClass}</p>
            <p className="text-[14px] mb-3" style={{ color: '#767676' }}>
              {language === 'es' ? 'No tienes clases próximas' : 'No upcoming classes'}
            </p>
            <button
              onClick={() => navigate('bookClass')}
              className="text-white rounded-xl px-5"
              style={{ background: '#1A6B4A', height: 40, fontSize: 13, fontWeight: 500 }}
            >
              {t.bookClass}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4" style={{ border: '0.5px solid #C4C4C4' }}>
            <p className="text-[11px] font-medium uppercase tracking-[0.8px] mb-2" style={{ color: '#767676' }}>{t.nextClass}</p>
            <button onClick={() => navigate('bookClass')} className="w-full text-left">
              <p className="text-[15px] font-medium mb-0.5" style={{ color: '#1A1A1A' }}>{t.boxTraining}</p>
              <p className="text-[13px] mb-0.5" style={{ color: '#767676' }}>{t.tomorrow}, 6:00 PM</p>
              <p className="text-[12px] mb-3" style={{ color: '#767676' }}>{t.withInstructor}</p>
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ background: '#E8F5EE', color: '#1A6B4A' }}>
                  {t.presencial}
                </span>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" style={{ color: '#767676' }} />
                  <p className="text-[12px]" style={{ color: '#767676' }}>
                    {language === 'es' ? '8 personas inscritas' : '8 enrolled'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCancelModal(true)}
                className="text-[12px] font-medium px-3 py-1.5 rounded-lg"
                style={{ color: '#C62828', border: '1px solid #C62828' }}
              >
                {t.cancelClass}
              </button>
            </div>
          </div>
        )}

        {/* Quick Access */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: TrendingUp, label: t.myProgress, screen: 'progress' },
            { icon: Dumbbell, label: t.myRoutines, screen: 'misRutinas' },
            { icon: Calendar, label: t.bookClass, screen: 'bookClass' },
            { icon: Bot, label: t.aiAgent, screen: 'aiChat' },
          ].map(({ icon: Icon, label, screen }) => (
            <button
              key={label}
              onClick={() => navigate(screen)}
              className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2"
              style={{ border: '0.5px solid #C4C4C4' }}
            >
              <Icon className="w-6 h-6" style={{ color: '#1A6B4A' }} />
              <span className="text-[13px]" style={{ color: '#1A1A1A' }}>{label}</span>
            </button>
          ))}
        </div>

        {/* AI Coach — tap → AI Chat */}
        <button
          onClick={() => navigate('aiChat')}
          className="w-full rounded-2xl p-4 text-left"
          style={{ background: '#E8F5EE', border: '0.5px solid #C4C4C4' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0" style={{ background: '#1A6B4A' }}>
              SA
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold mb-1" style={{ color: '#0D3D2A' }}>Steffany AI</p>
              <p className="text-[13px]" style={{ color: '#3D3D3D', lineHeight: 1.6 }}>{t.aiMessage}</p>
            </div>
          </div>
        </button>
      </div>

      <BottomNav language={language} currentScreen="dashboard" navigate={navigate} />

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}
          onClick={e => { if (e.target === e.currentTarget) setShowCancelModal(false); }}
        >
          <div className="bg-white rounded-3xl p-6 w-full">
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: '#1A1A1A' }}>{t.cancelConfirmTitle}</h2>
            <p className="text-[14px] mb-6" style={{ color: '#767676', lineHeight: 1.6 }}>
              {t.cancelConfirmMsg
                .replace('{class}', language === 'es' ? 'Entrenamiento Box' : 'Box Training')
                .replace('{date}', language === 'es' ? 'mañana' : 'tomorrow')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 rounded-xl text-[14px] font-medium"
                style={{ height: 48, border: '1.5px solid #1A6B4A', color: '#1A6B4A' }}
              >
                {t.keepBooking}
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 text-white rounded-xl text-[14px] font-medium"
                style={{ height: 48, background: '#C62828' }}
              >
                {t.yesCancel}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast} visible={!!toast} />
    </div>
  );
}
