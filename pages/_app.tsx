import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { AuthProvider, CartProvider, UIProvider } from '@/context';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@/themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UIProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  );
}

