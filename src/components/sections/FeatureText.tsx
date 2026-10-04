import type { ReactNode } from "react";

type Props = {
  id: string;
  /** Feature name, set as a run-in head at the start of the paragraph. */
  name: string;
  title: string;
  body: string;
  children?: ReactNode;
};

/** Benefit headline, then the feature name run into the first sentence of the body. */
export function FeatureText({ id, name, title, body, children }: Props) {
  return (
    <div>
      <h3 id={id} className="type-h3 text-balance">
        {title}
      </h3>
      <p className="mt-4 max-w-[34rem] text-lg leading-relaxed text-pretty">
        <strong className="font-semibold text-ink">{name}</strong> {body}
      </p>
      {children}
    </div>
  );
}
