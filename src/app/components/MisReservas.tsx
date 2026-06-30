import { useState } from 'react';
import { ArrowLeft, X, Calendar } from 'lucide-react';
import { translations, Language } from '../translations';
import BottomNav from './BottomNav';

interface MisReservasProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

interface Booking {
  id: number;
  className: string;
  date: string;
  time: string;
  instructor: string;
  modality: string;
}

const initialBookings: Booking[] = [
  { id: 1, className: 'Entrenamiento Box', date: 'Mié 27 mayo', time: '6:00 AM', instructor: 'Steffany Solano', modality: 'Presencial' },
  { id: 2, className: 'Pilates', date: 'Vie 29 mayo', time: '8:00 AM', instructor: 'Steffany Solano', modality: 'Presencial' },
  { id: 3, className: 'Aeróbicos', date: 'Lun 1 junio', time: '10:00 AM', instructor: 'Steffany Solano', modality: 'Online' },
];

export default function MisReservas({ language, navigate }: MisReservasProps) {
  const t = translations[language];
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [toast, setToast] = useState(false);

  const confirmCancel = () => {
    if (!cancelTarget) return;
    setBookings(prev => prev.filter(b => b.id !== cancelTarget.id));
    setCancelTarget(null);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <button onClick={() => navigate('dashboard')}>
          <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
        </button>
        <h1 className="text-[22px] font-semibold flex-1" style={{ color: '#1A1A1A' }}>{t.myBookings}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-[88px]">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: '#E8F5EE' }}
            >
              <Calendar className="w-8 h-8" style={{ color: '#1A6B4A' }} />
            </div>
            <div>
              <p className="text-[16px] font-semibold mb-1" style={{ color: '#1A1A1A' }}>{t.noBookings}</p>
              <p className="text-[14px]" style={{ color: '#767676' }}>{t.noBookingsMsg}</p>
            </div>
            <button
              onClick={() => navigate('bookClass')}
              className="text-white rounded-xl px-6"
              style={{ background: '#1A6B4A', height: 48 }}
            >
              <span className="text-[14px] font-medium">{t.bookAClass}</span>
            </button>
          </div>
        ) : (
          bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-2xl p-4" style={{ border: '0.5px solid #C4C4C4' }}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1">
                  <p className="text-[15px] font-semibold mb-1" style={{ color: '#1A1A1A' }}>{booking.className}</p>
                  <p className="text-[13px] mb-0.5" style={{ color: '#767676' }}>{booking.date} · {booking.time}</p>
                  <p className="text-[13px]" style={{ color: '#767676' }}>{t.instructor}: {booking.instructor}</p>
                </div>
                <button onClick={() => setCancelTarget(booking)} className="p-2">
                  <X className="w-5 h-5" style={{ color: '#C62828' }} />
                </button>
              </div>
              <span
                className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{ background: '#E8F5EE', color: '#1A6B4A' }}
              >
                {booking.modality}
              </span>
            </div>
          ))
        )}
      </div>

      <BottomNav language={language} currentScreen="bookClass" navigate={navigate} />

      {/* Cancel Confirmation Modal */}
      {cancelTarget && (
        <div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}
        >
          <div className="bg-white rounded-3xl p-6 w-full">
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: '#1A1A1A' }}>{t.cancelConfirmTitle}</h2>
            <p className="text-[14px] mb-6" style={{ color: '#767676', lineHeight: 1.6 }}>
              {t.cancelConfirmMsg
                .replace('{class}', cancelTarget.className)
                .replace('{date}', cancelTarget.date)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelTarget(null)}
                className="flex-1 rounded-xl"
                style={{ height: 48, border: '1.5px solid #1A6B4A', color: '#1A6B4A', background: '#FFFFFF', fontSize: 14, fontWeight: 500 }}
              >
                {t.keepBooking}
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 text-white rounded-xl"
                style={{ height: 48, background: '#C62828', fontSize: 14, fontWeight: 500 }}
              >
                {t.yesCancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="absolute bottom-24 left-4 right-4 rounded-xl px-4 py-3 text-center"
          style={{ background: '#1A1A1A', color: '#FFFFFF', fontSize: 14, zIndex: 60 }}
        >
          {t.bookingCancelled}
        </div>
      )}
    </div>
  );
}
