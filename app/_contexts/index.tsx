'use client';

import { Analytics } from '@vercel/analytics/react';

import { PrivyProvider } from './privy';
import { ColorModeProvider } from './color-mode';
import { Provider } from 'react-redux';
import { TokensProvider } from '../(app)/bridge/context/TokensContext';
import { store } from '../(app)/bridge/store';

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <PrivyProvider>
      <ColorModeProvider>
        <Provider store={store}>
          <TokensProvider>
            <Analytics />
            {children}
          </TokensProvider>
        </Provider>
      </ColorModeProvider>
    </PrivyProvider>
  );
};

export default Providers;

export * from './color-mode';
