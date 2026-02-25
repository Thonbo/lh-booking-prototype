import { HTMLAttributes } from 'react';

type CardVariant = 'default' | 'outlined' | 'elevated';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default:  'bg-surface border border-border rounded-lg',
  outlined: 'bg-background border-2 border-border rounded-lg',
  elevated: 'bg-background rounded-lg shadow-md',
};

export function Card({ variant = 'default', title, description, footer, children, className = '', ...props }: CardProps) {
  return (
    <div className={[variantStyles[variant], 'overflow-hidden', className].join(' ')} {...props}>
      {(title || description) && (
        <div className="px-6 py-5 border-b border-border">
          {title && <h3 className="text-base font-semibold text-text-primary">{title}</h3>}
          {description && <p className="mt-1 text-sm text-text-secondary">{description}</p>}
        </div>
      )}
      {children && <div className="px-6 py-5">{children}</div>}
      {footer && (
        <div className="px-6 py-4 bg-surface border-t border-border">
          {footer}
        </div>
      )}
    </div>
  );
}
