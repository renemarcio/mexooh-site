import Logo from "@/components/Logo";
import ThemeToggleIcon from "@/components/_Buttons/ThemeToggleIcon";
import { CartContextType } from "@/contexts/CartContext";
import {
  ActionIcon,
  ActionIconGroup,
  Avatar,
  Box,
  Burger,
  Center,
  Group,
  Indicator,
  Tooltip,
} from "@mantine/core";
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
      <Group justify="space-between" px={"lg"} w={"100vw"}>
        <Box>
          <Burger opened={burgerMenuOpened} onClick={burgerMenuToggle} />
        </Box>
        <Center>
          <Box h={70} p={10} component={Link} href="/">
            <Logo />
          </Box>
        </Center>
        <Box>
          <Center>
            <Group gap={5}>
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
