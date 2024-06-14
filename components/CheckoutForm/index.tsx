import {
  Button,
  Paper,
  SegmentedControl,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";

export default function CheckoutForm() {
  const [payment, setPayment] = useState("Credito");
  //   const form = useForm({
  //     initialValues: {
  //       card: "",
  //     },
  //   });
  return (
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
            fetch("/api/mail/shoppingCartReady", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // body: JSON.stringify({
              //   from: "Não Responda <naoresponda@mexooh.com>",
              // }),
            });
          }}
        >
          Enviar e-mail de teste
        </Button>
      </Paper>
    </form>
  );
}
