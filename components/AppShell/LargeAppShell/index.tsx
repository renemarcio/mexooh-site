import FortnightCalendarButton from "@/components/FortnightCalendarButton";
import Logo from "@/components/Logo";
import StaffLogin from "@/components/_Forms/Login/StaffLogin";
import ThemeToggleIcon from "@/components/_Buttons/ThemeToggleIcon";
import { CartContextType } from "@/contexts/CartContext";
import {
  Group,
  Center,
  Burger,
  Box,
  Divider,
  Menu,
  UnstyledButton,
  Button,
  ActionIcon,
  Tooltip,
  Avatar,
  Indicator,
  Code,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconLogin2, IconShoppingCart } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaChevronCircleDown } from "react-icons/fa";
import { RiDownload2Line } from "react-icons/ri";

interface Props {
  cartContext: CartContextType;
  loginModalOpen: () => void;
  shoppingCartDrawerToggle: () => void;
}

export default function LargeAppShell({
  cartContext,
  loginModalOpen,
  shoppingCartDrawerToggle: shoppingCartDrawerOpen,
}: Props) {
  const session = useSession();
  return (
    <Center>
      <Group
        visibleFrom="xl"
        justify="space-between"
        maw={"1960px"}
        miw={"1540px"}
        px={"60"}
        mx={"auto"}
      >
        <Center>
          <Link href={"/"}>
            <Group>
              <Box h={70} p={10}>
                <Logo />
              </Box>
            </Group>
          </Link>
          <Box>
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
              <Group>
                <Divider
                  orientation="vertical"
                  color="var(--mantine-primary-color-filled)"
                  my="lg"
                />
                <Link
                  href={"/#info"}
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
                  href={"/#panels"}
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
                  href={"/#mupi"}
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
                  href={"/#rent"}
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
                  color="var(--mantine-primary-color-filled)"
                  my="lg"
                />
                <Link
                  href={"/#ledpanels"}
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
                      href={"downloads/painel_led.pdf"}
                      target="_blank"
                      leftSection={<RiDownload2Line />}
                    >
                      Midia Kit Painéis
                    </Menu.Item>
                    <Menu.Item
                      component={Link}
                      href={"downloads/painel_led.pdf"}
                      target="_blank"
                      leftSection={<RiDownload2Line />}
                    >
                      Midia Kit Mobiliário Urbano
                    </Menu.Item>
                    <Menu.Item
                      component={Link}
                      href={"downloads/painel_led.pdf"}
                      target="_blank"
                      leftSection={<RiDownload2Line />}
                    >
                      Midia Kit Outdoor
                    </Menu.Item>
                    <Menu.Item
                      component={Link}
                      href={"downloads/painel_led.pdf"}
                      target="_blank"
                      leftSection={<RiDownload2Line />}
                    >
                      Midia Kit Painel de LED
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Box>
        </Center>
        <Group>
          <FortnightCalendarButton variant="filled" title="Bi-Semanas" />
          {session.status === "authenticated"
            ? //@ts-ignore
              session.data.Funcionario === 1 &&
              //@ts-ignore
              session.data.fun_data_dem === null && (
                <>
                  <Button variant="filled" component={Link} href={"/admin"}>
                    Área de Colaboradores
                  </Button>
                </>
              )
            : null}
          <ThemeToggleIcon />
          {session.status !== "authenticated" ? (
            <ActionIcon variant="default" onClick={loginModalOpen}>
              <IconLogin2 size={14} />
            </ActionIcon>
          ) : (
            <Tooltip //@ts-ignore
              label={`Logado como ${session.data?.nome}, clique para sair.`}
              zIndex={10000}
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
            <ActionIcon variant="default" onClick={shoppingCartDrawerOpen}>
              <IconShoppingCart size={14} />
            </ActionIcon>
          </Indicator>
        </Group>
      </Group>
    </Center>
  );
}
