export type PasswordStrength = 'empty' | 'weak' | 'medium' | 'strong';

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number; // 0 to 4
}

// Pure function (no React state needed) — call this on every keystroke.
// Kept simple and dependency-free so it's easy to read/audit:
// +1 length >= 8, +1 length >= 12, +1 has uppercase AND lowercase,
// +1 has a number, +1 has a symbol. Capped at 4 for display purposes.
export function getPasswordStrength(password: string): PasswordStrengthResult {
  if (!password) return { strength: 'empty', score: 0 };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const cappedScore = Math.min(score, 4);

  let strength: PasswordStrength;
  if (cappedScore <= 1) strength = 'weak';
  else if (cappedScore <= 2) strength = 'medium';
  else strength = 'strong';

  return { strength, score: cappedScore };
}
