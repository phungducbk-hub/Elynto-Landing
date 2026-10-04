import type { Dictionary } from "./types";

const alex = { name: "Alex", initials: "A" };
const sam = { name: "Sam", initials: "S" };
const jordan = { name: "Jordan", initials: "J" };
const me = { name: "You", initials: "Y", self: true };

export const en: Dictionary = {
  meta: {
    title: "Elynto — AI-powered work management",
    description:
      "Describe what needs to get done in plain words. Elynto helps you create and assign tasks, plan projects with AI and track progress in one place.",
    ogDescription:
      "Describe what needs to get done. Create and assign tasks, plan projects with AI and track progress in one place.",
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
    description:
      "Just describe what needs to get done. Elynto helps you create and assign tasks, plan projects with AI, and track progress, all in one place.",
    primaryCta: "Start free trial",
    secondaryCta: "See it in action",
  },
  demo: {
    label: "Illustrative demo",
    caption: "One sentence. A task with a clear owner and deadline.",
    regionLabel: "Illustrative demo: from one sentence to a task",
    srDescription:
      "Illustrative demo, not a live session in the app. The user writes: “Assign Alex to prepare the report, due Friday.” Elynto creates the task “Prepare the report”, owned by Alex, due Friday, status To do.",
    sentence: [
      "Assign ",
      { field: "assignee", text: "Alex" },
      " to ",
      { field: "task", text: "prepare the report" },
      ", ",
      { field: "due", text: "due Friday" },
      ".",
    ],
    fields: {
      assignee: "Owner",
      task: "Task",
      due: "Due date",
      status: "Status",
    },
    result: {
      assignee: alex,
      task: "Prepare the report",
      due: "Friday",
      status: "To do",
    },
    status: {
      idle: "New task",
      reading: "Reading your request…",
      created: "Task created",
    },
    controls: {
      pause: "Pause demo",
      play: "Resume demo",
      replay: "Replay demo",
    },
  },
  benefits: {
    title: "Focus on the work, not the tool",
    items: [
      {
        title: "Fewer steps to get started",
        body: "Write what needs doing the way you’d message a teammate. No forms to fill in, nothing complicated to learn.",
      },
      {
        title: "Clear owners, clear deadlines",
        body: "Every task has an owner, a due date and a status, so everyone is looking at the same picture.",
      },
      {
        title: "Progress in one place",
        body: "Follow personal tasks and projects in the view that fits: list, Kanban or calendar.",
      },
    ],
  },
  howItWorks: {
    title: "From what you want done to work that’s clear",
    intro:
      "Elynto turns a plain description into structured tasks, helps you plan, and lets you follow everything in clear, visual views.",
  },
  illustration: "Illustration",
  sentences: {
    name: "Create and assign tasks.",
    title: "Work starts with a single sentence.",
    body: "Write it the way you’d normally hand off work. Elynto picks out who’s doing it, what needs doing and when it’s due, then creates a task you can keep tracking and updating. You can always review and edit it directly.",
    tip: "Say what needs doing, who’s doing it and when it’s due for the most accurate result.",
    youWrite: "You write",
    elyntoCreates: "Elynto creates",
    fields: { assignee: "Owner", task: "Task", due: "Due" },
    rows: [
      {
        segments: [
          { field: "assignee", text: "Sam" },
          " to ",
          { field: "task", text: "draft the November campaign content" },
          " ",
          { field: "due", text: "by next Wednesday" },
          ".",
        ],
        task: "Draft the November campaign content",
        assignee: sam,
        due: "Next Wednesday",
      },
      {
        segments: [
          "Assign ",
          { field: "assignee", text: "Jordan" },
          " to ",
          { field: "task", text: "confirm the event venue" },
          " ",
          { field: "due", text: "before Monday" },
          ".",
        ],
        task: "Confirm the event venue",
        assignee: jordan,
        due: "Monday",
      },
      {
        segments: [
          { field: "assignee", text: "I" },
          " need to ",
          { field: "task", text: "send the quote to the client" },
          " ",
          { field: "due", text: "by tomorrow" },
          ".",
        ],
        task: "Send the quote to the client",
        assignee: me,
        due: "Tomorrow",
      },
    ],
    savedNote: "Every task is saved to your task list, not lost in a chat thread.",
  },
  planning: {
    name: "Plan projects with AI.",
    title: "From a goal to a plan you can start on.",
    body: "Type in your goal. AI sketches out the phases and the tasks in each one. You review, add, remove and adjust before creating the project.",
    steps: [
      {
        title: "Set the goal",
        body: "For example: “Plan a website launch in 3 weeks.”",
      },
      {
        title: "AI drafts the plan",
        body: "The goal is broken into phases, each with concrete tasks.",
      },
      {
        title: "You review and decide",
        body: "Edit the draft, then create the project and start tracking.",
      },
    ],
    note: "AI gives you a draft to start from. The final call is always yours.",
    mock: {
      goalLabel: "Goal",
      goal: "Plan a website launch in 3 weeks",
      draftTitle: "Draft suggested by AI",
      summary: "3 phases, 9 tasks",
      phaseLabel: "Phase",
      phases: [
        {
          name: "Prepare",
          tasks: ["Agree on goals and scope", "Gather copy and images", "Map out the pages"],
        },
        {
          name: "Design & build",
          tasks: ["Design the layout", "Build the pages", "Finalise the copy"],
        },
        {
          name: "Test & launch",
          tasks: ["Test on mobile and desktop", "Fix issues, final review", "Launch the website"],
        },
      ],
      reviewHint: "Review and edit before creating the project",
      edit: "Edit",
      create: "Create project",
    },
  },
  today: {
    name: "Today.",
    title: "Open Elynto. See what needs you.",
    body: "Overdue, due today and coming up, gathered in one place along with the tasks you’ve marked important. No digging through messages or piecing lists together.",
    points: [
      "Spot what’s running late at a glance.",
      "Know what needs finishing today.",
      "Get ahead of what’s due next.",
    ],
    mock: {
      title: "Today",
      importantLabel: "Important",
      groups: [
        {
          tone: "overdue",
          label: "Overdue",
          items: [{ title: "Send September invoice to client", project: "Clients", due: "Yesterday" }],
        },
        {
          tone: "today",
          label: "Due today",
          items: [
            { title: "Review this week’s posts", project: "Content campaign", due: "Today", important: true },
            { title: "Call to confirm the event venue", project: "Launch event", due: "Today" },
          ],
        },
        {
          tone: "upcoming",
          label: "Coming up",
          items: [
            { title: "Finalise the sitemap", project: "Website launch", due: "Thursday" },
            { title: "Pull together September numbers", project: "Reporting", due: "Friday", important: true },
          ],
        },
      ],
    },
  },
  views: {
    name: "Many views.",
    title: "From today’s tasks to the whole project.",
    body: "The same work, seen the way you need it. A list for a quick review, Kanban to follow status, and a calendar to see what’s due when.",
    projectBody:
      "Inside a project, Timeline gives an overview of each phase, while Gantt helps you plan in detail with milestones and dependencies between tasks.",
    tabsLabel: "Choose a view",
    projectLabel: "In a project",
    tabs: {
      list: { label: "List", description: "Review everything quickly, with due dates and status." },
      kanban: { label: "Kanban", description: "Follow task status column by column." },
      calendar: { label: "Calendar", description: "See tasks by their due date." },
      timeline: { label: "Timeline", description: "An overview of the project’s phases." },
      gantt: { label: "Gantt", description: "A detailed plan with milestones and dependencies." },
    },
    statuses: { todo: "To do", inProgress: "In progress", done: "Done" },
    listHeaders: { task: "Task", project: "Project", due: "Due", status: "Status" },
    weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    todayLabel: "Today",
    importantLabel: "Important",
    myWorkTitle: "My work",
    tasks: [
      { title: "Send quote to new client", project: "Clients", due: "Monday", day: 0, status: "done" },
      { title: "Review this week’s posts", project: "Content campaign", due: "Tuesday", day: 1, status: "inProgress", important: true },
      { title: "Call to confirm the venue", project: "Launch event", due: "Tuesday", day: 1, status: "todo" },
      { title: "Finalise the sitemap", project: "Website launch", due: "Thursday", day: 3, status: "inProgress" },
      { title: "Pull together September numbers", project: "Reporting", due: "Friday", day: 4, status: "todo", important: true },
      { title: "Confirm the guest list", project: "Launch event", due: "Friday", day: 4, status: "todo" },
    ],
    project: {
      name: "Website launch",
      weeks: ["Week 1", "Week 2", "Week 3"],
      phases: [
        { name: "Prepare", start: 0, end: 5 },
        { name: "Design & build", start: 5, end: 11 },
        { name: "Test & launch", start: 11, end: 15 },
      ],
      tasks: [
        { name: "Agree on goals and scope", start: 0, end: 2 },
        { name: "Gather copy and images", start: 2, end: 5, after: 0 },
        { name: "Map out the pages", start: 2, end: 5, after: 0 },
        { name: "Design the layout", start: 5, end: 8, after: 2 },
        { name: "Build the pages", start: 8, end: 11, after: 3 },
        { name: "Test and fix issues", start: 11, end: 14, after: 4 },
      ],
      milestones: [
        { name: "Design sign-off", at: 8 },
        { name: "Launch", at: 15 },
      ],
      milestoneLabel: "Milestone",
      dependencyLabel: "Dependency",
    },
  },
  audience: {
    title: "Fits the way you already work",
    items: [
      {
        title: "Working on your own",
        body: "Freelancers and solopreneurs keep personal to-dos and every client project in one place.",
        example: "Send the new project quote to the client by Thursday.",
      },
      {
        title: "Small teams",
        body: "Team leads and their teams know who owns what, when it’s due and how it’s going.",
        example: "Assign Jordan the weekly report, due Monday.",
      },
      {
        title: "Small business owners",
        body: "See where ongoing work stands without chasing each person for an update.",
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
        a: "Elynto is an AI-powered work management system. You describe what needs to get done in plain words, and Elynto helps turn it into tasks with an owner, a due date and a status. You can also plan projects with AI and track progress in one place.",
      },
      {
        id: "solo",
        q: "Can I use Elynto on my own?",
        a: "Yes. You can use Elynto to manage your own tasks and projects. When you work with others, you can assign tasks to each person so everyone knows what they own.",
      },
      {
        id: "prompt",
        q: "Do I need to know how to write prompts?",
        a: "No. Just write it the way you’d message a colleague: what needs doing, who’s doing it and when it’s due. Once a task is created, you can always review and edit it directly.",
      },
      {
        id: "language",
        q: "How does Elynto handle Vietnamese and English?",
        a: "This website is fully available in Vietnamese and English. In the app, you can describe tasks in either Vietnamese or English. Elynto is in beta, so some parts of the app may not be available in both languages yet.",
      },
      {
        id: "start",
        q: "Where do I start a free trial?",
        a: "Click “Start free trial” on this page to open Elynto at beta.elynto.io and get started. If you already have an account, choose “Log in”.",
      },
    ],
  },
  finalCta: {
    title: "Start with one thing you need to get done.",
    body: "Bring your work into Elynto and start managing it all in one place.",
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
