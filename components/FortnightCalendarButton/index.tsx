import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import FortnightTable from "../FortnightTable";

export default function FortnightCalendarButton() {
  return (
    <Button
      variant="default"
      onClick={() => {
        modals.open({
          title: "Confira aqui o calendáiro de Bi-Semanas!",
          children: <FortnightTable />,
          centered: true,
          size: "auto",
          closeOnClickOutside: true,
          onClose: () => modals.closeAll(),
        });
      }}
    >
      Confira aqui o calendáiro de Bi-Semanas!
    </Button>
  );
}
