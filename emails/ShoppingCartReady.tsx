import { CartEntry } from "@/types/cartEntry";
import {
  Body,
  Button,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import { imageBase64 } from "@/public/logos/base64logo";

interface Props {
  user: any;
  cart: CartEntry[];
  service: boolean;
  telephones: string[];
}

export default function ShoppingCartReadyEmail({
  user,
  cart,
  service,
  telephones,
}: Props) {
  const main: React.CSSProperties = {
    fontWeight: 300,
    textAlign: "center",
    fontSize: "1.3rem",
  };

  let total = 0;

  const cartList = cart?.map((entry, index) => {
    total += entry.value * entry.fortnightIDs.length;
    if (index % 2 === 1) {
      return (
        <div className="flex w-full">
          <div className="p-4 basis-2/5">{entry.item.Localizacao}</div>
          <div className="p-4 basis-1/5">R$ {entry.value},00 / Bi-Semana</div>
          <div className="p-4 basis-1/5">
            {entry.fortnightIDs.length} Bi-Semanas
          </div>
          <div className="p-4 basis-1/5">
            R${entry.value * entry.fortnightIDs.length},00
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-zinc-500 flex w-full">
          <div className="p-4 basis-2/5">{entry.item.Localizacao}</div>
          <div className="p-4 basis-1/5">R$ {entry.value},00 / Bi-Semana</div>
          <div className="p-4 basis-1/5">
            {entry.fortnightIDs.length} Bi-Semanas
          </div>
          <div className="p-4 basis-1/5">
            R${entry.value * entry.fortnightIDs.length},00
          </div>
        </div>
      );
    }
  });

  return (
    <Html lang="pt-BR" dir="ltr">
      <Head>
        <Font fontFamily="" fallbackFontFamily="Helvetica" />
      </Head>
      <Body>
        <Tailwind>
          <Preview>{`${user?.fantasia} está na tela de pagamento.`}</Preview>
          <Section>
            <Img
              src={`data:image/jpeg;base64, ${imageBase64}`}
              height={"100px"}
              style={{ margin: "0 auto" }}
            />
            <Heading as="h1" style={{ textAlign: "center", fontWeight: 300 }}>
              Cliente finalizou o carrinho
            </Heading>
          </Section>
          <Hr />
          <Section>
            <Text style={main}>
              {`O cliente ${user?.fantasia} finalizou o carrinho neste exato momento.`}
              <br />
              {`Este é o carrinho que o cliente fez.`}
            </Text>
            <>
              <div className="outline outline-green-500 bg-zinc-700 text-white rounded my-4">
                {cartList}
              </div>
            </>
            <Text style={main}>
              O cliente {service ? "REQUER" : "NÃO REQUER"} impressão.
            </Text>
            <Text style={main} className="font-bold mt-4">
              Total: R$ {total},00
            </Text>
            <Text style={main}>E-mail do cliente: {user?.email}</Text>
            <Text style={main}>
              Telefones:{" "}
              {telephones.length > 0
                ? telephones.join(", ")
                : "Nenhum telefone cadastrado"}
            </Text>
            <div className="flex justify-center">
              <Button
                className="bg-green-500 text-white outline font-bold py-2 px-4 rounded"
                href={`mailto:${user?.email}`}
              >
                Clique aqui para entrar em contato
              </Button>
            </div>
          </Section>
          <Hr />
          <Section>
            <Text
              style={{
                textAlign: "center",
                fontWeight: 300,
                fontSize: ".7rem",
              }}
            >
              Este é um e-mail automático. Não responda à este e-mail.
            </Text>
          </Section>
        </Tailwind>
      </Body>
    </Html>
  );
}
