import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, id, className = '', disabled, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={[
            'w-full px-3 py-2 text-base text-text-primary bg-background border rounded-md transition-colors duration-150',
            'placeholder:text-text-disabled',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            error
              ? 'border-error focus:ring-error focus:border-error'
              : 'border-border hover:border-text-secondary',
            disabled ? 'bg-surface text-text-disabled cursor-not-allowed' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {(hint || error) && (
          <p className={['text-sm', error ? 'text-error' : 'text-text-secondary'].join(' ')}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
