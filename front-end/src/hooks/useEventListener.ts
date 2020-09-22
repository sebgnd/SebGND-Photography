import { useEffect } from 'react';

const useEventListener = <K extends keyof WindowEventMap>(event: K, listener: (this: Window, ev: WindowEventMap[K]) => any) => {
    useEffect(() => {
        window.addEventListener(event, listener);

        return () => {
            window.removeEventListener(event, listener);
        }
    }, [])
}

export default useEventListener;