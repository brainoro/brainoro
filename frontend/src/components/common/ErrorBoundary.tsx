'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Terminal, ChevronDown } from 'lucide-react';
import { OcaverseWatermarkContainer } from './OcaverseWatermarkContainer';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackConceptId?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Robust React ErrorBoundary for the Universal Cornell Learning Layer.
 * Prevents unhandled parsing errors or missing DB record exceptions from crashing
 * the UI, surfacing a clean, actionable developer alert card with retry capability.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message || 'An unexpected rendering exception occurred.';
      const isDbRecordMissing = errorMsg.includes('DB Record not found') || errorMsg.includes('RLS restricted');

      return (
        <OcaverseWatermarkContainer
          variant="viewport"
          showBadge={true}
          className="bg-slate-900 border border-rose-900/60 rounded-2xl p-6 shadow-xl space-y-5 my-4"
        >
          <div className="flex items-start gap-3.5 p-4 bg-rose-950/40 border border-rose-800/80 rounded-xl text-rose-300">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h4 className="font-bold text-rose-200 text-base">
                  {isDbRecordMissing ? 'Database Invariant Restriction Active' : 'Cognitive OS Learning Layer Exception'}
                </h4>
                {this.props.fallbackConceptId && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-900/40 border border-rose-700/60 text-rose-200">
                    {this.props.fallbackConceptId}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-rose-300/90 font-mono leading-relaxed">
                {errorMsg}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={this.handleRetry}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shadow-md shadow-sky-600/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Loading Concept</span>
            </button>
          </div>

          {/* Collapsible Technical Diagnostics for Developers */}
          <details className="group border border-slate-800 rounded-xl bg-slate-950 overflow-hidden text-xs">
            <summary className="flex items-center justify-between px-4 py-2.5 cursor-pointer text-slate-400 hover:text-slate-200 font-mono transition select-none">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Diagnostic Stack Trace & Component Hierarchy</span>
              </span>
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 border-t border-slate-800 font-mono text-[11px] text-slate-400 overflow-x-auto space-y-2 whitespace-pre-wrap">
              {this.state.error?.stack && (
                <div>
                  <span className="text-slate-300 font-bold block mb-1">Stack Trace:</span>
                  <div className="text-rose-400/90 bg-rose-950/20 p-2 rounded border border-rose-900/30">
                    {this.state.error.stack}
                  </div>
                </div>
              )}
              {this.state.errorInfo?.componentStack && (
                <div>
                  <span className="text-slate-300 font-bold block mb-1">Component Hierarchy:</span>
                  <div className="text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800">
                    {this.state.errorInfo.componentStack}
                  </div>
                </div>
              )}
            </div>
          </details>
        </OcaverseWatermarkContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
