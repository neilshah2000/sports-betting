import { useEffect, useState } from "react";

const useScrollEnd = () => {
  const [scrollEnd, setScrollEnd] = useState(false);

  useEffect(() => {
    const updateEnd = () => {
      setScrollEnd(true);
    };
    window.addEventListener("scrollend", updateEnd);
    return () => window.removeEventListener("scrollend", updateEnd);
  }, []);

  return scrollEnd;
};

export default useScrollEnd;
