import { Language, translations } from '../translations';
import { getPasswordStrength } from '../hooks/usePasswordStrength';

interface PasswordStrengthBarProps {
  password: string;
  language: Language;
}

const STRENGTH_COLOR: Record<string, string> = {
  empty: '#C4C4C4',
  weak: '#C62828',
  medium: '#F9A825',
  strong: '#1A6B4A',
};

// Renders nothing until the user starts typing — avoids showing a red bar
// for an empty field, which would read as a pre-existing error.
export default function PasswordStrengthBar({ password, language }: PasswordStrengthBarProps) {
  const t = translations[language];
  const { strength, score } = getPasswordStrength(password);

  if (strength === 'empty') return null;

  const labelMap: Record<string, string> = {
    weak: t.passwordWeak,
    medium: t.passwordMedium,
    strong: t.passwordStrong,
  };

  const color = STRENGTH_COLOR[strength];
  const segments = 4;

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-full transition-colors"
            style={{
              height: 4,
              background: i < score ? color : '#E5E5E5',
            }}
          />
        ))}
      </div>
      <p className="text-[12px] mt-1.5" style={{ color }}>
        {labelMap[strength]}
      </p>
    </div>
  );
}
