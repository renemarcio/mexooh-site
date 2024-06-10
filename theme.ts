"use client";

import { generateColors } from "@mantine/colors-generator";
import { createTheme, rem } from "@mantine/core";
import { futura, handelGoth } from "./styles/fonts/fonts";

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    midiagreen: generateColors("#00652E"),
  },
  primaryColor: "midiagreen",
  primaryShade: 9,

  fontFamily: `${futura.style.fontFamily}, Segoe UI, sans-serif`,

  headings: {
    fontFamily: `${handelGoth.style.fontFamily}, Segoe UI, sans-serif`,
  },

  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(22),
  },
});
