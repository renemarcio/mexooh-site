import { CartContext } from "@/contexts/CartContext";
import { Center, Title, Text, Code } from "@mantine/core";
import React from "react";
import MailCartEntry from "./MailCartEntry";

type Props = {
  name: string;
};

export default function ShoppingCartDoneMail({ name }: Props) {
  const { cart } = React.useContext(CartContext);
  return (
    <>
      <Title>E-mail enviado para {name}</Title>

      <Title order={3}>Obrigado por comprar conosco!</Title>
      <Text>Este é o seu carrinho.</Text>
      {cart.map((item) => (
        <MailCartEntry key={item.id} item={item} />
      ))}
      <Code>{JSON.stringify({ cart }, null, 2)}</Code>
    </>
  );
}
