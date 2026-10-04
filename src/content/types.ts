import type { Locale } from "@/lib/i18n";

/** Parts of a natural-language request that become task fields. */
export type FieldKey = "assignee" | "task" | "due";

/** A sentence split into plain text and the spans Elynto turns into fields. */
export type Segment = string | { field: FieldKey; text: string };

export type Person = {
  name: string;
  initials: string;
  /** The signed-in user ("you"). Rendered with a person icon instead of initials. */
  self?: boolean;
};

export type TaskStatus = "todo" | "inProgress" | "done";

export type ViewKey = "list" | "kanban" | "calendar" | "timeline" | "gantt";

export type ViewTask = {
  title: string;
  project: string;
  due: string;
  /** 0 = first weekday column in the calendar illustration. */
  day: number;
  status: TaskStatus;
  important?: boolean;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
  };
  a11y: {
    skipToContent: string;
  };
  nav: {
    benefits: string;
    howItWorks: string;
    faq: string;
    login: string;
    startTrial: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    home: string;
    language: string;
  };
  hero: {
    /** Plain statement of what Elynto is, shown with the vision line. */
    label: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  demo: {
    label: string;
    caption: string;
    regionLabel: string;
    srDescription: string;
    sentence: Segment[];
    fields: { assignee: string; task: string; due: string; status: string };
    result: { assignee: Person; task: string; due: string; status: string };
    status: { idle: string; reading: string; created: string };
    controls: { pause: string; play: string; replay: string };
  };
  benefits: {
    title: string;
    items: { title: string; body: string }[];
  };
  howItWorks: {
    title: string;
    intro: string;
  };
  illustration: string;
  sentences: {
    name: string;
    title: string;
    body: string;
    tip: string;
    youWrite: string;
    elyntoCreates: string;
    fields: { assignee: string; task: string; due: string };
    rows: { segments: Segment[]; task: string; assignee: Person; due: string }[];
    savedNote: string;
  };
  planning: {
    name: string;
    title: string;
    body: string;
    steps: { title: string; body: string }[];
    note: string;
    mock: {
      goalLabel: string;
      goal: string;
      draftTitle: string;
      summary: string;
      phaseLabel: string;
      phases: { name: string; tasks: string[] }[];
      reviewHint: string;
      edit: string;
      create: string;
    };
  };
  today: {
    name: string;
    title: string;
    body: string;
    points: string[];
    mock: {
      title: string;
      importantLabel: string;
      groups: {
        tone: "overdue" | "today" | "upcoming";
        label: string;
        items: { title: string; project: string; due: string; important?: boolean }[];
      }[];
    };
  };
  views: {
    name: string;
    title: string;
    body: string;
    projectBody: string;
    tabsLabel: string;
    projectLabel: string;
    tabs: Record<ViewKey, { label: string; description: string }>;
    statuses: Record<TaskStatus, string>;
    listHeaders: { task: string; project: string; due: string; status: string };
    weekdays: string[];
    todayLabel: string;
    importantLabel: string;
    myWorkTitle: string;
    tasks: ViewTask[];
    project: {
      name: string;
      weeks: string[];
      phases: { name: string; start: number; end: number }[];
      tasks: { name: string; start: number; end: number; after?: number }[];
      milestones: { name: string; at: number }[];
      milestoneLabel: string;
      dependencyLabel: string;
    };
  };
  audience: {
    title: string;
    items: { title: string; body: string; example: string }[];
  };
  faq: {
    title: string;
    intro: string;
    items: { id: string; q: string; a: string }[];
  };
  finalCta: {
    title: string;
    body: string;
    cta: string;
    loginPrompt: string;
    login: string;
  };
  footer: {
    tagline: string;
    navLabel: string;
    rights: string;
    languageLabel: string;
  };
};

export type DictionaryMap = Record<Locale, Dictionary>;
