import { useCallback, useState } from "react";

export interface UseImageStateReturn {
  isLoading: boolean;
  hasError: boolean;
  currentSrc: string;
  handleLoad: () => void;
  handleError: () => void;
  retry: () => void;
}

export const useImageState = (
  initialSrc: string,
  fallbackSrc?: string
): UseImageStateReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [retryCount, setRetryCount] = useState(0);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    setRetryCount(0);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);

    if (currentSrc !== fallbackSrc && fallbackSrc && retryCount === 0) {
      setCurrentSrc(fallbackSrc);
      setRetryCount(1);
      setIsLoading(true);
      return;
    }

    setHasError(true);
  }, [currentSrc, fallbackSrc, retryCount]);

  const retry = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setCurrentSrc(initialSrc);
    setRetryCount(0);
  }, [initialSrc]);

  return {
    isLoading,
    hasError,
    currentSrc,
    handleLoad,
    handleError,
    retry,
  };
};
