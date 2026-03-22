import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-8 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/30 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 flex-wrap">
            <Link href="/about" className="hover:text-amber-500 transition-colors">
              About
            </Link>
            <Link href="/faq" className="hover:text-amber-500 transition-colors">
              Protocol FAQ
            </Link>
            <Link href="/whitepaper" className="hover:text-amber-500 transition-colors">
              Whitepaper
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2">
            <span className="opacity-40 tracking-[0.1em]">Impact Intelligence by</span>
            <a 
              href="https://author.theinternetofvalue.xyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-amber-500 transition-all font-black underline decoration-white/10 underline-offset-8"
            >
              Moses Sam Paul
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 opacity-60">
            <span>Systems POV &copy; 2026</span>
            <a 
              href="https://theinternetofvalue.xyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              The Internet of Value
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}