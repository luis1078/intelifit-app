import { useEffect, useState } from 'react';

// Generic "sticky form" hook: keeps form data in localStorage as the user
// types, restores it on mount (e.g. after an accidental reload), and
// exposes a clear() to wipe it once the form is submitted successfully.
//
// NEVER pass password fields into this — passwords should not persist in
// localStorage for security reasons. Only persist non-sensitive fields
// (name, email, selections, card name) and exclude card number/cvv/password.
//
// Usage:
//   const [data, setData, clearPersisted] = useFormPersist('onboarding-step1', { fullName: '', email: '' });

export function useFormPersist<T extends Record<string, unknown>>(
  storageKey: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const fullKey = `intelifit:form:${storageKey}`;

  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(fullKey);
      if (!raw) return initialValue;
      const parsed = JSON.parse(raw);
      // Merge with initialValue so newly-added fields don't break old saved data
      return { ...initialValue, ...parsed };
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(fullKey, JSON.stringify(value));
    } catch {
      // localStorage can fail in private browsing / storage-full scenarios.
      // Failing silently here is intentional: persistence is a nice-to-have,
      // it should never block the user from continuing to fill the form.
    }
  }, [fullKey, value]);

  const clearPersisted = () => {
    try {
      window.localStorage.removeItem(fullKey);
    } catch {
      // see note above
    }
  };

  return [value, setValue, clearPersisted];
}
