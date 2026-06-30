import { useState } from 'react';
import { ArrowLeft, Globe, Eye, EyeOff } from 'lucide-react';
import { translations, Language } from '../translations';
import { useFormPersist } from '../hooks/useFormPersist';
import { useNetworkAction } from '../hooks/useNetworkAction';
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validateAge,
} from '../utils/validators';
import ErrorRetry from './ErrorRetry';
import PasswordStrengthBar from './PasswordStrengthBar';
import SocialLoginButtons from './SocialLoginButtons';

interface OnboardingProps {
  language: Language;
  toggleLanguage: () => void;
  navigate: (screen: string) => void;
}

const inputBase: React.CSSProperties = {
  height: 52, border: '1px solid #C4C4C4', borderRadius: 10,
  background: '#FFFFFF', color: '#1A1A1A',
  width: '100%', padding: '0 16px', fontSize: 15, outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontSize: 13, fontWeight: 500, color: '#3D3D3D', marginBottom: 6, display: 'block',
};

export default function Onboarding({ language, toggleLanguage, navigate }: OnboardingProps) {
  const t = translations[language];
  const [step, setStep] = useState(1);

  // Sticky form: persists everything EXCEPT password across reloads.
  const [formData, setFormData, clearPersisted] = useFormPersist('onboarding', {
    fullName: '',
    email: '',
    selectedGoal: '',
    selectedLevel: '',
    age: '',
    selectedPlan: '',
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // touched tracks which fields the user has already blurred, so errors
  // don't show up before they've had a chance to type anything.
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const markTouched = (field: string) => setTouched(p => ({ ...p, [field]: true }));

  const fullNameError = touched.fullName ? validateFullName(formData.fullName, language) : '';
  const emailError = touched.email ? validateEmail(formData.email, language) : '';
  const passwordError = touched.password ? validatePassword(password, language) : '';
  const ageError = touched.age ? validateAge(formData.age, language) : '';

  const step1Valid =
    validateFullName(formData.fullName, language) === '' &&
    validateEmail(formData.email, language) === '' &&
    validatePassword(password, language) === '';

  const step2Valid =
    formData.selectedGoal !== '' &&
    formData.selectedLevel !== '' &&
    validateAge(formData.age, language) === '';

  const { status, run, retry } = useNetworkAction(
    () => {
      clearPersisted();
      navigate('payment');
    },
    { failChance: 0.25 }
  );

  const goals = [
    { id: 'lose', label: t.loseWeight },
    { id: 'muscle', label: t.gainMuscle },
    { id: 'endurance', label: t.improveEndurance },
    { id: 'general', label: t.generalFitness },
  ];

  const levels = [
    { id: 'beginner', label: t.beginner },
    { id: 'intermediate', label: t.intermediate },
    { id: 'advanced', label: t.advanced },
  ];

  const plans = [
    { id: 'evaluation', label: t.planEvaluation, desc: t.planEvaluationDesc, price: 'S/ 299', popular: false },
    { id: 'group', label: t.planGroup, desc: t.planGroupDesc, price: 'S/ 149', popular: true },
    { id: 'online', label: t.planOnline, desc: t.planOnlineDesc, price: 'S/ 99', popular: false },
  ];

  const handleContinue = () => {
    if (step === 1) {
      setTouched(p => ({ ...p, fullName: true, email: true, password: true }));
      if (!step1Valid) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      setTouched(p => ({ ...p, age: true }));
      if (!step2Valid) return;
      setStep(3);
      return;
    }
    // step 3 — submit
    if (!formData.selectedPlan) return;
    run();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('landing');
  };

  const handleOAuthSuccess = () => {
    clearPersisted();
    navigate('payment');
  };

  const isStep3Disabled = step === 3 && (!formData.selectedPlan || status === 'loading');

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      {/* Progress Bar */}
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={handleBack}>
            <ArrowLeft className="w-6 h-6" style={{ color: '#1A1A1A' }} />
          </button>
          <div className="flex gap-1 flex-1">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1 rounded-full" style={{ height: 4, background: s <= step ? '#1A6B4A' : '#C4C4C4' }} />
            ))}
          </div>
          <button onClick={toggleLanguage} className="flex items-center gap-1 px-3 py-1.5 rounded-lg" style={{ border: '1px solid #C4C4C4' }}>
            <Globe className="w-4 h-4" style={{ color: '#767676' }} />
            <span className="text-sm font-medium" style={{ color: '#3D3D3D' }}>{language === 'en' ? 'EN' : 'ES'}</span>
          </button>
        </div>
        <p className="text-[12px]" style={{ color: '#767676' }}>{t.step} {step} {t.of} 3</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4 pt-2">
            <h1 className="text-[22px] font-semibold" style={{ color: '#1A1A1A' }}>{t.createAccount}</h1>
            <div>
              <label style={labelStyle}>{t.fullName}</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={t.enterFullName}
                style={{ ...inputBase, border: fullNameError ? '1.5px solid #C62828' : inputBase.border }}
                onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                onBlur={e => {
                  e.currentTarget.style.border = fullNameError ? '1.5px solid #C62828' : '1px solid #C4C4C4';
                  markTouched('fullName');
                }}
              />
              {fullNameError && <p className="text-[12px] mt-1" style={{ color: '#C62828' }}>{fullNameError}</p>}
            </div>
            <div>
              <label style={labelStyle}>{t.email}</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder={t.emailPlaceholder}
                style={{ ...inputBase, border: emailError ? '1.5px solid #C62828' : inputBase.border }}
                onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                onBlur={e => {
                  e.currentTarget.style.border = emailError ? '1.5px solid #C62828' : '1px solid #C4C4C4';
                  markTouched('email');
                }}
              />
              {emailError && <p className="text-[12px] mt-1" style={{ color: '#C62828' }}>{emailError}</p>}
            </div>
            <div>
              <label style={labelStyle}>{t.password}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={t.createPassword}
                  style={{
                    ...inputBase,
                    paddingRight: 48,
                    border: passwordError ? '1.5px solid #C62828' : inputBase.border,
                  }}
                  onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                  onBlur={e => {
                    e.currentTarget.style.border = passwordError ? '1.5px solid #C62828' : '1px solid #C4C4C4';
                    markTouched('password');
                  }}
                />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" type="button">
                  {showPassword
                    ? <EyeOff className="w-5 h-5" style={{ color: '#767676' }} />
                    : <Eye className="w-5 h-5" style={{ color: '#767676' }} />
                  }
                </button>
              </div>
              {passwordError && <p className="text-[12px] mt-1" style={{ color: '#C62828' }}>{passwordError}</p>}
              <PasswordStrengthBar password={password} language={language} />
            </div>

            <SocialLoginButtons language={language} onAuthenticated={handleOAuthSuccess} />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-5 pt-2">
            <h1 className="text-[22px] font-semibold" style={{ color: '#1A1A1A' }}>{t.fitnessGoals}</h1>
            <div>
              <p style={labelStyle}>{t.selectGoal}</p>
              <div className="space-y-2">
                {goals.map(g => (
                  <button key={g.id} onClick={() => setFormData({ ...formData, selectedGoal: g.id })} className="w-full text-left px-4 rounded-xl flex items-center"
                    style={{ height: 52, border: formData.selectedGoal === g.id ? '1.5px solid #1A6B4A' : '1px solid #C4C4C4', background: formData.selectedGoal === g.id ? '#E8F5EE' : '#FFFFFF', color: formData.selectedGoal === g.id ? '#1A6B4A' : '#1A1A1A', fontSize: 15 }}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={labelStyle}>{t.fitnessLevel}</p>
              <div className="flex gap-2">
                {levels.map(l => (
                  <button key={l.id} onClick={() => setFormData({ ...formData, selectedLevel: l.id })} className="flex-1 rounded-xl text-[13px] font-medium"
                    style={{ height: 40, border: formData.selectedLevel === l.id ? '1.5px solid #1A6B4A' : '1px solid #C4C4C4', background: formData.selectedLevel === l.id ? '#1A6B4A' : '#FFFFFF', color: formData.selectedLevel === l.id ? '#FFFFFF' : '#767676' }}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t.age}</label>
              <input
                type="number"
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
                placeholder={t.agePlaceholder}
                style={{ ...inputBase, border: ageError ? '1.5px solid #C62828' : inputBase.border }}
                onFocus={e => { e.currentTarget.style.border = '1.5px solid #1A6B4A'; }}
                onBlur={e => {
                  e.currentTarget.style.border = ageError ? '1.5px solid #C62828' : '1px solid #C4C4C4';
                  markTouched('age');
                }}
              />
              {ageError && <p className="text-[12px] mt-1" style={{ color: '#C62828' }}>{ageError}</p>}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4 pt-2">
            <h1 className="text-[22px] font-semibold" style={{ color: '#1A1A1A' }}>{t.choosePlan}</h1>
            {plans.map(plan => (
              <button key={plan.id} onClick={() => setFormData({ ...formData, selectedPlan: plan.id })} className="w-full text-left rounded-2xl p-4 relative"
                style={{ border: formData.selectedPlan === plan.id ? '1.5px solid #1A6B4A' : '0.5px solid #C4C4C4', background: formData.selectedPlan === plan.id ? '#E8F5EE' : '#FFFFFF' }}>
                {plan.popular && (
                  <span className="absolute top-3 right-3 text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: '#F0A500', color: '#FFFFFF' }}>
                    {t.mostPopular}
                  </span>
                )}
                <p className="text-[16px] font-semibold mb-1" style={{ color: '#1A1A1A' }}>{plan.label}</p>
                <p className="text-[13px] mb-2" style={{ color: '#767676' }}>{plan.desc}</p>
                <p className="text-[22px] font-bold" style={{ color: '#1A6B4A' }}>
                  {plan.price}<span className="text-[13px] font-normal" style={{ color: '#767676' }}>{t.perMonth}</span>
                </p>
              </button>
            ))}
            <ErrorRetry status={status} language={language} onRetry={retry} />
          </div>
        )}
      </div>

      <div className="px-6 py-6 space-y-3 flex-shrink-0">
        <button
          onClick={handleContinue}
          disabled={isStep3Disabled}
          className="w-full text-white rounded-xl flex items-center justify-center"
          style={{
            background: isStep3Disabled ? '#C4C4C4' : '#1A6B4A',
            height: 52,
            cursor: isStep3Disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <span className="text-[15px] font-medium">
            {step === 3 ? (status === 'loading' ? t.loadingText : t.choosePlanBtn) : t.continue}
          </span>
        </button>
        {step === 1 && (
          <p className="text-center text-[13px]" style={{ color: '#767676' }}>
            {t.alreadyHaveAccount}{' '}
            <button className="font-medium" style={{ color: '#1A6B4A' }} onClick={() => navigate('login')}>{t.logIn}</button>
          </p>
        )}
      </div>
    </div>
  );
}
