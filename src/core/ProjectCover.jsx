import { FiArrowRight, FiCheck, FiMessageCircle } from "react-icons/fi";

function BoardingPasses() {
  return (
    <div className="cover-stage">
      <div className="cover-ticket cover-ticket-old"><strong>Canceled</strong><span /></div>
      <div className="cover-ticket cover-ticket-new"><strong>ORD <FiArrowRight /> LGA</strong><span /></div>
    </div>
  );
}

function Calendar() {
  return (
    <div className="cover-stage">
      <div className="cover-calendar">
        <span className="cover-calendar-block cover-calendar-first" />
        <span className="cover-calendar-block cover-calendar-second" />
        <span className="cover-calendar-check"><FiCheck /></span>
      </div>
    </div>
  );
}

function PowerLines() {
  return (
    <>
      <span className="cover-sun" />
      <span className="cover-hills" />
      <span className="cover-wire" />
      <span className="cover-pylon cover-pylon-far" />
      <span className="cover-pylon" />
    </>
  );
}

function CourseCards() {
  return (
    <div className="cover-stage">
      <div className="cover-course cover-course-back" />
      <div className="cover-course cover-course-front"><span /><span /><span /></div>
      <div className="cover-chat-bubble"><FiMessageCircle /></div>
    </div>
  );
}

const illustrations = {
  "trip-rescue": BoardingPasses,
  wischeduler: Calendar,
  "wildfire-ml": PowerLines,
  gradey: CourseCards,
};

export default function ProjectCover({ id }) {
  const Illustration = illustrations[id];

  return (
    <div className={`project-cover project-cover--${id}`} aria-hidden="true">
      {Illustration && <Illustration />}
    </div>
  );
}
