export default function Section({ children, className = "" }) {
  return (
    <section className={`max-w-6xl mx-auto px-6 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}