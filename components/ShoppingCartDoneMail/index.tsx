import { Center, Title, Text } from "@mantine/core";
import * as React from "react";

interface Props {
  name: string;
}

export const ShoppingCartDoneMail: React.FC<Readonly<Props>> = ({ name }) => (
  // <>
  //   <Center>
  //     <Title>Teste de envio de e-mail para {name}</Title>
  //     <Text>Teste de corpo de texto.</Text>
  //   </Center>
  // </>
  <div>
    <h1>Welcome, {name}!</h1>
    <p>Teste de corpo de texto.</p>
  </div>
);
