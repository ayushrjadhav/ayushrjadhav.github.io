import { Link } from "react-router-dom";

export default function HeroCharacter() {
  return (
    <div className="hero-character">
      <div className="character-scene">
        <div className="character-pose">
          <img className="character-image" src="/ayush-character.webp" alt="Illustration of Ayush waving and holding an iced latte" width="760" height="760" fetchPriority="high" />
          <img className="character-wave" src="/ayush-character.webp" alt="" aria-hidden="true" width="760" height="760" />
        </div>
      </div>
      <Link className="button character-cta" to="/AyushAI">Ask me</Link>
    </div>
  );
}
