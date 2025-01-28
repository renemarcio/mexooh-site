"use client";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import React from "react";
import { theme } from "../theme";
import { CityProvider } from "./CityContext";
import { CartProvider } from "./CartContext";
import { SessionProvider } from "next-auth/react";
import { ServiceProvider } from "./ServiceContext";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/pt-br";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <DatesProvider
        settings={{ locale: "pt-br", firstDayOfWeek: 0, consistentWeeks: true }}
      >
        <SessionProvider>
          <CityProvider>
            <CartProvider>
              <ServiceProvider>
                <ModalsProvider>{children}</ModalsProvider>
              </ServiceProvider>
            </CartProvider>
          </CityProvider>
        </SessionProvider>
      </DatesProvider>
    </MantineProvider>
  );
}
