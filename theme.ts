"use client";

import { generateColors } from "@mantine/colors-generator";
import { createTheme } from "@mantine/core";

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    midiagreen: generateColors("#00652E"),
  },
  primaryColor: "midiagreen",
  primaryShade: 9,
});
