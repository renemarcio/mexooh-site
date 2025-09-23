"use client";

import FortnightCalendarButton from "@/components/FortnightCalendarButton";
import Logo from "@/components/Logo";
import ThemeToggleIcon from "@/components/_Buttons/ThemeToggleIcon";
import { CartContextType } from "@/contexts/CartContext";
import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Group,
  Indicator,
  Menu,
  Tooltip,
} from "@mantine/core";
import { RiDownload2Line } from "react-icons/ri";
import { FaChevronCircleDown } from "react-icons/fa";
import { IconLogin2, IconShoppingCart, IconDeviceTv, IconBrandWhatsapp } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useScrollToSection from "@/utils/useScrollToSection";
import { buildWhatsAppLink } from "@/utils/whatsapp";

interface Props {
  cartContext: CartContextType;
  burgerMenuOpened: boolean;
  burgerMenuToggle: () => void;
  loginModalOpen: () => void;
  shoppingCartDrawerToggle: () => void;
  scrollToInventory: () => void;      // rola para #LEDpanels
  scrollToBillboards: () => void;     // rola para #billboards
}

export default function SmallAppShell({
  cartContext,
  burgerMenuOpened,
  burgerMenuToggle,
  loginModalOpen,
  shoppingCartDrawerToggle: shoppingCartDrawerOpen,
  scrollToInventory,
  scrollToBillboards: scrollToBillboardsProp,
}: Props) {
  const session = useSession();

  // Hooks de scroll (fallbacks)
  const scrollToLEDPanelHook   = useScrollToSection("LEDpanels");
  const scrollToBillboardsHook = useScrollToSection("billboards");
  const scrollToPanels         = useScrollToSection("panels");
  const scrollToMupi           = useScrollToSection("mupi");

  // Preferir funções vindas por props
  const goLED        = scrollToInventory || scrollToLEDPanelHook;
  const goBillboards = scrollToBillboardsProp || scrollToBillboardsHook;

  // Link do WhatsApp (mobile)
  const whatsHref = buildWhatsAppLink({ utmCampaign: "header_cta_mobile" });

  // Estilo base das pílulas
  const pillProps = {
    radius: "xl" as const,
    size: "sm" as const,
    leftSection: <IconDeviceTv size={16} />,
    styles: { root: { boxShadow: "0 4px 12px rgba(0,0,0,.10)" } },
  };

  return (
    <>
      <Group h={70} justify="space-between" px="lg" w="100vw">
        {/* Logo + burger */}
        <Group>
          <Burger opened={burgerMenuOpened} onClick={burgerMenuToggle} />
          <Box h={70} p={10} component={Link} href="/">
            <Logo />
          </Box>
        </Group>

        {/* Navegação */}
        <Box>
          <Center>
            <Group gap={8} align="center">
              {/* Pílulas principais */}
              <Button {...pillProps} variant="gradient" gradient={{ from: "orange", to: "red", deg: 35 }} onClick={goBillboards}>
                Outdoors
              </Button>

              <Button {...pillProps} variant="gradient" gradient={{ from: "teal", to: "lime", deg: 35 }} onClick={scrollToPanels} visibleFrom="sm">
                Rodovia
              </Button>

              <Button {...pillProps} variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 35 }} onClick={goLED}>
                Painéis de LED
              </Button>

              <Button {...pillProps} variant="gradient" gradient={{ from: "grape", to: "pink", deg: 35 }} onClick={scrollToMupi} visibleFrom="sm">
                Mobiliário Urbano
              </Button>

              {/* Menu "Saiba mais" */}
              <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={400}
                withinPortal
                shadow="md"
                position="bottom-end"
                zIndex={200000}
              >
                <Menu.Target>
                  <Button
                    variant="subtle"
                    size="sm"
                    radius="xl"
                    leftSection={<FaChevronCircleDown size={14} />}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Saiba mais
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item component={Link} href="/downloads/painel_led.pdf" target="_blank" leftSection={<RiDownload2Line />}>
                    Mídia Kit Painéis
                  </Menu.Item>
                  <Menu.Item component={Link} href="/downloads/painel_led.pdf" target="_blank" leftSection={<RiDownload2Line />}>
                    Mídia Kit Mobiliário Urbano
                  </Menu.Item>
                  <Menu.Item component={Link} href="/downloads/painel_led.pdf" target="_blank" leftSection={<RiDownload2Line />}>
                    Mídia Kit Outdoor
                  </Menu.Item>
                  <Menu.Item component={Link} href="/downloads/painel_led.pdf" target="_blank" leftSection={<RiDownload2Line />}>
                    Mídia Kit Painel de LED
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {/* Ações extras */}
              <FortnightCalendarButton variant="filled" title="Bi-Semanas" />

              <Button component={Link} href="/admin" visibleFrom="sm">
                Área de Colaboradores
              </Button>

              {/* WhatsApp compacto */}
              <ActionIcon
                component="a"
                href={whatsHref}
                target="_blank"
                rel="noopener nofollow"
                size="lg"
                radius="xl"
                variant="filled"
                color="green"
                aria-label="Fale no WhatsApp"
              >
                <IconBrandWhatsapp size={18} />
              </ActionIcon>

              <ThemeToggleIcon size="lg" />

              {/* Login / Avatar */}
              {session.status !== "authenticated" ? (
                <ActionIcon variant="default" onClick={loginModalOpen} size="lg" radius="xl">
                  <IconLogin2 size={14} />
                </ActionIcon>
              ) : (
                <Tooltip // @ts-ignore
                  label={`Logado como ${session.data?.nome}, clique para sair.`}
                >
                  <Avatar
                    color="var(--mantine-primary-color-filled)"
                    onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                  />
                </Tooltip>
              )}

              {/* Carrinho */}
              <Indicator label={cartContext.cart.length.toString()} size="xs" disabled={cartContext.cart.length === 0}>
                <ActionIcon variant="default" onClick={shoppingCartDrawerOpen} size="lg" radius="xl">
                  <IconShoppingCart size={14} />
                </ActionIcon>
              </Indicator>
            </Group>
          </Center>
        </Box>
      </Group>
    </>
  );
}
