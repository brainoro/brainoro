'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LegalFooter() {
  const pathname = usePathname();

  // Hide the global dark footer on dedicated full-screen auth pages (login / signup)
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 py-4 px-6 text-center text-xs text-slate-400 print:hidden">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-1">
        <span>
          © {new Date().getFullYear()} <strong>Brainoro - Own your Prep</strong> — Powered by{' '}
          <a
            href="https://ocaverse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 font-bold hover:underline transition"
          >
            OcaVerse.com
          </a>
        </span>
        <span className="text-slate-600">•</span>
        <Link
          href="/support"
          className="text-sky-400 hover:text-sky-300 font-semibold transition inline-flex items-center gap-1"
        >
          <span>Need Help? Helpdesk & Support Ticket</span>
        </Link>
        <span className="text-slate-600">•</span>
        <Link
          href="/privacy"
          className="text-sky-400 hover:text-sky-300 font-semibold transition inline-flex items-center gap-1"
        >
          <span>Privacy Policy</span>
        </Link>
      </div>
      <p className="mt-1 text-slate-500">
        All course content, notes, and modules are dynamically generated via Open Educational Resources (OER) frameworks. 
        Board names (CBSE, Cambridge, IB MYP) are referenced strictly for syllabus alignment purposes. Brainoro OS is independent and not endorsed by these entities.
      </p>
    </footer>
  );
}

