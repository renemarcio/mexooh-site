import {
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Stack,
  Box,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandFacebook,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";
import { RiMastercardFill, RiVisaLine } from "react-icons/ri";
import { FaBarcode, FaCcAmex, FaCcDinersClub } from "react-icons/fa";
import { SiNubank } from "react-icons/si";
import Link from "next/link";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          Mex OOH
          <Text size="xs" c="dimmed" className={classes.description}>
            {/* R. João Evangelista, 380
            <br />
            Centro, Itapetininga - SP
            <br />
            18200-055 */}
            Av. Prof Jacob Bazarian, 200
            <br />
            CEP 18204-121 • Vale San Fernando
            <br />
            Itapetininga, SP
          </Text>
        </div>
        {/* <div className={classes.groups}>{groups}</div> */}
        <div className={classes.wrapper}>
          <Text className={classes.title}>Formas de pagamento</Text>
          <Group justify="right" mt={6}>
            <SiNubank size={30} />
            <RiMastercardFill size={30} />
            <RiVisaLine size={30} />
            <FaCcDinersClub size={30} />
            <FaCcAmex size={30} />
            <FaBarcode size={30} />
          </Group>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          {/* <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon> */}
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component={Link}
            href={"https://www.facebook.com/midiapaineis/"}
            target={"_blank"}
          >
            <IconBrandFacebook
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component={Link}
            href={"https://www.instagram.com/mex_ooh/"}
            target={"_blank"}
          >
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
