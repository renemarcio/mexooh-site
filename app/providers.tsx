"use client";

import React from "react";
import { MantineProvider } from "@mantine/core";
import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import mantineCache from "../contexts/emotion-cache"; 

import { ModalsProvider } from "@mantine/modals";
import { DatesProvider } from "@mantine/dates";
import { SessionProvider } from "next-auth/react";

import { theme } from "../theme";
import { CityProvider } from "../contexts/CityContext"; 

import { CartProvider } from "../contexts/CartContext"; 
import { ServiceProvider } from "../contexts/ServiceContext"; 

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "dayjs/locale/pt-br";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionCacheProvider value={mantineCache}>
      <SessionProvider>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <DatesProvider settings={{ locale: "pt-br", firstDayOfWeek: 0, consistentWeeks: true }}>
            <CityProvider>
              <CartProvider>
                <ServiceProvider>
                  <ModalsProvider>{children}</ModalsProvider>
                </ServiceProvider>
              </CartProvider>
            </CityProvider>
          </DatesProvider>
        </MantineProvider>
      </SessionProvider>
    </EmotionCacheProvider>
  );
}
