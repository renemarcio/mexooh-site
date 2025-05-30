import {
  Text,
  Container,
  ActionIcon,
  Group,
  Image,
  Title,
  Stack,
  Tooltip,
  Box,
} from "@mantine/core";
import classes from "./Footer.module.css";
import { FaBarcode } from "react-icons/fa";
import { SiNubank } from "react-icons/si";
import Link from "next/link";
import {
  IconMail,
  IconBrandWhatsapp,
  IconPhoneCall,
} from "@tabler/icons-react";
import CompanyInfo from "../CompanyInfo";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Group justify="space-between" w={"100%"}>
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
            </Text>
          </div>
         
          {/* <div className={classes.wrapper}>
            <Text className={classes.title}>Formas de pagamento</Text>
            <Group mt={6} className={classes.paymentOptions}>
              <SiNubank size={30} color="#5f249f" />
              <Image src={"/mastercard.svg"} h={20} />
              <Image src={"/visa.svg"} h={15} />
              <FaBarcode size={30} color="black" />
            </Group>
          </div> */}
        </Group>
      </Container>
      <Box
        pos="absolute"
        left="50%"
        top="20px"
        style={{ transform: "translateX(-50%)" }}
      >
        {/* <CompanyInfo /> */}
      </Box>
      <Container className={classes.afterFooter}>
        <Group style={{ zIndex: 2 }} justify="center">
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
    </footer>
  );
}
