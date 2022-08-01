import { Menu } from '@headlessui/react';
import clsx from 'clsx';

export type DropdownItem = { label: string; onClick: () => void; current?: boolean };

interface Props {
  dropdownButton: JSX.Element;
  dropdownItems: DropdownItem[];
  menuClassName?: string;
  buttonClassName?: string;
  className?: string;
}

export default function DropDown({
  dropdownButton,
  dropdownItems,
  buttonClassName,
  menuClassName,
  className,
}: Props) {
  return (
    <Menu as="div" className={clsx('relative', className)}>
      <Menu.Button
        className={clsx(
          'border-theme-300-light dark:border-theme-300-dark text-theme-700-light dark:text-theme-700-dark hover:bg-theme-50-light dark:hover:bg-theme-50-dark bg-theme-white-light dark:bg-theme-white-dark inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none',
          buttonClassName,
        )}
      >
        {dropdownButton}
      </Menu.Button>

      <Menu.Items
        className={clsx(
          'ring-theme-black-light dark:ring-theme-black-dark bg-theme-white-light dark:bg-theme-white-dark absolute right-1 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-opacity-5 focus:outline-none',
          menuClassName,
        )}
      >
        <div className="py-1">
          {dropdownItems.map((item, idx) => (
            <Menu.Item key={`dropdown-item-${idx}`}>
              {({ active }) => (
                <button
                  onClick={item.onClick}
                  className={clsx(
                    'line-clamp-1 block',
                    active || item.current
                      ? 'bg-theme-100-light dark:bg-theme-100-dark text-theme-900-light dark:text-theme-900-dark'
                      : 'text-theme-700-light dark:text-theme-700-dark',
                    'w-full px-4 py-2 text-left text-sm',
                  )}
                >
                  {item.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}
