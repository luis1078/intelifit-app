import { useState } from 'react';
import { Globe, ChevronRight, Bell, Shield, HelpCircle, LogOut, Info, X, Camera } from 'lucide-react';
import { translations, Language } from '../translations';
import BottomNav from './BottomNav';

interface ProfileProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

const badges = [
  { emoji: '🔥', name: 'Racha de 4 semanas', earned: true, earnedDate: '12 mayo, 2026', desc: 'Completaste al menos 3 entrenamientos por semana durante 4 semanas seguidas', howToEarn: '' },
  { emoji: '💪', name: '10 clases completadas', earned: true, earnedDate: '3 mayo, 2026', desc: 'Asististe a 10 clases grupales con Steffany Solano', howToEarn: '' },
  { emoji: '⭐', name: 'Primera evaluación', earned: true, earnedDate: '1 abril, 2026', desc: 'Completaste tu primera evaluación física integral', howToEarn: '' },
  { emoji: '🏆', name: 'Meta de peso', earned: false, earnedDate: '', desc: 'Alcanza tu meta de peso establecida en tu plan', howToEarn: 'Alcanza tu peso objetivo registrado en tu evaluación' },
];

const inputStyle: React.CSSProperties = {
  height: 48, border: '1px solid #C4C4C4', borderRadius: 10,
  background: '#FFFFFF', color: '#1A1A1A', width: '100%',
  padding: '0 12px', fontSize: 14, outline: 'none',
};

export default function Profile({ language, toggleLanguage, navigate }: ProfileProps) {
  const t = translations[language];
  const [selectedBadge, setSelectedBadge] = useState<typeof badges[0] | null>(null);
  const [showBadgeInfo, setShowBadgeInfo] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const menuItems = [
    { icon: Bell, label: t.notifications, screen: 'notificaciones' },
    { icon: Shield, label: t.privacyPolicy, screen: 'politicaPrivacidad' },
    { icon: HelpCircle, label: t.helpSupport, screen: 'ayudaSoporte' },
  ];

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <h1 className="text-[22px] font-semibold flex-1" style={{ color: '#1A1A1A' }}>{t.profile}</h1>
        <button onClick={toggleLanguage} className="flex items-center gap-1 px-3 py-1.5 rounded-lg" style={{ border: '1px solid #C4C4C4' }}>
          <Globe className="w-4 h-4" style={{ color: '#767676' }} />
          <span className="text-sm font-medium" style={{ color: '#3D3D3D' }}>{language === 'en' ? 'EN' : 'ES'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-[88px]">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4" style={{ border: '0.5px solid #C4C4C4' }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-semibold" style={{ background: '#1A6B4A' }}>
                MA
              </div>
              <button
                onClick={() => showToast(t.comingSoon)}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: '#1A6B4A', border: '2px solid #FFFFFF' }}
              >
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="space-y-2">
                  <input defaultValue="Maria Alvarez" style={inputStyle}
                    onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                    onBlur={e => { e.currentTarget.style.border = '1px solid #C4C4C4'; }}
                  />
                  <input defaultValue="maria@email.com" style={inputStyle}
                    onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                    onBlur={e => { e.currentTarget.style.border = '1px solid #C4C4C4'; }}
                  />
                </div>
              ) : (
                <>
                  <p className="text-[18px] font-semibold" style={{ color: '#1A1A1A' }}>Maria Alvarez</p>
                  <p className="text-[13px]" style={{ color: '#767676' }}>maria@email.com</p>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button onClick={() => setEditing(false)} className="flex-1 text-white rounded-xl flex items-center justify-center" style={{ height: 40, background: '#1A6B4A' }}>
                  <span className="text-[13px] font-medium">{t.saveProfile}</span>
                </button>
                <button onClick={() => setEditing(false)} className="px-4 rounded-xl text-[13px] font-medium" style={{ height: 40, border: '1px solid #C4C4C4', color: '#767676' }}>
                  {t.cancelEdit}
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="w-full rounded-xl flex items-center justify-center" style={{ height: 40, border: '1.5px solid #1A6B4A', color: '#1A6B4A', background: '#FFFFFF' }}>
                <span className="text-[14px] font-medium">{t.editProfile}</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: t.memberSince, value: 'Jun 2025' },
            { label: t.totalClasses, value: '48' },
            { label: t.achievements, value: '12' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-3 text-center" style={{ border: '0.5px solid #C4C4C4' }}>
              <p className="text-[18px] font-bold mb-1" style={{ color: '#1A1A1A' }}>{value}</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.6px]" style={{ color: '#767676' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl p-4" style={{ border: '0.5px solid #C4C4C4' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.8px]" style={{ color: '#767676' }}>{t.achievements}</p>
            <button onClick={() => setShowBadgeInfo(true)}>
              <Info className="w-4 h-4" style={{ color: '#767676' }} />
            </button>
          </div>
          <div className="flex gap-3">
            {badges.map((badge, i) => (
              <button
                key={i}
                onClick={() => setSelectedBadge(badge)}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{ background: badge.earned ? '#FEF3D0' : '#F5F5F5', filter: badge.earned ? 'none' : 'grayscale(100%)', opacity: badge.earned ? 1 : 0.4 }}
              >
                {badge.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '0.5px solid #C4C4C4' }}>
          {menuItems.map(({ icon: Icon, label, screen }, i) => (
            <button
              key={label}
              onClick={() => navigate(screen)}
              className="w-full flex items-center gap-3 px-4 py-4"
              style={{ borderBottom: i < menuItems.length - 1 ? '0.5px solid #C4C4C4' : 'none' }}
            >
              <Icon className="w-5 h-5" style={{ color: '#767676' }} />
              <span className="text-[15px] flex-1 text-left" style={{ color: '#1A1A1A' }}>{label}</span>
              <ChevronRight className="w-4 h-4" style={{ color: '#C4C4C4' }} />
            </button>
          ))}
        </div>

        {/* Log out */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-4"
          style={{ border: '0.5px solid #C62828', color: '#C62828' }}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[15px] font-medium">{t.logOut}</span>
        </button>
      </div>

      <BottomNav language={language} currentScreen="profile" navigate={navigate} />

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="absolute inset-0 flex items-center justify-center px-6" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }} onClick={e => { if (e.target === e.currentTarget) setSelectedBadge(null); }}>
          <div className="bg-white rounded-3xl p-6 w-full">
            <div className="flex justify-end mb-3">
              <button onClick={() => setSelectedBadge(null)}><X className="w-5 h-5" style={{ color: '#767676' }} /></button>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: selectedBadge.earned ? '#FEF3D0' : '#F5F5F5', filter: selectedBadge.earned ? 'none' : 'grayscale(100%)', opacity: selectedBadge.earned ? 1 : 0.5 }}>
                {selectedBadge.emoji}
              </div>
              <p className="text-[17px] font-semibold" style={{ color: '#1A1A1A' }}>{selectedBadge.name}</p>
              <p className="text-[14px]" style={{ color: '#767676', lineHeight: 1.6 }}>{selectedBadge.desc}</p>
              {selectedBadge.earned ? (
                <p className="text-[13px] font-medium" style={{ color: '#2E7D32' }}>{t.earnedOn} {selectedBadge.earnedDate}</p>
              ) : (
                <div className="rounded-xl p-3 w-full" style={{ background: '#F5F5F5' }}>
                  <p className="text-[12px] font-medium mb-1" style={{ color: '#767676' }}>{t.howToEarn}</p>
                  <p className="text-[13px]" style={{ color: '#1A1A1A' }}>{selectedBadge.howToEarn}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Badge Info Sheet */}
      {showBadgeInfo && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }} onClick={e => { if (e.target === e.currentTarget) setShowBadgeInfo(false); }}>
          <div className="bg-white w-full rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[16px] font-semibold" style={{ color: '#1A1A1A' }}>{t.badgeInfoTitle}</p>
              <button onClick={() => setShowBadgeInfo(false)}><X className="w-5 h-5" style={{ color: '#767676' }} /></button>
            </div>
            <p className="text-[14px]" style={{ color: '#3D3D3D', lineHeight: 1.6 }}>{t.badgeInfoMsg}</p>
            <div className="h-4" />
          </div>
        </div>
      )}

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="absolute inset-0 flex items-center justify-center px-6" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
          <div className="bg-white rounded-3xl p-6 w-full">
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: '#1A1A1A' }}>
              {language === 'es' ? '¿Cerrar sesión?' : 'Sign out?'}
            </h2>
            <p className="text-[14px] mb-6" style={{ color: '#767676', lineHeight: 1.6 }}>
              {language === 'es' ? '¿Seguro que deseas cerrar sesión?' : 'Are you sure you want to sign out?'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 rounded-xl text-[14px] font-medium" style={{ height: 48, border: '1.5px solid #1A6B4A', color: '#1A6B4A' }}>
                {language === 'es' ? 'Cancelar' : 'Cancel'}
              </button>
              <button onClick={() => { setShowLogoutConfirm(false); navigate('landing'); }} className="flex-1 text-white rounded-xl text-[14px] font-medium" style={{ height: 48, background: '#C62828' }}>
                {t.logOut}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="absolute bottom-24 left-4 right-4 rounded-xl px-4 py-3 text-center text-[14px] text-white z-60" style={{ background: '#1A1A1A' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
