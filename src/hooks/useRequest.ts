import { useState, useCallback } from 'react';

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

  const execute = useCallback(async (
    url: string,
    requestOptions: RequestInit = {}
  ): Promise<T | null> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...requestOptions.headers,
        },
        ...requestOptions,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setState(prev => ({ ...prev, data: result.data, loading: false }));
        options.onSuccess?.(result.data);
        return result.data;
      } else {
        throw new Error(result.error || 'Request failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      options.onError?.(errorMessage);
      return null;
    }
  }, [options]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
