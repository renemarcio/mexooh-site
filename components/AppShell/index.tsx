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
import LargeAppShell from "./LargeAppShell";
import SmallAppShell from "./SmallAppShell";
type AppShellProps = {
  children: React.ReactNode;
};

export default function MyAppShell({ children }: AppShellProps) {
  const [
    shoppingCartDrawerOpened,
    {
      open: shoppingCartDrawerOpen,
      close: shoppingCartDrawerClose,
      toggle: shoppingCartDrawerToggle,
    },
  ] = useDisclosure(false);
  const [
    burgerMenuOpened,
    { open: burgerMenuOpen, close: burgerMenuClose, toggle: burgerMenuToggle },
  ] = useDisclosure(false);

  const [loginModalOpened, { open: loginModalOpen, close: loginModalClose }] =
    useDisclosure(false);
  const cartContext = useCartContext();
  return (
    <>
      <ShoppingCartDrawer
        opened={shoppingCartDrawerOpened}
        close={shoppingCartDrawerClose}
      />
      <AppShell header={{ height: 70 }}>
        <AppShell.Header zIndex={9999}>
          <Box visibleFrom="lg">
            <LargeAppShell
              cartContext={cartContext}
              loginModalOpen={loginModalOpen}
              shoppingCartDrawerToggle={shoppingCartDrawerToggle}
            />
          </Box>
          <Box hiddenFrom="lg">
            <SmallAppShell
              cartContext={cartContext}
              burgerMenuOpened={burgerMenuOpened}
              burgerMenuToggle={burgerMenuToggle}
              loginModalOpen={loginModalOpen}
              shoppingCartDrawerToggle={shoppingCartDrawerToggle}
            />
          </Box>
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
              <NavLink label="Saiba Mais">
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
