import { Image } from "@mantine/core";
import React from "react";

export default function Logo() {
  return (
    <>
      <Image src="/logos/mexbl.svg" darkHidden fit="contain" h={"100%"} />
      <Image src="/logos/mexwh.svg" lightHidden fit="contain" h={"100%"} />
    </>
  );
}
