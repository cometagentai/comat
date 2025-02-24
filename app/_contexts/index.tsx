'use client';

import { Analytics } from '@vercel/analytics/react';

import { PrivyProvider } from './privy';
import { ColorModeProvider } from './color-mode';
import { Provider } from 'react-redux';
import { TokensProvider } from '../(app)/bridge/context/TokensContext';
import { store } from '../(app)/bridge/store';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { generateTheme } from './theme';
import { RouteProvider } from '../(app)/bridge/context/RouteContext';

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  // Handle theme changes at any time
  const muiTheme = React.useMemo(() => generateTheme({ mode: 'dark' }), []);

  return (
    <PrivyProvider>
      <ColorModeProvider>
        <Provider store={store}>
          <ThemeProvider theme={muiTheme}>
            <TokensProvider>
              <RouteProvider>
                <Analytics />
                {children}
              </RouteProvider>
            </TokensProvider>
          </ThemeProvider>
        </Provider>
      </ColorModeProvider>
    </PrivyProvider>
  );
};

export default Providers;

export * from './color-mode';
