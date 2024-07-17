"use client";

import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Center,
  Divider,
  Group,
  Indicator,
  Modal,
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
import LoginForm from "../LoginForm";
import { useCartContext } from "@/contexts/CartContext";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

type AppShellProps = {
  children: React.ReactNode;
};

export default function MyAppShell({ children }: AppShellProps) {
  const [
    shoppingCartDrawerOpened,
    { open: shoppingCartDrawerOpen, close: shoppingCartDrawerClose },
  ] = useDisclosure(false);
  const [loginModalOpened, { open: loginModalOpen, close: loginModalClose }] =
    useDisclosure(false);
  const session = useSession();
  const cartContext = useCartContext();
  const pathname = usePathname();
  return (
    <>
      <ShoppingCartDrawer
        opened={shoppingCartDrawerOpened}
        close={shoppingCartDrawerClose}
      />
      <AppShell header={{ height: 70 }}>
        <AppShell.Header>
          <Group justify="space-between" maw={"1960px"} px={"60"} mx={"auto"}>
            <Center>
              <Link href={"/"}>
                <Box h={70} p={10}>
                  <Logo />
                </Box>
              </Link>
              <Group gap={"sm"}>
                <Divider orientation="vertical" color="midiagreen" my="lg" />
                <Link
                  href={"/"}
                  style={{
                    textDecoration: "none",
                    color: "var(--mantine-color-text)",
                    fontWeight: "600",
                  }}
                >
                  Home
                </Link>
                {pathname === "/" && (
                  <>
                    <Divider
                      orientation="vertical"
                      color="midiagreen"
                      my="lg"
                    />
                    <Link
                      href={"#info"}
                      style={{
                        textDecoration: "none",
                        color: "var(--mantine-color-text)",
                        fontWeight: "600",
                      }}
                    >
                      Sobre
                    </Link>
                    <Divider
                      orientation="vertical"
                      color="midiagreen"
                      my="lg"
                    />
                    <Link
                      href={"#rent"}
                      style={{
                        textDecoration: "none",
                        color: "var(--mantine-color-text)",
                        fontWeight: "600",
                      }}
                    >
                      Outdoor
                    </Link>
                    <Divider
                      orientation="vertical"
                      color="midiagreen"
                      my="lg"
                    />
                    <Link
                      href={"#panels"}
                      style={{
                        textDecoration: "none",
                        color: "var(--mantine-color-text)",
                        fontWeight: "600",
                      }}
                    >
                      Painéis
                    </Link>
                    <Divider
                      orientation="vertical"
                      color="midiagreen"
                      my="lg"
                    />
                  </>
                )}
              </Group>
            </Center>
            <Group>
              <ThemeToggleIcon />
              <Divider orientation="vertical" />
              {session.status === "unauthenticated" ? (
                <ActionIcon variant="default" onClick={loginModalOpen}>
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
              <Indicator
                label={cartContext.cart.length.toString()}
                size={"xs"}
                disabled={cartContext.cart.length === 0}
              >
                <ActionIcon variant="default" onClick={shoppingCartDrawerOpen}>
                  <IconShoppingCart size={14} />
                </ActionIcon>
              </Indicator>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Modal
            opened={loginModalOpened}
            onClose={loginModalClose}
            centered
            children={<LoginForm nextStepFn={loginModalClose} />}
          />
          {children}
        </AppShell.Main>
        <AppShell.Footer zIndex={-10}>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </>
  );
}
