import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { Fragment, useRef } from 'react';

export interface ModalProps {
  show: boolean;
  variant?: 'default' | 'alert';
  title: string;
  content: string;
  close: () => void;
  cancelButton?: {
    label: string;
    onClick?: () => void | Promise<void>;
  };
  actionButton: {
    label: string;
    onClick: () => void | Promise<void>;
  };
}

export function AppModal({
  show,
  variant = 'default',
  title,
  content,
  close,
  cancelButton = { label: 'Cancel' },
  actionButton,
}: ModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-30 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={show}
        onClose={close}
      >
        <div className="flex min-h-screen items-center justify-center pt-32 text-center backdrop-blur-lg sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="bg-theme-500-light/40 dark:bg-theme-500-dark/40 fixed inset-0 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-theme-white-light dark:bg-theme-white-dark relative mx-4 inline-block w-full overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div
                className={clsx({
                  'sm:flex sm:items-start': variant === 'alert',
                })}
              >
                <div
                  className={clsx(
                    'mx-auto flex h-12 w-12 items-center justify-center rounded-full',
                    {
                      'bg-green-100': variant === 'default',
                      'flex-shrink-0 bg-red-100 sm:mx-0 sm:h-10 sm:w-10': variant === 'alert',
                    },
                  )}
                >
                  {/* <!-- Heroicon name: outline/check --> */}
                  {variant === 'default' && <CheckIcon className="h-6 w-6 text-green-600" />}
                  {variant === 'alert' && <ExclamationIcon className="h-6 w-6 text-red-600" />}
                </div>
                <div
                  className={clsx('mt-3 text-center', {
                    'sm:mt-5': variant === 'default',
                    'sm:mt-0 sm:ml-4 sm:text-left': variant === 'alert',
                  })}
                >
                  <h3
                    className="text-theme-900-light dark:text-theme-900-dark text-lg font-medium leading-6"
                    id="modal-headline"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-theme-500-light dark:text-theme-500-dark text-sm">
                      {content}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={clsx('mt-5', {
                  'sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3':
                    variant === 'default',
                  'sm:mt-4 sm:flex sm:flex-row-reverse': variant === 'alert',
                })}
              >
                <button
                  type="button"
                  className={clsx(
                    'text-theme-white-light dark:text-theme-white-dark inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm sm:text-sm',
                    {
                      'hover:bg-lightBlue-500 bg-blue-400 sm:col-start-2': variant === 'default',
                      'text-theme-white-light dark:text-theme-white-dark bg-red-500 sm:ml-3 sm:w-auto':
                        variant === 'alert',
                    },
                  )}
                  onClick={async () => {
                    await actionButton.onClick();
                    close();
                  }}
                >
                  {actionButton.label}
                </button>
                {cancelButton && (
                  <button
                    type="button"
                    className={clsx(
                      'border-theme-300-light dark:border-theme-300-dark text-theme-700-light dark:text-theme-700-dark hover:bg-theme-50-light dark:bg-theme-50-dark bg-theme-white-light dark:bg-theme-white-dark mt-3 inline-flex w-full justify-center rounded-md border px-4 py-2 text-base font-medium shadow-sm sm:mt-0 sm:text-sm',
                      {
                        'sm:col-start-1': variant === 'default',
                        'sm:w-auto': variant === 'alert',
                      },
                    )}
                    onClick={async () => {
                      if (cancelButton?.onClick) await cancelButton.onClick();
                      close();
                    }}
                  >
                    {cancelButton.label}
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
