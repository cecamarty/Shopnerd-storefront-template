"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "bottom" | "right" | "center";
}

export function Overlay({ isOpen, onClose, children, position = "bottom" }: OverlayProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const variants = {
    bottom: {
      initial: { y: "100%", opacity: 0.8 },
      animate: { y: 0, opacity: 1 },
      exit: { y: "100%", opacity: 0.8 }
    },
    right: {
      initial: { x: "100%", opacity: 0.8 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 0.8 }
    },
    center: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 }
    }
  };

  const wrapperClasses = {
    bottom: "fixed inset-x-0 bottom-0 mt-24 flex flex-col md:inset-x-auto md:right-0 md:top-0 md:mt-0 md:w-full md:max-w-md h-[90vh] md:h-full rounded-t-3xl md:rounded-none bg-white shadow-2xl z-50",
    right: "fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col",
    center: "fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-3xl shadow-2xl z-50 flex flex-col max-h-[90vh]"
  };

  // On mobile we might want bottom sheet, on desktop side drawer
  const appliedPosition = position === "bottom" ? "bottom" : position;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            ref={contentRef}
            initial={variants[appliedPosition].initial}
            animate={variants[appliedPosition].animate}
            exit={variants[appliedPosition].exit}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={wrapperClasses[appliedPosition]}
            drag={position === "bottom" ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (position === "bottom" && (offset.y > 150 || velocity.y > 500)) {
                onClose();
              }
            }}
          >
             {position === "bottom" && (
                <div className="w-full flex justify-center py-3 md:hidden cursor-grab active:cursor-grabbing">
                  <div className="w-12 h-1.5 rounded-full bg-zinc-300" />
                </div>
              )}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
