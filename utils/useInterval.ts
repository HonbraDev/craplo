import { useEffect, useRef } from "react";

const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    // @ts-expect-error
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // @ts-expect-error
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
