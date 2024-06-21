"use client";

import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Center,
  Divider,
  Group,
  Tooltip,
} from "@mantine/core";
import { IconLogin2, IconShoppingCart } from "@tabler/icons-react";
import React from "react";
import { Footer } from "../Footer";
import ThemeToggleIcon from "../ThemeToggleIcon";
import Link from "next/link";
import Logo from "../Logo";
import ShoppingCartDrawer from "../ShoppingCartDrawer";
import { useDisclosure } from "@mantine/hooks";
import { signOut, useSession } from "next-auth/react";

type AppShellProps = {
  children: React.ReactNode;
};

export default function MyAppShell({ children }: AppShellProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const session = useSession();
  return (
    <>
      <ShoppingCartDrawer opened={opened} close={close} />
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
              <Divider orientation="vertical" />
              {session.status === "unauthenticated" ? (
                <ActionIcon variant="default">
                  <IconLogin2 size={14} />
                </ActionIcon>
              ) : (
                <Tooltip //@ts-ignore
                  label={`Logado como ${session.data?.fantasia}, clique para sair.`}
                >
                  <Avatar
                    color="midiagreen"
                    onClick={() => signOut({ redirect: false })}
                  />
                </Tooltip>
              )}
              <ActionIcon variant="default" onClick={open}>
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
    </>
  );
}
