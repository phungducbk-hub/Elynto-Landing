"use client";

import Image from "next/image";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { usePrefersReducedMotion } from "@/components/demo/useMotionPreference";
import type { GalleryCopy } from "@/content/customer-gallery";
import "./gallery-animation.css";

const loadMotionFeatures = () => import("./motion-features").then(mod => mod.default);

/** Adapted from the supplied expandable gallery: portraits, localized quotes and a native dialog. */
export function ExpandableGallery({ copy }: { copy: GalleryCopy }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduced = usePrefersReducedMotion();
  const id = useId();
  const item = selectedIndex === null ? null : copy.items[selectedIndex];
  const open = selectedIndex !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function close() {
    dialogRef.current?.close();
    setSelectedIndex(null);
  }

  function step(direction: number) {
    setSelectedIndex(index => index === null ? null : (index + direction + copy.items.length) % copy.items.length);
  }

  function onDialogKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    }
  }

  function scrollToStory(index: number) {
    trackRef.current?.children[index]?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function updateMobileIndex() {
    const track = trackRef.current;
    if (!track) return;
    const center = track.getBoundingClientRect().left + track.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const box = child.getBoundingClientRect();
      const next = Math.abs(box.left + box.width / 2 - center);
      if (next < distance) { closest = index; distance = next; }
    });
    setMobileIndex(closest);
  }

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <div data-customer-gallery>
        <div ref={trackRef} onScroll={updateMobileIndex} className="customer-gallery__track">
          {copy.items.map((story, index) => (
            <m.article
              key={story.id}
              className="customer-gallery__card"
              data-condensed={activeIndex !== null && activeIndex !== index ? "" : undefined}
              animate={{ flexGrow: activeIndex === null ? 1 : activeIndex === index ? 2.1 : 0.75 }}
              transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={event => {
                if (!event.currentTarget.contains(document.activeElement)) setActiveIndex(null);
              }}
              onFocusCapture={() => setActiveIndex(index)}
              onBlurCapture={event => {
                if (!event.currentTarget.contains(event.relatedTarget)) setActiveIndex(null);
              }}
            >
              <Image src={story.image} alt={story.name} fill sizes="(min-width: 1024px) 50vw, 85vw" className="customer-gallery__portrait" />
              <div aria-hidden="true" className="customer-gallery__shade" />
              <div className="customer-gallery__content">
                <Quote aria-hidden="true" className="mb-3 size-6 text-white/85" />
                <blockquote className="customer-gallery__quote"><p>“{story.quote}”</p></blockquote>
                <div className="mt-5 flex items-end justify-between gap-3">
                  <div className="min-w-0"><p className="text-base font-semibold text-white">{story.name}</p><p className="mt-1 text-xs leading-relaxed text-white/85">{story.role}</p></div>
                  <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-white/40"><ArrowDownRight className="size-4" /></span>
                </div>
              </div>
              <button type="button" aria-label={`${copy.open} ${story.name}`} aria-haspopup="dialog" onClick={() => setSelectedIndex(index)} className="customer-gallery__open"><span className="sr-only">{copy.open} {story.name}</span></button>
            </m.article>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-4 text-sm text-ink-muted">
          <p className="hidden lg:block">{copy.desktopHint}</p>
          <p className="lg:hidden">{copy.mobileHint}</p>
          <span className="hidden shrink-0 font-mono text-xs tracking-wider text-brand lg:block">{String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(copy.items.length).padStart(2, "0")}</span>
          <div className="flex shrink-0 gap-2 lg:hidden">
            <button type="button" aria-label={copy.previous} disabled={mobileIndex === 0} onClick={() => scrollToStory(mobileIndex - 1)} className="customer-gallery__control"><ArrowLeft aria-hidden="true" className="size-4" /></button>
            <button type="button" aria-label={copy.next} disabled={mobileIndex === copy.items.length - 1} onClick={() => scrollToStory(mobileIndex + 1)} className="customer-gallery__control"><ArrowRight aria-hidden="true" className="size-4" /></button>
          </div>
        </div>
      </div>

      <dialog ref={dialogRef} aria-labelledby={`${id}-name`} aria-describedby={`${id}-quote`} onCancel={() => setSelectedIndex(null)} onClose={() => setSelectedIndex(null)} onKeyDown={onDialogKey} onClick={event => { if (event.target === event.currentTarget) close(); }} className="customer-gallery__dialog">
        <AnimatePresence initial={false} mode="wait">
          {item ? (
            <m.div key="customer-story" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.2 }} className="customer-gallery__story">
              <button type="button" aria-label={copy.close} onClick={close} className="customer-gallery__close"><X aria-hidden="true" className="size-5" /></button>
              <div className="customer-gallery__story-photo"><Image src={item.image} alt={item.name} fill sizes="(min-width: 768px) 450px, 90vw" className="customer-gallery__portrait" /></div>
              <div className="flex min-w-0 flex-col p-6 sm:p-9">
                <p className="pr-8 text-xs font-semibold tracking-wide text-brand">{copy.storyLabel}</p>
                <Quote aria-hidden="true" className="mt-5 size-7 text-brand" />
                <blockquote id={`${id}-quote`} className="mt-4 text-xl leading-relaxed font-medium tracking-tight text-ink sm:text-2xl">“{item.quote}”</blockquote>
                <div className="mt-5 space-y-3">{item.detail.map(paragraph => <p key={paragraph} className="text-sm leading-relaxed text-ink-muted">{paragraph}</p>)}</div>
                <div className="mt-6"><h3 id={`${id}-name`} className="text-base font-semibold text-ink">{item.name}</h3><p className="mt-1 text-sm text-ink-muted">{item.role}</p></div>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                  <span aria-live="polite" className="font-mono text-xs tracking-wider text-ink-muted">{String((selectedIndex ?? 0) + 1).padStart(2, "0")} / {String(copy.items.length).padStart(2, "0")}</span>
                  <div className="flex gap-2"><button type="button" aria-label={copy.previous} onClick={() => step(-1)} className="customer-gallery__control"><ArrowLeft aria-hidden="true" className="size-4" /></button><button type="button" aria-label={copy.next} onClick={() => step(1)} className="customer-gallery__control"><ArrowRight aria-hidden="true" className="size-4" /></button></div>
                </div>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </dialog>
    </LazyMotion>
  );
}
