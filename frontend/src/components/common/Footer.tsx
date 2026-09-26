export default function LegalFooter() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 py-4 px-6 text-center text-xs text-slate-400 print:hidden">
      <p>
        © {new Date().getFullYear()} <strong>Brainoro OS</strong> — Powered by <strong>OcaVerse.com</strong>.
      </p>
      <p className="mt-1 text-slate-500">
        All course content, notes, and modules are dynamically generated via Open Educational Resources (OER) frameworks. 
        Board names (CBSE, Cambridge, IB MYP) are referenced strictly for syllabus alignment purposes. Brainoro OS is independent and not endorsed by these entities.
      </p>
    </footer>
  );
}
