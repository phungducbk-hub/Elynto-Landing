/**
 * Feature flags for product capabilities shown on the landing page.
 *
 * Only switch a flag on after confirming the capability is live in the current
 * version of the app — the landing page must not present roadmap items as
 * available features.
 */
const flag = (value: string | undefined) => value === "true";

export const features = {
  /** "Timeline" tab (phase overview) inside the project views showcase. */
  projectTimeline: flag(process.env.NEXT_PUBLIC_FEATURE_PROJECT_TIMELINE),
  /** "Gantt" tab (detailed plan with milestones and dependencies). */
  projectGantt: flag(process.env.NEXT_PUBLIC_FEATURE_PROJECT_GANTT),
} as const;
