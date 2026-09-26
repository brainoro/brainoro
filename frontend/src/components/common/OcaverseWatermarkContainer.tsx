import React, { useId } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: 'card' | 'viewport' | 'subtle';
  showBadge?: boolean;
}

/**
 * OcaverseWatermarkContainer
 * ----------------------------------------------------------------------------
 * Universal UI & Print Guardrail for Brainoro OS (Powered by OcaVerse).
 * Non-intrusive SVG overlay / single centered watermark with strict fixed bounds.
 * Uses inline fixed boundaries and overflow: hidden to guarantee that the watermark
 * NEVER escapes its container, causes layout shifts, or renders repetitive DOM loops.
 * Fully active on desktop screens, browser PDF exports, and physical prints.
 * Uses pointer-events: none and user-select: none to ensure zero interaction interference.
 */
export const OcaverseWatermarkContainer: React.FC<Props> = ({
  children,
  className = '',
  variant = 'card',
  showBadge = false,
}) => {
  const rawId = useId();
  const patternId = rawId.replace(/[^a-zA-Z0-9_-]/g, '_');

  return (
    <div
      className={`relative overflow-hidden group print:overflow-visible ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
      {/* Strict Fixed-Bounds Watermark Overlay */}
      <div
        aria-hidden="true"
        className="ocaverse-watermark-overlay absolute inset-0 pointer-events-none select-none z-0 overflow-hidden print:overflow-visible"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {variant === 'viewport' ? (
          <>
            {/* Screen SVG Pattern Watermark Overlay - Zero DOM loops, pure GPU rasterization */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-[0.05] dark:opacity-[0.08] print:hidden"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id={`pattern-${patternId}`}
                  width="280"
                  height="150"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(-15)"
                >
                  <text
                    x="20"
                    y="50"
                    fill="currentColor"
                    fontSize="13"
                    fontWeight="800"
                    letterSpacing="3"
                    className="text-slate-400 dark:text-slate-500 font-sans select-none"
                  >
                    BRAINORO • OCAVERSE
                  </text>
                  <text
                    x="20"
                    y="72"
                    fill="currentColor"
                    fontSize="8"
                    fontWeight="600"
                    letterSpacing="1"
                    className="text-slate-500 dark:text-slate-600 font-mono select-none"
                  >
                    COGNITIVE CURRICULUM GUARDRAIL
                  </text>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-${patternId})`} />
            </svg>

            {/* Subtle Screen Centered Brand Emblem (Fixed bounds) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none print:hidden"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <div className="flex items-center gap-6 opacity-[0.05] dark:opacity-[0.08] -rotate-12 pointer-events-none select-none">
                <img
                  src="/brainoro-logo.png"
                  alt=""
                  aria-hidden="true"
                  className="w-48 max-w-[40%] h-auto object-contain"
                  loading="eager"
                />
                <img
                  src="/ocaverse-logo-white.png"
                  alt=""
                  aria-hidden="true"
                  className="w-48 max-w-[40%] h-auto object-contain"
                  loading="eager"
                />
              </div>
            </div>

            {/* Clean Repeating Print Watermark for Brainoro & Ocaverse in PDF / Physical Print */}
            <svg
              className="hidden print:block absolute inset-0 w-full h-full pointer-events-none select-none"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity: 0.11,
                zIndex: 0,
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id={`print-pattern-${patternId}`}
                  width="280"
                  height="160"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(-25)"
                >
                  <text
                    x="20"
                    y="45"
                    fill="#0f172a"
                    fontSize="15"
                    fontWeight="800"
                    letterSpacing="3"
                    fontFamily="system-ui, sans-serif"
                  >
                    BRAINORO
                  </text>
                  <text
                    x="20"
                    y="68"
                    fill="#334155"
                    fontSize="10.5"
                    fontWeight="700"
                    letterSpacing="2"
                    fontFamily="system-ui, sans-serif"
                  >
                    POWERED BY OCAVERSE
                  </text>
                  <text
                    x="20"
                    y="86"
                    fill="#64748b"
                    fontSize="7.5"
                    fontWeight="600"
                    letterSpacing="1"
                    fontFamily="monospace"
                  >
                    AUTHENTIC CURRICULUM GUARDRAIL
                  </text>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#print-pattern-${patternId})`} />
            </svg>
          </>
        ) : (
          /* Card Variant: Dual centered watermark with strict bounds */
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Screen Dark/Light Variant */}
            <div className="flex items-center gap-4 opacity-[0.06] dark:opacity-[0.09] -rotate-12 print:hidden pointer-events-none select-none">
              <img
                src="/brainoro-logo.png"
                alt=""
                aria-hidden="true"
                className="w-36 max-w-[40%] h-auto object-contain"
                loading="eager"
              />
              <img
                src="/ocaverse-logo-white.png"
                alt=""
                aria-hidden="true"
                className="w-36 max-w-[40%] h-auto object-contain"
                loading="eager"
              />
            </div>
            {/* Print & PDF Dual High-Contrast Variant */}
            <div className="hidden print:flex items-center gap-6 opacity-[0.14] -rotate-12">
              <img
                src="/brainoro-logo.png"
                alt=""
                aria-hidden="true"
                className="w-36 max-w-[40%] h-auto object-contain"
                loading="eager"
              />
              <img
                src="/ocaverse-logo.png"
                alt=""
                aria-hidden="true"
                className="w-36 max-w-[40%] h-auto object-contain"
                loading="eager"
              />
            </div>
          </div>
        )}
      </div>

      {/* Optional Subtle Top-Right Watermark Brand Pill */}
      {showBadge && (
        <div
          className="absolute top-2.5 right-3.5 z-20 pointer-events-none select-none opacity-60 hover:opacity-100 transition-opacity print:hidden"
          style={{ position: 'absolute', top: '0.625rem', right: '0.875rem', zIndex: 20 }}
        >
          <div className="flex items-center gap-1.5 bg-slate-950/80 border border-sky-900/50 px-2.5 py-1 rounded-full text-[10px] font-mono text-sky-300 shadow-sm backdrop-blur-sm">
            <img
              src="/brainoro-logo.png"
              alt="Brainoro"
              className="h-3 w-auto object-contain"
            />
            <span className="text-[9px] uppercase tracking-wider text-sky-400 font-bold border-l border-sky-800/80 pl-1.5">
              Brainoro • OcaVerse
            </span>
          </div>
        </div>
      )}

      {/* Foreground Interactive Content */}
      <div
        className="relative z-10 w-full h-full"
        style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}
      >
        {children}
      </div>
    </div>
  );
};

export default OcaverseWatermarkContainer;
