// frontend/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import MuiRegistry from '@/components/MuiRegistry';
import NavigationBottom from '@/components/NavigationBottom';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <MuiRegistry>
          {children}
          <NavigationBottom />
          </MuiRegistry>
      </body>
    </html>
  );
}