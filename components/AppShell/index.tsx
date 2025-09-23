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
  NavLink,
  Drawer,
  Button,
} from "@mantine/core";
import useScrollToSection from "@/utils/useScrollToSection";

import {
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
import FortnightCalendarButton from "../FortnightCalendarButton";
import { RiDownload2Line } from "react-icons/ri";
import StaffLogin from "../_Forms/Login/StaffLogin";
import styles from "./styles.module.css";
import LargeAppShell from "./LargeAppShell";
import SmallAppShell from "./SmallAppShell";
// import PanelIcon from "../_Icons/panel";
// import MUPIIcon from "../_Icons/mupi";
// import BillboardIcon from "../_Icons/billboard";
// import LEDpanelIcon from "../_Icons/ledpanel";

// ⬇️ FAB do WhatsApp (site todo)
import dynamic from "next/dynamic";
const WhatsAppFab = dynamic(
  () => import("@/components/_Floating/WhatsAppFab"),
  { ssr: false } // <-- renderiza só no cliente
);


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

  // hooks de scroll usados em desktop e mobile
  const scrollToLEDPanel = useScrollToSection("LEDpanels");
  const scrollToBillboards = useScrollToSection("billboards");

  const session = useSession();

  return (
    <>
      <ShoppingCartDrawer
        opened={shoppingCartDrawerOpened}
        close={shoppingCartDrawerClose}
      />

      <AppShell header={{ height: 140 }}>
      <AppShell.Header
          // manter overflow p/ o dropdown, mas agora com altura suficiente
          style={{ overflow: "visible", background: "var(--mantine-color-body)" }}
          zIndex={200000}
        >
        {/* Desktop */}
        <Box
          className={styles.navbarHiddenTo}
          /* visível em telas largas */
          style={{ overflow: "visible", position: "relative", zIndex: 200001 }}
        >
          <LargeAppShell
            cartContext={cartContext}
            loginModalOpen={loginModalOpen}
            shoppingCartDrawerToggle={shoppingCartDrawerToggle}
            scrollToInventory={scrollToLEDPanel}
          />
        </Box>

        {/* Mobile */}
        <Box
          className={styles.navbarHiddenFrom}
          /* visível em telas pequenas */
          style={{ overflow: "visible", position: "relative", zIndex: 200001 }}
        >
          <SmallAppShell
            cartContext={cartContext}
            burgerMenuOpened={burgerMenuOpened}
            burgerMenuToggle={burgerMenuToggle}
            loginModalOpen={loginModalOpen}
            shoppingCartDrawerToggle={shoppingCartDrawerToggle}
            scrollToInventory={scrollToLEDPanel}
            scrollToBillboards={scrollToBillboards}
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

          {/* Drawer do menu mobile (deixe desativado se ainda não quiser usar) */}
          <Box className={styles.navbarHiddenFrom}>
            {false && (
              <Drawer
                opened={burgerMenuOpened}
                onClose={burgerMenuClose}
                size="100%"
                zIndex={200000}
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
                {/* Exemplo de itens adicionais:
                <NavLink onClick={burgerMenuClose} href="/#panels" label="Painéis" leftSection={<PanelIcon size={18} />} />
                */}
                <NavLink
                  onClick={burgerMenuClose}
                  href="#"
                  label="Audiência"
                  leftSection={<IconUsersGroup size={18} />}
                />
                <NavLink label="Saiba Mais" leftSection={<IconFileInfo size={18} />}>
                  <NavLink
                    href={"/downloads/painel_led.pdf"}
                    leftSection={<RiDownload2Line size={18} />}
                    target="_blank"
                    label="Mídia Kit Painéis"
                  />
                  <NavLink
                    href={"/downloads/painel_led.pdf"}
                    leftSection={<RiDownload2Line size={18} />}
                    target="_blank"
                    label="Mídia Kit Mobiliário Urbano"
                  />
                  <NavLink
                    href={"/downloads/painel_led.pdf"}
                    leftSection={<RiDownload2Line size={18} />}
                    target="_blank"
                    label="Mídia Kit Outdoor"
                  />
                  <NavLink
                    href={"/downloads/painel_led.pdf"}
                    leftSection={<RiDownload2Line size={18} />}
                    target="_blank"
                    label="Mídia Kit Painel de LED"
                  />
                </NavLink>

                <NavLink
                  component={Link}
                  href={"/admin"}
                  label="Área de Colaboradores"
                  leftSection={<IconShieldLockFilled size={18} />}
                />
              </Drawer>
            )}
          </Box>

          {children}
        </AppShell.Main>

        <AppShell.Footer zIndex={-10}>
          <Footer />
        </AppShell.Footer>

        {/* Botão flutuante de WhatsApp (site todo) */}
        <WhatsAppFab />
      </AppShell>
    </>
  );
}
