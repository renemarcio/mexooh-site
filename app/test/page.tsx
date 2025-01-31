import Hero from "@/components/Hero";
import Info from "@/components/Info";
import InventoryDisplay from "@/components/InventoryDisplay";
import { Title, Text, Center } from "@mantine/core";

export default function TestPage() {
  return (
    <>
      <Hero />
      <Info />
      <Title ta={"center"}>Confira nosso inventário</Title>
      <Center>
        <Text ta={"center"} w={"50%"} mb={"xl"} mt={"md"}>
          Oferecemos visibilidade para o seu negócio se várias formas, seja por
          um outdoor na rua ou um painel de publicidade em uma estrada, nossos
          pontos são as melhores maneiras de divulgar seu negócio. Coloque já no
          carrinho e faça seu negocio crescer.
        </Text>
      </Center>
      <InventoryDisplay />
    </>
  );
}
