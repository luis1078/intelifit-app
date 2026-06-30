import { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { Language } from '../translations';

interface AyudaSoporteProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

const faqEs = [
  {
    q: '¿Cómo reservo una clase?',
    a: 'Ve a "Reservar Clase" desde el menú principal o el botón de acceso rápido en el dashboard. Selecciona el día y la clase que deseas, luego toca "Reservar". Recibirás una notificación de confirmación.',
  },
  {
    q: '¿Cómo cancelo una reserva?',
    a: 'Ve a "Mis Reservas" desde la sección de Reservar Clase. Toca el ícono X en la reserva que deseas cancelar y confirma la cancelación. Puedes cancelar hasta 2 horas antes de la clase.',
  },
  {
    q: '¿Qué significan las insignias?',
    a: 'Las insignias reconocen tu consistencia y logros en el entrenamiento. Puedes ver el detalle de cada insignia tocándola en la sección Mi Perfil. Las insignias grises aún no han sido conseguidas.',
  },
  {
    q: '¿Cómo interpreto mi reporte de evaluación?',
    a: 'El reporte completo está en Mi Progreso → "Ver reporte completo". Incluye tu antropometría (medidas corporales), posturometría (análisis de postura) y resultados de tests físicos. Los indicadores de flecha muestran cambios vs. tu evaluación anterior.',
  },
  {
    q: '¿Cómo cambio mi método de pago?',
    a: 'Esta función estará disponible próximamente. Por ahora, contacta a soporte para actualizar tu método de pago.',
  },
  {
    q: '¿Con qué frecuencia debo entrenar?',
    a: 'Steffany recomienda al menos 3 sesiones por semana para ver resultados consistentes. Tu Agente IA puede darte una recomendación personalizada basada en tu progreso actual.',
  },
];

const faqEn = [
  {
    q: 'How do I book a class?',
    a: 'Go to "Book Class" from the main menu or the quick access button on the dashboard. Select the day and class you want, then tap "Book". You will receive a confirmation notification.',
  },
  {
    q: 'How do I cancel a booking?',
    a: 'Go to "My Bookings" from the Book Class section. Tap the X icon on the booking you want to cancel and confirm. You can cancel up to 2 hours before the class.',
  },
  {
    q: 'What do the badges mean?',
    a: 'Badges recognize your consistency and training achievements. Tap any badge in My Profile to see its details. Gray badges have not yet been earned.',
  },
  {
    q: 'How do I read my evaluation report?',
    a: 'The full report is in My Progress → "View full report". It includes anthropometry, posture analysis and physical test results. Arrow indicators show changes vs your previous evaluation.',
  },
  {
    q: 'How do I change my payment method?',
    a: 'This feature is coming soon. For now, please contact support to update your payment method.',
  },
  {
    q: 'How often should I train?',
    a: 'Steffany recommends at least 3 sessions per week for consistent results. Your AI Agent can give you a personalized recommendation based on your current progress.',
  },
];

export default function AyudaSoporte({ language, navigate }: AyudaSoporteProps) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [toast, setToast] = useState(false);

  const faq = language === 'en' ? faqEn : faqEs;
  const filtered = faq.filter(item =>
    item.q.toLowerCase().includes(search.toLowerCase()) ||
    item.a.toLowerCase().includes(search.toLowerCase())
  );

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <button onClick={() => navigate('profile')}>
          <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
        </button>
        <h1 className="text-[22px] font-semibold flex-1" style={{ color: '#1A1A1A' }}>
          {language === 'es' ? 'Ayuda y soporte' : 'Help & Support'}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-8">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#767676' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={language === 'es' ? 'Buscar en preguntas frecuentes' : 'Search FAQ'}
            className="w-full pl-10 pr-4 rounded-xl text-[14px]"
            style={{
              height: 48, border: '1px solid #C4C4C4', outline: 'none',
              background: '#FFFFFF', color: '#1A1A1A',
            }}
            onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
            onBlur={e => { e.currentTarget.style.border = '1px solid #C4C4C4'; }}
          />
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '0.5px solid #C4C4C4' }}>
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-[14px]" style={{ color: '#767676' }}>
                {language === 'es' ? 'Sin resultados' : 'No results'}
              </p>
            </div>
          ) : (
            filtered.map((item, i) => (
              <div key={i} style={{ borderBottom: i < filtered.length - 1 ? '0.5px solid #C4C4C4' : 'none' }}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 py-4 text-left"
                >
                  <span className="text-[15px] font-medium flex-1 pr-3" style={{ color: '#1A1A1A' }}>{item.q}</span>
                  {expanded === i
                    ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: '#1A6B4A' }} />
                    : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: '#767676' }} />
                  }
                </button>
                {expanded === i && (
                  <div className="px-4 pb-4">
                    <p className="text-[14px]" style={{ color: '#3D3D3D', lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact card */}
        <div className="bg-white rounded-2xl p-4 text-center" style={{ border: '0.5px solid #C4C4C4' }}>
          <MessageCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#1A6B4A' }} />
          <p className="text-[15px] font-medium mb-1" style={{ color: '#1A1A1A' }}>
            {language === 'es' ? '¿No encontraste lo que buscabas?' : "Didn't find what you were looking for?"}
          </p>
          <p className="text-[13px] mb-4" style={{ color: '#767676' }}>
            {language === 'es' ? 'Nuestro equipo responde en menos de 24 horas.' : 'Our team responds within 24 hours.'}
          </p>
          <button
            onClick={showToast}
            className="text-white rounded-xl px-6"
            style={{ background: '#1A6B4A', height: 44, fontSize: 14, fontWeight: 500 }}
          >
            {language === 'es' ? 'Contactar a soporte' : 'Contact support'}
          </button>
        </div>
      </div>

      {toast && (
        <div className="absolute bottom-6 left-4 right-4 rounded-xl px-4 py-3 text-center text-[14px] text-white z-50"
          style={{ background: '#1A1A1A' }}>
          {language === 'es' ? 'Próximamente disponible' : 'Coming soon'}
        </div>
      )}
    </div>
  );
}
