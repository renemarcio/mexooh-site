"use client";

import { ActionIcon, AppShell, Center, Group } from "@mantine/core";
import { IconLogin2, IconShoppingCart } from "@tabler/icons-react";
import React from "react";
import { Footer } from "../Footer";
import ThemeToggleIcon from "../ThemeToggleIcon";
import Link from "next/link";

type AppShellProps = {
  children: React.ReactNode;
};

export default function MyAppShell({ children }: AppShellProps) {
  return (
    <AppShell header={{ height: 70 }}>
      <AppShell.Header>
        <Group justify="space-between" maw={"1920px"} mx={"auto"}>
          <Center h={70}>
            <Link href={"/"}>Logotipo</Link>
          </Center>
          <Group>
            <ThemeToggleIcon />
            <ActionIcon variant="default">
              <IconLogin2 size={14} />
            </ActionIcon>
            <ActionIcon variant="default">
              <IconShoppingCart size={14} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer zIndex={-10}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
