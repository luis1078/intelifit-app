import { AlertCircle, Loader2 } from 'lucide-react';
import { Language, translations } from '../translations';
import { RequestStatus } from '../hooks/useNetworkAction';

interface ErrorRetryProps {
  status: RequestStatus;
  language: Language;
  onRetry: () => void;
  // Optional override if a screen needs a more specific error message
  // than the generic "couldn't connect" text.
  message?: string;
}

// Shows nothing when idle/success. Shows a spinner row while loading.
// Shows a red alert box with a "Retry" button on error.
// Drop this directly below the button that triggers the network action.
export default function ErrorRetry({ status, language, onRetry, message }: ErrorRetryProps) {
  const t = translations[language];

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center gap-2 py-2">
        <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#767676' }} />
        <span className="text-[13px]" style={{ color: '#767676' }}>{t.loadingText}</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        className="rounded-xl p-3 flex items-start gap-3"
        style={{ background: '#FDECEC', border: '1px solid #F5C6C6' }}
        role="alert"
      >
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C62828' }} />
        <div className="flex-1">
          <p className="text-[13px] mb-2" style={{ color: '#9B1C1C', lineHeight: 1.5 }}>
            {message || t.networkErrorMsg}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="text-[13px] font-medium px-3 py-1.5 rounded-lg"
            style={{ background: '#C62828', color: '#FFFFFF' }}
          >
            {t.retryButton}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
