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
import PanelTable from "../_Tables/PanelTable";
import classes from "./styles.module.css";
export default function Panels() {
  return (
    <Box id="panels" bg={"var(--mantine-primary-color-filled)"} p={"lg"}>
      <Title my={"lg"} ta={"center"} className={classes.title}>
        Painéis Rodoviários
      </Title>
      <PanelTable />
      <Text ta={"center"} size="lg" px={"10vw"} c={"white"}>
        Os painéis são estrategicamente posicionados e localizados em rodovias
        de grande e médio porte. Geralmente tem grandes dimensões, com a
        mensagem impressa em vinil, por sistema digital. Possuem estruturas de
        sustentação metálica, em alguns casos, têm seus quadros alterados com
        enfeites criativos (apliques). Suas grandes dimensões permitem dar
        destaque maior a um produto, ou partes fundamentais do mesmo maximizando
        a atenção sobre uma campanha de propaganda.
      </Text>
      <Center>
        <Stack gap={0} align="center" my={"md"} c={"white"}>
          <Group wrap="nowrap" gap={10}>
            <Tooltip label="Mande um e-mail!">
              <ActionIcon
                color="white"
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
            <Text fw={700}>Grande São Paulo:</Text>
            <Tooltip label="Entre em contato pelo Whatsapp!">
              <ActionIcon
                radius={"xl"}
                size={"lg"}
                color={"#25D366"}
                component={Link}
                href={
                  "https://wa.me/5511972301116?text=Ol%C3%A1%2C%20solicito%20mais%20informa%C3%A7%C3%B5es%21"
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
            <Text fw={700}>Sorocaba:</Text>
            <Tooltip label="Entre em contato pelo Whatsapp!">
              <ActionIcon
                radius={"xl"}
                size={"lg"}
                color={"#25D366"}
                component={Link}
                href={
                  "https://wa.me/5515998140546?text=Ol%C3%A1%2C%20solicito%20mais%20informa%C3%A7%C3%B5es%21"
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
            <Text fw={700}>PABX:</Text>
            <IconPhoneCall
              size={25}
              // color="var(--mantine-primary-color-filled)"
            />
            <Text ta={"center"}>(15) 3272-4413</Text>
          </Group>
        </Stack>
      </Center>
    </Box>
  );
}
