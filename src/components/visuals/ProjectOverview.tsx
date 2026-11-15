"use client";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { CalendarDays, ChartGantt, List } from "lucide-react";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
const modes = ["list","calendar","gantt"] as const;
type Mode = typeof modes[number];
const icons = {gantt:ChartGantt,list:List,calendar:CalendarDays};
const starts = [2,9,16];
export function ProjectOverview({lang,copy}:{lang:Locale;copy:Dictionary["planning"]["mock"]}) {
  const [mode,setMode] = useState<Mode>("gantt");
  const refs = useRef<Partial<Record<Mode,HTMLButtonElement|null>>>({});
  const id=useId(), vi=lang==="vi";
  const names={gantt:"Gantt",list:vi?"Danh sách":"List",calendar:vi?"Lịch":"Calendar"};
  function onKey(event:KeyboardEvent<HTMLButtonElement>) {
    const index=modes.indexOf(mode);
    const next=event.key==="ArrowRight"?(index+1)%3:event.key==="ArrowLeft"?(index+2)%3:event.key==="Home"?0:event.key==="End"?2:null;
    if(next===null)return;event.preventDefault();setMode(modes[next]);refs.current[modes[next]]?.focus();
  }
  const date=(day:number)=>vi?`${String(day).padStart(2,"0")}/11/2026`:`Nov ${day}, 2026`;
  return <div className="overflow-hidden rounded-3xl border border-brand-200 bg-white shadow-card">
    <div className="flex flex-col justify-between gap-4 px-5 pt-6 sm:flex-row sm:items-start sm:px-8"><div><p className="text-xs font-medium text-brand">{vi?"Dự án Website":"Website project"}</p><p className="mt-2 text-lg font-semibold text-ink sm:text-xl">{copy.goal}</p></div><span className="w-fit rounded-full bg-brand-50 px-3 py-1.5 text-xs text-brand">{copy.summary}</span></div>
    <div role="tablist" aria-label={vi?"Góc nhìn dự án":"Project views"} className="mx-5 mt-5 flex gap-5 border-b border-line sm:mx-8">{modes.map(key=>{const Icon=icons[key];return <button type="button" role="tab" id={`${id}-${key}`} key={key} ref={el=>{refs.current[key]=el;}} aria-selected={mode===key} aria-controls={`${id}-panel`} tabIndex={mode===key?0:-1} onKeyDown={onKey} onClick={()=>setMode(key)} className={cn("flex min-h-12 items-center gap-2 border-b-2 text-sm font-medium",mode===key?"border-brand text-brand":"border-transparent text-ink-muted hover:text-brand")}><Icon className="size-4" aria-hidden="true" />{names[key]}</button>;})}</div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${mode}`} tabIndex={0} className="h-[360px] overflow-y-auto p-5 sm:h-[290px] sm:p-8">
      {mode==="gantt"?<div><div className="grid grid-cols-[minmax(5rem,0.9fr)_2fr] gap-3 pb-4 text-xs text-ink-muted sm:grid-cols-[minmax(10rem,1fr)_3fr]"><span>{copy.phaseLabel}</span><div className="grid grid-cols-3">{starts.map((day,index)=><span key={day}>{vi?`Tuần ${index+1}`:`Week ${index+1}`}<span className="mt-1 block">{vi?`${String(day).padStart(2,"0")}/11`:`Nov ${day}`}</span></span>)}</div></div>{copy.phases.map((phase,index)=><div key={phase.name} className="grid grid-cols-[minmax(5rem,0.9fr)_2fr] items-center gap-3 border-t border-line py-5 sm:grid-cols-[minmax(10rem,1fr)_3fr]"><p className="text-sm font-medium text-ink">{phase.name}</p><div className="grid grid-cols-3 gap-2"><div className={cn("h-8 rounded-lg px-2 text-xs leading-8 text-brand",index===0?"bg-brand-100":index===1?"bg-field-assignee-soft":"bg-sunken")} style={{gridColumn:index+1}}>3<span className="hidden sm:inline">{vi?" việc":" tasks"}</span></div></div></div>)}</div>
      :mode==="list"?<ol className="grid gap-5 sm:grid-cols-3">{copy.phases.map((phase,index)=><li key={phase.name}><p className="text-sm font-semibold text-brand">0{index+1} / {phase.name}</p><ul className="mt-4 space-y-3">{phase.tasks.map(task=><li key={task} className="flex gap-2 text-sm leading-relaxed text-ink-muted"><span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-brand" />{task}</li>)}</ul></li>)}</ol>
      :<ol className="grid gap-4 sm:grid-cols-3">{copy.phases.map((phase,index)=><li key={phase.name} className="rounded-2xl bg-brand-50 p-5"><CalendarDays aria-hidden="true" className="size-5 text-brand" /><p className="mt-4 text-sm font-semibold text-ink">{date(starts[index]+4)}</p><p className="mt-2 text-sm leading-relaxed text-ink-muted">{phase.name}</p></li>)}</ol>}
    </div>
  </div>;
}
