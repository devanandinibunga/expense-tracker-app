import { useState, useEffect } from "react";

export const useDetectMobile = () => {
  const MOBILE_WIDTH = 767;
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= MOBILE_WIDTH;

  return { isMobile };
};
