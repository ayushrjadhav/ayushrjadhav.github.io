export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-black/10">
        <nav className="max-w-6xl mx-auto h-14 px-6 flex items-center justify-between">
          <a href="/" className="font-semibold">Ayush</a>
          <div className="hidden md:flex gap-8 text-sm text-neutral-600">
            <a href="/">Home</a>
            <a href="/projects">Projects</a>
            <a href="/about">About</a>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="border-t border-black/10 mt-24">
        <div className="max-w-6xl mx-auto px-6 py-12 text-sm text-neutral-500">
          Designed by Ayush in Madison.
        </div>
      </footer>
    </div>
  );
}