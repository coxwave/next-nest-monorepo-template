import '@/assets/main.css';

import NextNProgress from 'nextjs-progressbar';

import { AssertiveStoreProvider } from '@/frontend/context/assertives';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#29D"
        showOnShallow={false}
        height={2}
        startPosition={0.3}
        options={{ easing: 'ease', speed: 500, showSpinner: false }}
      />
      <AssertiveStoreProvider>
        <Component {...pageProps} />
      </AssertiveStoreProvider>
    </>
  );
}
