import { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, Circle, X, Dumbbell } from 'lucide-react';
import { translations, Language } from '../translations';
import BottomNav from './BottomNav';

interface MisRutinasProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

const dayNames = { es: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] };

const routineByDay: Record<number, { name: string; sets: number; reps: number; muscle: string }[]> = {
  0: [
    { name: 'Sentadillas con barra', sets: 4, reps: 12, muscle: 'Piernas' },
    { name: 'Prensa de pierna', sets: 3, reps: 15, muscle: 'Piernas' },
    { name: 'Extensión de cuádriceps', sets: 3, reps: 15, muscle: 'Piernas' },
    { name: 'Curl femoral', sets: 3, reps: 12, muscle: 'Isquiotibiales' },
    { name: 'Pantorrillas en máquina', sets: 4, reps: 20, muscle: 'Pantorrillas' },
  ],
  2: [
    { name: 'Press de banca', sets: 4, reps: 10, muscle: 'Pecho' },
    { name: 'Aperturas con mancuernas', sets: 3, reps: 12, muscle: 'Pecho' },
    { name: 'Press militar', sets: 3, reps: 10, muscle: 'Hombros' },
    { name: 'Elevaciones laterales', sets: 4, reps: 15, muscle: 'Hombros' },
    { name: 'Tríceps en polea', sets: 3, reps: 15, muscle: 'Tríceps' },
  ],
  4: [
    { name: 'Dominadas asistidas', sets: 3, reps: 8, muscle: 'Espalda' },
    { name: 'Remo con mancuerna', sets: 4, reps: 12, muscle: 'Espalda' },
    { name: 'Jalón al pecho', sets: 3, reps: 12, muscle: 'Espalda' },
    { name: 'Curl de bíceps', sets: 3, reps: 15, muscle: 'Bíceps' },
    { name: 'Plancha', sets: 3, reps: 45, muscle: 'Core' },
  ],
};

export default function MisRutinas({ language, navigate }: MisRutinasProps) {
  const t = translations[language];
  const [selectedDay, setSelectedDay] = useState(2);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [videoExercise, setVideoExercise] = useState<{ name: string; muscle: string } | null>(null);

  const names = dayNames[language] ?? dayNames.es;
  const exercises = routineByDay[selectedDay] ?? [];

  const toggleDone = (key: string) => setDone(prev => ({ ...prev, [key]: !prev[key] }));

  const totalDone = exercises.filter((_, i) => done[`${selectedDay}-${i}`]).length;
  const pct = exercises.length > 0 ? (totalDone / exercises.length) * 100 : 0;

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate('dashboard')}>
            <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
          </button>
          <h1 className="text-[22px] font-semibold flex-1" style={{ color: '#1A1A1A' }}>{t.myRoutinesTitle}</h1>
        </div>

        {/* Week Progress */}
        <div className="ml-9 mb-2">
          <p className="text-[12px] mb-1.5" style={{ color: '#767676' }}>
            {t.weekProgress
              .replace('{day}', '3')
              .replace('{totalDays}', '5')
              .replace('{week}', '2')
              .replace('{totalWeeks}', '8')}
          </p>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#C4C4C4' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: '#1A6B4A' }}
            />
          </div>
          <p className="text-[11px] mt-1" style={{ color: '#767676' }}>
            {totalDone} / {exercises.length} {t.completed}
          </p>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="bg-white px-4 pb-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <div className="flex gap-1">
          {names.map((day, i) => {
            const hasRoutine = routineByDay[i] !== undefined;
            const isActive = selectedDay === i;
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className="flex-1 flex flex-col items-center py-2 rounded-xl"
                style={{
                  background: isActive ? '#1A6B4A' : 'transparent',
                  opacity: hasRoutine || isActive ? 1 : 0.4,
                }}
              >
                <span className="text-[10px]" style={{ color: isActive ? '#FFFFFF' : '#767676' }}>{day}</span>
                <span className="text-[13px] font-medium" style={{ color: isActive ? '#FFFFFF' : '#1A1A1A' }}>{i + 1}</span>
                {hasRoutine && !isActive && (
                  <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: '#1A6B4A' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-[88px]">
        {exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-[15px]" style={{ color: '#767676' }}>{t.restDayTitle}</p>
            <p className="text-[13px] mt-1" style={{ color: '#C4C4C4' }}>{t.restDayMsg}</p>
          </div>
        ) : (
          exercises.map((ex, i) => {
            const key = `${selectedDay}-${i}`;
            const isDone = done[key];
            return (
              <div
                key={key}
                className="bg-white rounded-2xl p-4"
                style={{
                  border: isDone ? '1.5px solid #1A6B4A' : '0.5px solid #C4C4C4',
                  opacity: isDone ? 0.75 : 1,
                }}
              >
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleDone(key)} className="flex-shrink-0">
                    {isDone
                      ? <CheckCircle className="w-6 h-6" style={{ color: '#1A6B4A' }} />
                      : <Circle className="w-6 h-6" style={{ color: '#C4C4C4' }} />
                    }
                  </button>
                  <div className="flex-1">
                    <p
                      className="text-[15px] font-medium"
                      style={{ color: '#1A1A1A', textDecoration: isDone ? 'line-through' : 'none' }}
                    >
                      {ex.name}
                    </p>
                    <p className="text-[12px] mt-0.5" style={{ color: '#767676' }}>
                      {ex.sets} {t.sets} × {ex.reps} {t.reps} · {ex.muscle}
                    </p>
                  </div>
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg"
                    style={{ background: '#E8F5EE' }}
                    onClick={() => setVideoExercise({ name: ex.name, muscle: ex.muscle })}
                  >
                    <Play className="w-3 h-3" style={{ color: '#1A6B4A' }} />
                    <span className="text-[11px] font-medium" style={{ color: '#1A6B4A' }}>{t.playVideo}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <BottomNav language={language} currentScreen="dashboard" navigate={navigate} />

      {/* Simulated video preview modal — no real video, just a placeholder player UI */}
      {videoExercise && (
        <div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.6)', zIndex: 50 }}
          onClick={e => { if (e.target === e.currentTarget) setVideoExercise(null); }}
        >
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-[340px]">
            {/* Fake video player area */}
            <div
              className="relative flex items-center justify-center"
              style={{ height: 200, background: '#1A1A1A' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                <Play className="w-7 h-7 text-white" style={{ marginLeft: 2 }} />
              </div>
              <button
                onClick={() => setVideoExercise(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div
                className="absolute bottom-3 left-3 right-3 h-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.25)' }}
              >
                <div className="h-full" style={{ width: '35%', background: '#1A6B4A' }} />
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="w-4 h-4" style={{ color: '#1A6B4A' }} />
                <p className="text-[15px] font-semibold" style={{ color: '#1A1A1A' }}>{videoExercise.name}</p>
              </div>
              <p className="text-[13px] mb-4" style={{ color: '#767676', lineHeight: 1.6 }}>
                {t.videoComingSoonMsg} <strong>{videoExercise.name}</strong> ({videoExercise.muscle}).
              </p>
              <button
                onClick={() => setVideoExercise(null)}
                className="w-full rounded-xl flex items-center justify-center"
                style={{ height: 48, background: '#1A6B4A' }}
              >
                <span className="text-[14px] font-medium text-white">{t.closeVideo}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
