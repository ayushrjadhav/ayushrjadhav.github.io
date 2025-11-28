import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const hideFooter = pathname.toLowerCase().includes("ayushai");

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-black/10">
        <nav className="max-w-6xl mx-auto h-14 px-6 flex items-center justify-between">
          <a href="/" className="font-semibold">Ayush</a>
          <div className="hidden md:flex gap-8 text-sm text-neutral-600">
            <a href="/">Home</a>
            <a href="/projects">Projects</a>
            <a href="/case-studies">Case Studies</a>
            <a href="/about">About</a>
            <a href="/AyushAI">AyushAI</a>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      {!hideFooter && (
        <footer className="border-t border-black/10 mt-24">
          <div className="max-w-6xl mx-auto px-6 py-12 text-sm text-neutral-500">
            Designed by Ayush.
          </div>
        </footer>
      )}
    </div>
  );
}