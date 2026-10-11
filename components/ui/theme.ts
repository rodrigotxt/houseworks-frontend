// components/ui/theme.ts
// O tema do app.
//
// Claro e escuro vem do MUI (colorSchemes), seguindo a preferencia do sistema. Isso
// importa mais do que parece numa TV de cozinha: a luz da sala muda, e o painel escuro
// incomoda menos a noite.

'use client';

import { createTheme } from '@mui/material/styles';

/** Breakpoints que os shells usam. Nomeados para o codigo dizer a intencao. */
export const BREAKPOINTS = {
  mobile: 'sm',
  tablet: 'md',
  desktop: 'lg',
} as const;

export const appTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#0f766e' },
        secondary: { main: '#b45309' },
        background: { default: '#f6f7f8', paper: '#ffffff' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#5eead4' },
        secondary: { main: '#fbbf24' },
        background: { default: '#0f1416', paper: '#161d20' },
      },
    },
  },

  shape: { borderRadius: 10 },

  typography: {
    // Fonte do sistema: carrega instantâneo, não depende de rede no build e tem glifos
    // corretos em português. Trocar por uma fonte própria é uma linha aqui.
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: '1.75rem', fontWeight: 600 },
    h2: { fontSize: '1.375rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },

  components: {
    // Um anel de foco visivel e obrigatorio: na TV nao existe mouse, e no teclado o
    // usuario precisa saber onde esta.
    MuiButtonBase: {
      defaultProps: { disableRipple: false },
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: '3px solid',
            outlineColor: 'currentColor',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiCard: { defaultProps: { elevation: 0, variant: 'outlined' } },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': { fontWeight: 700 },
        },
      },
    },
  },
});
