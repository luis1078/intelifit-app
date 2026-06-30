import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Language } from '../translations';

interface NotificacionesProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

const items = {
  es: [
    { id: 'clases', label: 'Recordatorios de clases', desc: 'Recibe un aviso 30 min antes de tu clase' },
    { id: 'progreso', label: 'Resumen semanal de progreso', desc: 'Un resumen cada domingo' },
    { id: 'agente', label: 'Mensajes del Agente IA', desc: 'Notificaciones cuando Steffany AI tenga una recomendación' },
    { id: 'promo', label: 'Promociones y novedades', desc: 'Ofertas y noticias de Steffany Solano' },
  ],
  en: [
    { id: 'clases', label: 'Class reminders', desc: 'Receive a notice 30 min before your class' },
    { id: 'progreso', label: 'Weekly progress summary', desc: 'A summary every Sunday' },
    { id: 'agente', label: 'AI Agent messages', desc: 'Notifications when Steffany AI has a recommendation' },
    { id: 'promo', label: 'Promotions & news', desc: 'Offers and news from Steffany Solano' },
  ],
};

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex-shrink-0 rounded-full transition-colors"
      style={{ width: 44, height: 24, background: on ? '#1A6B4A' : '#C4C4C4', position: 'relative' }}
    >
      <div
        className="absolute top-0.5 rounded-full bg-white transition-all"
        style={{ width: 20, height: 20, left: on ? 22 : 2 }}
      />
    </button>
  );
}

export default function Notificaciones({ language, navigate }: NotificacionesProps) {
  const list = items[language] ?? items.es;
  const [states, setStates] = useState<Record<string, boolean>>({
    clases: true, progreso: true, agente: true, promo: false,
  });

  const toggle = (id: string) => setStates(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <button onClick={() => navigate('profile')}>
          <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
        </button>
        <h1 className="text-[22px] font-semibold flex-1" style={{ color: '#1A1A1A' }}>
          {language === 'es' ? 'Notificaciones' : 'Notifications'}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '0.5px solid #C4C4C4' }}>
          {list.map(({ id, label, desc }, i) => (
            <div
              key={id}
              className="flex items-center gap-4 px-4 py-4"
              style={{ borderBottom: i < list.length - 1 ? '0.5px solid #C4C4C4' : 'none' }}
            >
              <div className="flex-1">
                <p className="text-[15px] font-medium mb-0.5" style={{ color: '#1A1A1A' }}>{label}</p>
                <p className="text-[12px]" style={{ color: '#767676', lineHeight: 1.5 }}>{desc}</p>
              </div>
              <Toggle on={states[id]} onToggle={() => toggle(id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
