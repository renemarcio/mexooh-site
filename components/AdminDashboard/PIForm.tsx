import GeneratePIPDF from "@/PDFTemplates/PI/PIPDF";
import { Button, Fieldset, Stack, TextInput, Text } from "@mantine/core";
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
  inventarios: [
    {
      codigo: 0,
      localizacao: "",
      geolocalizacao: "",
      valor: "",
    },
  ],
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
  });

  const inventoryForm = form.getValues().inventarios.map((inventory, index) => (
    <Fieldset legend={`Painel de LED ${index + 1}`}>
      <TextInput
        {...form.getInputProps(`inventarios.${index}.codigo`)}
        label="Código"
      />
      <TextInput
        {...form.getInputProps(`inventarios.${index}.localizacao`)}
        label="Localização"
      />
      <TextInput
        {...form.getInputProps(`inventarios.${index}.geolocalizacao`)}
        label="Geolocalização"
      />
      <TextInput
        {...form.getInputProps(`inventarios.${index}.valor`)}
        label="Valor"
      />
      {form.getValues().inventarios.length > 1 && (
        <Button
          onClick={() => form.removeListItem("inventarios", index)}
          mt={"md"}
          color={"red"}
          fullWidth
        >
          Remover painel
        </Button>
      )}
    </Fieldset>
  ));

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
        {inventoryForm ? inventoryForm : <Text>Nenhum painel inserido</Text>}
        <Button
          onClick={() => form.insertListItem("inventarios", { codigo: 0 })}
        >
          Adicionar painel
        </Button>
        {/* <TextInput {...form.getInputProps("")} label="Tempo de amostra" /> */}
        <Button type="submit" fullWidth>
          Imprimir PI
        </Button>
      </Stack>
    </form>
  );
}
