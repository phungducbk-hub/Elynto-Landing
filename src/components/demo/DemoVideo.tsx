"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProductVideo } from "@/config/media";
import type { Dictionary } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { observeVisibility, usePrefersReducedMotion } from "./useMotionPreference";

type Props = {
  video: ProductVideo;
  copy: Dictionary["demo"];
  className?: string;
};

/**
 * Real product recording, used instead of the HTML illustration once a file is
 * registered in src/config/media.ts. Muted, no autoplay sound, lazy-loaded,
 * paused off-screen and for visitors who prefer reduced motion.
 */
export function DemoVideo({ video, copy, className }: Props) {
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const viewed = useRef(false);

  useEffect(() => {
    const el = figureRef.current;
    const media = videoRef.current;
    if (!el || !media) return;
    return observeVisibility(el, 0.3, (visible, ratio) => {
      if (visible && ratio >= 0.5 && !viewed.current) {
        viewed.current = true;
        track("demo_view", { demo: "video" });
      }
      if (visible && ratio >= 0.3 && !userPaused && !reducedMotion) {
        media.play().catch(() => undefined);
      } else if (!visible) {
        media.pause();
      }
    });
  }, [userPaused, reducedMotion]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target?.closest('a[href="#demo"]') || !videoRef.current) return;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => undefined);
      setUserPaused(false);
      track("demo_replay", { demo: "video", source: "link" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const toggle = () => {
    const media = videoRef.current;
    if (!media) return;
    if (media.paused) {
      media.play().catch(() => undefined);
      setUserPaused(false);
      track("demo_play", { demo: "video" });
    } else {
      media.pause();
      setUserPaused(true);
      track("demo_pause", { demo: "video" });
    }
  };

  const replay = () => {
    const media = videoRef.current;
    if (!media) return;
    media.currentTime = 0;
    media.play().catch(() => undefined);
    setUserPaused(false);
    track("demo_replay", { demo: "video", source: "button" });
  };

  return (
    <figure ref={figureRef} id="demo" tabIndex={-1} aria-label={copy.regionLabel} className={cn("outline-none", className)}>
      <div className="relative overflow-hidden rounded-2xl border border-rule bg-paper shadow-surface">
        <video
          ref={videoRef}
          className="block h-auto w-full"
          width={video.width}
          height={video.height}
          poster={video.poster}
          preload="none"
          muted
          loop
          playsInline
          aria-label={copy.srDescription}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <figcaption className="text-base font-semibold text-ink stretch-wide">{copy.caption}</figcaption>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={toggle}
            className="inline-grid size-10 place-items-center rounded-full text-navy transition-colors hover:bg-fog"
          >
            <span className="sr-only">{playing ? copy.controls.pause : copy.controls.play}</span>
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={replay}
            className="inline-grid size-10 place-items-center rounded-full text-navy transition-colors hover:bg-fog"
          >
            <span className="sr-only">{copy.controls.replay}</span>
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </figure>
  );
}
