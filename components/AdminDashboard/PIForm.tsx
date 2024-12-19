import GeneratePIPDF from "@/PDFTemplates/PI/PIPDF";
import {
  Button,
  Fieldset,
  Stack,
  TextInput,
  Text,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconCircleMinus,
  IconCirclePlus,
  IconPrinter,
} from "@tabler/icons-react";
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

  function handleChooseLEDPanel(LEDPanel: string | null, index: number) {
    switch (LEDPanel) {
      case "LED AV CALORS COMITRE N° 275 - CAMPOLIM - EM FRENTE TELHA NORTE":
        form.setFieldValue(
          "inventarios." + index + ".localizacao",
          "LED AV CALORS COMITRE N° 275 - CAMPOLIM - EM FRENTE TELHA NORTE"
        );
        form.setFieldValue(
          "inventarios." + index + ".geolocalizacao",
          "-23.5186964, -47.4642155"
        );
        break;
      case "AV. JUSCELINO KUBITSCHEK - PAINEL LED - ESQUINA ESTACIONAMENTO":
        form.setFieldValue(
          "inventarios." + index + ".localizacao",
          "AV. JUSCELINO KUBITSCHEK - PAINEL LED - ESQUINA ESTACIONAMENTO"
        );
        form.setFieldValue(
          "inventarios." + index + ".geolocalizacao",
          "-23.5059244, -47.4606713"
        );
        break;
      case "AV DOM AGUIRRE N° 525 - CENTRO":
        form.setFieldValue(
          "inventarios." + index + ".localizacao",
          "AV DOM AGUIRRE N° 525 - CENTRO"
        );
        form.setFieldValue(
          "inventarios." + index + ".geolocalizacao",
          "-23.5028318, -47.4526939"
        );
        break;
      default:
        form.setFieldValue("inventarios." + index + ".localizacao", "");
        form.setFieldValue("inventarios." + index + ".geolocalizacao", "");
    }
  }

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues,
  });

  const inventoryForm = form.getValues().inventarios.map((inventory, index) => (
    <Fieldset legend={`Painel de LED ${index + 1}`}>
      <Select
        label="Localização"
        data={[
          "LED AV CALORS COMITRE N° 275 - CAMPOLIM - EM FRENTE TELHA NORTE",
          "AV. JUSCELINO KUBITSCHEK - PAINEL LED - ESQUINA ESTACIONAMENTO",
          "AV DOM AGUIRRE N° 525 - CENTRO",
        ]}
        {...form.getInputProps(`inventarios.${index}.localizacao`)}
        onChange={(value) => {
          handleChooseLEDPanel(value, index);
        }}
      />
      <Text>
        Coordenadas: {form.getValues().inventarios[index].geolocalizacao}
      </Text>
      <TextInput
        {...form.getInputProps(`inventarios.${index}.codigo`)}
        label="Código"
      />
      {/* <TextInput
        {...form.getInputProps(`inventarios.${index}.localizacao`)}
        label="Localização"
      /> */}
      {/* <TextInput
        {...form.getInputProps(`inventarios.${index}.geolocalizacao`)}
        label="Geolocalização"
      /> */}
      <TextInput
        {...form.getInputProps(`inventarios.${index}.valor`)}
        label="Valor"
      />
      {form.getValues().inventarios.length > 1 && (
        <Button
          leftSection={<IconCircleMinus />}
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
          leftSection={<IconCirclePlus />}
        >
          Adicionar painel
        </Button>
        {/* <TextInput {...form.getInputProps("")} label="Tempo de amostra" /> */}
        <Button
          type="submit"
          fullWidth
          leftSection={<IconPrinter />}
          color={"blue"}
        >
          Imprimir PI
        </Button>
      </Stack>
    </form>
  );
}
