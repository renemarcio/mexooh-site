import React from "react";
import { ColorSchemeScript, Box } from "@mantine/core";
import MyAppShell from "../components/AppShell";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import classes from "./styles.module.css";
import Providers from "../contexts/providers";

export const metadata = {
  title: "Mex",
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
          http-equiv="Content-Security-Policy"
          content="script-src 'self' https://maps.googleapis.com"
        />
      </head>
      <body>
        <Providers>
          <MyAppShell>
            <Box className={classes.body} mb={"330px"}>
              {children}
            </Box>
          </MyAppShell>
        </Providers>
      </body>
    </html>
  );
}
