import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  Container,
  Box,
} from "@mantine/core";
import { theme } from "../theme";
import MyAppShell from "../components/AppShell";
// import { MidiaTheme } from "../lib/theme";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import classes from "./styles.module.css";
import { ModalsProvider } from "@mantine/modals";

export const metadata = {
  title: "Mex",
  description: "Locação de painéis e outdoors é aqui!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="pt-br">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <ModalsProvider>
            <MyAppShell>
              <Box className={classes.body} mb={"330px"}>
                {children}
              </Box>
            </MyAppShell>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
