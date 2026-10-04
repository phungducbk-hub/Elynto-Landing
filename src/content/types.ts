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

/** Work statuses as they exist in the Elynto beta. */
export type WorkStatus =
  | "draft"
  | "assigned"
  | "accepted"
  | "inProgress"
  | "submitted"
  | "rework"
  | "approved"
  | "completed";

export type Priority = "high" | "medium";

export type ProjectView = "list" | "calendar" | "gantt";

/** Day of the illustrated month (October). */
export type Day = number;

export type PlanTask = {
  title: string;
  assignee: Person;
  start: Day;
  due: Day;
  priority: Priority;
  status: WorkStatus;
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
    promise: string;
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
    fields: { assignee: string; task: string; due: string; priority: string };
    result: { assignee: Person; task: string; due: string; priority: string };
    status: { idle: string; reading: string; created: string };
    open: string;
    controls: { pause: string; play: string; replay: string };
  };
  problems: {
    title: string;
    intro: string;
    beforeLabel: string;
    afterLabel: string;
    rows: { before: string; afterTitle: string; afterBody: string }[];
  };
  howItWorks: {
    title: string;
    intro: string;
  };
  illustration: string;
  /** Shared vocabulary of the product illustrations. */
  app: {
    workspace: string;
    nav: { today: string; inbox: string; myWork: string; delegated: string; projects: string; team: string; reports: string; knowledge: string };
    statuses: Record<WorkStatus, string>;
    priorities: Record<Priority, string>;
    /** "{dd}" → zero-padded day, "{d}" → day. */
    datePattern: string;
    weekdaysShort: string[];
    monthTitle: string;
    todayLabel: string;
    overdueLabel: string;
    /** Gantt bar groups. */
    barLegend: { done: string; active: string; notStarted: string };
  };
  delegate: {
    name: string;
    title: string;
    body: string;
    tip: string;
    view: {
      title: string;
      count: string;
      flowLabel: string;
      flow: WorkStatus[];
      reworkNote: string;
      columns: { task: string; assignee: string; due: string; status: string };
      rows: { title: string; assignee: Person; due: Day; status: WorkStatus; overdue?: boolean }[];
    };
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
      reviewHint: string;
      edit: string;
      create: string;
    };
  };
  project: {
    name: string;
    title: string;
    body: string;
    points: string[];
    data: {
      back: string;
      name: string;
      tags: string[];
      privacy: string;
      description: string;
      stats: { label: string; value: string }[];
      progress: number;
      healthLabel: string;
      health: string;
      healthNote: string;
      analyse: string;
      viewsLabel: string;
      views: Record<ProjectView, string>;
      dragHint: string;
      columns: { task: string; assignee: string; start: string; due: string; priority: string; status: string };
      phases: { name: string; tasks: PlanTask[] }[];
    };
  };
  today: {
    name: string;
    title: string;
    body: string;
    points: string[];
    mock: {
      groups: {
        tone: "overdue" | "today" | "upcoming";
        label: string;
        items: { title: string; project: string; due: string; priority: Priority }[];
      }[];
    };
  };
  audience: {
    title: string;
    items: { title: string; question: string; body: string; example: string }[];
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
