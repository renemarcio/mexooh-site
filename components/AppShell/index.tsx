"use client";

import { ActionIcon, AppShell, Box, Center, Group, Stack } from "@mantine/core";
import { IconLogin2, IconShoppingCart } from "@tabler/icons-react";
import React from "react";
import { Footer } from "../Footer";
import ThemeToggleIcon from "../ThemeToggleIcon";
import Link from "next/link";
import Logo from "../Logo";

type AppShellProps = {
  children: React.ReactNode;
};

export default function MyAppShell({ children }: AppShellProps) {
  return (
    <AppShell header={{ height: 70 }}>
      <AppShell.Header>
        <Group justify="space-between" maw={"1960px"} px={"60"} mx={"auto"}>
          <Center>
            <Link href={"/"}>
              <Box h={70} p={10}>
                <Logo />
              </Box>
            </Link>
          </Center>
          <Group>
            <ThemeToggleIcon />
            <ActionIcon variant="default">
              <IconLogin2 size={14} />
            </ActionIcon>
            <Link href={"/checkout"}>
              <ActionIcon variant="default">
                <IconShoppingCart size={14} />
              </ActionIcon>
            </Link>
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
