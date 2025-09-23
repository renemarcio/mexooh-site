"use client";

import { ActionIcon, Tooltip } from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import classes from "./whatsapp-fab.module.css";
import { buildWhatsAppLink } from "@/utils/whatsapp";

type Props = {
  phone?: string;
  text?: string;
};

export default function WhatsAppFab({ phone, text }: Props) {
  const href = buildWhatsAppLink({
    phone,
    text: text ?? "Olá! Quero falar com a MEX sobre mídia OOH.",
    utmCampaign: "fab_whatsapp",
    extraUrl:
      typeof window !== "undefined" ? window.location.href : undefined,
  });

  return (
    <Tooltip label="Fale no WhatsApp" position="left" withArrow>
      <ActionIcon
        component="a"
        href={href}
        target="_blank"
        rel="noopener nofollow"
        size={56}
        radius="xl"
        variant="filled"
        color="green"
        className={classes.whatsFab}
        aria-label="Abrir conversa no WhatsApp"
      >
        <IconBrandWhatsapp size={28} />
      </ActionIcon>
    </Tooltip>
  );
}
