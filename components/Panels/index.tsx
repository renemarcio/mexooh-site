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
  IconPhone,
  IconPhoneCall,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import PanelTable from "../PanelTable";

export default function Panels() {
  return (
    <Box pb={"100px"}>
      <Title my={"lg"} ta={"center"}>
        Interessado em painéis?
      </Title>
      <Text ta={"center"} size="lg" px={"10vw"}>
        Não encontrou uma localização interessante acima? Então provavelmente o
        que você precisa é de um painél! Possuímos vários painéis para locação,
        é só dar uma olhada nos locais que temos à oferecer e entrar em contato
        para efetuar a negociação!
      </Text>
      <Center>
        <Stack gap={0} align="center" my={"md"}>
          <Group wrap="nowrap" gap={10}>
            <Paper withBorder radius={"xl"} py={0} px={5}>
              <Tooltip label="Entre em contato pelo Whatsapp!">
                <ActionIcon
                  radius={"xl"}
                  size={"lg"}
                  color={"#25D366"} //Whatsapp's official color...
                  component={Link}
                  href={
                    "https://wa.me/5515981111875?text=Ol%C3%A1%2C%20estou%20interessado%28a%29%20em%20alugar%20alguns%20pain%C3%A9is%21"
                  }
                  target={"_blank"}
                  rel="noreferrer"
                  variant="subtle"
                >
                  <IconBrandWhatsapp size={25} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Entre em contato pelo Whatsapp!">
                <ActionIcon
                  radius={"xl"}
                  size={"lg"}
                  color={"#25D366"} //Whatsapp's official color...
                  component={Link}
                  href={
                    "https://wa.me/5515972301116?text=Ol%C3%A1%2C%20estou%20interessado%28a%29%20em%20alugar%20alguns%20pain%C3%A9is%21"
                  }
                  target={"_blank"}
                  rel="noreferrer"
                  variant="subtle"
                >
                  <IconBrandWhatsapp size={25} />
                </ActionIcon>
              </Tooltip>
            </Paper>
          </Group>
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

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall
              size={25}
              color="var(--mantine-primary-color-filled)"
            />
            <Text ta={"center"}>(15) 3272-4413</Text>
          </Group>
          {/* <Group wrap="nowrap" gap={10}>
            <IconMail size={25} />
            <Text ta={"center"}>paineis@midiapaineis.com.br</Text>
          </Group> */}
        </Stack>
      </Center>
      <PanelTable />
    </Box>
  );
}
