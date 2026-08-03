'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'bottom' | 'right';
  className?: string;
}

export function Sheet({ isOpen, onClose, children, side = 'bottom', className }: SheetProps) {
  // Prevent scrolling when sheet is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Sheet Container */}
          <div className="fixed inset-0 z-50 pointer-events-none flex justify-end items-end sm:items-stretch">
            <motion.div
              initial={side === 'bottom' ? { y: '100%' } : { x: '100%' }}
              animate={side === 'bottom' ? { y: 0 } : { x: 0 }}
              exit={side === 'bottom' ? { y: '100%' } : { x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag={side === 'bottom' ? "y" : "x"}
              dragConstraints={side === 'bottom' ? { top: 0 } : { left: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const threshold = side === 'bottom' ? info.offset.y > 100 : info.offset.x > 100;
                if (threshold) {
                  onClose();
                }
              }}
              className={cn(
                "pointer-events-auto bg-white shadow-2xl flex flex-col",
                side === 'bottom'
                  ? "w-full rounded-t-3xl h-[85vh] sm:h-auto sm:max-h-[90vh]"
                  : "w-full sm:w-[400px] h-full rounded-l-3xl",
                className
              )}
            >
              {/* Drag Handle (Mobile only) */}
              {side === 'bottom' && (
                <div className="w-full flex justify-center pt-3 pb-1 sm:hidden cursor-grab active:cursor-grabbing">
                  <div className="w-12 h-1.5 rounded-full bg-gray-300" />
                </div>
              )}

              {/* Close Button */}
              <div className="absolute top-4 right-4 z-10">
                <Button variant="secondary" size="icon" className="rounded-full bg-gray-100/80 backdrop-blur" onClick={onClose}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
