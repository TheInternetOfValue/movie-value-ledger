import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-4">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-amber-400 transition-colors text-white/60">About</Link>
            <span className="text-white/10">|</span>
            <span>
              Dhurandhar&apos;s Impact - 
              <a 
                href="https://theinternetofvalue.xyz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors px-1 underline decoration-white/10 underline-offset-4"
              >
                The Internet of Value&apos;s
              </a>
              Systems POV &copy; 2026
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Built by</span>
            <a 
              href="https://www.linkedin.com/in/mosessampaul/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/80 hover:text-amber-400 transition-all font-black tracking-widest"
            >
              Moses Sam Paul
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}