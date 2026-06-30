import { useState } from 'react';

export type RequestStatus = 'idle' | 'loading' | 'error' | 'success';

interface UseNetworkActionResult {
  status: RequestStatus;
  run: () => void;
  retry: () => void;
  reset: () => void;
}

// Simulates a network call for prototype purposes (no real backend exists yet).
// `failChance` lets us simulate intermittent failures so the retry UI can be
// demoed/tested — set to 0 to always succeed, 1 to always fail.
//
// onSuccess is called once the simulated request resolves successfully.
export function useNetworkAction(
  onSuccess: () => void,
  options?: { delayMs?: number; failChance?: number }
): UseNetworkActionResult {
  const delayMs = options?.delayMs ?? 900;
  const failChance = options?.failChance ?? 0.25;

  const [status, setStatus] = useState<RequestStatus>('idle');

  const execute = () => {
    setStatus('loading');
    window.setTimeout(() => {
      const didFail = Math.random() < failChance;
      if (didFail) {
        setStatus('error');
      } else {
        setStatus('success');
        onSuccess();
      }
    }, delayMs);
  };

  const run = () => execute();
  const retry = () => execute();
  const reset = () => setStatus('idle');

  return { status, run, retry, reset };
}
