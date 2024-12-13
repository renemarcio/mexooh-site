import { Button, Modal, Text, TextInput, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { number } from "zod";

type Props = {
  isOpen: boolean;
  onConclude: () => void;
  closeFn: () => void;
};

export default function PhoneForm({ isOpen, onConclude, closeFn }: Props) {
  const [phone, setPhone] = useState("");
  const session = useSession();
  async function addPhoneNumber() {
    console.log("Adding phone number: ", phone);
    if (session.status !== "authenticated") return;
    try {
      //@ts-ignore
      const response = await fetch(`/api/phones/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: phone,
          //@ts-ignore
          userID: session.data.id,
          tipo: 1,
        }),
      });
      console.log("Response: ", response);
      onConclude();
      closeFn();
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <Modal
      opened={isOpen}
      onClose={closeFn}
      title="Cadastre seu telefone"
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
    >
      <Text>Cadastre seu telefone para facilitar o contato!</Text>
      <TextInput
        label="Telefone"
        description="Fixo, Celular, WhatsApp..."
        placeholder="(00) 00000-0000"
        onChange={(event) => {
          setPhone(event.target.value);
        }}
      />
      <Group>
        <Button
          onClick={() =>
            modals.openConfirmModal({
              title: "Certeza?",
              centered: true,
              children: (
                <>
                  <Text ta={"center"}>
                    O contato durante a negociação de pontos é fundamental,
                    deseja continuar?
                  </Text>
                  <Text ta={"center"} fs="italic" c={"dimmed"} size="sm">
                    Caso não cadastre o telefone, o contato será feito pelo
                    e-mail com qual esta conta foi cadastrada.
                  </Text>
                </>
              ),
              confirmProps: { fullWidth: true, color: "red" },
              cancelProps: { fullWidth: true, color: "green" },
              labels: {
                confirm: "Continuar, entre em contato pelo meu e-mail",
                cancel: "Voltar, quero cadastrar meu telefone.",
              },
              closeOnEscape: false,
              withCloseButton: false,
              onConfirm: () => {
                onConclude();
                closeFn();
                modals.closeAll();
              },
            })
          }
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            addPhoneNumber();
          }}
        >
          Cadastrar
        </Button>
      </Group>
    </Modal>
  );
}
