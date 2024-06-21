import { CartContext } from "@/contexts/CartContext";
import { ServiceContext } from "@/contexts/ServiceContext";
import {
  Button,
  Paper,
  SegmentedControl,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";

type Props = {
  session: any;
};

export default function CheckoutForm({ session }: Props) {
  const [payment, setPayment] = useState("Credito");
  const cartContext = React.useContext(CartContext);
  const serviceContext = useContext(ServiceContext);
  const [phone, setPhone] = useState("");

  async function sendMail() {
    const response = await fetch(`/api/phones/${session.id}`);
    const data = await response.json();
    console.log("Phones: ", data.phones);
    const phoneNumbers = data.phones.map((phone: any) => phone.Numero);
    console.log("Sending mail... Telephones: ", phoneNumbers);
    fetch("/api/mail/shoppingCartReady", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: session,
        cart: cartContext.cart,
        service: serviceContext.service,
        telephones: phoneNumbers,
      }),
    });
  }

  useEffect(() => {
    sendMail();
  }, []);
  function onPhoneModalConfirm() {
    fetch(`/api/phones/${session.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
      }),
    });
    sendMail();
    close();
  }

  return (
    <>
      <form>
        <Paper p={"xl"}>
          <SegmentedControl
            fullWidth
            data={[
              { label: "Crédito", value: "Credito" },
              { label: "Débito", value: "Debito" },
              "Pix",
              "Boleto",
              "Bolepix",
            ]}
            onChange={(value) => setPayment(value)}
            color="midiagreen"
            mb={"lg"}
          />
          {payment === "Credito" && (
            <>
              <Title ta={"center"}>Crédito</Title>
              <TextInput label="Cartão" placeholder="0000 0000 0000 0000" />
            </>
          )}
          {payment === "Debito" && (
            <>
              <Title ta={"center"}>Débito</Title>
              <TextInput label="Cartão" placeholder="0000 0000 0000 0000" />
            </>
          )}
          {payment === "Pix" && (
            <>
              <Title ta={"center"}>Pix</Title>
              <TextInput label="Cartão" placeholder="0000 0000 0000 0000" />
            </>
          )}
          {payment === "Boleto" && (
            <>
              <Title ta={"center"}>Boleto</Title>
              <TextInput label="Cartão" placeholder="0000 0000 0000 0000" />
            </>
          )}
          {payment === "Bolepix" && (
            <>
              <Title ta={"center"}>Bolepix</Title>
              <TextInput label="Cartão" placeholder="0000 0000 0000 0000" />
            </>
          )}
          <Button
            fullWidth
            mt={"xl"}
            onClick={() => {
              sendMail();
            }}
            disabled
          >
            Enviar e-mail de teste
          </Button>
        </Paper>
      </form>
    </>
  );
}
