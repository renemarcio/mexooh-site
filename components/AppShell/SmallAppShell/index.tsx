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
  Group,
  Indicator,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconLogin2, IconShoppingCart } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  cartContext: CartContextType;
  burgerMenuOpened: boolean;
  burgerMenuToggle: () => void;
  loginModalOpen: () => void;
  shoppingCartDrawerToggle: () => void;
}

export default function SmallAppShell({
  cartContext,
  burgerMenuOpened,
  burgerMenuToggle,
  loginModalOpen,
  shoppingCartDrawerToggle: shoppingCartDrawerOpen,
}: Props) {
  const session = useSession();
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
            <Group gap={5}>
              <FortnightCalendarButton variant="filled" title="Bi-Semanas" />
              <Button component={Link} href="/admin" visibleFrom="sm">
                Área de Colaboradores
              </Button>
              {/* <Button
                variant="filled"
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
              </Button> */}
              <ThemeToggleIcon size="lg" />
              {session.status !== "authenticated" ? (
                <ActionIcon
                  variant="default"
                  onClick={loginModalOpen}
                  size={"lg"}
                  radius={"xl"}
                >
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
                <ActionIcon
                  variant="default"
                  onClick={shoppingCartDrawerOpen}
                  size={"lg"}
                  radius={"xl"}
                >
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
