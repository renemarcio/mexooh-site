import { Button, Group, Image, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
export default function AdminDashboard() {
  return (
    <>
      <Group>
        <Button
          h={"100px"}
          color="rgba(255, 255, 255, 1)"
          component={Link}
          href={"https://sistema.infooh.com.br/#/login"}
          target="_blank"
        >
          <Image src="/infooh.png" h={"100%"} />
        </Button>
        <Button
          h={"100px"}
          color="rgba(255, 255, 255, 1)"
          component={Link}
          href={"http://espacomais.srv.br/"}
          target="_blank"
        >
          <Image src="/EMLogo.png" h={"100%"} p={"xs"} />
        </Button>
      </Group>
    </>
  );
}
