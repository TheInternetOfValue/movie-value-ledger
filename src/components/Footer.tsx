import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-6">
      <div className="mx-auto max-w-[1400px] px-6 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-amber-500 transition-colors">
              About
            </Link>
            <Link href="/faq" className="hover:text-amber-500 transition-colors">
              Protocol FAQ
            </Link>
          </div>

          <div className="flex items-center gap-2">
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

          <div className="flex items-center gap-6">
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