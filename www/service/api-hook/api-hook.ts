import {useCallback, useMemo, useState} from 'react';

type StateHooksType<DateType> = {
    isInProgress: boolean;
    processError: Error | null;
    reset: () => void;
    result: DateType | null;
    setIsInProgress: (isInProgress: boolean) => void;
    setProcessError: (processError: Error | null) => void;
    setResult: (result: DateType | null) => void;
};

export function useApiHooks<DateType>(): StateHooksType<DateType> {
    const [isInProgress, setIsInProgress] = useState<boolean>(false);
    const [processError, setProcessError] = useState<Error | null>(null);
    const [result, setResult] = useState<DateType | null>(null);

    const reset = useCallback(() => {
        setProcessError(null);
        setIsInProgress(false);
        setResult(null);
    }, [setProcessError, setIsInProgress, setResult]);

    return useMemo(() => {
        return {
            isInProgress,
            processError,
            reset,
            result,
            setIsInProgress,
            setProcessError,
            setResult,
        };
    }, [isInProgress, setIsInProgress, processError, setProcessError, result, setResult, reset]);
}
