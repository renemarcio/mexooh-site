import GeneratePIPDF from "@/PDFTemplates/PI/PIPDF";
import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

const initialValues = {
  faturamento: 0,
  anunciante: "",
  autorizante: "",
  razaoSocial: "",
  telefone: "",
  endereco: "",
  email: "",
  cnpjcpf: "",
  data: "",
  planejador: "",
  agencia: "",
  campanha: "",
  periodo: "",
  arquivo: "",
  grade: "",
  parcelas: "",
  vencimento: "",
  insercoes: "",
  cpm30: "",
  codigo: 0,
  localizacao: "",
  geolocalizacao: "",
  valor: "",
};

export type PIValuesType = typeof initialValues;

export default function PIForm() {
  async function handleSubmit(formValues: PIValuesType) {
    const response = await fetch("/api/report/PI");
    console.log("response");
    console.log(response);
    GeneratePIPDF(formValues);
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues,
    // initialValues: {
    //   faturamento: 0,
    //   anunciante: "",
    //   autorizante: "",
    //   razaoSocial: "",
    //   telefone: "",
    //   endereco: "",
    //   email: "",
    //   cnpjcpf: "",
    //   data: "",
    //   planejador: "",
    //   agencia: "",
    //   campanha: "",
    //   periodo: "",
    //   arquivo: "",
    //   grade: "",
    //   parcelas: "",
    //   vencimento: "",
    //   insercoes: "",
    //   cpm30: "",
    //   codigo: 0,
    //   localizacao: "",
    //   geolocalizacao: "",
    //   valor: "",
    // },
  });

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      // onSubmit={(event) => {
      //   event.preventDefault();
      //   handleSubmit();
      // }}
    >
      <Stack gap={"md"}>
        <TextInput {...form.getInputProps("faturamento")} label="Faturamento" />
        <TextInput {...form.getInputProps("anunciante")} label="Anunciante" />
        <TextInput {...form.getInputProps("autorizante")} label="Autorizante" />
        <TextInput
          {...form.getInputProps("razaoSocial")}
          label="Razão Social"
        />
        <TextInput {...form.getInputProps("telefone")} label="Telefone" />
        <TextInput {...form.getInputProps("endereco")} label="Endereço" />
        <TextInput {...form.getInputProps("email")} label="Email" />
        <TextInput {...form.getInputProps("cnpjcpf")} label="CNPJ/CPF" />
        <TextInput {...form.getInputProps("data")} label="Data" />
        <TextInput {...form.getInputProps("planejador")} label="Planejador" />
        <TextInput {...form.getInputProps("agencia")} label="Agencia" />
        <TextInput
          {...form.getInputProps("campanha")}
          label="Título/Campanha"
        />
        <TextInput
          {...form.getInputProps("arquivo")}
          label="Arquivo a ser inserido"
        />
        <TextInput {...form.getInputProps("grade")} label="Espaço na grade" />
        <TextInput
          {...form.getInputProps("parcelas")}
          label="Número de parcelas"
        />
        <TextInput {...form.getInputProps("vencimento")} label="Vencimento" />
        <TextInput
          {...form.getInputProps("insercoes")}
          label="Quantidade de inserções"
        />
        <TextInput {...form.getInputProps("cpm30")} label="CPM30" />
        <TextInput {...form.getInputProps("codigo")} label="Código" />
        <TextInput {...form.getInputProps("localizacao")} label="Localização" />
        <TextInput
          {...form.getInputProps("geolocalizacao")}
          label="Geolocalização"
        />
        <TextInput {...form.getInputProps("valor")} label="Valor" />
        {/* <TextInput {...form.getInputProps("")} label="Tempo de amostra" /> */}
        <Button type="submit" fullWidth>
          Imprimir PI
        </Button>
      </Stack>
    </form>
  );
}
