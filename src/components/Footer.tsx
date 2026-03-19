import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/about" className="hover:text-gray-900">About</Link>
            <Link href="/faq" className="hover:text-gray-900">FAQ</Link>
            <Link href="/whitepaper" className="hover:text-gray-900">Whitepaper</Link>
            <a href="https://theinternetofvalue.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">The Internet of Value</a>
          </div>
          <div className="text-sm text-gray-500">
            Built by <a href="https://author.theinternetofvalue.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">Moses Sampaul</a>
          </div>
        </div>
      </div>
    </footer>
  );
}