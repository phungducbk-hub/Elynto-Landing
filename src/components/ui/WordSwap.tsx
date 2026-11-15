"use client";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/demo/useMotionPreference";
import { cn } from "@/lib/cn";

export type SwapWord = {text:string;pillClassName:string};
const HOLD_MS=2800;
const pillBase="-my-[0.12em] inline-block rounded-full px-[0.32em] py-[0.12em] text-[0.92em] font-semibold whitespace-nowrap align-baseline";

/** Hidden grid cells reserve the longest word's width before hydration. */
export function WordSwap({words}:{words:SwapWord[]}) {
  const [{index,previous},setState]=useState<{index:number;previous:number|null}>({index:0,previous:null});
  const pillRef=useRef<HTMLSpanElement>(null);
  const reduced=usePrefersReducedMotion();
  useEffect(()=>{
    const pill=pillRef.current;
    if(!pill||words.length<2||reduced)return;
    let timer:number|undefined,onScreen=false;
    const schedule=()=>{window.clearTimeout(timer);if(onScreen&&!document.hidden)timer=window.setTimeout(advance,HOLD_MS);};
    const advance=()=>{setState(s=>({index:(s.index+1)%words.length,previous:s.index}));schedule();};
    const observer=new IntersectionObserver(([entry])=>{onScreen=entry.isIntersecting;schedule();});
    observer.observe(pill);document.addEventListener("visibilitychange",schedule);
    return ()=>{window.clearTimeout(timer);observer.disconnect();document.removeEventListener("visibilitychange",schedule);};
  },[words.length,reduced]);
  const current=words[index];
  return <span className="relative inline-grid align-baseline">
    {words.map(word=><span key={word.text} aria-hidden="true" className={cn(pillBase,"pointer-events-none invisible col-start-1 row-start-1")}>{word.text}</span>)}
    <span ref={pillRef} className={cn(pillBase,"col-start-1 row-start-1 overflow-clip text-center transition-colors duration-500",current.pillClassName)}>
      <span className="relative inline-block">
        {previous!==null&&!reduced?<span key={`out-${previous}`} className="absolute top-0 left-1/2 -translate-x-1/2 animate-word-out">{words[previous].text}</span>:null}
        <span key={`in-${index}`} data-current-word className={cn("inline-block",previous!==null&&!reduced&&"animate-word-in")}>{current.text}</span>
      </span>
    </span>
  </span>;
}
