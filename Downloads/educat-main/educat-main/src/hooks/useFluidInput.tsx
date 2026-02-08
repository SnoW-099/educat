import { useState, useCallback } from 'react';

/**
 * Hook for fluid input handling without debouncing delays
 * Provides immediate updates for better user experience
 */
export const useFluidInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const updateValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const resetValue = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    updateValue,
    resetValue,
    setValue
  };
};