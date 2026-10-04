import type { Dictionary } from "./types";

const alex = { name: "Alex Tran", initials: "A" };
const sam = { name: "Sam Pham", initials: "S" };
const jordan = { name: "Jordan Le", initials: "J" };
const me = { name: "You", initials: "Y", self: true };

export const en: Dictionary = {
  meta: {
    title: "Elynto — AI-powered work management",
    description:
      "Clear tasks, clear owners, clear progress. Write what needs doing in plain words; Elynto creates and assigns the task, plans projects with AI and keeps all your work in one place.",
    ogDescription: "Clear tasks, clear owners, clear progress.",
  },
  a11y: {
    skipToContent: "Skip to main content",
  },
  nav: {
    benefits: "Benefits",
    howItWorks: "How it works",
    faq: "FAQ",
    login: "Log in",
    startTrial: "Start free trial",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    home: "Elynto, back to top",
    language: "Language",
  },
  hero: {
    label: "AI-powered work management",
    promise: "Clear tasks, clear owners, clear progress.",
    description:
      "Write what needs doing the way you’d message a teammate. Elynto creates and assigns the task, helps you plan projects with AI, and keeps all your work in one place.",
    primaryCta: "Start free trial",
    secondaryCta: "See it in action",
  },
  demo: {
    label: "Illustrative demo",
    caption: "One sentence. A task with a clear owner and deadline.",
    regionLabel: "Illustrative demo: from one sentence to a task",
    srDescription:
      "Illustrative demo, not a live session in the app. The user writes: “Assign Alex to prepare the quote, due Friday.” Elynto creates the task “Prepare the quote”, assigned to Alex Tran, due Friday, October 9 at 23:59, medium priority.",
    sentence: [
      "Assign ",
      { field: "assignee", text: "Alex" },
      " to ",
      { field: "task", text: "prepare the quote" },
      ", ",
      { field: "due", text: "due Friday" },
      ".",
    ],
    fields: {
      assignee: "Assigned to",
      task: "Task",
      due: "Due",
      priority: "Priority",
    },
    result: {
      assignee: alex,
      task: "Prepare the quote",
      due: "Fri, Oct 9, 23:59",
      priority: "Medium",
    },
    status: {
      idle: "New task",
      reading: "Reading your request…",
      created: "Task created",
    },
    open: "Open task",
    controls: {
      pause: "Pause demo",
      play: "Resume demo",
      replay: "Replay demo",
    },
  },
  problems: {
    title: "Assigned the work, still chasing updates?",
    intro: "If these sound familiar, Elynto helps you forget less, chase less and end the day with peace of mind.",
    beforeLabel: "What happens now",
    afterLabel: "With Elynto",
    rows: [
      {
        before: "You hand off work in a group chat, but you’re never sure it was understood, accepted, or that the deadline stuck.",
        afterTitle: "Assign in one sentence, see who’s accepted.",
        afterBody:
          "Every task has an owner, a due date and a priority. When the owner moves it to Accepted, you see it without asking.",
      },
      {
        before: "A client asks how it’s going, and you dig through chat threads and spreadsheets to piece it together.",
        afterTitle: "Progress, already in one place.",
        afterBody:
          "Each project shows how much is done, what’s overdue and how many days are left, clear enough to answer a client or prep a meeting.",
      },
      {
        before: "Delays only surface right before the deadline, and you end up chasing everyone.",
        afterTitle: "Spot slipping work sooner.",
        afterBody: "Overdue work is always marked, and project health sits at the top of the page so you can step in early.",
      },
      {
        before: "Several projects at once, and you’re still not sure what to start on this morning.",
        afterTitle: "Open Elynto, know what comes first.",
        afterBody: "Today gathers overdue, due and high-priority work from every project into one list.",
      },
    ],
  },
  howItWorks: {
    title: "From one sentence to work that lands on time",
    intro:
      "Elynto turns a plain description into structured tasks, helps you plan projects, and lets you follow everything in clear, visual views.",
  },
  illustration: "Illustration based on the Elynto interface",
  app: {
    workspace: "Sample Co.",
    nav: {
      today: "Today",
      inbox: "Inbox",
      myWork: "My Work",
      delegated: "Delegated",
      projects: "Projects",
      team: "Team",
      reports: "Reports",
      knowledge: "Knowledge",
    },
    statuses: {
      draft: "Draft",
      assigned: "Assigned",
      accepted: "Accepted",
      inProgress: "In progress",
      submitted: "Submitted",
      rework: "Rework",
      approved: "Approved",
      completed: "Completed",
    },
    priorities: { high: "High", medium: "Medium" },
    datePattern: "Oct {d}",
    weekdaysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    monthTitle: "October",
    todayLabel: "Today",
    overdueLabel: "Overdue",
    barLegend: { done: "Done", active: "Underway", notStarted: "Not started" },
  },
  delegate: {
    name: "Assign and follow up.",
    title: "Assign in one sentence. Always know where it stands.",
    body: "Write it the way you’d normally hand off work. Elynto picks out the owner, the task and the deadline, and creates it right away. Each task moves through clear statuses from assigned to approved, and Delegated gathers everything you’ve handed off in one place.",
    tip: "Say what needs doing, who’s doing it and when it’s due for the most accurate result.",
    view: {
      title: "Delegated",
      count: "5 tasks",
      flowLabel: "How a task moves",
      flow: ["assigned", "accepted", "inProgress", "submitted", "approved"],
      reworkNote: "Not quite right? Send it to Rework.",
      columns: { task: "Task", assignee: "Owner", due: "Due", status: "Status" },
      rows: [
        { title: "Prepare the quote", assignee: alex, due: 9, status: "submitted" },
        { title: "Write the services page copy", assignee: sam, due: 10, status: "inProgress" },
        { title: "Update pricing on the website", assignee: jordan, due: 7, status: "inProgress", overdue: true },
        { title: "Prepare product photos", assignee: jordan, due: 12, status: "accepted" },
        { title: "Schedule November posts", assignee: sam, due: 15, status: "assigned" },
      ],
    },
  },
  planning: {
    name: "Plan projects with AI.",
    title: "From a goal to a plan you can start on.",
    body: "Describe your goal. AI sketches out the phases, the tasks and the dates for each one. You review, add, remove and adjust before creating the project.",
    steps: [
      {
        title: "Set the goal",
        body: "For example: “Design our company website in 3 weeks.”",
      },
      {
        title: "AI drafts the plan",
        body: "The goal is broken into a few phases, each with concrete tasks and start and due dates.",
      },
      {
        title: "You review and decide",
        body: "Edit the draft, create the project and start on the first task.",
      },
    ],
    note: "AI gives you a draft to start from. The final call is always yours.",
    mock: {
      goalLabel: "Goal",
      goal: "Design our company website in 3 weeks",
      draftTitle: "Draft suggested by AI",
      summary: "4 phases, 12 tasks",
      phaseLabel: "Phase",
      reviewHint: "Review and edit before creating the project",
      edit: "Edit",
      create: "Create project",
    },
  },
  project: {
    name: "Follow your projects.",
    title: "Know where things stand without asking everyone.",
    body: "Every project has an overview: how much is done, what’s overdue, how many days are left and its overall health. To go deeper, switch to the list by phase, the month calendar or the Gantt chart.",
    points: [
      "Drag a Gantt bar to reschedule or change its due date.",
      "Set milestones; they can complete themselves when their linked work is done.",
      "When you need to, analyse project health with AI.",
    ],
    data: {
      back: "Projects",
      name: "Website design",
      tags: ["Strategic", "Active"],
      privacy: "Private",
      description:
        "Finish the website design in 3 weeks, from research and wireframes to detailed layouts and a design system, ready to hand over to development.",
      stats: [
        { label: "Progress", value: "25%" },
        { label: "Work", value: "12 tasks" },
        { label: "Overdue", value: "None" },
        { label: "Schedule", value: "16 days left" },
        { label: "Dates", value: "Oct 5 – Oct 25" },
      ],
      progress: 25,
      healthLabel: "Project health",
      health: "On track",
      healthNote: "Nothing needs handling right now.",
      analyse: "Analyse with AI",
      viewsLabel: "Project views",
      views: { list: "List", calendar: "Calendar", gantt: "Gantt" },
      dragHint: "Drag a bar to move it, or its edge to change the start or due date.",
      columns: {
        task: "Task",
        assignee: "Owner",
        start: "Start",
        due: "Due",
        priority: "Priority",
        status: "Status",
      },
      phases: [
        {
          name: "Research and ideas",
          tasks: [
            { title: "Gather website goals and requirements", assignee: me, start: 5, due: 7, priority: "high", status: "completed" },
            { title: "Research competitors and design trends", assignee: sam, start: 6, due: 8, priority: "medium", status: "completed" },
            { title: "Build a moodboard and visual direction", assignee: sam, start: 8, due: 9, priority: "medium", status: "submitted" },
          ],
        },
        {
          name: "Sitemap and wireframes",
          tasks: [
            { title: "Map out the sitemap", assignee: alex, start: 9, due: 10, priority: "high", status: "completed" },
            { title: "Wireframe the home page", assignee: alex, start: 10, due: 12, priority: "high", status: "accepted" },
            { title: "Wireframe the inner pages", assignee: jordan, start: 12, due: 14, priority: "medium", status: "assigned" },
          ],
        },
        {
          name: "Detailed design",
          tasks: [
            { title: "Design the home page", assignee: me, start: 14, due: 17, priority: "high", status: "assigned" },
            { title: "Design the inner pages", assignee: sam, start: 17, due: 20, priority: "medium", status: "assigned" },
            { title: "Design the responsive layouts", assignee: alex, start: 19, due: 22, priority: "medium", status: "assigned" },
          ],
        },
        {
          name: "Design system and handover",
          tasks: [
            { title: "Build the design system", assignee: jordan, start: 20, due: 23, priority: "medium", status: "draft" },
            { title: "Create an interactive prototype", assignee: alex, start: 22, due: 23, priority: "medium", status: "draft" },
            { title: "Final review and handover", assignee: me, start: 24, due: 25, priority: "high", status: "draft" },
          ],
        },
      ],
    },
  },
  today: {
    name: "Today.",
    title: "Juggling several projects? Know what comes first.",
    body: "Today gathers overdue, due and upcoming work from every project, with its priority. No digging through messages or rebuilding your list each morning.",
    points: [
      "Spot what’s running late at a glance.",
      "Know what needs finishing today.",
      "End the day knowing what’s done and what’s left.",
    ],
    mock: {
      groups: [
        {
          tone: "overdue",
          label: "Overdue",
          items: [{ title: "Send logo sketches to the client", project: "Brand identity", due: "Yesterday", priority: "high" }],
        },
        {
          tone: "today",
          label: "Due today",
          items: [
            { title: "Review this week’s posts", project: "November campaign", due: "Today", priority: "high" },
            { title: "Confirm the photo shoot", project: "Company website", due: "Today", priority: "medium" },
          ],
        },
        {
          tone: "upcoming",
          label: "Coming up",
          items: [
            { title: "Finish the home page wireframe", project: "Company website", due: "Monday", priority: "medium" },
            { title: "Send the October invoice", project: "Personal", due: "Tuesday", priority: "medium" },
          ],
        },
      ],
    },
  },
  audience: {
    title: "For people who run the work and do the work",
    items: [
      {
        title: "Agency and service-team owners",
        question: "Why am I still chasing updates after assigning the work?",
        body: "Marketing, content, design or consulting teams with many client projects: assign clearly, follow everything in one place, answer clients with confidence.",
        example: "Assign Sam to write the services page, due Wednesday.",
      },
      {
        title: "Freelancers with many projects",
        question: "Several projects at once. What should I do this morning?",
        body: "Start on your own right away, no team needed. Capture work in one sentence and follow both one-off tasks and each client project.",
        example: "Send the logo design to the client by Thursday.",
      },
      {
        title: "Small business owners",
        question: "How does work keep moving when I’m not around?",
        body: "Clear ownership and progress. See the overview first, open the details when you need them, and spot where help is needed early.",
        example: "Plan our launch event in 2 weeks.",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    intro: "A few things you might want to know before you start.",
    items: [
      {
        id: "what",
        q: "What is Elynto?",
        a: "Elynto is an AI-powered work management system. You describe what needs doing in plain words, and Elynto turns it into a task with an owner, a due date and a priority. You can also plan projects with AI and track progress in one place.",
      },
      {
        id: "mistake",
        q: "What if the AI gets a name or a deadline wrong?",
        a: "After each sentence, Elynto shows the task name, owner, due date and priority it created. If anything’s off, open the task and edit it directly. Saying what needs doing, who’s doing it and when it’s due helps it get things right.",
      },
      {
        id: "solo",
        q: "Can I use Elynto on my own?",
        a: "Yes. You can start on your own right away, no team or invitations needed. When you work with others, assign tasks to each person and follow them in Delegated.",
      },
      {
        id: "prompt",
        q: "Do I need to know how to write prompts?",
        a: "No. Just write it the way you’d message a colleague: what needs doing, who’s doing it and when it’s due.",
      },
      {
        id: "language",
        q: "How does Elynto handle Vietnamese and English?",
        a: "You can write requests in Vietnamese or English. This website is available in both. During the beta, most of the app interface is shown in English.",
      },
      {
        id: "start",
        q: "Where do I start a free trial?",
        a: "Click “Start free trial” on this page to open Elynto at beta.elynto.io. The easiest way to begin is with a project you’re already running: assign a few tasks, let people update them, then follow progress in one place.",
      },
    ],
  },
  finalCta: {
    title: "Start with one thing you need to get done.",
    body: "Bring a project you’re already running into Elynto: assign a few tasks, let people update them, and follow progress without asking in chat.",
    cta: "Start free trial",
    loginPrompt: "Already have an account?",
    login: "Log in",
  },
  footer: {
    tagline: "AI-powered work management",
    navLabel: "Footer links",
    rights: "Elynto.",
    languageLabel: "Language",
  },
};
