"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useMotionValue, useScroll } from "framer-motion";

type ScrollContextType = {
  scrollY: number;
  scrollDirection: "up" | "down" | "none";
};

const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  scrollDirection: "none",
});

export function ScrollProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollYValue] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | "none">("none");

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const previous = scrollY.getPrevious();
      if (previous !== undefined) {
         if (latest > previous && latest > 50) {
           setScrollDirection("down");
         } else if (latest < previous) {
           setScrollDirection("up");
         }
      }
      setScrollYValue(latest);
    });
  }, [scrollY]);

  return (
    <ScrollContext.Provider value={{ scrollY: scrollYValue, scrollDirection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useAppScroll() {
  return useContext(ScrollContext);
}
