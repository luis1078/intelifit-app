import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { translations, Language } from '../translations';
import { useNetworkAction } from '../hooks/useNetworkAction';
import { validateEmail } from '../utils/validators';
import ErrorRetry from './ErrorRetry';

interface RecuperarContrasenaProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

export default function RecuperarContrasena({ language, navigate }: RecuperarContrasenaProps) {
  const t = translations[language];
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const emailError = touched ? validateEmail(email, language) : '';
  const isValid = validateEmail(email, language) === '';

  const { status, run, retry, reset } = useNetworkAction(
    () => {
      // success is handled by checking status === 'success' below
    },
    { failChance: 0.25 }
  );

  const handleSend = () => {
    setTouched(true);
    if (!isValid) return;
    run();
  };

  const inputStyle: React.CSSProperties = {
    height: 52,
    border: '1px solid #C4C4C4',
    borderRadius: 10,
    background: '#FFFFFF',
    color: '#1A1A1A',
    width: '100%',
    padding: '0 16px',
    fontSize: 15,
    outline: 'none',
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <button onClick={() => navigate('login')}>
          <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
        </button>
        <h1 className="text-[22px] font-semibold" style={{ color: '#1A1A1A' }}>{t.recoverPassword}</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-8">
        {status !== 'success' ? (
          <>
            <p className="text-[15px] mb-8" style={{ color: '#767676', lineHeight: 1.6 }}>
              {t.recoverSubtitle}
            </p>
            <div className="mb-6">
              <label
                className="block mb-1.5"
                style={{ fontSize: 13, fontWeight: 500, color: '#3D3D3D' }}
              >
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                style={{ ...inputStyle, border: emailError ? '1.5px solid #C62828' : inputStyle.border }}
                onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                onBlur={e => {
                  e.currentTarget.style.border = emailError ? '1.5px solid #C62828' : '1px solid #C4C4C4';
                  setTouched(true);
                }}
              />
              {emailError && <p className="text-[12px] mt-1" style={{ color: '#C62828' }}>{emailError}</p>}
            </div>
            <button
              onClick={handleSend}
              disabled={status === 'loading'}
              className="w-full text-white rounded-xl flex items-center justify-center"
              style={{
                background: status === 'loading' ? '#7FA593' : '#1A6B4A',
                height: 52,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              }}
            >
              <span className="text-[15px] font-medium">
                {status === 'loading' ? t.loadingText : t.sendLink}
              </span>
            </button>
            <div className="mt-3">
              <ErrorRetry status={status} language={language} onRetry={retry} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: '#E8F5EE' }}
            >
              <CheckCircle className="w-10 h-10" style={{ color: '#1A6B4A' }} />
            </div>
            <h2 className="text-[22px] font-semibold" style={{ color: '#1A1A1A' }}>{t.checkEmail}</h2>
            <p className="text-[15px]" style={{ color: '#767676', lineHeight: 1.6, maxWidth: 280 }}>
              {t.checkEmailMsg.replace('{email}', email || t.emailPlaceholder)}
            </p>
            <button
              onClick={() => { reset(); navigate('login'); }}
              className="w-full text-white rounded-xl flex items-center justify-center mt-4"
              style={{ background: '#1A6B4A', height: 52 }}
            >
              <span className="text-[15px] font-medium">{t.backToLogin}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
