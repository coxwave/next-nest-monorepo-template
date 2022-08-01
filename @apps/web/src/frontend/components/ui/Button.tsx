import clsx from 'clsx';

import { forwardRefWithAs } from '@/utils/forward-ref-with-as';

import type { ButtonHTMLAttributes, Ref } from 'react';

const colorClasses = {
  black:
    'bg-theme-900-light dark:bg-theme-900-dark text-theme-white-light dark:text-theme-white-dark hover:bg-theme-700-light dark:hover:bg-theme-700-dark border-transparent transition-colors',
  red: 'bg-red-400 dark:bg-red-600 hover:bg-red-500 hover:dark:bg-red-500 dark:text-white focus-visible:ring-red-500 text-theme-white-light dark:text-theme-white-dark border-transparent',
  white:
    'bg-theme-white-light dark:bg-theme-white-dark hover:bg-theme-50-light dark:hover:bg-theme-50-dark border-theme-300-light dark:border-theme-300-dark',
  blue: 'text-white dark:text-white bg-blue-500 dark:bg-blue-600 hover:dark:bg-blue-500 hover:bg-blue-600 border-none',
};

interface OurButtonProps {
  color?: keyof typeof colorClasses;
  full?: boolean;
  size?: 'sm' | 'base' | 'lg';
}

const Button = forwardRefWithAs(function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & OurButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const { color = 'black', full = false, size = 'base', className, children, ...rest } = props;

  const propsWeControl = { ref };
  const passthroughProps = rest;

  return (
    <button
      className={clsx(
        className,
        'inline-flex items-center rounded-md border px-4 py-2 font-semibold shadow-sm',
        {
          'text-sm': size === 'sm',
          'text-base': size === 'base',
          'text-lg': size === 'lg',
          'w-full justify-center px-1.5 py-2': full,
        },
        colorClasses[color],
        {
          'disabled:bg-theme-200-light disabled:dark:bg-theme-200-dark disabled:text-theme-400-light disabled:dark:text-theme-400-dark disabled:cursor-not-allowed':
            color !== 'white',
          'disabled:bg-theme-50-light disabled:dark:bg-theme-50-dark disabled:text-theme-500-light disabled:dark:text-theme-500-dark disabled:cursor-not-allowed':
            color === 'white',
        },
      )}
      {...passthroughProps}
      {...propsWeControl}
    >
      {children}
    </button>
  );
});

export default Button;
