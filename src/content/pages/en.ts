import type { PagesDictionary } from "./types";
import { guidesEn } from "./trust/guides-en";
import { trustEn } from "./trust/en";

/**
 * Subpage copy. Describes only what the product references or the brief confirm; nothing about
 * pricing, integrations, automation or security that has not been verified.
 */
const existingPages = {
  "natural-language-tasks": {
    navLabel: "Create & assign work",
    eyebrow: "Create and assign",
    title: "Write one sentence. Get a clear task.",
    description:
      "Describe the work the way you’d message a colleague. Elynto picks out what needs doing, who owns it and when it’s due, and turns it into a task you can track.",
    sections: [
      {
        heading: "How it works",
        body: [
          "Write something like “Assign Alex to prepare the report, due Friday.” Elynto pulls out the task name, the owner and the due date, then creates the task with the status Assigned.",
        ],
      },
      {
        heading: "Always reviewable",
        body: [
          "The result appears right away: task name, owner, due date and priority. If anything is off, edit it directly on the task.",
        ],
      },
      {
        heading: "For your own work and work you hand off",
        points: [
          "Your own task: “Send the quote to the client by tomorrow.”",
          "Someone else’s: “Ask Sam to draft the November campaign content by next Wednesday.”",
        ],
      },
      {
        heading: "For more accurate results",
        points: [
          "Start with a verb: send, write, check, prepare.",
          "Use the owner’s name as it appears in your team.",
          "Be clear about timing: “by Friday”, “tomorrow afternoon”.",
        ],
      },
    ],
  },
  "ai-planning": {
    navLabel: "AI project planning",
    eyebrow: "Plan projects with AI",
    title: "From a goal to a plan with phases and tasks.",
    description:
      "Enter a goal and AI drafts the phases and tasks. You review, add, remove and adjust before the project is created.",
    sections: [
      {
        heading: "Start with the goal",
        body: [
          "Describe the goal in plain words, for example “Plan a website launch in 3 weeks.” The clearer the outcome and timing, the closer the draft gets to what you need.",
        ],
      },
      {
        heading: "AI drafts, you decide",
        body: [
          "AI suggests phases and the tasks within each one. It’s a draft: add, remove, rename or reorder before you create the project.",
        ],
      },
      {
        heading: "Once the project exists",
        body: [
          "The project starts with its phases and tasks in place. Assign the work and follow progress in list, calendar or Gantt view.",
        ],
      },
      {
        heading: "Writing a good goal",
        points: [
          "The end result: a website, a campaign, an event…",
          "The time frame: two weeks, by the end of the month…",
          "The main scope if you know it: pages, channels, workstreams.",
        ],
      },
    ],
  },
  "delegated-work": {
    navLabel: "Delegated work",
    eyebrow: "Follow up on delegated work",
    title: "Hand it off and still know where it stands.",
    description:
      "Delegated gathers everything you’ve handed to others in one place, with owner, due date and status, so you don’t have to chase each person.",
    sections: [
      {
        heading: "One place for everything you’ve assigned",
        body: [
          "Each task shows its owner, due date and current status. Overdue work is clearly marked, so you know where to check in first.",
        ],
      },
      {
        heading: "Statuses that show progress",
        body: ["Every task moves through clear steps:"],
        points: [
          "Draft: created, not yet assigned.",
          "Assigned: the owner has the task.",
          "Accepted: the owner has confirmed they’ll do it.",
          "In progress: the work is under way.",
          "Submitted: the result is in, waiting for your review.",
          "Approved, Completed: accepted and closed.",
        ],
      },
      {
        heading: "Not quite right? Rework",
        body: [
          "If the result isn’t what you need, move the task to Rework. The owner knows changes are needed, and the task stays on your list until it’s done.",
        ],
      },
    ],
  },
  today: {
    navLabel: "Today & My Work",
    eyebrow: "Every day",
    title: "Open Elynto. See what needs you.",
    description:
      "Today is where you start a request. My Work gathers your assigned work into Upcoming, Overdue, Rework and Completed tabs.",
    sections: [
      {
        heading: "Start the day here",
        body: [
          "Open My Work to see your assigned work, due dates, priorities and statuses.",
        ],
      },
      {
        heading: "Grouped by urgency",
        points: [
          "Overdue: past the due date.",
          "Rework: items that need another pass.",
          "Upcoming: keep track of what is coming next.",
        ],
      },
      {
        heading: "Important work stays visible",
        body: ["Flag important work and use Focus to concentrate on the items that need your attention."],
      },
    ],
  },
  "project-views": {
    navLabel: "Project views",
    eyebrow: "Track projects",
    title: "Every project, three ways to see it.",
    description:
      "The project page shows overall progress, overdue work and the schedule. See the tasks as a list by phase, a monthly calendar or a Gantt chart.",
    sections: [
      {
        heading: "Project overview",
        body: [
          "Percent complete, task count, overdue tasks, time left and the project’s overall health. When you need it, choose Analyse with AI for a read on how the project is going.",
        ],
      },
      {
        heading: "List by phase",
        body: ["Tasks are grouped by phase, with owner, start date, due date, priority and status."],
      },
      {
        heading: "Calendar",
        body: ["See tasks month by month to spot the busy weeks."],
      },
      {
        heading: "Gantt",
        body: ["See tasks on a timeline. Drag a bar to reschedule, and set milestones for the moments that matter."],
      },
    ],
  },


  faq: {
    navLabel: "FAQ",
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    description: "Things you might want to know before getting started with Elynto.",
    sections: [],
  },


} satisfies Partial<PagesDictionary>;

export const en: PagesDictionary = { ...existingPages, ...trustEn, ...guidesEn };
