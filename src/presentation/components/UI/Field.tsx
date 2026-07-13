import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import styles from "./Field.module.scss";

interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, hint, error, children, className }: FieldProps) {
  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {error && <span className={styles.hintError}>{error}</span>}
      {!error && hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className, ...rest }: InputProps) {
  return (
    <input
      className={[styles.input, error && styles.err, className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={[styles.textarea, error && styles.err, className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}

export function Select({ className, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={[styles.select, className].filter(Boolean).join(" ")} {...rest} />;
}

export function CheckboxRow({
  children,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & Pick<LabelHTMLAttributes<HTMLLabelElement>, "children">) {
  return (
    <label className={[styles.checkboxRow, className].filter(Boolean).join(" ")}>
      <input type="checkbox" {...rest} />
      {children}
    </label>
  );
}
