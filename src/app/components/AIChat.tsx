import { useState } from 'react';
import { ArrowLeft, Send, Globe } from 'lucide-react';
import { translations, Language } from '../translations';
import BottomNav from './BottomNav';

interface AIChatProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

export default function AIChat({ language, toggleLanguage, navigate }: AIChatProps) {
  const t = translations[language];

  const [messages, setMessages] = useState([
    { type: 'ai', text: t.aiGreeting },
    { type: 'user', text: t.userQuestion },
    { type: 'ai', text: t.aiResponse },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Generic placeholder responses — rotates so repeated demo messages don't
  // look identical. No real AI backend in this prototype.
  const genericResponses = language === 'es'
    ? [
        'Buena pregunta. Basándome en tu progreso reciente, te recomiendo mantener la consistencia que ya tienes — vas muy bien.',
        'Revisé tu historial: tu resistencia mejoró un 12% este mes. Sigue así y ajustaremos tu plan la próxima semana.',
        'Notamos que tu asistencia a clases ha sido constante. Eso es clave para alcanzar tu meta más rápido.',
      ]
    : [
        "Good question. Based on your recent progress, I'd recommend keeping the consistency you already have — you're doing great.",
        'I checked your history: your endurance improved 12% this month. Keep it up and we\'ll adjust your plan next week.',
        'I noticed your class attendance has been consistent. That\'s key to reaching your goal faster.',
      ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInput('');
    setIsTyping(true);

    // Simulate the agent "thinking" for a moment before responding —
    // mirrors a real chat experience without needing a backend.
    window.setTimeout(() => {
      const response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
      setMessages(prev => [...prev, { type: 'ai', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <button onClick={() => navigate('dashboard')}>
          <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
        </button>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
          style={{ background: '#1A6B4A' }}
        >
          SA
        </div>
        <div className="flex-1">
          <p className="text-[15px] font-medium" style={{ color: '#1A1A1A' }}>Steffany AI</p>
          <p className="text-[12px]" style={{ color: '#2E7D32' }}>{t.online}</p>
        </div>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg"
          style={{ border: '1px solid #C4C4C4' }}
        >
          <Globe className="w-4 h-4" style={{ color: '#767676' }} />
          <span className="text-sm font-medium" style={{ color: '#3D3D3D' }}>{language === 'en' ? 'EN' : 'ES'}</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-[88px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[80%] rounded-2xl px-4 py-3"
              style={{
                background: msg.type === 'user' ? '#1A6B4A' : '#FFFFFF',
                color: msg.type === 'user' ? '#FFFFFF' : '#1A1A1A',
                border: msg.type === 'ai' ? '0.5px solid #C4C4C4' : 'none',
              }}
            >
              <p className="text-[15px]" style={{ lineHeight: 1.6 }}>{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Typing Indicator — only shown while the AI is "thinking" */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3" style={{ border: '0.5px solid #C4C4C4' }}>
              <div className="flex gap-1 items-center h-4">
                {[0, 100, 200].map(delay => (
                  <div
                    key={delay}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ background: '#C4C4C4', animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[t.howAmIDoing, t.whatShouldIDo, t.myNextClass].map(chip => (
            <button
              key={chip}
              onClick={() => sendMessage(chip)}
              className="px-4 py-2 rounded-full text-[13px] whitespace-nowrap"
              style={{ background: '#FFFFFF', border: '0.5px solid #C4C4C4', color: '#3D3D3D' }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white px-4 py-3 flex-shrink-0" style={{ borderTop: '0.5px solid #C4C4C4' }}>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder={t.typeMessage}
            className="flex-1 px-4 rounded-full text-[15px]"
            style={{
              height: 46,
              border: '1px solid #C4C4C4',
              outline: 'none',
              color: '#1A1A1A',
              background: '#F5F5F5',
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            className="rounded-full flex items-center justify-center flex-shrink-0"
            style={{ width: 46, height: 46, background: '#1A6B4A' }}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <BottomNav language={language} currentScreen="aiChat" navigate={navigate} />
    </div>
  );
}
