import { Anchor, Button, Center, Group, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBuilding,
  IconUser,
  IconUserPlus,
  IconUsersGroup,
} from "@tabler/icons-react";
import React, { useState } from "react";
import RegisterPJForm from "../../RegisterPJForm";
import RegisterPFForm from "../../RegisterPFForm";

export default function RegisterAnchor() {
  const [opened, { open, close }] = useDisclosure(false);
  const [type, setType] = useState<"pf" | "pj" | null>(null);

  const selectTypeModal = (
    <Group>
      <Button w={"10rem"} h={"10rem"} onClick={() => setType("pf")}>
        <Stack>
          <Center>
            <IconUser size={50} />
          </Center>
          Pessoa Física
        </Stack>
      </Button>
      <Button w={"10rem"} h={"10rem"} onClick={() => setType("pj")}>
        <Stack>
          <Center>
            <IconBuilding size={50} />
          </Center>
          Pessoa Jurídica
        </Stack>
      </Button>
    </Group>
  );

  const pjModal = <RegisterPJForm />;
  const pfModal = <RegisterPFForm />;

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setType(null);
        }}
        withCloseButton
        centered
        size={"auto"}
        title={
          type === null
            ? "Crie sua conta "
            : type === "pf"
            ? "Pessoa Física"
            : "Pessoa Juridica"
        }
      >
        {type === null ? selectTypeModal : type === "pf" ? pjModal : pfModal}
      </Modal>

      <Anchor
        ta={"center"}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
        size="xs"
        fw={600}
      >
        Não tenho uma conta
      </Anchor>
    </>
  );
}
