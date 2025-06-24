// src/MuiRegistry.js
'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export default function MuiRegistry({ children }) {
  const cache = React.useMemo(() => {
    const cache = createCache({ key: 'css', prepend: true }); // `prepend: true` helps with CSS order
    cache.compat = true; // For compatibility with older browsers/polyfills
    return cache;
  }, []);

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}