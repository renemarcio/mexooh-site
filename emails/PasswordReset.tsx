import { CadGeral } from "@/types/databaseTypes";
import {
  Markdown,
  Text,
  Link,
  Heading,
  Preview,
  Tailwind,
  Body,
  Html,
  Head,
  Font,
  Img,
} from "@react-email/components";
interface Props {
  user: CadGeral;
  uuid: string;
  ip?: string | null;
  location?: string | null;
}
import { imageBase64 } from "@/public/logos/base64logo";

export default function PasswordResetEmail({
  user,
  uuid,
  ip,
  location,
}: Props) {
  return (
    <>
      <Html lang="pt-BR" dir="ltr">
        <Head>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Helvetica"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
          />
        </Head>
        <Tailwind>
          <Preview>Redefinição de Senha MexOOH</Preview>
          <Body className="bg-white my-auto mx-auto px-2">
            <Heading as="h1" className="text-center">
              Olá {user.nome}!
            </Heading>
            <Text>
              Recebemos uma solicitação de redefinição de senha para sua conta.
              Caso não tenha sido solicitado, favor ignorar este e-mail.
            </Text>
            <Text className="text-center">
              <Link
                href={`https://www.midiapaineis.com.br/password-reset/${uuid}`}
                className="decoration-emerald-400"
              >
                Clique aqui para redefinir a sua senha!
              </Link>
              {ip && location && (
                <Text className="text-center text-sm italic text-slate-400">
                  IP: {ip}, Localização: {location}
                </Text>
              )}
              {/* <Text>IP: {ip}</Text> <Text>Localização: {location}</Text> */}
            </Text>
            <Text>Atenciosamente,</Text> <Text>MexOOH</Text>
            <Markdown>---</Markdown>
            <Text className="text-center text-sm italic text-slate-400">
              E-mail automatizado, favor não responder.
            </Text>
          </Body>
          <Img
            src={`data:image/jpeg;base64, ${imageBase64}`}
            height={"50px"}
            style={{ margin: "0 auto" }}
          />
        </Tailwind>
      </Html>
    </>
  );
}
