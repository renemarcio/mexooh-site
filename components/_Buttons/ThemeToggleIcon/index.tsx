import {
  ActionIcon,
  Button,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import React from "react";

interface Props {
  size?: string;
}

export default function ThemeToggleIcon({ size }: Props) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  function toggleTheme() {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  }

  return (
    <>
      <ActionIcon
        variant="default"
        size={size ? size : "sm"}
        radius="xl"
        darkHidden
        onClick={toggleTheme}
      >
        <IconMoon size={14} />
      </ActionIcon>
      <ActionIcon
        variant="default"
        size={size ? size : "sm"}
        radius="xl"
        lightHidden
        onClick={toggleTheme}
      >
        <IconSun size={14} />
      </ActionIcon>
    </>
  );
}
