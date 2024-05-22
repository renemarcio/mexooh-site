import { Anchor, Button, Center, Group, Modal, Stack } from "@mantine/core";
import { IconBuilding, IconUser } from "@tabler/icons-react";
import React from "react";
import RegisterPJForm from "../../RegisterPJForm";
import RegisterPFForm from "../../RegisterPFForm";
import { modals } from "@mantine/modals";
export default function RegisterAnchor() {
  const selectTypeModal = (
    <Group>
      <Button w={"10rem"} h={"10rem"} onClick={pfModal}>
        <Stack>
          <Center>
            <IconUser size={50} />
          </Center>
          Pessoa Física
        </Stack>
      </Button>
      <Button w={"10rem"} h={"10rem"} onClick={pjModal}>
        <Stack>
          <Center>
            <IconBuilding size={50} />
          </Center>
          Pessoa Jurídica
        </Stack>
      </Button>
    </Group>
  );

  function selectModal() {
    modals.open({
      title: "Crie sua conta",
      children: selectTypeModal,
      centered: true,
      size: "auto",
    });
  }

  function pfModal() {
    modals.open({
      title: "Pessoa Física",
      children: <RegisterPFForm />,
      centered: true,
      size: "auto",
    });
  }

  function pjModal() {
    modals.open({
      title: "Pessoa Jurídica",
      children: <RegisterPJForm />,
      centered: true,
      size: "auto",
    });
  }

  return (
    <>
      <Anchor
        ta={"center"}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          selectModal();
        }}
        size="xs"
        fw={600}
      >
        Não tenho uma conta
      </Anchor>
    </>
  );
}
