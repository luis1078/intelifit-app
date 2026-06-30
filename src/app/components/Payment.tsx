import { useState } from 'react';
import { ArrowLeft, Lock, Eye, EyeOff, CreditCard } from 'lucide-react';
import { translations, Language } from '../translations';
import { useFormPersist } from '../hooks/useFormPersist';
import { useNetworkAction } from '../hooks/useNetworkAction';
import {
  validateCardNumber,
  validateExpiry,
  validateCvv,
  validateCardName,
  formatCardNumber,
  formatExpiry,
} from '../utils/validators';
import ErrorRetry from './ErrorRetry';

interface PaymentProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

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

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: '#3D3D3D',
  marginBottom: 6,
  display: 'block',
};

export default function Payment({ language, navigate }: PaymentProps) {
  const t = translations[language];
  const [tab, setTab] = useState<'card' | 'yape'>('card');
  const [showCvv, setShowCvv] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  // Sticky form: only cardholder name persists across reloads. Card number,
  // expiry and CVV are sensitive and are intentionally kept in local state
  // only (never written to localStorage).
  const [persisted, setPersisted, clearPersisted] = useFormPersist('payment', {
    cardName: '',
  });
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const markTouched = (field: string) => setTouched(p => ({ ...p, [field]: true }));

  const cardNumberError = touched.cardNumber ? validateCardNumber(cardNumber, language) : '';
  const expiryError = touched.expiry ? validateExpiry(expiry, language) : '';
  const cvvError = touched.cvv ? validateCvv(cvv, language) : '';
  const cardNameError = touched.cardName ? validateCardName(persisted.cardName, language) : '';

  const isCardFormValid =
    tab === 'yape' ||
    (validateCardNumber(cardNumber, language) === '' &&
      validateExpiry(expiry, language) === '' &&
      validateCvv(cvv, language) === '' &&
      validateCardName(persisted.cardName, language) === '');

  const { status, run, retry } = useNetworkAction(
    () => {
      clearPersisted();
      navigate('paymentSuccess');
    },
    { failChance: 0.3 } // payments fail a bit more often in this simulation, to make the retry flow easy to demo
  );

  const handleConfirmPayment = () => {
    if (tab === 'card') {
      setTouched({ cardNumber: true, expiry: true, cvv: true, cardName: true });
      if (!isCardFormValid) return;
    }
    run();
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: '0.5px solid #C4C4C4' }}>
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate('onboarding')}>
            <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
          </button>
          <h1 className="text-[22px] font-semibold flex-1 text-center" style={{ color: '#1A1A1A' }}>{t.paymentMethod}</h1>
          <div className="w-6" />
        </div>
        <div className="flex items-center justify-center gap-1 mt-1">
          <Lock className="w-3 h-3" style={{ color: '#767676' }} />
          <span className="text-[12px]" style={{ color: '#767676' }}>{t.securePayment}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-[120px]">
        {/* Plan Summary */}
        <div className="mx-4 mt-4 rounded-2xl p-4" style={{ background: '#E8F5EE' }}>
          <p className="text-[11px] font-medium uppercase tracking-[0.8px] mb-1" style={{ color: '#767676' }}>{t.selectedPlan}</p>
          <p className="text-[18px] font-semibold" style={{ color: '#1A6B4A' }}>{t.planEvaluation}</p>
          <p className="text-[28px] font-bold mt-1" style={{ color: '#1A1A1A' }}>S/ 299 <span className="text-[14px] font-normal" style={{ color: '#767676' }}>{t.perMonth}</span></p>
          <p className="text-[12px] mt-0.5" style={{ color: '#767676' }}>{t.cancelAnytime}</p>
        </div>

        {/* Payment Method Tabs */}
        <div className="flex mx-4 mt-4 rounded-xl overflow-hidden" style={{ border: '0.5px solid #C4C4C4' }}>
          {[
            { id: 'card' as const, label: t.cardTab, icon: CreditCard },
            { id: 'yape' as const, label: t.yapeTab, icon: null },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex-1 py-3 text-[14px] font-medium flex items-center justify-center gap-2"
              style={{
                background: tab === id ? '#1A6B4A' : '#FFFFFF',
                color: tab === id ? '#FFFFFF' : '#767676',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="px-4 mt-4 space-y-4">
          {tab === 'card' ? (
            <>
              <div>
                <label style={labelStyle}>{t.cardNumber}</label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cardNumber}
                    onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder={t.cardNumberPlaceholder}
                    style={{ ...inputStyle, border: cardNumberError ? '1.5px solid #C62828' : inputStyle.border }}
                    onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                    onBlur={e => {
                      e.currentTarget.style.border = cardNumberError ? '1.5px solid #C62828' : '1px solid #C4C4C4';
                      markTouched('cardNumber');
                    }}
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#767676' }} />
                </div>
                {cardNumberError && <p className="text-[12px] mt-1" style={{ color: '#C62828' }}>{cardNumberError}</p>}
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label style={labelStyle}>{t.expiry}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={expiry}
                    onChange={e => setExpiry(formatExpiry(e.target.value))}
                    placeholder={t.expiryPlaceholder}
                    style={{ ...inputStyle, border: expiryError ? '1.5px solid #C62828' : inputStyle.border }}
                    onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                    onBlur={e => {
                      e.currentTarget.style.border = expiryError ? '1.5px solid #C62828' : '1px solid #C4C4C4';
                      markTouched('expiry');
                    }}
                  />
                  {expiryError && <p className="text-[12px] mt-1" style={{ color: '#C62828' }}>{expiryError}</p>}
                </div>
                <div className="flex-1">
                  <label style={labelStyle}>{t.cvv}</label>
                  <div className="relative">
                    <input
                      type={showCvv ? 'text' : 'password'}
                      inputMode="numeric"
                      value={cvv}
                      onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      style={{ ...inputStyle, paddingRight: 40, border: cvvError ? '1.5px solid #C62828' : inputStyle.border }}
                      onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                      onBlur={e => {
                        e.currentTarget.style.border = cvvError ? '1.5px solid #C62828' : '1px solid #C4C4C4';
                        markTouched('cvv');
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCvv(!showCvv)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showCvv
                        ? <EyeOff className="w-4 h-4" style={{ color: '#767676' }} />
                        : <Eye className="w-4 h-4" style={{ color: '#767676' }} />
                      }
                    </button>
                  </div>
                  {cvvError && <p className="text-[12px] mt-1" style={{ color: '#C62828' }}>{cvvError}</p>}
                </div>
              </div>

              <div>
                <label style={labelStyle}>{t.cardName}</label>
                <input
                  type="text"
                  value={persisted.cardName}
                  onChange={e => setPersisted({ ...persisted, cardName: e.target.value })}
                  placeholder={t.cardNamePlaceholder}
                  style={{ ...inputStyle, border: cardNameError ? '1.5px solid #C62828' : inputStyle.border }}
                  onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                  onBlur={e => {
                    e.currentTarget.style.border = cardNameError ? '1.5px solid #C62828' : '1px solid #C4C4C4';
                    markTouched('cardName');
                  }}
                />
                {cardNameError && <p className="text-[12px] mt-1" style={{ color: '#C62828' }}>{cardNameError}</p>}
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setSaveCard(!saveCard)}
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                  style={{
                    border: saveCard ? 'none' : '1.5px solid #C4C4C4',
                    background: saveCard ? '#1A6B4A' : '#FFFFFF',
                  }}
                >
                  {saveCard && <span className="text-white text-xs">✓</span>}
                </div>
                <span className="text-[13px]" style={{ color: '#3D3D3D' }}>{t.saveCard}</span>
              </label>

              {/* Accepted cards */}
              <div className="flex gap-2 items-center">
                {['VISA', 'MC', 'AMEX'].map(brand => (
                  <div
                    key={brand}
                    className="px-3 py-1 rounded text-[11px] font-bold"
                    style={{ border: '1px solid #C4C4C4', color: '#C4C4C4' }}
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              <div
                className="rounded-xl flex items-center justify-center"
                style={{ width: 200, height: 200, border: '1.5px solid #C4C4C4' }}
              >
                <div className="grid grid-cols-5 gap-1 p-4">
                  {[...Array(25)].map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-sm" style={{ background: i % 3 === 0 ? '#1A6B4A' : '#E8F5EE' }} />
                  ))}
                </div>
              </div>
              <p className="text-[14px] text-center" style={{ color: '#767676' }}>{t.qrScanInstruction}</p>
              <p className="text-[24px] font-semibold" style={{ color: '#1A1A1A' }}>S/ 299.00</p>
              <p className="text-[12px]" style={{ color: '#767676' }}>{t.qrExpires} 10:00 min</p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white px-4 py-4 space-y-3"
        style={{ borderTop: '0.5px solid #C4C4C4' }}
      >
        <div className="flex justify-between items-center">
          <span className="text-[16px]" style={{ color: '#1A1A1A' }}>{t.totalToPay}</span>
          <span className="text-[16px] font-semibold" style={{ color: '#1A1A1A' }}>S/ 299.00</span>
        </div>
        <button
          onClick={handleConfirmPayment}
          disabled={status === 'loading'}
          className="w-full text-white rounded-xl flex items-center justify-center"
          style={{
            background: status === 'loading' ? '#7FA593' : '#1A6B4A',
            height: 56,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          <span className="text-[16px] font-medium">
            {status === 'loading' ? t.loadingText : t.confirmPayment}
          </span>
        </button>
        <ErrorRetry status={status} language={language} onRetry={retry} />
        <p className="text-[11px] text-center" style={{ color: '#767676' }}>
          {t.termsText}{' '}
          <span className="underline" style={{ color: '#1A6B4A' }}>{t.termsLink}</span>
        </p>
      </div>
    </div>
  );
}
