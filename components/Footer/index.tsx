import {
  Text,
  Container,
  ActionIcon,
  Group,
  rem,
  Stack,
  Box,
  Image,
  Title,
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
          <Title>Mex OOH</Title>
          <Text
            // fw={400}
            size="xs"
            c={"rgba(255, 255, 255, 0.6)"}
            className={classes.description}
            // c={"dimmed"}
          >
            Av. Prof Jacob Bazarian, 200
            <br />
            CEP 18204-121 • Vale San Fernando
            {/* <br />
            Itapetininga, SP */}
          </Text>
        </div>
        <div className={classes.wrapper}>
          <Text className={classes.title}>Formas de pagamento</Text>
          <Group mt={6} className={classes.paymentOptions}>
            <SiNubank size={30} color="#5f249f" />
            <Image src={"/mastercard.svg"} h={20} />
            {/* <RiMastercardFill size={30} /> */}
            <Image src={"/visa.svg"} h={15} />
            {/* <RiVisaLine size={30} /> */}
            {/* <FaCcDinersClub size={30} /> */}
            {/* <FaCcAmex size={30} /> */}
            <FaBarcode size={30} color="black" />
          </Group>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Group style={{ zIndex: 2 }}>
          <Link href={"https://iconeooh.com.br/"} target="_blank">
            <Image src={"/icone.png"} h={"45px"} />
          </Link>
          <Link href={"https://www.infooh.com.br/"} target="_blank">
            <Image src={"/infooh.png"} h={"60px"} />
          </Link>
        </Group>
        <Group
          style={{ zIndex: 2 }}
          gap={5}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            size="xl"
            variant="transparent"
            component={Link}
            href={"https://www.facebook.com/midiapaineis/"}
            target={"_blank"}
          >
            <Image src={"/facebook.svg"} />
          </ActionIcon>
          <ActionIcon
            size={"xl"}
            variant="transparent"
            component={Link}
            href={"https://www.instagram.com/mex_ooh/"}
            target={"_blank"}
          >
            <Image src={"/instagram.svg"} />
          </ActionIcon>
        </Group>
      </Container>
      <Box
        pos={"fixed"}
        bg={"white"}
        w={"100%"}
        h={"190px"}
        bottom={0}
        style={{ zIndex: 0 }}
        // right={0}
      />
    </footer>
  );
}
