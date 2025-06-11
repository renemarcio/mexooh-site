import { CartContext } from "@/contexts/CartContext";
import { ServiceContext } from "@/contexts/ServiceContext";
import {
  Button,
  Paper,
  SegmentedControl,
  TextInput,
  Title,
  Text,
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
    const response = await fetch(`/api/phones?id=${session.Cad_codigo}`);
    const data = await response.json();
 

    const phoneNumbers = data.map((phone: any) => phone.Numero);
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

  return (
    <>
      {/* <form>
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
      </form> */}
      <Title ta={"center"}>Obrigado por mostrar interesse!</Title>
      <Text ta={"center"}>
        Recebemos uma notificação denotando o seu interesse e logo entraremos em
        contato, para a negociação e o planejamento.
      </Text>
    </>
  );
}
