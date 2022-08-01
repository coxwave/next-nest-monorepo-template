import clsx from 'clsx';
import { useState } from 'react';

import { useAssertiveStore } from '@/frontend/context/assertives';

const VALID_FILE_TYPES = ['image/jpeg', 'image/png'];

interface DragDropProps {
  className?: string;
  id?: string;
  onDropFile: (file: File) => void | Promise<void>;
  maximumSize?: number;
}

export default function DragDrop({
  className,
  id = 'file-upload',
  onDropFile,
  maximumSize = 5,
}: DragDropProps) {
  const [dragOverStatus, setDragOverStatus] = useState(false);

  const isValidFileSize = (file: File) => file.size < maximumSize * 1000 * 1000;

  const { showNoti } = useAssertiveStore();

  return (
    <div
      className={clsx(
        className,
        'mt-1 flex h-36 items-center justify-center rounded-md border-2 border-dashed px-6 py-3 transition-colors',
        dragOverStatus
          ? 'border-theme-500-light dark:border-theme-500-dark'
          : 'border-theme-300-light dark:border-theme-300-dark',
      )}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        setDragOverStatus(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        setDragOverStatus(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOverStatus(false);

        const droppedFile = e.dataTransfer.files[0];

        if (!VALID_FILE_TYPES.includes(droppedFile.type)) {
          return showNoti({
            variant: 'alert',
            title: `Invalid file type: ${droppedFile.type ?? 'Unknown'}`,
          });
        }

        // FIXME: file size validation? windows vs macos
        if (!isValidFileSize(droppedFile)) {
          return showNoti({
            variant: 'alert',
            title: `Exceeded maximum file size ${(droppedFile.size / 1000 / 1000).toFixed(
              1,
            )}MB (Max: ${maximumSize}MB)`,
          });
        }

        onDropFile(droppedFile);
      }}
    >
      {dragOverStatus ? (
        <p className="text-theme-700-light dark:text-theme-700-dark font-medium">
          drop a file here
        </p>
      ) : (
        <div className="space-y-1 text-center">
          <svg
            className="text-theme-400-light dark:text-theme-400-dark mx-auto h-12 w-12"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-theme-600-light dark:text-theme-600-dark flex text-sm">
            <label
              htmlFor={id}
              className="bg-theme-white-light dark:bg-theme-white-dark relative cursor-pointer rounded-md font-medium text-blue-600 focus-within:outline-none hover:text-blue-500"
            >
              <span>Upload a file</span>
              <input
                id={id}
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/jpeg, image/png"
                onChange={(e) => {
                  if (!e.target.files || !e.target.files[0]) return;

                  const file = e.target.files[0];

                  if (!isValidFileSize(file)) {
                    return showNoti({
                      variant: 'alert',
                      title: `Exceeded maximum file size ${(file.size / 1000 / 1000).toFixed(
                        1,
                      )}MB (Max: ${maximumSize}MB)`,
                    });
                  }

                  onDropFile(file);
                }}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-theme-500-light dark:text-theme-500-dark text-xs">
            PNG, JPG up to {maximumSize}MB
          </p>
        </div>
      )}
    </div>
  );
}
