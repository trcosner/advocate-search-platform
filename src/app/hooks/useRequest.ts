import { useState, useCallback, useRef } from 'react';

export interface RequestState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseRequestOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useRequest<T = any>(options: UseRequestOptions = {}) {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Use ref to prevent race conditions
  const latestRequestRef = useRef<symbol>();

  const execute = useCallback(async (
    url: string,
    requestOptions: RequestInit = {}
  ): Promise<T | null> => {
    const requestId = Symbol();
    latestRequestRef.current = requestId;

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...requestOptions.headers,
        },
        ...requestOptions,
      });

      // Only proceed if this is still the latest request
      if (latestRequestRef.current !== requestId) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      const data = result.data ?? result;
      const success = result.success ?? true;

      if (success) {
        setState(prev => ({ ...prev, data, loading: false }));
        options.onSuccess?.(data);
        return data;
      } else {
        throw new Error(result.error || result.message || 'Request failed');
      }
    } catch (error) {
      if (latestRequestRef.current === requestId) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        options.onError?.(errorMessage);
      }
      return null;
    }
  }, [options]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
    latestRequestRef.current = undefined;
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
