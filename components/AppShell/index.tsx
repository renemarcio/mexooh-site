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
  IconFileInfo,
  IconHomeFilled,
  IconInfoCircleFilled,
  IconLogin2,
  IconShieldLockFilled,
  IconShoppingCart,
  IconUsersGroup,
} from "@tabler/icons-react";
import React from "react";
import { Footer } from "../Footer";
import ThemeToggleIcon from "../_Buttons/ThemeToggleIcon";
import Link from "next/link";
import Logo from "../Logo";
import ShoppingCartDrawer from "../ShoppingCartDrawer";
import { useDisclosure } from "@mantine/hooks";
import { signOut, useSession } from "next-auth/react";
import LoginForm from "../_Forms/Login/LoginForm";
import { useCartContext } from "@/contexts/CartContext";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import FortnightCalendarButton from "../FortnightCalendarButton";
import { FaChevronCircleDown } from "react-icons/fa";
import { RiDownload2Line } from "react-icons/ri";
import { modals } from "@mantine/modals";
import StaffLogin from "../_Forms/Login/StaffLogin";
import styles from "./styles.module.css";
import LargeAppShell from "./LargeAppShell";
import SmallAppShell from "./SmallAppShell";
import PanelIcon from "../_Icons/panel";
import MUPIIcon from "../_Icons/mupi";
import BillboardIcon from "../_Icons/billboard";
import LEDpanelIcon from "../_Icons/ledpanel";
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
          <Box className={styles.navbarHiddenTo}>
            <LargeAppShell
              cartContext={cartContext}
              loginModalOpen={loginModalOpen}
              shoppingCartDrawerToggle={shoppingCartDrawerToggle}
            />
          </Box>
          <Box className={styles.navbarHiddenFrom}>
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
              <NavLink
                onClick={burgerMenuClose}
                href="/"
                label="Home"
                leftSection={<IconHomeFilled size={18} />}
              />
              <NavLink
                onClick={burgerMenuClose}
                href="/#info"
                label="Sobre"
                leftSection={<IconInfoCircleFilled size={18} />}
              />
              <NavLink
                onClick={burgerMenuClose}
                href="/#panels"
                label="Painéis"
                leftSection={<PanelIcon size={18} />}
              />
              <NavLink
                onClick={burgerMenuClose}
                href="/#mupi"
                label="Mobiliário Urbano"
                leftSection={<MUPIIcon size={18} />}
              />
              <NavLink
                onClick={burgerMenuClose}
                href="/#rent"
                label="Outdoor"
                leftSection={<BillboardIcon size={18} />}
              />
              <NavLink
                onClick={burgerMenuClose}
                href="/#ledpanels"
                label="Painéis de LED"
                leftSection={<LEDpanelIcon size={18} />}
              />
              <NavLink
                onClick={burgerMenuClose}
                href="#"
                label="Audiência"
                leftSection={<IconUsersGroup size={18} />}
              />
              <NavLink
                label="Saiba Mais"
                leftSection={<IconFileInfo size={18} />}
              >
                <NavLink
                  href={"downloads/painel_led.pdf"}
                  leftSection={<RiDownload2Line size={18} />}
                  target="_blank"
                  label="Midia Kit Painéis"
                />
                <NavLink
                  href={"downloads/painel_led.pdf"}
                  leftSection={<RiDownload2Line size={18} />}
                  target="_blank"
                  label="Midia Kit Mobiliário Urbano"
                />
                <NavLink
                  href={"downloads/painel_led.pdf"}
                  leftSection={<RiDownload2Line size={18} />}
                  target="_blank"
                  label="Midia Kit Outdoor"
                />
                <NavLink
                  href={"downloads/painel_led.pdf"}
                  leftSection={<RiDownload2Line size={18} />}
                  target="_blank"
                  label="Midia Kit Painel de LED"
                />
              </NavLink>
              <NavLink
                component={Link}
                href={"/admin"}
                label="Área de Colaboradores"
                leftSection={<IconShieldLockFilled size={18} />}
              />
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
