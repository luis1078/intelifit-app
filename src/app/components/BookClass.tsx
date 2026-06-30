import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Globe, Check, ChevronDown, Calendar, X, Users } from 'lucide-react';
import { translations, Language } from '../translations';
import BottomNav from './BottomNav';

interface BookClassProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
  initialTab?: 'reservar' | 'misReservas';
}

type FilterType = 'box' | 'pilates' | 'aerobics';
type SortType = 'mostPopular' | 'leastPopular' | 'earliest' | 'latest';

const DAY_NAMES_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const DAY_NAMES_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_NUMS = [25, 26, 27, 28, 29, 30, 31];

// Per-day schedule
const scheduleByDay: Record<number, {
  id: number; time: string; timeMin: number; type: string;
  filter: FilterType; spots: number; difficulty: string; booked: number;
}[]> = {
  0: [
    { id: 1, time: '6:00 AM', timeMin: 360, type: 'boxTraining', filter: 'box', spots: 3, difficulty: 'high', booked: 12 },
    { id: 2, time: '8:00 AM', timeMin: 480, type: 'pilates', filter: 'pilates', spots: 5, difficulty: 'medium', booked: 10 },
    { id: 3, time: '6:00 PM', timeMin: 1080, type: 'aerobics', filter: 'aerobics', spots: 4, difficulty: 'low', booked: 8 },
  ],
  1: [
    { id: 4, time: '7:00 AM', timeMin: 420, type: 'pilates', filter: 'pilates', spots: 6, difficulty: 'medium', booked: 9 },
    { id: 5, time: '5:00 PM', timeMin: 1020, type: 'boxTraining', filter: 'box', spots: 0, difficulty: 'high', booked: 15 },
    { id: 6, time: '7:00 PM', timeMin: 1140, type: 'aerobics', filter: 'aerobics', spots: 2, difficulty: 'low', booked: 13 },
  ],
  2: [
    { id: 7, time: '6:00 AM', timeMin: 360, type: 'boxTraining', filter: 'box', spots: 3, difficulty: 'high', booked: 12 },
    { id: 8, time: '8:00 AM', timeMin: 480, type: 'pilates', filter: 'pilates', spots: 5, difficulty: 'medium', booked: 10 },
    { id: 9, time: '10:00 AM', timeMin: 600, type: 'aerobics', filter: 'aerobics', spots: 2, difficulty: 'low', booked: 8 },
    { id: 10, time: '5:00 PM', timeMin: 1020, type: 'boxTraining', filter: 'box', spots: 4, difficulty: 'high', booked: 11 },
    { id: 11, time: '6:30 PM', timeMin: 1110, type: 'pilates', filter: 'pilates', spots: 6, difficulty: 'medium', booked: 9 },
  ],
  3: [
    { id: 12, time: '7:00 AM', timeMin: 420, type: 'pilates', filter: 'pilates', spots: 0, difficulty: 'medium', booked: 15 },
    { id: 13, time: '9:00 AM', timeMin: 540, type: 'aerobics', filter: 'aerobics', spots: 3, difficulty: 'low', booked: 7 },
  ],
  4: [
    { id: 14, time: '6:00 AM', timeMin: 360, type: 'boxTraining', filter: 'box', spots: 2, difficulty: 'high', booked: 13 },
    { id: 15, time: '8:00 AM', timeMin: 480, type: 'pilates', filter: 'pilates', spots: 4, difficulty: 'medium', booked: 11 },
    { id: 16, time: '6:00 PM', timeMin: 1080, type: 'boxTraining', filter: 'box', spots: 5, difficulty: 'high', booked: 10 },
  ],
  5: [
    { id: 17, time: '9:00 AM', timeMin: 540, type: 'aerobics', filter: 'aerobics', spots: 6, difficulty: 'low', booked: 6 },
    { id: 18, time: '10:30 AM', timeMin: 630, type: 'pilates', filter: 'pilates', spots: 4, difficulty: 'medium', booked: 8 },
  ],
  6: [], // Sunday — no classes
};

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

function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="absolute bottom-24 left-4 right-4 rounded-xl px-4 py-3 text-center text-[14px] text-white"
      style={{ background: '#1A1A1A', zIndex: 60 }}
    >
      {message}
    </div>
  );
}

export default function BookClass({ language, toggleLanguage, navigate, initialTab = 'reservar' }: BookClassProps) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'reservar' | 'misReservas'>(initialTab);
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedDay, setSelectedDay] = useState(2);
  const [sortBy, setSortBy] = useState<SortType>('mostPopular');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<typeof scheduleByDay[0][0] | null>(null);
    const [confirmTarget, setConfirmTarget] = useState<typeof scheduleByDay[0][0] | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [toast, setToast] = useState('');
  const sortRef = useRef<HTMLDivElement>(null);


  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'box', label: t.box },
    { id: 'pilates', label: t.pilates },
    { id: 'aerobics', label: t.aerobics },
  ];

  const sortOptions: { id: SortType; label: string }[] = [
    { id: 'mostPopular', label: t.sortMostPopular },
    { id: 'leastPopular', label: t.sortLeastPopular },
    { id: 'earliest', label: t.sortEarliest },
    { id: 'latest', label: t.sortLatest },
  ];

  const dayNames = language === 'en' ? DAY_NAMES_EN : DAY_NAMES_ES;
  const dayClasses = scheduleByDay[selectedDay] ?? [];
  const isDayFull = dayClasses.length > 0 && dayClasses.every(c => c.spots === 0);

  const filtered = activeFilter ? dayClasses.filter(c => c.filter === activeFilter) : dayClasses;
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'mostPopular': return b.booked - a.booked;
      case 'leastPopular': return a.booked - b.booked;
      case 'earliest': return a.timeMin - b.timeMin;
      case 'latest': return b.timeMin - a.timeMin;
    }
  });

  const difficultyColor: Record<string, string> = { high: '#C62828', medium: '#F9A825', low: '#2E7D32' };
  const demandLabel: Record<string, string> = { high: t.demandHigh, medium: t.demandMedium, low: t.demandLow };

  const confirmCancel = () => {
    if (!cancelTarget) return;
    setBookings(prev => prev.filter(b => b.id !== cancelTarget.id));
    setCancelTarget(null);
    showToast(t.bookingCancelled);
  };

  const confirmBooking = () => {
    if (!confirmTarget) return;
    const newBooking: Booking = {
      id: Date.now(), // simple unique id for in-memory bookings (no backend yet)
      className: t[confirmTarget.type as keyof typeof t] as string,
      date: `${dayNames[selectedDay]} ${DAY_NUMS[selectedDay]}`,
      time: confirmTarget.time,
      instructor: 'Steffany Solano',
      modality: 'Presencial',
    };
    setBookings(prev => [...prev, newBooking]);
    setSelectedClass(confirmTarget);
    setConfirmTarget(null);
    setShowModal(true);
  };
  
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('dashboard')}>
            <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
          </button>
          <h1 className="text-[22px] font-semibold flex-1" style={{ color: '#1A1A1A' }}>
            {activeTab === 'reservar' ? t.bookClass : t.myBookings}
          </h1>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg"
            style={{ border: '1px solid #C4C4C4' }}
          >
            <Globe className="w-4 h-4" style={{ color: '#767676' }} />
            <span className="text-sm font-medium" style={{ color: '#3D3D3D' }}>{language === 'en' ? 'EN' : 'ES'}</span>
          </button>
        </div>

        {/* Segmented Control */}
        <div
          className="flex mt-3 rounded-xl overflow-hidden"
          style={{ border: '0.5px solid #C4C4C4' }}
        >
          {(['reservar', 'misReservas'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 text-[14px] font-medium"
              style={{
                background: activeTab === tab ? '#1A6B4A' : '#FFFFFF',
                color: activeTab === tab ? '#FFFFFF' : '#767676',
              }}
            >
              {tab === 'reservar' ? (language === 'es' ? 'Reservar' : 'Book') : t.myBookings}
            </button>
          ))}
        </div>
      </div>

      {/* ──────── RESERVAR TAB ──────── */}
      {activeTab === 'reservar' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-[88px]">
          {/* Filter Pills */}
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(activeFilter === f.id ? null : f.id)}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: activeFilter === f.id ? '#1A6B4A' : '#FFFFFF',
                  color: activeFilter === f.id ? '#FFFFFF' : '#767676',
                  border: activeFilter === f.id ? 'none' : '0.5px solid #C4C4C4',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Weekly Calendar */}
          <div className="bg-white rounded-2xl p-3" style={{ border: '0.5px solid #C4C4C4' }}>
            <div className="flex justify-between">
              {dayNames.map((day, i) => {
                const classes = scheduleByDay[i] ?? [];
                const full = classes.length > 0 && classes.every(c => c.spots === 0);
                const empty = classes.length === 0;
                const isActive = selectedDay === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDay(i)}
                    className="flex flex-col items-center py-2 px-1.5 rounded-xl"
                    style={{ background: isActive ? '#1A6B4A' : 'transparent' }}
                  >
                    <span className="text-[10px]" style={{ color: isActive ? '#FFFFFF' : '#767676' }}>{day}</span>
                    <span
                      className="text-[13px] font-medium"
                      style={{ color: isActive ? '#FFFFFF' : (full || empty) ? '#767676' : '#1A1A1A' }}
                    >
                      {DAY_NUMS[i]}
                    </span>
                    {full && !isActive && (
                      <span className="text-[8px] font-medium" style={{ color: '#C62828' }}>{t.fullDay}</span>
                    )}
                    {empty && !isActive && (
                      <span className="text-[8px]" style={{ color: '#C4C4C4' }}>—</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Control */}
          <div className="flex justify-end" ref={sortRef}>
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-[13px]"
                style={{ border: '1px solid #C4C4C4', color: '#3D3D3D', background: '#FFFFFF' }}
              >
                <span>{sortOptions.find(o => o.id === sortBy)?.label}</span>
                <ChevronDown className="w-4 h-4" style={{ color: '#767676' }} />
              </button>
              {showSortDropdown && (
                <div
                  className="absolute right-0 top-full mt-1 bg-white rounded-xl overflow-hidden z-20 w-44"
                  style={{ border: '0.5px solid #C4C4C4', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                >
                  {sortOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => { setSortBy(opt.id); setShowSortDropdown(false); }}
                      className="w-full text-left px-4 py-3 flex items-center justify-between text-[13px]"
                      style={{ color: sortBy === opt.id ? '#1A6B4A' : '#1A1A1A', background: sortBy === opt.id ? '#E8F5EE' : '#FFFFFF' }}
                    >
                      {opt.label}
                      {sortBy === opt.id && <Check className="w-4 h-4" style={{ color: '#1A6B4A' }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Class Cards or Empty State */}
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <Calendar className="w-10 h-10" style={{ color: '#C4C4C4' }} />
              <p className="text-[15px] font-medium" style={{ color: '#767676' }}>
                {language === 'es' ? 'No hay clases programadas este día' : 'No classes scheduled today'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sorted.map(classItem => {
                const isFull = classItem.spots === 0;
                return (
                  <div key={classItem.id} className="bg-white rounded-2xl p-4" style={{ border: '0.5px solid #C4C4C4' }}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[15px] font-medium mb-0.5" style={{ color: '#1A1A1A' }}>
                          {t[classItem.type as keyof typeof t] as string}
                        </p>
                        <p className="text-[13px]" style={{ color: '#767676' }}>{classItem.time}</p>
                      </div>
                      {isFull ? (
                        <button
                          onClick={() => showToast(language === 'es' ? 'Esta clase está completa' : 'This class is full')}
                          className="px-4 rounded-xl text-[13px] font-medium flex items-center"
                          style={{ background: '#C4C4C4', color: '#767676', height: 36 }}
                        >
                          {t.noSpots}
                        </button>
                      ) : (
                        <button
                          onClick={() => setConfirmTarget(classItem)}
                          className="text-white px-5 rounded-xl text-[13px] font-medium flex items-center"
                          style={{ background: '#1A6B4A', height: 36 }}
                        >
                          {t.book}
                        </button>
                      )}
                    </div>
                    <div className="flex gap-3 items-center">
                      {isFull ? (
                        <span className="text-[12px] font-medium" style={{ color: '#C62828' }}>{t.noSpotsAvailable}</span>
                      ) : (
                        <span className="text-[12px]" style={{ color: '#767676' }}>{classItem.spots} {t.spotsLeft}</span>
                      )}
                      <span className="text-[12px] font-medium" style={{ color: difficultyColor[classItem.difficulty] }}>
                        {demandLabel[classItem.difficulty]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ──────── MIS RESERVAS TAB ──────── */}
      {activeTab === 'misReservas' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-[88px]">
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#E8F5EE' }}>
                <Calendar className="w-8 h-8" style={{ color: '#1A6B4A' }} />
              </div>
              <div>
                <p className="text-[16px] font-semibold mb-1" style={{ color: '#1A1A1A' }}>{t.noBookings}</p>
                <p className="text-[14px]" style={{ color: '#767676' }}>{t.noBookingsMsg}</p>
              </div>
              <button
                onClick={() => setActiveTab('reservar')}
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
                    <p className="text-[15px] font-semibold mb-0.5" style={{ color: '#1A1A1A' }}>{booking.className}</p>
                    <p className="text-[13px] mb-0.5" style={{ color: '#767676' }}>{booking.date} · {booking.time}</p>
                    <p className="text-[13px]" style={{ color: '#767676' }}>{t.instructor}: {booking.instructor}</p>
                  </div>
                  <button onClick={() => setCancelTarget(booking)} className="p-2 flex-shrink-0">
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
      )}

      <BottomNav language={language} currentScreen="bookClass" navigate={navigate} />

      {/* Pre-booking Confirmation Modal — "Are you sure?" */}
        {confirmTarget && (
          <div
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}
            onClick={e => { if (e.target === e.currentTarget) setConfirmTarget(null); }}
          >
            <div className="bg-white rounded-3xl p-6 w-full max-w-[340px]">
              <h2 className="text-[18px] font-semibold mb-2" style={{ color: '#1A1A1A' }}>
                {t.confirmBookingTitle}
              </h2>
              <div className="rounded-xl p-3 mb-4" style={{ background: '#F5F5F5' }}>
                <p className="text-[15px] font-medium mb-0.5" style={{ color: '#1A1A1A' }}>
                  {t[confirmTarget.type as keyof typeof t] as string}
                </p>
                <p className="text-[13px]" style={{ color: '#767676' }}>
                  {DAY_NAMES_ES[selectedDay]} {DAY_NUMS[selectedDay]} · {confirmTarget.time}
                </p>
              </div>
              <p className="text-[14px] mb-6" style={{ color: '#767676', lineHeight: 1.6 }}>
                {t.confirmBookingMsg}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmTarget(null)}
                  className="flex-1 rounded-xl text-[14px] font-medium"
                  style={{ height: 48, border: '1.5px solid #C4C4C4', color: '#3D3D3D' }}
                >
                  {t.cancel}
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 text-white rounded-xl text-[14px] font-medium"
                  style={{ height: 48, background: '#1A6B4A' }}
                >
                  {t.yesBook}
                </button>
              </div>
            </div>
          </div>
        )}
      {/* Booking Confirmation Modal */}
      {showModal && selectedClass && (
        <div
          className="absolute inset-0 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.50)', zIndex: 50 }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white w-full max-w-[340px] rounded-3xl p-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#E8F5EE' }}>
              <Check className="w-8 h-8" style={{ color: '#1A6B4A', strokeWidth: 2.5 }} />
            </div>
            <h2 className="text-[22px] font-semibold text-center" style={{ color: '#1A1A1A' }}>{t.classBooked}</h2>
            <div className="w-full rounded-xl p-4" style={{ background: '#F5F5F5' }}>
              <p className="text-[16px] font-medium mb-1" style={{ color: '#1A1A1A' }}>
                {t[selectedClass.type as keyof typeof t] as string}
              </p>
              <p className="text-[14px] mb-1" style={{ color: '#767676' }}>
                {DAY_NAMES_ES[selectedDay]} {DAY_NUMS[selectedDay]} · {selectedClass.time}
              </p>
              <p className="text-[14px]" style={{ color: '#767676' }}>{t.instructor}: Steffany Solano</p>
            </div>
            <p className="text-[13px] text-center" style={{ color: '#767676' }}>{t.notifyMsg}</p>
            <button
              onClick={() => { setShowModal(false); setActiveTab('misReservas'); }}
              className="w-full text-white rounded-xl flex items-center justify-center"
              style={{ background: '#1A6B4A', height: 52 }}
            >
              <span className="text-[15px] font-medium">{t.viewMyBookings}</span>
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="text-[14px] font-medium"
              style={{ color: '#1A6B4A' }}
            >
              {t.backToStart}
            </button>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelTarget && (
        <div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}
          onClick={e => { if (e.target === e.currentTarget) setCancelTarget(null); }}
        >
          <div className="bg-white rounded-3xl p-6 w-full">
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: '#1A1A1A' }}>{t.cancelConfirmTitle}</h2>
            <p className="text-[14px] mb-6" style={{ color: '#767676', lineHeight: 1.6 }}>
              {t.cancelConfirmMsg.replace('{class}', cancelTarget.className).replace('{date}', cancelTarget.date)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelTarget(null)}
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
