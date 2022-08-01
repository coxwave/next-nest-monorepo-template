import clsx from 'clsx';
import { HTMLAttributes, useRef } from 'react';

import { PropsOf } from '@/frontend/types';

interface Props extends PropsOf<'textarea'> {
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  placeholder?: string;
  label?: string;
  message?: string;
  error?: boolean;
  color?: 'sky' | 'transparent' | 'black';
  clear?: () => void;
  isBgWhite?: boolean;
}

const colorClasses = {
  sky: 'border-gray-300',
  transparent: 'border-transparent',
  black: 'border-gray-500 focus:border-gray-700',
};

export default function TextArea({
  className,
  labelClassName,
  containerClassName,
  containerProps,
  placeholder,
  label,
  message,
  error = false,
  color = 'black',
  clear,
  name,
  value,
  isBgWhite = false,
  ...props
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <div className={clsx(containerClassName, 'relative space-y-2 text-left')} {...containerProps}>
      {label !== undefined && (
        <label htmlFor={name} className={clsx(labelClassName, 'font-semibold')}>
          <span>{label}</span>
        </label>
      )}
      <div className="relative rounded-md">
        <textarea
          ref={ref}
          name={name}
          placeholder={placeholder}
          className={clsx(
            className,
            'block w-full rounded-md border-gray-500 px-4 py-2.5 placeholder:text-gray-400 focus:outline-none',
            {
              [colorClasses[color]]: !error,
              'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500':
                error,
            },
            {
              'disabled:bg-gray-100': !isBgWhite,
              'disabled:bg-white': isBgWhite,
            },
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={name && error ? `${name}-error` : undefined}
          value={value}
          {...props}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {message !== undefined && (
        <p
          className={clsx('mt-2 text-sm font-medium', {
            'text-gray-500': !error,
            'text-red-400': error,
          })}
          id={name && error ? `${name}-error` : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
}
