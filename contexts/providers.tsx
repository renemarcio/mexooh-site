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

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <SessionProvider>
        <CityProvider>
          <CartProvider>
            <ServiceProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </ServiceProvider>
          </CartProvider>
        </CityProvider>
      </SessionProvider>
    </MantineProvider>
  );
}
