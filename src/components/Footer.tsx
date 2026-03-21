import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-6">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-3 items-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
          {/* Left: About */}
          <div className="flex justify-start">
            <Link href="/about" className="hover:text-amber-400 transition-colors text-white/60">
              About
            </Link>
          </div>
          
          {/* Center: Main Line */}
          <div className="flex justify-center text-center">
            <span className="whitespace-nowrap">
              Movie&apos;s Impact - 
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
          
          {/* Right: Credit */}
          <div className="flex justify-end items-center gap-2">
            <span className="opacity-50">Built by</span>
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