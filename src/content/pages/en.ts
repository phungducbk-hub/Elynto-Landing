import type { PagesDictionary } from "./types";

/**
 * Subpage copy. Describes only what the beta screenshots or the brief confirm; nothing about
 * pricing, integrations, automation or security that has not been verified.
 */
export const en: PagesDictionary = {
  "natural-language-tasks": {
    navLabel: "Tasks from a sentence",
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
    badge: "AI",
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
      "Today and My Work bring your tasks together: overdue, due today, coming up, and the ones you’ve marked important.",
    sections: [
      {
        heading: "Start the day here",
        body: [
          "Instead of digging through messages or piecing lists together, open Today to see what’s late and what needs finishing today.",
        ],
      },
      {
        heading: "Grouped by urgency",
        points: [
          "Overdue: past the due date.",
          "Due today: needs finishing today.",
          "Coming up: get ahead of the next few days.",
        ],
      },
      {
        heading: "Important work stays visible",
        body: ["Tasks you mark as important are kept apart, so they don’t get buried among small ones."],
      },
    ],
  },
  "project-views": {
    navLabel: "List, calendar, Gantt",
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
  "getting-started": {
    navLabel: "Getting started",
    eyebrow: "Guide",
    title: "Get started with Elynto in a few steps.",
    description: "From your first task to your first project: the basics of finding your way around Elynto.",
    sections: [
      {
        heading: "Open Elynto",
        body: ["Click Start free trial to open Elynto at beta.elynto.io. If you already have an account, choose Log in."],
      },
      {
        heading: "Create your first task",
        body: [
          "Write a sentence describing the work, for example “Send the quote to the client by tomorrow.” Elynto creates a task with a name and a due date.",
        ],
      },
      {
        heading: "Check and adjust",
        body: ["Review the owner, due date and priority. Edit directly if anything is off."],
      },
      {
        heading: "Assign work to others",
        body: [
          "Name the owner in the sentence, for example “Assign Alex to prepare the report, due Friday.” The owner needs to be a member of your team. Follow everything you’ve assigned in Delegated.",
        ],
      },
      {
        heading: "Plan a project",
        body: ["Enter a goal and let AI draft the phases and tasks. Adjust the draft, then create the project."],
      },
      {
        heading: "Each day, open Today",
        body: ["Start the day in Today or My Work to see what’s overdue, due and coming up."],
      },
    ],
  },
  "writing-tasks": {
    navLabel: "Writing good requests",
    eyebrow: "Guide",
    title: "Write requests Elynto gets right the first time.",
    description: "One sentence with a clear task, owner and deadline means a more accurate task and less fixing afterwards.",
    sections: [
      {
        heading: "Three things to include",
        points: [
          "What: start with a verb such as send, write, check or prepare.",
          "Who: the owner’s name. Leave it out if the task is yours.",
          "When: “by Friday”, “tomorrow afternoon”, “end of this week”.",
        ],
      },
      {
        heading: "Examples",
        points: [
          "“Assign Alex to prepare the report, due Friday.”",
          "“Ask Sam to draft the November campaign content by next Wednesday.”",
          "“Send the quote to the client by tomorrow.”",
        ],
      },
      {
        heading: "Avoid",
        points: [
          "Packing several tasks into one sentence. Split them so each task gets its own owner and deadline.",
          "Vague timing like “soon” or “when you can”.",
          "Nicknames that differ from the names in your team.",
        ],
      },
      {
        heading: "Always check the result",
        body: [
          "Elynto shows you the task it created. If the name, owner or deadline isn’t right, edit it directly. You always have the final say.",
        ],
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
  about: {
    navLabel: "About Elynto",
    eyebrow: "About Elynto",
    title: "Clearer work, starting with a sentence.",
    description:
      "Elynto is AI-powered work management. Describe the work in plain words; Elynto turns it into tasks with a clear owner and deadline, and helps you track everything in one place.",
    sections: [
      {
        heading: "Vision",
        body: [
          "“The interface between you and your work.” You describe what needs doing; Elynto helps turn it into tasks with an owner, a deadline and a status, so your energy goes into the work itself.",
        ],
      },
      {
        heading: "How Elynto is built",
        points: [
          "Getting started should be fast: one sentence instead of a form.",
          "AI suggests, you decide: every draft can be reviewed and edited.",
          "Clarity first: who’s doing what, by when, and how far along it is.",
        ],
      },
      {
        heading: "Who it’s for",
        body: [
          "Freelancers and solopreneurs juggling several projects, small teams who need to know who’s doing what, and small business owners who want the full picture without chasing each person.",
        ],
      },
      {
        heading: "Where we are",
        body: ["Elynto is in beta at beta.elynto.io and continues to be refined."],
      },
    ],
  },
  contact: {
    navLabel: "Contact",
    eyebrow: "Contact",
    title: "Contact Elynto",
    description: "Questions about the product, feedback or partnership ideas: get in touch.",
    sections: [],
  },
  privacy: {
    navLabel: "Privacy",
    eyebrow: "Legal",
    title: "Privacy on the Elynto website",
    description: "What this website stores in your browser, why, and for how long.",
    sections: [
      {
        heading: "Scope",
        body: [
          "This page covers the Elynto marketing website. Data you enter in the Elynto app at beta.elynto.io is outside its scope.",
        ],
      },
      {
        heading: "What is stored in your browser",
        body: [
          "When you pick a language, the website stores that choice in the elynto-lang cookie (for up to one year) and in your browser’s storage, so it opens in the right language next time. It is not used to identify you.",
        ],
      },
      {
        heading: "No third-party tracking",
        body: [
          "The website currently uses no third-party analytics, advertising or social media tools, and sets no third-party cookies.",
        ],
      },
      {
        heading: "No forms collecting your details",
        body: [
          "There are no sign-up or log-in forms on this website. The Start free trial and Log in buttons take you to the Elynto app at beta.elynto.io.",
        ],
      },
      {
        heading: "Technical logs",
        body: [
          "Like any website, the hosting server may keep technical access logs, such as IP address and time of visit, to run and protect the site.",
        ],
      },
      {
        heading: "Your choices",
        body: ["You can clear your saved language choice on the Cookies page or in your browser settings."],
      },
    ],
  },
  cookies: {
    navLabel: "Cookies",
    eyebrow: "Legal",
    title: "Cookies on the Elynto website",
    description: "The website uses a single cookie: to remember the language you chose.",
    sections: [
      {
        heading: "Cookies in use",
        table: {
          caption: "Cookies set by the Elynto website",
          columns: ["Name", "Purpose", "Duration", "Type"],
          rows: [["elynto-lang", "Remembers your language (Tiếng Việt or English)", "1 year", "Functional, set by Elynto"]],
        },
        body: [
          "When you open elynto.io, this cookie takes you straight to the language you chose. The choice is also kept in your browser’s storage (localStorage) under the same name.",
        ],
      },
      {
        heading: "No third-party cookies",
        body: ["The website sets no advertising, analytics or social media cookies."],
      },
      {
        heading: "Clear your saved choice",
        body: [
          "Use the button below to remove the cookie and the saved language. Next time, the website will follow your browser’s language settings.",
        ],
      },
    ],
  },
};
