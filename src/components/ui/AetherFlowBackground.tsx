"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; size: number };

/** Only the reference's particle network, on a transparent Elynto-colored canvas. */
export function AetherFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.closest("section");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let pointer: { x: number; y: number } | null = null;
    let onScreen = false;
    let frame = 0;
    let lastTime = 0;

    // Keep the network quiet behind the central message, more visible at the edges.
    function emphasis(x: number, y: number) {
      return Math.min(1, 0.18 + Math.hypot(
        (x - width / 2) / (width * 0.4),
        (y - height * 0.36) / (height * 0.42),
      ) * 0.6);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const reach = Math.min(175, Math.max(110, width * 0.13));
      const reachSquared = reach * reach;

      for (let a = 0; a < particles.length; a++) {
        const p = particles[a];
        for (let b = a + 1; b < particles.length; b++) {
          const q = particles[b];
          const distanceSquared = (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
          if (distanceSquared >= reachSquared) continue;
          const x = (p.x + q.x) / 2;
          const y = (p.y + q.y) / 2;
          const nearPointer = pointer && Math.hypot(x - pointer.x, y - pointer.y) < 160;
          const alpha = (1 - distanceSquared / reachSquared) * emphasis(x, y);
          ctx.strokeStyle = `rgba(26, 98, 137, ${alpha * (nearPointer ? 0.42 : 0.26)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(26, 98, 137, ${0.5 * emphasis(p.x, p.y)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function tick(now: number) {
      frame = 0;
      if (!onScreen || document.hidden || reducedMotion.matches) return;
      // Cap painting at 30 fps; speed remains independent of display refresh rate.
      if (!lastTime || now - lastTime >= 1000 / 30) {
        const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
        lastTime = now;
        for (const p of particles) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (pointer) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0 && distance < 160) {
              const force = (1 - distance / 160) * 36 * dt;
              p.x += dx / distance * force;
              p.y += dy / distance * force;
            }
          }
          // Clamp after pointer repulsion so particles cannot escape the scene.
          if (p.x < 0 || p.x > width) {
            p.x = Math.max(0, Math.min(width, p.x));
            p.vx = -p.vx;
          }
          if (p.y < 0 || p.y > height) {
            p.y = Math.max(0, Math.min(height, p.y));
            p.vy = -p.vy;
          }
        }
        draw();
      }
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    }

    function sync() {
      stop();
      pointer = null;
      if (!onScreen || document.hidden) return;
      draw();
      // Reduced motion gets a static network, without cursor repulsion.
      if (!reducedMotion.matches) frame = requestAnimationFrame(tick);
    }

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(width < 640 ? 32 : 90, Math.round(width * height / 12000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        size: 1 + Math.random() * 1.2,
      }));
      sync();
    }

    function move(event: PointerEvent) {
      if (!canvas || reducedMotion.matches || event.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer = x >= 0 && x <= width && y >= 0 && y <= height ? { x, y } : null;
    }
    function leave() { pointer = null; }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    resize();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52rem] max-h-full w-full [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]"
    />
  );
}
