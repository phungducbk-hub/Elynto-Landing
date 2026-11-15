"use client";

import { LazyMotion, m, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

const loadMotionFeatures = () => import("./motion-features").then((mod) => mod.default);

export interface LoaderSkeletonProps extends HTMLMotionProps<"div"> {
  width?: string | number;
  height?: number;
  borderRadius?: number;
  baseColor?: string;
  highlightColor?: string;
  duration?: number;
  paused?: boolean;
}

/** Adapted from the supplied loaders-skeleton reference, using the installed Motion package. */
export function LoaderSkeleton({
  className,
  width = "100%",
  height = 20,
  borderRadius = 4,
  baseColor = "var(--color-sunken)",
  highlightColor = "rgba(255, 255, 255, 0.8)",
  duration = 1.5,
  paused = false,
  style,
  ...props
}: LoaderSkeletonProps) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <m.div
        {...props}
        aria-hidden="true"
        className={cn("relative overflow-hidden", className)}
        style={{ width, height, borderRadius, backgroundColor: baseColor, ...style }}
      >
        <m.div
          className="absolute inset-0 motion-reduce:hidden"
          style={{ background: `linear-gradient(90deg, transparent, ${highlightColor}, transparent)` }}
          animate={paused ? { x: "-100%" } : { x: ["-100%", "100%"] }}
          transition={{ duration, ease: "easeInOut", repeat: paused ? 0 : Infinity }}
        />
      </m.div>
    </LazyMotion>
  );
}

export default LoaderSkeleton;
