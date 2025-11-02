import { useCallback } from "react";

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return useCallback(
        (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => callback(...args), delay);
        },
        [callback, delay]
    );
};
