import {
  Text,
  Center,
  LoadingOverlay,
  Paper,
  PasswordInput,
  TextInput,
  Stack,
  Button,
  Title,
  Skeleton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  UUID: string;
}

export default function PasswordResetConfirmationForm({ UUID }: Props) {
  const [loading, setLoading] = useState(true);
  const [canChangePassword, setCanChangePassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validate: {
      password: (value) => (value.length < 3 ? "Senha muito curta" : null),
      passwordConfirmation: (value, values) =>
        value !== values.password ? "As senhas precisam ser iguais" : null,
    },
  });

  async function fetchPasswordResetProtocol() {
    const response = await fetch("/api/passwordreset?uuid=" + UUID);
    if (response.status == 200) setCanChangePassword(true);
    const data = await response.json();
    console.log(data.data);
  }
  async function handleSubmit() {
    setSubmitting(true);
    try {
      const response = await fetch("/api/passwordreset?uuid=" + UUID, {
        method: "POST",
        body: JSON.stringify({
          UUID: UUID,
          password: form.values.password,
        }),
      });
      console.log("response from successful submit");
      console.log(response);
      console.log(response.status);
      const waitTimeInSeconds = 5;
      if (response.status == 200) {
        //Feedback and maybe redirect to home
        // window.location.href = "/"; <- might be useful
        setTimeout(
          () => (window.location.href = "/"),
          waitTimeInSeconds * 1000
        );
        modals.open({
          title: "Sucesso!",
          children: (
            <>
              <Text ta={"center"} size="xl" c={"midiagreen"}>
                Senha alterada com sucesso. Agora é só logar novamente!
              </Text>
              <Text c={"dimmed"} size="sm" ta={"center"}>
                Redirecionando para a homepage em {waitTimeInSeconds} seg.
              </Text>
            </>
          ),
          centered: true,
        });
      } else {
        //Feedback
        setTimeout(() => window.location.reload(), waitTimeInSeconds * 1000);
        modals.open({
          title: "Ops...",
          children: (
            <>
              <Text ta={"center"} size="xl" c={"red"}>
                Algo deu errado ao alterar sua senha.
              </Text>
              <Text ta={"center"}>
                O protocolo de alteração de senha pode ter sido utilizado ou
                expirou. Favor atualizar a pagina e tentar novamente, ou iniciar
                o processo novamente.
              </Text>
              <Text c={"dimmed"} size="sm" ta={"center"}>
                Atualizando página em {waitTimeInSeconds} seg.
              </Text>
            </>
          ),
          centered: true,
        });
      }
    } catch (err) {
      console.log("response from unsuccessful submit");
      console.error(err);
    }
    setSubmitting(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchPasswordResetProtocol();
    setLoading(false);
  });

  return (
    <Center h={"50vh"}>
      <Paper withBorder shadow="xl" p={"xl"} w={"500px"} pos={"relative"}>
        <LoadingOverlay
          visible={loading}
          overlayProps={{ opacity: 0.5, blur: 3 }}
        />
        {(canChangePassword || loading) && (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={"sm"}>
              <Skeleton visible={loading}>
                <Text ta={"center"} size="lg" fw={500}>
                  Insira sua nova senha
                </Text>
              </Skeleton>
              <Skeleton visible={loading}>
                <PasswordInput
                  placeholder="Nova senha..."
                  {...form.getInputProps("password")}
                />
              </Skeleton>
              <Skeleton visible={loading}>
                <PasswordInput
                  placeholder="Repita a nova senha..."
                  {...form.getInputProps("passwordConfirmation")}
                />
              </Skeleton>
              <Skeleton visible={loading}>
                <Button fullWidth loading={submitting} type="submit">
                  Trocar de senha
                </Button>
              </Skeleton>
            </Stack>
          </form>
        )}

        {!canChangePassword && !loading && (
          <>
            <Title ta={"center"}>Acesso Negado</Title>
            <Text ta={"center"} c={"dimmed"} mb={"md"}>
              Link de redefinição de senha inválido ou expirado.
            </Text>
            <Button component={Link} href={"/"} fullWidth>
              Voltar
            </Button>
          </>
        )}

        {/* {canChangePassword ? (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={"sm"}>
              <Skeleton visible={loading}>
                <Text ta={"center"} size="lg" fw={500}>
                  Insira sua nova senha
                </Text>
              </Skeleton>
              <Skeleton visible={loading}>
                <PasswordInput
                  placeholder="Nova senha..."
                  {...form.getInputProps("password")}
                />
              </Skeleton>
              <Skeleton visible={loading}>
                <PasswordInput
                  placeholder="Repita a nova senha..."
                  {...form.getInputProps("passwordConfirmation")}
                />
              </Skeleton>
              <Skeleton visible={loading}>
                <Button fullWidth type="submit">
                  Trocar de senha
                </Button>
              </Skeleton>
            </Stack>
          </form>
        ) : (
          <>
            <Title ta={"center"}>Acesso Negado</Title>
            <Text ta={"center"} c={"dimmed"} mb={"md"}>
              Link de redefinição de senha inválido ou expirado.
            </Text>
            <Button component={Link} href={"/"} fullWidth>
              Voltar
            </Button>
          </>
        )} */}
      </Paper>
    </Center>
  );
}
