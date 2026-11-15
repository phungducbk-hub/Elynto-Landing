import type { Dictionary } from "./types";

const alex = { name: "Alex", initials: "A" };
const sam = { name: "Sam", initials: "S" };
const jordan = { name: "Jordan", initials: "J" };
const me = { name: "You", initials: "Y", self: true };

export const en: Dictionary = {
  meta: {
    title: "Elynto - AI-powered work management",
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
    home: "Elynto - back to top",
    language: "Language",
  },
  hero: {
    eyebrow: "Elynto - AI-powered work management",
    description: "Elynto helps freelancers and small teams create work, plan projects, discuss and follow progress in one place.",
    primaryCta: "Start free trial",
    secondaryCta: "See it in action",
  },
  demo: {
    badge: "Illustrative demo",
    caption: "One sentence. A task with a clear owner and deadline.",
    regionLabel: "Illustrative demo: from one sentence to a task",
    srDescription:
      "Illustrative demo, not a live session in the app. The user writes: “Assign Alex to prepare the quotation, due Friday.” Elynto creates the task “Prepare the quotation”, assigned to Alex, due 20/11/2026, status Assigned.",
    placeholder: "What needs to get done?",
    command: "Assign Alex to prepare the quotation, due Friday.",
    send: "Send",
    newTask: "New task",
    processing: "Creating task…",
    success: "Task created",
    fields: {
      task: "Task",
      assignee: "Owner",
      due: "Due date",
      status: "Status",
    },
    result: {
      task: "Prepare the quotation",
      assignee: alex,
      due: "20/11/2026",
      status: "Assigned",
    },
    controls: {
      play: "Play demo",
      pause: "Pause demo",
      replay: "Replay from the start",
    },
  },
  benefits: {
    eyebrow: "Benefits",
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
        body: "Follow personal tasks and projects in the view that fits: list, calendar or Gantt.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "One flow, from intent to outcome.",
    intro:
      "Elynto turns a plain description into structured tasks, helps you plan, and lets you follow everything in clear, visual views.",
  },
  illustration: "Illustrative Elynto interface · Sample data",
  command: {
    eyebrow: "Create and assign tasks",
    title: "Work starts with a single sentence.",
    body: "Write it the way you’d normally hand off work. Elynto picks out the task, the owner and the deadline, then creates a task you can keep tracking and updating.",
    points: [
      "Tasks are saved - nothing gets lost in a chat thread.",
      "You can always review and edit directly.",
      "Works for your own to-dos and for work you hand to others.",
    ],
    tip: "Tip: say what needs doing, who’s doing it and when it’s due for the most accurate result.",
    examplesLabel: "Pick an example",
    legend: {
      task: "Task",
      assignee: "Owner",
      due: "Due date",
    },
    resultLabel: "Task created",
    savedLabel: "Saved to your task list",
    newBadge: "New",
    examples: [
      {
        id: "report",
        label: "Assign a task",
        segments: [
          "Assign ",
          { field: "assignee", text: "Alex" },
          " to ",
          { field: "task", text: "prepare the quotation" },
          ", ",
          { field: "due", text: "due Friday" },
          ".",
        ],
        task: "Prepare the quotation",
        assignee: alex,
        due: "20/11/2026",
      },
      {
        id: "campaign",
        label: "Team task",
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
        due: "18/11/2026",
      },
      {
        id: "quote",
        label: "Your own task",
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
        due: "15/11/2026",
      },
    ],
    existing: [
      { title: "Review this week’s posts", assignee: sam, due: "Thursday" },
      { title: "Confirm the event venue", assignee: jordan, due: "Monday" },
    ],
  },
  planning: {
    eyebrow: "Plan projects with AI",
    title: "From one goal to a plan you can act on.",
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
      draftTitle: "Draft plan",
      aiBadge: "Suggested by AI",
      summary: "3 phases · 9 tasks",
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
  collaboration: {
    eyebrow: "Connected teamwork",
    title: "Chat, meet and move work forward. Together.",
    body: "Keep conversations, meetings and video calls alongside the work in Elynto. Everyone shares the context and knows what comes next, without piecing together updates across separate platforms.",
    points: [
      "Talk directly, in a group or with your project team.",
      "Arrange meetings and connect on video inside Elynto.",
      "Discuss work with its owner, deadline and status in view.",
    ],
    mock: {
      imageAlt: "An Asian team meeting in front of a large screen showing an Elynto video call with remote colleagues",
      aiTitle: "AI captures decisions. Assign work in the meeting.",
      conclusionLabel: "Decision",
      conclusion: "Agree on the website launch plan.",
      taskLabel: "Action to assign",
      task: "Finalise the website content",
      assignee: "Sam",
      due: "20/11/2026",
      action: "Review & assign",
      caption: "Illustrative meeting and AI Summary · Sample data",
    },
  },
  today: {
    eyebrow: "Every day",
    title: "Open Elynto. See what needs you.",
    body: "My Work gathers the work assigned to you into Upcoming, Overdue, Rework and Completed tabs. Due dates, priorities and statuses stay visible in each row.",
    points: [
      "Spot what’s running late at a glance.",
      "Track work in progress and items that need rework.",
      "Flag important work to keep your focus.",
    ],
    mock: {
      title: "Today",
      subtitle: "My work",
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
    eyebrow: "Follow your projects",
    title: "From today’s tasks to the whole project.",
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
        { label: "Start", value: "5 Oct 2026" },
        { label: "Due", value: "25 Oct 2026" },
      ],
      progress: 25,
      healthLabel: "Project health",
      health: "On track",
      healthNote: "Nothing needs handling right now.",
      analyse: "Analyse with AI",
      viewsLabel: "Project views",
      views: { list: "List", calendar: "Calendar", gantt: "Gantt" },
      dragHint: "Sample schedule. Editing is available in the Elynto app.",
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
  delegate: {
    eyebrow: "Follow up on delegated work",
    title: "Assigned it? Always know where it stands.",
    body: "Each task moves through clear statuses, from assigned to approved. Delegated gathers everything you’ve handed to others in one place, with owner, due date and status.",
    points: [
      "See who has accepted, who’s working and what’s been submitted.",
      "Overdue work is clearly marked.",
      "Not quite right? Send it to Rework.",
    ],
    view: {
      title: "Delegated",
      count: "5 tasks",
      flowLabel: "How a task moves",
      flow: ["assigned", "accepted", "inProgress", "submitted", "approved"],
      reworkNote: "Not quite right? Send it to Rework.",
      columns: { task: "Task", assignee: "Owner", due: "Due", status: "Status" },
      rows: [
        { title: "Prepare the quotation", assignee: alex, due: 9, status: "submitted" },
        { title: "Write the services page copy", assignee: sam, due: 10, status: "inProgress" },
        { title: "Update pricing on the website", assignee: jordan, due: 7, status: "inProgress", overdue: true },
        { title: "Prepare product photos", assignee: jordan, due: 12, status: "accepted" },
        { title: "Schedule November posts", assignee: sam, due: 15, status: "assigned" },
      ],
    },
  },
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
  audience: {
    eyebrow: "Who it’s for",
    title: "Fits the way you already work",
    examplesLabel: "For example",
    items: [
      {
        title: "Working on your own",
        who: "Freelancers and solopreneurs",
        body: "Keep personal to-dos and every client project in one place.",
        examples: ["Send a quote to a client", "Hand over a design"],
      },
      {
        title: "Small teams",
        who: "Team leads",
        body: "Everyone knows what they own, when it’s due and how it’s going.",
        examples: ["Prepare a content campaign", "Write the weekly report"],
      },
      {
        title: "Small business owners",
        who: "Running many things at once",
        body: "See where ongoing work stands without chasing each person for an update.",
        examples: ["Organise an event", "Launch a new website"],
      },
    ],
  },
  voices: {
    eyebrow: "Sound familiar?",
    title: "The moments when work starts to slip",
    intro:
      "Assigning over chat, tracking from memory, asking everyone for updates. Elynto is built for exactly these moments.",
    note: "Typical situations drawn from our research into how small teams and freelancers work, not quotes from specific customers.",
    regionLabel: "Common work situations",
    pause: "Pause motion",
    play: "Resume motion",
    personas: {
      agency: "Service team owner",
      freelancer: "Freelancer with several clients",
      lead: "Team lead",
      owner: "Small business owner",
      member: "Team member",
    },
    // Order matters: the wall slices these into three columns of three, so each column mixes roles.
    items: [
      {
        persona: "agency",
        moment: "Right after assigning",
        quote: "I've handed it off, but I'm still not sure they understood it, accepted it or know when it's due.",
      },
      {
        persona: "freelancer",
        moment: "First thing in the morning",
        quote: "I know I'm busy. I just don't know which task to start with.",
      },
      {
        persona: "owner",
        moment: "On a day you're away",
        quote: "Too much of the work lives in my head. If I'm out for a day, the team has to call me.",
      },
      {
        persona: "freelancer",
        moment: "When clients all need it now",
        quote: "Three clients message at once. By the time I've taken on the new work, I've forgotten what I promised the last one.",
      },
      {
        persona: "member",
        moment: "When work is handed to you",
        quote: "Tasks arrive scattered across chats. I have to note down myself what comes first and when it's due.",
      },
      {
        persona: "agency",
        moment: "As a deadline gets close",
        quote: "Delays only surface right before delivery. Then I'm the one chasing people and putting out fires.",
      },
      {
        persona: "lead",
        moment: "When you need a status update",
        quote: "Not everyone updates regularly, so the tracker is only accurate for the first few days.",
      },
      {
        persona: "agency",
        moment: "When a client asks “where are we?”",
        quote: "Every time a client asks, I have to dig through group chats and spreadsheets before I can answer.",
      },
      {
        persona: "freelancer",
        moment: "When you close the laptop",
        quote: "The laptop's closed, but I'm still carrying tomorrow's whole to-do list in my head.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    intro: "A few things you might want to know before you start.",
    items: [
      { id: "what", q: "What is Elynto?", a: "Elynto is an AI-powered work management system for freelancers and small teams. Describe what needs to happen, then keep work, project plans and conversations in one place." },
      { id: "solo", q: "Can I use Elynto on my own?", a: "Yes. You can use Elynto to manage your own tasks and projects. When you work with others, assign work so everyone knows what they own." },
      { id: "prompt", q: "Do I need to know how to write prompts?", a: "No. Write as you would to a colleague: what needs doing, who owns it and when it is due. Once work is created, you can review and edit it directly." },
      { id: "trial", q: "Can I try it before signing up?", a: "Yes. The interactive demo uses sample data and needs no account or payment card. Choose a request, see the work card and open the new task in My Work." },
      { id: "teamwork", q: "Can our team discuss work inside Elynto?", a: "Yes. Chat, meetings and video calls let your team discuss work in one place, keeping conversations connected to the project instead of scattered across platforms." },
      { id: "tracking", q: "How do I follow work after assigning it?", a: "Open Delegated to see owners, due dates and statuses. List, Calendar and Gantt views help you follow each task in the context of the whole project." },
      { id: "privacy", q: "Does the demo use my real work data?", a: "No. The demo uses fictional browser-local data. It does not call an AI service or create work in your account. The Website privacy page explains the website usage statistics collected on this site." },
      { id: "language", q: "How does Elynto support Vietnamese and English?", a: "The website and demo are available in Vietnamese and English. Use the language selector in the footer to switch." },
      { id: "start", q: "How do I get started?", a: "Choose Start free trial to create an account, or Log in if you already have one. The Getting started and Writing effective requests guides help you find your way around Elynto." },
    ],
  },
  finalCta: {
    title: "Give your first task a clear place to land.",
    body: "Explore the sample experience, then start your free trial when you are ready.",
    cta: "Start free trial",
    loginPrompt: "Already have an account?",
    login: "Log in",
  },
  footer: {
    tagline: "AI-powered work management",
    navLabel: "Footer links",
    rights: "Elynto.",
    languageLabel: "Language",
    groups: {
      product: "Product",
      resources: "Resources",
      company: "Company",
      legal: "Legal",
    },
    legalLabel: "Legal",
  },
  subpage: {
    breadcrumbLabel: "Breadcrumb",
    home: "Home",
    related: {
      product: "More features",
      resources: "More resources",
      company: "More about Elynto",
      legal: "More legal information",
    },
    updated: "Last updated: 4 October 2026",
    step: "Step",
    contact: {
      emailLabel: "Email",
      pending: "Find answers in the guides below, or get started with Elynto.",
      helpTitle: "Your answer may already be here",
      helpBody: "Many questions about getting started and using Elynto are covered on these pages.",
    },
    cookies: {
      clear: "Clear my saved language",
      cleared: "Done. The website no longer stores your language choice.",
    },
    stats: {
      on: "Statistics are on for this browser.",
      off: "Off. Visits from this browser are not recorded.",
      signal: "Your browser sends Do Not Track or Global Privacy Control, so your visits are not recorded.",
      disable: "Don’t record my visits",
      enable: "Turn statistics back on",
    },
  },
};
