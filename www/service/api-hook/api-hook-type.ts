export type UseHookType<HookData> = {
    isInProgress: boolean;
    processError: Error | null;
    reset: () => void;
    result: HookData | null;
};

export type UseRefreshApiHookType = {
    refresh: () => void;
    refreshId: string;
};
