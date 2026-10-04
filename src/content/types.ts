import type { Locale } from "@/lib/i18n";
import type { PageGroup } from "@/lib/pages";

/** Parts of a natural-language request that become task fields. */
export type FieldKey = "task" | "assignee" | "due";

/** A sentence split into plain text and highlighted spans. */
export type Segment = string | { field: FieldKey; text: string };

export type Person = {
  name: string;
  initials: string;
  /** The signed-in user ("you"). Rendered with a person icon instead of initials. */
  self?: boolean;
};

export type TaskStatus = "todo" | "inProgress" | "done";

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

/** Who a work situation comes from: a segment from the customer research, never a named person. */
export type VoicePersona = "agency" | "freelancer" | "lead" | "owner" | "member";

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
    eyebrow: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  demo: {
    badge: string;
    caption: string;
    regionLabel: string;
    srDescription: string;
    placeholder: string;
    command: string;
    send: string;
    newTask: string;
    processing: string;
    success: string;
    fields: { task: string; assignee: string; due: string; status: string };
    result: { task: string; assignee: Person; due: string; status: string };
    controls: { play: string; pause: string; replay: string };
  };
  benefits: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  illustration: string;
  command: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    tip: string;
    examplesLabel: string;
    legend: Record<FieldKey, string>;
    resultLabel: string;
    savedLabel: string;
    newBadge: string;
    examples: {
      id: string;
      label: string;
      segments: Segment[];
      task: string;
      assignee: Person;
      due: string;
    }[];
    existing: { title: string; assignee: Person; due: string }[];
  };
  planning: {
    eyebrow: string;
    title: string;
    body: string;
    steps: { title: string; body: string }[];
    note: string;
    mock: {
      goalLabel: string;
      goal: string;
      draftTitle: string;
      aiBadge: string;
      summary: string;
      phaseLabel: string;
      phases: { name: string; tasks: string[] }[];
      reviewHint: string;
      edit: string;
      create: string;
    };
  };
  today: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    mock: {
      title: string;
      subtitle: string;
      importantLabel: string;
      groups: {
        tone: "overdue" | "today" | "upcoming";
        label: string;
        items: { title: string; project: string; due: string; important?: boolean }[];
      }[];
    };
  };
  views: {
    eyebrow: string;
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
  delegate: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
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
  /** Shared vocabulary of the product illustrations recreated from the beta UI. */
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
    barLegend: { done: string; active: string; notStarted: string };
  };
  audience: {
    eyebrow: string;
    title: string;
    examplesLabel: string;
    items: { title: string; who: string; body: string; examples: string[] }[];
  };
  voices: {
    eyebrow: string;
    title: string;
    intro: string;
    note: string;
    regionLabel: string;
    pause: string;
    play: string;
    personas: Record<VoicePersona, string>;
    items: { moment: string; quote: string; persona: VoicePersona }[];
  };
  faq: {
    eyebrow: string;
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
    groups: Record<PageGroup, string>;
    legalLabel: string;
  };
  subpage: {
    breadcrumbLabel: string;
    home: string;
    /** Heading above the other pages of the same group. */
    related: Record<PageGroup, string>;
    updated: string;
    step: string;
    contact: {
      emailLabel: string;
      pending: string;
      helpTitle: string;
      helpBody: string;
    };
    cookies: {
      clear: string;
      cleared: string;
    };
    stats: {
      on: string;
      off: string;
      signal: string;
      disable: string;
      enable: string;
    };
  };
};

export type DictionaryMap = Record<Locale, Dictionary>;
