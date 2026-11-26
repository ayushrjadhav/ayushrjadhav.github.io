import { Link } from "react-router-dom";
import AllProjectsLink from "../core/AllProjectsLink";
import HeroCharacter from "../core/HeroCharacter";
import { ProjectGrid } from "../core/ProjectGrid";
import { featuredProjects } from "../data/projectdata";

export default function Home() {
  return (
    <>
      <section className="shell hero">
        <div>
          <p className="eyebrow">Applied AI Engineer</p>
          <h1>Ayush Jadhav</h1>
          <p className="lede">I build enterprise AI applications for utility operations and decision support.</p>
          <div className="actions">
            <Link className="button" to="/projects">View projects</Link>
            <Link className="button secondary" to="/about#experience">View experience</Link>
          </div>
        </div>
        <HeroCharacter />
      </section>
      <section className="work-band">
        <div className="shell page-section">
          <div className="section-heading selected-projects-heading">
            <h2>Selected projects</h2>
            <AllProjectsLink />
          </div>
          <article className="flagship-project">
            <div className="flagship-copy">
              <p className="eyebrow">Featured project</p>
              <h3>TripRescue</h3>
              <p>Compare replacement flights after a cancellation based on when you need to arrive and what you can spend.</p>
              <Link className="button" to="/projects/trip-rescue">Read the case study</Link>
            </div>
            <figure className="flagship-demo">
              <video controls playsInline preload="none" poster="/trip-rescue-walkthrough-poster.webp" aria-label="TripRescue simulated chat walkthrough" aria-describedby="trip-demo-caption" width="960" height="540">
                <source src="/trip-rescue-walkthrough.mp4" type="video/mp4" />
                <a href="/trip-rescue-walkthrough.mp4">Open the TripRescue walkthrough</a>
              </video>
              <figcaption id="trip-demo-caption">Simulated chat and flights · Chicago to LaGuardia · 20 seconds</figcaption>
              <details>
                <summary>Read the walkthrough</summary>
                <p>Tell TripRescue in chat that your flight was canceled, your budget is $350, and you need to arrive by 6 PM Eastern. The $184 one-stop option arrives at 5:50 PM, and the $231 nonstop arrives at 5:15 PM. Tell the chat you can pay up to $50 more for an earlier arrival, and the nonstop becomes the recommendation. It saves 35 minutes for $47 more.</p>
              </details>
            </figure>
          </article>
          <ProjectGrid items={featuredProjects.filter(({ id }) => id !== "trip-rescue")} />
        </div>
      </section>
    </>
  );
}
