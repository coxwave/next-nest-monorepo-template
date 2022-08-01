import type { ComponentProps, ElementType } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export type PropsOf<TTag = any> = TTag extends ElementType ? ComponentProps<TTag> : never;
