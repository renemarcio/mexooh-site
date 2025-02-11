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
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import { imageBase64 } from "@/public/logos/base64logo";
import { CadGeral } from "@/types/databaseTypes";

interface Props {
  user: CadGeral;
  cart: CartEntry[];
  telephones: string[];
}

export default function ShoppingCartReadyEmail({
  user,
  cart,
  telephones,
}: Props) {
  const main: React.CSSProperties = {
    fontWeight: 300,
    textAlign: "center",
    fontSize: "1.3rem",
  };

  let total = 0;

  const billboardArray = cart.filter((entry) => entry.fortnights);
  const miscArray = cart.filter((entry) => !entry.fortnights);

  const billboardList = billboardArray.map((entry, index) => {
    total += entry.value * (entry.fortnights ? entry.fortnights.length : 0);
    return (
      <div className={`${index % 2 === 1 ? "bg-zinc-500" : ""} flex w-full`}>
        <div className="p-4 basis-2/6">{`${entry.item.address} (Código: ${entry.item.id})`}</div>
        {/* <div className="p-4 basis-1/6">R$ {entry.value},00 / Bi-Semana</div> */}
        <div className="p-4 basis-1/6">
          {entry.fortnights && <>{entry.fortnights.length} Bi-Semanas</>}
        </div>
        <div className="p-4 basis-1/6">
          {entry.needsProduction ? "Requer impressão" : "Não requer impressão"}
        </div>
        <div className="p-4 basis-1/6">
          {entry.value > 0
            ? "R$" +
              entry.value * (entry.fortnights ? entry.fortnights.length : 0) +
              ",00"
            : "Á NEGOCIAR"}
        </div>
      </div>
    );
  });

  const miscList = miscArray.map((entry, index) => {
    return (
      <div className={`${index % 2 === 1 ? "bg-zinc-500" : ""} flex w-full`}>
        <div className="p-4 basis-2/4">{`${entry.item.address} (Código: ${entry.item.id})`}</div>
        {/* <div className="p-4 basis-1/5">R$ {entry.value},00 / Bi-Semana</div> */}
        <div className="p-4 basis-1/4">
          {entry.fortnights && <>{entry.fortnights.length} Bi-Semanas</>}
        </div>
        <div className="p-4 basis-1/4">
          {entry.value > 0
            ? "R$" +
              entry.value * (entry.fortnights ? entry.fortnights.length : 0) +
              ",00"
            : "Á NEGOCIAR"}
        </div>
      </div>
    );
  });

  // const cartList = cart?.map((entry, index) => {
  //   total += entry.value * (entry.fortnights ? entry.fortnights.length : 0);
  //   if (index % 2 === 1) {
  //     return (
  //       <div className="flex w-full">
  //         <div className="p-4 basis-2/5">{entry.item.address}</div>
  //         <div className="p-4 basis-1/5">R$ {entry.value},00 / Bi-Semana</div>
  //         <div className="p-4 basis-1/5">
  //           {entry.fortnights && <>{entry.fortnights.length} Bi-Semanas</>}
  //         </div>
  //         <div className="p-4 basis-1/5">
  //           {entry.value > 0
  //             ? "R$" +
  //               entry.value * (entry.fortnights ? entry.fortnights.length : 0) +
  //               ",00"
  //             : "Á NEGOCIAR"}
  //           {/* R${entry.value * entry.fortnights.length},00 */}
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="bg-zinc-500 flex w-full">
  //         <div className="p-4 basis-2/5">{entry.item.address}</div>
  //         <div className="p-4 basis-1/5">R$ {entry.value},00 / Bi-Semana</div>
  //         <div className="p-4 basis-1/5">
  //           {entry.fortnights && <>{entry.fortnights.length} Bi-Semanas</>}
  //         </div>
  //         <div className="p-4 basis-1/5">
  //           {entry.value > 0
  //             ? "R$" +
  //               entry.value * (entry.fortnights ? entry.fortnights.length : 0) +
  //               ",00"
  //             : "PAINEL"}
  //         </div>
  //       </div>
  //     );
  //   }
  // });

  return (
    <Html lang="pt-BR" dir="ltr">
      <Head>
        <Font fontFamily="" fallbackFontFamily="Helvetica" />
      </Head>
      <Body>
        <Tailwind>
          <Preview>{`${user?.cli_rz_social} está na tela de pagamento.`}</Preview>
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
              {`O cliente ${user?.cli_rz_social} finalizou o carrinho neste exato momento.`}
              <br />
              {`Este é o carrinho que o cliente fez.`}
            </Text>
            <>
              <Text>Outdoors:</Text> <br />
              <div className="outline outline-green-500 bg-zinc-700 text-white rounded my-4">
                {billboardList}
              </div>
            </>
            <>
              <Text>Outros:</Text> <br />
              <div className="outline outline-green-500 bg-zinc-700 text-white rounded my-4">
                {miscList}
              </div>
            </>
            {/* <Text style={main}>
              O cliente {service ? "REQUER" : "NÃO REQUER"} impressão.
            </Text> */}
            <Text style={main} className="font-bold mt-4">
              Total: R$ {total},00
            </Text>
            <Text style={main}>E-mail do cliente: {user?.email}</Text>
            <Text style={main}>
              Telefones:{" "}
              {telephones.length > 0 && (
                <Text style={main}>
                  Clique no número para tentar contato por WhatsApp
                </Text>
              )}
              {telephones.length > 0
                ? // ? telephones.join()
                  telephones.map((telephone) => (
                    <div className="flex justify-center">
                      <Button
                        className="bg-green-500 text-white outline font-bold py-2 mb-2 px-4 rounded"
                        href={`https://wa.me/55${telephone}`}
                      >
                        {telephone}
                      </Button>
                    </div>
                  ))
                : "Nenhum telefone cadastrado"}
            </Text>
            <div className="flex justify-center">
              <Button
                className="bg-green-500 text-white outline font-bold py-2 px-4 rounded"
                href={`mailto:${user?.email}`}
              >
                Clique aqui para entrar em contato por e-mail
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
