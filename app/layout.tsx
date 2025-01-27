import React from "react";
import { ColorSchemeScript, Box, Button } from "@mantine/core";
import MyAppShell from "../components/AppShell";

import Providers from "../contexts/providers";

export const metadata = {
  title: "Mex OOH",
  description: "Locação de painéis e outdoors é aqui!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="pt-br" style={{ scrollBehavior: "smooth" }}>
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
            <Box
              style={{
                backgroundColor: "var(--mantine-color-body)",
              }}
              pb={"100px"}
              mb={"600px"}
            >
              {children}
            </Box>
          </MyAppShell>
        </Providers>
      </body>
    </html>
  );
}
