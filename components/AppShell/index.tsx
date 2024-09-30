"use client";

import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Text,
  Center,
  Divider,
  Group,
  Indicator,
  Modal,
  Tooltip,
  UnstyledButton,
  Menu,
  Button,
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
import FortnightCalendarButton from "../FortnightCalendarButton";
import { FaChevronCircleDown } from "react-icons/fa";
import { RiDownload2Line } from "react-icons/ri";
import { modals } from "@mantine/modals";
import StaffLogin from "../StaffLogin";

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
                <Divider
                  orientation="vertical"
                  color="var(--mantine-primary-color-filled)"
                  my="lg"
                />
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
                      color="var(--mantine-primary-color-filled)"
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
                      color="var(--mantine-primary-color-filled)"
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
                      Rodovia
                    </Link>
                    <Divider
                      orientation="vertical"
                      color="var(--mantine-primary-color-filled)"
                      my="lg"
                    />
                    <Link
                      href={"#mup"}
                      style={{
                        textDecoration: "none",
                        color: "var(--mantine-color-text)",
                        fontWeight: "600",
                      }}
                    >
                      Mobiliário Urbano
                    </Link>
                    <Divider
                      orientation="vertical"
                      color="var(--mantine-primary-color-filled)"
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
                    {/* <Divider
                      orientation="vertical"
                      color="var(--mantine-primary-color-filled)"
                      my="lg"
                    />
                    <Link
                      href={"#"}
                      style={{
                        textDecoration: "none",
                        color: "var(--mantine-color-text)",
                        fontWeight: "600",
                      }}
                    >
                      Front Light
                    </Link> */}
                    <Divider
                      orientation="vertical"
                      color="var(--mantine-primary-color-filled)"
                      my="lg"
                    />
                    <Link
                      href={"#ledpanels"}
                      style={{
                        textDecoration: "none",
                        color: "var(--mantine-color-text)",
                        fontWeight: "600",
                      }}
                    >
                      Painéis de LED
                    </Link>
                    <Divider
                      orientation="vertical"
                      color="var(--mantine-primary-color-filled)"
                      my="lg"
                    />
                    <Link
                      href={"#"}
                      style={{
                        textDecoration: "none",
                        color: "var(--mantine-color-text)",
                        fontWeight: "600",
                      }}
                    >
                      Audiência
                    </Link>
                    <Divider
                      orientation="vertical"
                      color="var(--mantine-primary-color-filled)"
                      my="lg"
                    />
                    <Menu
                      trigger="hover"
                      openDelay={100}
                      closeDelay={400}
                      shadow="md"
                    >
                      <Menu.Target>
                        <UnstyledButton
                          style={{
                            textDecoration: "none",
                            color: "var(--mantine-color-text)",
                            fontWeight: "600",
                            pointerEvents: "all",
                          }}
                        >
                          Saiba mais {"  "}
                          <FaChevronCircleDown size={14} />
                        </UnstyledButton>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          component={Link}
                          href={"downloads/apresentacao_painel_digital.pdf"}
                          target="_blank"
                          leftSection={<RiDownload2Line />}
                        >
                          Midia Kit Painéis
                        </Menu.Item>
                        <Menu.Item
                          component={Link}
                          href={"downloads/apresentacao_painel_digital.pdf"}
                          target="_blank"
                          leftSection={<RiDownload2Line />}
                        >
                          Midia Kit MUP
                        </Menu.Item>
                        <Menu.Item
                          component={Link}
                          href={"downloads/apresentacao_painel_digital.pdf"}
                          target="_blank"
                          leftSection={<RiDownload2Line />}
                        >
                          Midia Kit Outdoor
                        </Menu.Item>
                        <Menu.Item
                          component={Link}
                          href={"downloads/apresentacao_painel_digital.pdf"}
                          target="_blank"
                          leftSection={<RiDownload2Line />}
                        >
                          Midia Kit Painel de LED
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </>
                )}
              </Group>
            </Center>
            <Group>
              <FortnightCalendarButton variant="filled" title="Bi-Semanas" />
              {/* <Divider orientation="vertical" /> */}
              {pathname === "/" && (
                <>
                  <Button
                    variant="filled"
                    // component={Link} href="/admin"
                    onClick={() =>
                      modals.open({
                        title: "Login",
                        centered: true,
                        children: <StaffLogin />,
                        size: "auto",
                        closeOnClickOutside: true,
                        onClose: () => modals.closeAll(),
                      })
                    }
                  >
                    Área de Colaboradores
                  </Button>
                </>
              )}
              <Divider orientation="vertical" />
              <ThemeToggleIcon />
              <Divider orientation="vertical" />
              {session.status !== "authenticated" ? (
                <ActionIcon variant="default" onClick={loginModalOpen}>
                  <IconLogin2 size={14} />
                </ActionIcon>
              ) : (
                <Tooltip //@ts-ignore
                  label={`Logado como ${session.data?.fantasia}, clique para sair.`}
                >
                  <Avatar
                    color="var(--mantine-primary-color-filled)"
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
