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
  Burger,
  Drawer,
  getDefaultZIndex,
  NavLink,
} from "@mantine/core";
import {
  IconBurger,
  IconDownload,
  IconLogin2,
  IconShoppingCart,
} from "@tabler/icons-react";
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
import styles from "./styles.module.css";
type AppShellProps = {
  children: React.ReactNode;
};

export default function MyAppShell({ children }: AppShellProps) {
  const [
    shoppingCartDrawerOpened,
    { open: shoppingCartDrawerOpen, close: shoppingCartDrawerClose },
  ] = useDisclosure(false);
  const [
    burgerMenuOpened,
    { open: burgerMenuOpen, close: burgerMenuClose, toggle: burgerMenuToggle },
  ] = useDisclosure(false);

  const minNavBarWidth = "1521px";

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
        <AppShell.Header zIndex={9999}>
          <Group justify="space-between" maw={"1960px"} px={"60"} mx={"auto"}>
            <Center>
              <Link href={"/"}>
                <Group>
                  <Burger
                    className={styles.navbarHiddenFrom}
                    size={30}
                    onClick={burgerMenuToggle}
                    opened={burgerMenuOpened}
                  />
                  <Box h={70} p={10}>
                    <Logo />
                  </Box>
                </Group>
              </Link>
              <Box className={styles.navbarHiddenTo}>
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
                        zIndex={10000}
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
                            Midia Kit Mobiliário Urbano
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
              </Box>
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
                  label={`Logado como ${session.data?.nome}, clique para sair.`}
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
          <Box className={styles.navbarHiddenFrom}>
            <Drawer
              opened={burgerMenuOpened}
              onClose={burgerMenuClose}
              hiddenFrom={minNavBarWidth}
              size="100%"
              // position="right"
              // children={<BurgerMenu />}
              zIndex={9998}
            >
              <Box h={30} />
              <NavLink onClick={burgerMenuClose} href="/" label="Home" />
              <NavLink onClick={burgerMenuClose} href="/#info" label="Sobre" />
              <NavLink
                onClick={burgerMenuClose}
                href="/#panels"
                label="Rodovia"
              />
              <NavLink
                onClick={burgerMenuClose}
                href="/#mup"
                label="Mobiliário Urbano"
              />
              <NavLink
                onClick={burgerMenuClose}
                href="/#rent"
                label="Outdoor"
              />
              <NavLink
                onClick={burgerMenuClose}
                href="/#ledpanels"
                label="Painéis de LED"
              />
              <NavLink onClick={burgerMenuClose} href="#" label="Audiência" />
              <NavLink onClick={burgerMenuClose} label="Saiba Mais">
                <NavLink
                  href={"downloads/apresentacao_painel_digital.pdf"}
                  leftSection={<RiDownload2Line />}
                  target="_blank"
                  label="Midia Kit Painéis"
                />
                <NavLink
                  href={"downloads/apresentacao_painel_digital.pdf"}
                  leftSection={<RiDownload2Line />}
                  target="_blank"
                  label="Midia Kit Mobiliário Urbano"
                />
                <NavLink
                  href={"downloads/apresentacao_painel_digital.pdf"}
                  leftSection={<RiDownload2Line />}
                  target="_blank"
                  label="Midia Kit Outdoor"
                />
                <NavLink
                  href={"downloads/apresentacao_painel_digital.pdf"}
                  leftSection={<RiDownload2Line />}
                  target="_blank"
                  label="Midia Kit Painel de LED"
                />
              </NavLink>
            </Drawer>
          </Box>
          {children}
        </AppShell.Main>
        <AppShell.Footer zIndex={-10}>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </>
  );
}
