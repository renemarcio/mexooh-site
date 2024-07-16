import {
  Group,
  Paper,
  Title,
  Text,
  Center,
  Stack,
  Box,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconBrandWhatsapp,
  IconMail,
  IconPhoneCall,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import PanelTable from "../PanelTable";

export default function Panels() {
  return (
    <Box pb={"100px"}>
      <Title my={"lg"} ta={"center"}>
        Nossos Paineis
      </Title>
      <Text ta={"center"} size="lg" px={"10vw"}>
        Nossos paineis de locação são de qualidade e atendem o que você precisa.
        Encontre a localização desejada ou solicite suporte.
      </Text>
      <Center>
        <Stack gap={0} align="center" my={"md"}>
          <Group wrap="nowrap" gap={10}>
            {/* <Tooltip label="Entre em contato pelo Whatsapp!">
              <ActionIcon
                radius={"xl"}
                size={"lg"}
                color={"#25D366"}
                component={Link}
                href={
                  "https://wa.me/5511972301116?text=Ol%C3%A1%2C%20estou%20interessado%28a%29%20em%20alugar%20alguns%20pain%C3%A9is%21"
                }
                target={"_blank"}
                rel="noreferrer"
                variant="subtle"
              >
                <IconBrandWhatsapp size={25} />
              </ActionIcon>
            </Tooltip> */}
            <Tooltip label="Mande um e-mail!">
              <ActionIcon
                radius={"xl"}
                size={"lg"}
                component={Link}
                href={"mailto:anaclaudia@midiapaineis.com.br"}
                target={"_blank"}
                rel="noreferrer"
                variant="subtle"
              >
                <IconMail size={25} />
              </ActionIcon>
            </Tooltip>
            Entre em contato por e-mail!
          </Group>
          <Group gap={0}>
            <Tooltip label="Entre em contato pelo Whatsapp!">
              <ActionIcon
                radius={"xl"}
                size={"lg"}
                color={"#25D366"}
                component={Link}
                href={
                  "https://wa.me/5511972301116?text=Ol%C3%A1%2C%20estou%20interessado%28a%29%20em%20alugar%20alguns%20pain%C3%A9is%21"
                }
                target={"_blank"}
                rel="noreferrer"
                variant="subtle"
              >
                <IconBrandWhatsapp size={25} />
              </ActionIcon>
            </Tooltip>
            <Text ta={"center"}>(11) 97230-1116</Text>
          </Group>
          <Group gap={0}>
            <Tooltip label="Entre em contato pelo Whatsapp!">
              <ActionIcon
                radius={"xl"}
                size={"lg"}
                color={"#25D366"}
                component={Link}
                href={
                  "https://wa.me/5515998140546?text=Ol%C3%A1%2C%20estou%20interessado%28a%29%20em%20alugar%20alguns%20pain%C3%A9is%21"
                }
                target={"_blank"}
                rel="noreferrer"
                variant="subtle"
              >
                <IconBrandWhatsapp size={25} />
              </ActionIcon>
            </Tooltip>
            <Text ta={"center"}>(15) 99814-0546 </Text>
          </Group>
          <Group wrap="nowrap" gap={5} mt={5}>
            <IconPhoneCall
              size={25}
              color="var(--mantine-primary-color-filled)"
            />
            <Text ta={"center"}>(15) 3272-4413</Text>
          </Group>
        </Stack>
      </Center>
      <PanelTable />
    </Box>
  );
}
