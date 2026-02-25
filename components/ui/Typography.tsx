import { HTMLAttributes } from 'react';

type TypographyProps = HTMLAttributes<HTMLElement> & { as?: string };

export function H1({ className = '', children, ...props }: TypographyProps) {
  return (
    <h1 className={['text-4xl font-bold leading-tight text-text-primary tracking-tight', className].join(' ')} {...props}>
      {children}
    </h1>
  );
}

export function H2({ className = '', children, ...props }: TypographyProps) {
  return (
    <h2 className={['text-3xl font-semibold leading-tight text-text-primary tracking-tight', className].join(' ')} {...props}>
      {children}
    </h2>
  );
}

export function H3({ className = '', children, ...props }: TypographyProps) {
  return (
    <h3 className={['text-2xl font-semibold leading-tight text-text-primary', className].join(' ')} {...props}>
      {children}
    </h3>
  );
}

export function H4({ className = '', children, ...props }: TypographyProps) {
  return (
    <h4 className={['text-xl font-medium leading-normal text-text-primary', className].join(' ')} {...props}>
      {children}
    </h4>
  );
}

export function Body({ className = '', children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={['text-base leading-relaxed text-text-primary', className].join(' ')} {...props}>
      {children}
    </p>
  );
}

export function Caption({ className = '', children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={['text-sm leading-normal text-text-secondary', className].join(' ')} {...props}>
      {children}
    </p>
  );
}

export function Label({ className = '', children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={['text-sm font-medium leading-normal text-text-primary', className].join(' ')} {...props}>
      {children}
    </span>
  );
}
