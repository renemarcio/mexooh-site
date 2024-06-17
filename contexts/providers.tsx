"use client";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import React from "react";
import { theme } from "../theme";
import { CityProvider } from "./CityContext";
import { CartProvider } from "./CartContext";
import { SessionProvider } from "next-auth/react";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <SessionProvider>
        <CityProvider>
          <CartProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </CartProvider>
        </CityProvider>
      </SessionProvider>
    </MantineProvider>
  );
}
