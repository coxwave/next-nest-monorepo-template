import { ExclamationCircleIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes, Ref } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClass?: string;
  label?: string;
  error?: boolean;
}

const Input = forwardRef(function Input(
  { className, label, error, inputClass, ...props }: Props,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <div className={className}>
      {label && <label className="font-semibold">{label}</label>}
      <div className={clsx('relative', { 'mt-1': label })}>
        <input
          ref={ref}
          className={clsx(
            'border-theme-500-light dark:border-theme-500-dark w-full rounded-md border py-2 px-4',
            inputClass,
            {
              'pr-16': error,
            },
          )}
          {...props}
        />
        {error && (
          <ExclamationCircleIcon className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-red-500" />
        )}
      </div>
    </div>
  );
});

export default Input;
