import { useEffect, useRef } from "react";

const useScrollToBottom = (dependencies = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dependencies]);

  return containerRef;
};

export default useScrollToBottom;
