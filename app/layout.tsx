import React from "react";
import { ColorSchemeScript } from "@mantine/core";
import MyAppShell from "../components/AppShell";
import Providers from "../contexts/providers";
import { Metadata } from "next";
import "../styles/globals.css"; 


export const metadata: Metadata = {
  title: "Mex OOH",
  description: "Locação de painéis e outdoors é aqui!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" data-mantine-color-scheme="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body>
        <Providers>
          <MyAppShell>
            <div style={{ backgroundColor: "var(--mantine-color-body)", paddingBottom: 100 }}>
              {children}
            </div>
          </MyAppShell>
        </Providers>
      </body>
    </html>
  );
}
