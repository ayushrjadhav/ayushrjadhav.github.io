export default function CaseHero({ category = "Project", title, description, image, imageAlt, imageDimensions, stats, children }) {
  return (
    <div className="bg-gradient-to-b from-neutral-50 to-white">
      <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-24">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">{category}</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-4 text-neutral-600">{description}</p>
            {children}
          </div>
          <div className={`rounded-2xl overflow-hidden border border-black/10 w-full ${imageDimensions ? "" : "aspect-[4/3]"}`}>
            <img
              src={image}
              alt={imageAlt}
              width={imageDimensions?.width}
              height={imageDimensions?.height}
              className={imageDimensions ? "block w-full h-auto" : "w-full h-full object-cover"}
            />
          </div>
        </div>
        <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white border border-black/10 p-4 shadow-sm">
              <dt className="text-sm text-neutral-500">{label}</dt>
              <dd className="text-xl md:text-2xl font-semibold mt-1">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
