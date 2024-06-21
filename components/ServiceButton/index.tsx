import { Button, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import ServiceForm from "../ServiceForm";
import { useToggle } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { useServiceContext } from "@/contexts/ServiceContext";

export default function ServiceButton() {
  // const [selected, toggle] = useToggle([false, true]);
  const service = useServiceContext();
  return (
    <Tooltip label="Clique aqui para fazer o serviço de impressão!">
      <Button
        variant={service.service ? "light" : "subtle"}
        leftSection={service.service ? <IconCheck size={16} /> : null}
        onClick={() => {
          service.setService(!service.service);
          // modals.open({
          //   title: "Serviço",
          //   children: <ServiceForm />,
          //   centered: true,
          // });
        }}
      >
        Serviço
      </Button>
    </Tooltip>
  );
}
