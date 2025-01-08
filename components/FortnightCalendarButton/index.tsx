import { ActionIcon, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import FortnightTable from "../FortnightTable";

type Props = {
  variant?: "default" | "subtle" | "light" | "outline" | "filled";
  title?: string;
  className?: string;
};

export default function FortnightCalendarButton({
  variant = "default",
  title = "Confira aqui o calendáiro de Bi-Semanas!",
}: Props) {
  return (
    <>
      <Button
        visibleFrom="sm"
        variant={variant}
        title={title}
        onClick={() => {
          modals.open({
            title: "Bi-Semanas",
            children: <FortnightTable />,
            centered: true,
            size: "auto",
            closeOnClickOutside: true,
            onClose: () => modals.closeAll(),
          });
        }}
      >
        {title}
      </Button>
    </>
  );
}
