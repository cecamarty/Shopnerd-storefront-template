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
      initial: { y: "100%", opacity: 1 },
      animate: { y: 0, opacity: 1 },
      exit: { y: "100%", opacity: 1 }
    },
    right: {
      initial: { x: "100%", opacity: 1 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 1 }
    },
    center: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 }
    }
  };

  const wrapperClasses = {
    bottom: "fixed inset-x-0 bottom-0 mt-24 flex flex-col md:inset-x-auto md:right-0 md:top-0 md:mt-0 md:w-full md:max-w-md h-[92vh] md:h-full rounded-t-[2rem] md:rounded-none bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden",
    right: "fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden",
    center: "fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-3xl shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden"
  };

  const appliedPosition = position === "bottom" ? "bottom" : position;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md"
            aria-hidden="true"
          />
          <motion.div
            ref={contentRef}
            initial={variants[appliedPosition].initial}
            animate={variants[appliedPosition].animate}
            exit={variants[appliedPosition].exit}
            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
            className={wrapperClasses[appliedPosition]}
            drag={position === "bottom" ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.4}
            onDragEnd={(e, { offset, velocity }) => {
              if (position === "bottom" && (offset.y > 100 || velocity.y > 400)) {
                onClose();
              }
            }}
            role="dialog"
            aria-modal="true"
          >
             {position === "bottom" && (
                <div className="w-full flex justify-center py-4 bg-white md:hidden cursor-grab active:cursor-grabbing absolute top-0 z-20">
                  <div className="w-10 h-1.5 rounded-full bg-zinc-200" />
                </div>
              )}
            <div className="flex-1 overflow-y-auto no-scrollbar pt-6 md:pt-0 pb-env-safe">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
