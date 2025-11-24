// src/core/ProjectCard.jsx
export default function ProjectCard({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="group w-full text-left rounded-2xl bg-white border border-black/10 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="p-4">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 border border-black/10 flex items-center justify-center">
          {item.cover ? (
            <img
              src={item.cover}
              alt={item.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <span className="text-neutral-400">Add {item.id} cover</span>
          )}
        </div>

        <h3 className="mt-4 text-xl font-semibold text-neutral-900">{item.title}</h3>
        <p className="mt-1 text-sm text-neutral-600">{item.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {item.stack.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 border border-black/10 text-neutral-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}