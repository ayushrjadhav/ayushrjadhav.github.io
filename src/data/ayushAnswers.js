export const ayushAnswers = [
  {
    question: "Why did you build TripRescue?",
    answer: "I built TripRescue around a specific problem: after a cancellation, I want to know which flight gets me there on time and what it will actually cost. I made it possible to compare the cheapest option with an earlier one and see what changes when you include transfers or baggage fees.",
    source: { label: "TripRescue case study", path: "/projects/trip-rescue" },
  },
  {
    question: "What tradeoff did you make in Wischeduler?",
    answer: "I used the language model to interpret what students meant and kept conflict checking in the scheduling engine. For example, preferring Tuesday and Thursday classes is flexible. Two required classes meeting at the same time is a conflict the solver has to enforce. That gave students a natural way to ask for a schedule while keeping the output checkable.",
    source: { label: "Wischeduler case study", path: "/projects/wischeduler" },
  },
  {
    question: "What did you learn moving from utility software into enterprise AI?",
    answer: "My work on outage management and dispatch taught me to pay attention to the workflow around the software. I bring that to enterprise AI by starting with the task someone needs to complete, then evaluating where an assistant can help and where it needs a clear fallback.",
    source: { label: "WEC experience", path: "/about#experience" },
  },
];
