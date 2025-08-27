"use client";
import FortnightCalendarButton from "@/components/FortnightCalendarButton";
import Logo from "@/components/Logo";
import ThemeToggleIcon from "@/components/_Buttons/ThemeToggleIcon";
import StaffLogin from "@/components/_Forms/Login/StaffLogin";
import { CartContextType } from "@/contexts/CartContext";

import {
  ActionIcon,
  ActionIconGroup,
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Indicator,
  Tooltip,
  Group,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconLogin2, IconShoppingCart, IconDeviceTv } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useScrollToSection from "@/utils/useScrollToSection";

interface Props {
  cartContext: CartContextType;
  burgerMenuOpened: boolean;
  burgerMenuToggle: () => void;
  loginModalOpen: () => void;
  shoppingCartDrawerToggle: () => void;
  /** mantidas para compatibilidade; se vierem, usamos, senão caímos no hook */
  scrollToInventory: () => void;     // normalmente rola para #LEDpanels
  scrollToBillboards: () => void;    // normalmente rola para #billboards
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

  // Hooks de scroll
  const scrollToLEDPanelHook   = useScrollToSection("LEDpanels");
  const scrollToBillboardsHook = useScrollToSection("billboards");
  const scrollToPanels         = useScrollToSection("panels");
  const scrollToMupi           = useScrollToSection("mupi");

  // Preferir as funções passadas por props, se existirem (retrocompatibilidade)
  const goLED        = scrollToInventory || scrollToLEDPanelHook;
  const goBillboards = scrollToBillboardsProp || scrollToBillboardsHook;

  // estilo base das pílulas (versão compacta)
  const pillProps = {
    radius: "xl" as const,
    size: "sm" as const,
    leftSection: <IconDeviceTv size={16} />,
    styles: { root: { boxShadow: "0 4px 12px rgba(0,0,0,.10)" } },
  };

  return (
    <>
      <Group h={70} justify="space-between" px={"lg"} w={"100vw"}>
        <Group>
          <Burger opened={burgerMenuOpened} onClick={burgerMenuToggle} />
          <Box h={70} p={10} component={Link} href="/">
            <Logo />
          </Box>
        </Group>

        <Box>
          <Center>
            <Group gap={8} align="center">
              {/* OUTDOORS -> #billboards */}
              <Button
                {...pillProps}
                variant="gradient"
                gradient={{ from: "orange", to: "red", deg: 35 }}
                onClick={goBillboards}
              >
                Outdoors
              </Button>

              {/* PAINÉIS (RODOVIA) -> #panels */}
              <Button
                {...pillProps}
                variant="gradient"
                gradient={{ from: "teal", to: "lime", deg: 35 }}
                onClick={scrollToPanels}
                visibleFrom="sm"
              >
                Painéis Rodoviários
              </Button>

              {/* LED -> #LEDpanels */}
              <Button
                {...pillProps}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 35 }}
                onClick={goLED}
              >
                Painéis de LED
              </Button>

              {/* MUPI -> #mupi */}
              <Button
                {...pillProps}
                variant="gradient"
                gradient={{ from: "grape", to: "pink", deg: 35 }}
                onClick={scrollToMupi}
                visibleFrom="sm"
              >
                Mobiliário Urbano
              </Button>

              <FortnightCalendarButton variant="filled" title="Bi-Semanas" />

              <Button component={Link} href="/admin" visibleFrom="sm">
                Área de Colaboradores
              </Button>

              <ThemeToggleIcon size="lg" />

              {session.status !== "authenticated" ? (
                <ActionIcon variant="default" onClick={loginModalOpen} size={"lg"} radius={"xl"}>
                  <IconLogin2 size={14} />
                </ActionIcon>
              ) : (
                <Tooltip //@ts-ignore
                  label={`Logado como ${session.data?.nome}, clique para sair.`}
                >
                  <Avatar
                    color="var(--mantine-primary-color-filled)"
                    onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                  />
                </Tooltip>
              )}

              <Indicator
                label={cartContext.cart.length.toString()}
                size={"xs"}
                disabled={cartContext.cart.length === 0}
              >
                <ActionIcon variant="default" onClick={shoppingCartDrawerOpen} size={"lg"} radius={"xl"}>
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
