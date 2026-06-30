import { Home, TrendingUp, Calendar, Bot, User } from 'lucide-react';
import { translations, Language } from '../translations';

interface BottomNavProps {
  language: Language;
  currentScreen: string;
  navigate: (screen: string) => void;
}

export default function BottomNav({ language, currentScreen, navigate }: BottomNavProps) {
  const t = translations[language];

  const tabs = [
    { id: 'dashboard', icon: Home, label: t.home },
    { id: 'progress', icon: TrendingUp, label: t.progress },
    { id: 'bookClass', icon: Calendar, label: t.bookings },
    { id: 'aiChat', icon: Bot, label: t.agent },
    { id: 'profile', icon: User, label: t.profile },
  ];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 bg-white flex justify-around items-center px-2"
      style={{ height: 80, borderTop: '0.5px solid #C4C4C4' }}
    >
      {tabs.map(({ id, icon: Icon, label }) => {
        const active = currentScreen === id;
        return (
          <button
            key={id}
            onClick={() => navigate(id)}
            className="flex flex-col items-center gap-1 flex-1 py-2"
          >
            <Icon
              className="w-6 h-6"
              style={{ color: active ? '#1A6B4A' : '#767676' }}
            />
            <span
              className="text-[10px]"
              style={{ color: active ? '#1A6B4A' : '#767676' }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
