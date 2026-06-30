import { Check } from 'lucide-react';
import { translations, Language } from '../translations';

interface PaymentSuccessProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

export default function PaymentSuccess({ language, navigate }: PaymentSuccessProps) {
  const t = translations[language];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* Success Icon */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{ background: '#E8F5EE' }}
      >
        <Check className="w-12 h-12" style={{ color: '#1A6B4A', strokeWidth: 2.5 }} />
      </div>

      <h1 className="text-[26px] font-semibold mb-3" style={{ color: '#1A1A1A' }}>{t.welcomeName}</h1>
      <p
        className="text-[15px] mb-10 max-w-[300px]"
        style={{ color: '#767676', lineHeight: 1.6 }}
      >
        {t.paymentSuccessMsg}
      </p>

      <button
        onClick={() => navigate('dashboard')}
        className="w-full text-white rounded-xl flex items-center justify-center mb-4"
        style={{ background: '#1A6B4A', height: 52 }}
      >
        <span className="text-[15px] font-medium">{t.goHome}</span>
      </button>

      <button
        onClick={() => navigate('profile')}
        className="text-[14px] font-medium"
        style={{ color: '#1A6B4A' }}
      >
        {t.viewPlanDetails}
      </button>
    </div>
  );
}
