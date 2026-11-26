import CaseHero from "./CaseHero";

const summary = [
  ["Problem", "After a flight cancellation, travelers need to compare replacement routes, fares, and arrival times quickly. Transfers and baggage fees can make a cheap fare miss the real budget or deadline."],
  ["Role", "I built the chat and manual planning flows, the FastAPI backend, and the route planner that checks nearby airports and later departures within the traveler’s search window."],
  ["Outcome", "Travelers can compare replacement flights by total cost, arrival time, or stops. If no option qualifies, the app shows how much more time or budget an alternative would require."],
];

const architecture = [
  ["Trip intake and route planning", "Chat captures a structured trip draft, and the manual form lets travelers review or edit it. I capped each request at four flight searches to bound provider calls and keep the search focused during a disruption. Within that limit, the planner can try nearby airports or next-day departures."],
  ["Search and ranking", "The backend uses SerpApi for live fares and includes a simulator for demo scenarios. If a checked-bag fee is unknown, the app lists an otherwise qualifying flight as a possible match. Entering a verified fee recalculates the total against the budget. Eligible New York–Washington, DC searches can also show scheduled Amtrak services."],
];

export default function TripRescue({ project }) {
  return (
    <>
      <CaseHero
        title="TripRescue — Flight Cancellation Recovery"
        description="I built the chat and manual planning flows, route planner, and ranking engine so travelers can compare replacement flights against their real arrival deadline and total budget."
        image={project.cover}
        imageDimensions={{ width: 1100, height: 619 }}
        imageAlt="TripRescue showing trip inputs and simulated flight options"
        stats={[
          ["Trip entry", "Chat or form"],
          ["Flight search", "Live or simulated"],
          ["Ranking", "Cost, time, or stops"],
          ["Search limit", "4 per request"],
        ]}
      >
        <a className="button mt-6" href={project.links.live}>Open TripRescue</a>
      </CaseHero>

      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-3 gap-8">
        {summary.map(([heading, text]) => (
          <div key={heading}>
            <h2 className="text-xl font-semibold">{heading}</h2>
            <p className="mt-2 text-neutral-600">{text}</p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-6 md:py-10">
        <h2 className="text-2xl font-semibold">Architecture (High Level)</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-8">
          {architecture.map(([heading, text]) => (
            <div key={heading} className="rounded-2xl bg-white border border-black/10 p-6 shadow-sm">
              <h3 className="font-semibold">{heading}</h3>
              <p className="mt-2 text-neutral-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pt-6 pb-20">
        <h2 className="text-2xl font-semibold">Tech</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tool) => (
            <li key={tool} className="text-sm px-3 py-1.5 rounded-full bg-neutral-100 border border-black/10 text-neutral-700">
              {tool}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
