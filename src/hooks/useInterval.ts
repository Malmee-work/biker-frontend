import { useEffect, useRef } from "react";

export const useInterval = (callback: any, delay: number) => {
  const savedCallback: React.MutableRefObject<() => void> = useRef((): void => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback && savedCallback.current) {
        savedCallback.current();
      }
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
