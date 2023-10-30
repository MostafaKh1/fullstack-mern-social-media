import { useEffect, useState } from "react";

function useWindowSize() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const captureWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", captureWidth);

    return () => window.removeEventListener("resize", captureWidth);
  }, [width]);

  return { width };
}

export default useWindowSize;
