import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-4 px-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Intellectual Property & Trademark Notice</span>
        </div>
        <p className="text-center sm:text-right text-slate-400 max-w-3xl leading-relaxed">
          <strong>Brainoro</strong> is an independent learning OS. CBSE, Cambridge IGCSE, and IB MYP are registered trademarks of their respective owners. Reference to these curricula is strictly for educational alignment and compatibility purposes. Brainoro is not affiliated with, endorsed by, or sponsored by any official examination board.
        </p>
      </div>
    </footer>
  );
};
