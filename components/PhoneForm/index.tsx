import { CartContext } from "@/contexts/CartContext";
import { ServiceContext } from "@/contexts/ServiceContext";
import { Button, Modal, Text, TextInput, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { error } from "console";
import { useSession } from "next-auth/react";
import React, { useContext, useState } from "react";

type Props = {
  isOpen: boolean;
  onConclude: () => void;
  closeFn: () => void;
};

export default function PhoneForm({ isOpen, onConclude, closeFn }: Props) {
  const [phone, setPhone] = useState("");
  const session = useSession();
  // const cartContext = React.useContext(CartContext);
  // const serviceContext = useContext(ServiceContext);
  // const session = useSession();
  // async function sendMail() {
  //   console.log("Fetching user's phones...:");
  //   const phoneResponse = await fetch(`/api/phones/${session.data?.user?.id}`);
  //   const phoneData = await phoneResponse.json();
  //   const phoneNumbers = phoneData.phones.map((phone: any) => phone.Numero);
  //   console.log("Sending mail... Telephones: ", phoneNumbers);
  //   fetch("/api/mail/shoppingCartReady", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       user: session,
  //       cart: cartContext.cart,
  //       service: serviceContext.service,
  //       telephones: phoneNumbers,
  //     }),
  //   });
  // }

  async function addPhoneNumber() {
    console.log("Adding phone number: ", phone);
    try {
      //@ts-ignore
      const response = await fetch(`/api/phones/${session.data?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
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
