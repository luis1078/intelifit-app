// Shared validation helpers for all forms in the app.
// Each validator returns an error message key (string) or '' if valid.
// Error messages are passed through translations so they respect language.

import { Language, translations } from '../translations';

export function validateFullName(value: string, language: Language): string {
  const t = translations[language];
  if (!value.trim()) return t.errFullNameRequired;
  if (value.trim().length < 3) return t.errFullNameShort;
  return '';
}

export function validateEmail(value: string, language: Language): string {
  const t = translations[language];
  if (!value.trim()) return t.errEmailRequired;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) return t.errEmailInvalid;
  return '';
}

export function validatePassword(value: string, language: Language): string {
  const t = translations[language];
  if (!value) return t.errPasswordRequired;
  if (value.length < 8) return t.errPasswordShort;
  return '';
}

export function validateLoginPassword(value: string, language: Language): string {
  // Login only needs presence, not strength — strength is for account creation
  const t = translations[language];
  if (!value) return t.errPasswordRequired;
  return '';
}

export function validateAge(value: string, language: Language): string {
  const t = translations[language];
  if (!value.trim()) return t.errAgeRequired;
  const n = Number(value);
  if (Number.isNaN(n) || n < 13 || n > 100) return t.errAgeInvalid;
  return '';
}

export function validateCardNumber(value: string, language: Language): string {
  const t = translations[language];
  const digits = value.replace(/\s/g, '');
  if (!digits) return t.errCardRequired;
  if (!/^\d{13,19}$/.test(digits)) return t.errCardInvalid;
  return '';
}

export function validateExpiry(value: string, language: Language): string {
  const t = translations[language];
  if (!value.trim()) return t.errExpiryRequired;
  const match = value.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return t.errExpiryInvalid;
  const month = Number(match[1]);
  const year = Number(`20${match[2]}`);
  if (month < 1 || month > 12) return t.errExpiryInvalid;
  const now = new Date();
  const expiryDate = new Date(year, month - 1, 1);
  const currentMonthDate = new Date(now.getFullYear(), now.getMonth(), 1);
  if (expiryDate < currentMonthDate) return t.errExpiryPast;
  return '';
}

export function validateCvv(value: string, language: Language): string {
  const t = translations[language];
  if (!value.trim()) return t.errCvvRequired;
  if (!/^\d{3,4}$/.test(value.trim())) return t.errCvvInvalid;
  return '';
}

export function validateCardName(value: string, language: Language): string {
  const t = translations[language];
  if (!value.trim()) return t.errCardNameRequired;
  if (value.trim().length < 3) return t.errCardNameShort;
  return '';
}

// Auto-formats raw digits into "1234 5678 9012 3456" as the user types
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

// Auto-formats raw digits into "MM/YY" as the user types
export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}
