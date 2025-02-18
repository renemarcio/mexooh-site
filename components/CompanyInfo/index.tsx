import { Stack, Group, Tooltip, ActionIcon, Text } from "@mantine/core";
import {
  IconMail,
  IconBrandWhatsapp,
  IconPhoneCall,
} from "@tabler/icons-react";
import Link from "next/link";

export default function CompanyInfo() {
  return (
    <Stack gap={0} align="center" c={"white"}>
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
  );
}
