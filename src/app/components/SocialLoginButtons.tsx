import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Language, translations } from '../translations';

interface SocialLoginButtonsProps {
  language: Language;
  // Called once the simulated OAuth flow "succeeds" — wire this to navigate('dashboard')
  onAuthenticated: () => void;
}

type Provider = 'google' | 'apple';

// Minimal inline SVG marks so we don't need extra icon dependencies for
// brand logos that lucide-react doesn't provide.
function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.95v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.71A5.4 5.4 0 0 1 3.68 9c0-.59.1-1.17.29-1.71V4.96H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.04l3.02-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.96l3.02 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#1A1A1A"
        d="M14.94 9.46c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.71-3.19-1.74-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.18-1.54 2.67-.39 6.63 1.1 8.8.73 1.06 1.6 2.25 2.74 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.87.69 1.18-.02 1.93-1.08 2.65-2.15.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.29-.88-2.27-3.53z"
      />
      <path
        fill="#1A1A1A"
        d="M12.86 2.7c.6-.73 1.01-1.74.9-2.7-.87.03-1.94.58-2.56 1.3-.56.64-1.05 1.67-.92 2.65.96.07 1.94-.49 2.58-1.25z"
      />
    </svg>
  );
}

export default function SocialLoginButtons({ language, onAuthenticated }: SocialLoginButtonsProps) {
  const t = translations[language];
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  const handleClick = (provider: Provider) => {
    if (loadingProvider) return; // prevent double clicks
    setLoadingProvider(provider);
    // Simulated OAuth roundtrip — no real backend in this prototype.
    window.setTimeout(() => {
      setLoadingProvider(null);
      onAuthenticated();
    }, 1100);
  };

  const buttonBase: React.CSSProperties = {
    height: 52,
    borderRadius: 12,
    border: '1px solid #C4C4C4',
    background: '#FFFFFF',
    width: '100%',
  };

  return (
    <div>
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1" style={{ height: 1, background: '#E5E5E5' }} />
        <span className="text-[12px]" style={{ color: '#767676' }}>{t.orContinueWith}</span>
        <div className="flex-1" style={{ height: 1, background: '#E5E5E5' }} />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => handleClick('google')}
          disabled={loadingProvider !== null}
          className="flex items-center justify-center gap-3"
          style={{ ...buttonBase, opacity: loadingProvider && loadingProvider !== 'google' ? 0.5 : 1 }}
        >
          {loadingProvider === 'google' ? (
            <Loader2 className="w-[18px] h-[18px] animate-spin" style={{ color: '#767676' }} />
          ) : (
            <GoogleMark />
          )}
          <span className="text-[14px] font-medium" style={{ color: '#1A1A1A' }}>
            {t.continueWithGoogle}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleClick('apple')}
          disabled={loadingProvider !== null}
          className="flex items-center justify-center gap-3"
          style={{ ...buttonBase, opacity: loadingProvider && loadingProvider !== 'apple' ? 0.5 : 1 }}
        >
          {loadingProvider === 'apple' ? (
            <Loader2 className="w-[18px] h-[18px] animate-spin" style={{ color: '#767676' }} />
          ) : (
            <AppleMark />
          )}
          <span className="text-[14px] font-medium" style={{ color: '#1A1A1A' }}>
            {t.continueWithApple}
          </span>
        </button>
      </div>
    </div>
  );
}
