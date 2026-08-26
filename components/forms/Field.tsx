import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";

export function Field({
  children,
  error,
  hint,
  id,
  label,
  optional,
}: {
  children: ReactNode;
  error?: string;
  hint?: string;
  id: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <div className={error ? "field field--invalid" : "field"}>
      <label className="field__label" htmlFor={id}>
        <span>{label}</span>
        {optional ? <span className="field__optional">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field__message field__message--error" id={`${id}-error`} role="alert">
          <CircleAlert aria-hidden="true" size={13} strokeWidth={2.2} />
          {error}
        </p>
      ) : hint ? (
        <p className="field__message" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
