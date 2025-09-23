"use client";

import React, { useEffect, useState } from "react";
import FortnightCalendarButton from "@/components/FortnightCalendarButton";
import Logo from "@/components/Logo";
import ThemeToggleIcon from "@/components/_Buttons/ThemeToggleIcon";
import { CartContextType } from "@/contexts/CartContext";

import {
  Group,
  Center,
  Box,
  Divider,
  Menu,
  UnstyledButton,
  Button,
  ActionIcon,
  Tooltip,
  Avatar,
  Indicator,
} from "@mantine/core";
import {
  IconLogin2,
  IconShoppingCart,
  IconDeviceTv,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaChevronCircleDown } from "react-icons/fa";
import { RiDownload2Line } from "react-icons/ri";
import useScrollToSection from "@/utils/useScrollToSection";

interface Props {
  cartContext: CartContextType;
  loginModalOpen: () => void;
  shoppingCartDrawerToggle: () => void;
  scrollToInventory?: () => void; // costuma apontar para LED
}

export default function LargeAppShell({
  cartContext,
  loginModalOpen,
  shoppingCartDrawerToggle: shoppingCartDrawerOpen,
  scrollToInventory,
}: Props) {
  const session = useSession();

  // Hooks de scroll
  const scrollToLEDPanel = useScrollToSection("LEDpanels");
  const scrollToBillboards = useScrollToSection("billboards");
  const scrollToPanels = useScrollToSection("panels");
  const scrollToMupi = useScrollToSection("mupi");

  // Preferir função do pai; senão, hash + scroll
  const goLED =
    scrollToInventory ??
    (() => {
      if (typeof window !== "undefined") {
        const targetHash = "#LEDpanels";
        const needsHashChange = window.location.hash !== targetHash;
        window.location.hash = targetHash;
        if (needsHashChange) window.dispatchEvent(new HashChangeEvent("hashchange"));
        setTimeout(() => scrollToLEDPanel(), 150);
      }
    });

  // --- WhatsApp: renderizar apenas no cliente para eliminar hidratação ---
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const WHATS_STATIC =
    "https://wa.me/5511972301116?text=Ol%C3%A1%21%20Quero%20falar%20com%20a%20MEX%20sobre%20m%C3%ADdia%20OOH.";

  // Estilo base das pílulas
  const pillProps = {
    radius: "xl" as const,
    size: "md" as const,
    leftSection: <IconDeviceTv size={18} />,
    styles: { root: { boxShadow: "0 6px 18px rgba(0,0,0,.12)" } },
  };

  return (
    <Center>
      <Group
        visibleFrom="xl"
        justify="space-between"
        maw="1960px"
        miw="1540px"
        px="60"
        mx="auto"
      >
        {/* Cluster ESQUERDA */}
        <Center>
          <Link href={"/"}>
            <Group>
              <Box h={70} p={10}>
                <Logo />
              </Box>
            </Group>
          </Link>

          <Box>
            {/* não quebrar linha e permitir dropdown sair do header */}
            <Group gap="sm" align="center" wrap="nowrap" style={{ overflow: "visible" }}>
              <Divider orientation="vertical" color="var(--mantine-primary-color-filled)" my="lg" />

              <Link
                href={"/"}
                style={{ textDecoration: "none", color: "var(--mantine-color-text)", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                Home
              </Link>

              <Divider orientation="vertical" color="var(--mantine-primary-color-filled)" my="lg" />

              <Link
                href={"/#info"}
                style={{ textDecoration: "none", color: "var(--mantine-color-text)", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                Sobre
              </Link>

              <Divider orientation="vertical" color="var(--mantine-primary-color-filled)" my="lg" />

              {/* Pílulas */}
              <Group gap="xs" wrap="nowrap" style={{ overflow: "visible" }}>
                <Button {...pillProps} variant="gradient" gradient={{ from: "orange", to: "red", deg: 35 }} onClick={scrollToBillboards}>
                  Outdoors
                </Button>
                <Button {...pillProps} variant="gradient" gradient={{ from: "teal", to: "lime", deg: 35 }} onClick={scrollToPanels}>
                  Rodovia
                </Button>
                <Button {...pillProps} variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 35 }} onClick={goLED}>
                  Painéis de LED
                </Button>
                <Button {...pillProps} variant="gradient" gradient={{ from: "grape", to: "pink", deg: 35 }} onClick={scrollToMupi}>
                  Mobiliário Urbano
                </Button>
              </Group>

              {/* "Saiba mais" – ao lado das pílulas, fora do overflow */}
              <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={400}
                shadow="md"
                withinPortal
                zIndex={200000}
                position="bottom-start"
              >
                <Menu.Target>
                  <UnstyledButton
                    style={{
                      textDecoration: "none",
                      color: "var(--mantine-color-text)",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    Saiba mais <FaChevronCircleDown size={14} />
                  </UnstyledButton>
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

              <Divider orientation="vertical" color="var(--mantine-primary-color-filled)" my="lg" />

              <Link
                href={"#"}
                style={{ textDecoration: "none", color: "var(--mantine-color-text)", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                Audiência
              </Link>

              <Divider orientation="vertical" color="var(--mantine-primary-color-filled)" my="lg" />
            </Group>
          </Box>
        </Center>

        {/* Cluster DIREITA */}
        <Group>
          <FortnightCalendarButton variant="filled" title="Bi-Semanas" />

          {/* CTA WhatsApp – renderiza só no cliente (sem hidratação) */}
          {mounted ? (
            <Button
              component="a"
              href={WHATS_STATIC}
              target="_blank"
              rel="noopener nofollow"
              radius="xl"
              size="md"
              variant="gradient"
              gradient={{ from: "green", to: "teal", deg: 40 }}
              leftSection={<IconBrandWhatsapp size={18} />}
              style={{ boxShadow: "0 8px 20px rgba(0,0,0,.18)" }}
            >
              Fale no WhatsApp
            </Button>
          ) : (
            <div style={{ width: 190, height: 36 }} />
          )}

          {session.status === "authenticated"
            ? // @ts-ignore
              session.data.Funcionario === 1 &&
              // @ts-ignore
              session.data.fun_data_dem === null && (
                <Button variant="filled" component={Link} href={"/admin"}>
                  Área de Colaboradores
                </Button>
              )
            : null}

          <ThemeToggleIcon />

          {session.status !== "authenticated" ? (
            <ActionIcon variant="default" onClick={loginModalOpen}>
              <IconLogin2 size={14} />
            </ActionIcon>
          ) : (
            <Tooltip
              // @ts-ignore
              label={`Logado como ${session.data?.nome}, clique para sair.`}
              zIndex={10000}
            >
              <Avatar
                color="var(--mantine-primary-color-filled)"
                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
              />
            </Tooltip>
          )}

          <Indicator label={cartContext.cart.length.toString()} size="xs" disabled={cartContext.cart.length === 0}>
            <ActionIcon variant="default" onClick={shoppingCartDrawerOpen}>
              <IconShoppingCart size={14} />
            </ActionIcon>
          </Indicator>
        </Group>
      </Group>
    </Center>
  );
}
