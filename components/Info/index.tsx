import {
  Box,
  Center,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";

export default function Info() {
  return (
    <Center my={"xl"}>
      <Box maw={"1920px"} w={"100%"} p={"lg"}>
        <Center>
          <Title>Quem somos</Title>
        </Center>
        <Group gap={0} mt={"lg"}>
          <Image
            src={"https://source.unsplash.com/random"}
            w={"50%"}
            h={"700px"}
          />
          <Container w={"50%"}>
            <Stack justify="space-between">
              <Text size={"lg"}>
                Com mais de 20 anos de experiência, a Mídia Painéis tornou-se
                especialista em painéis rodoviários publicitários. Possui
                painéis bem posicionados nas principais rodovias de acesso a São
                Paulo.
              </Text>
              <Text size={"lg"}>
                São pontos localizados estrategicamente para melhor atender suas
                necessidades de comunicação em mídia exterior. Você pode optar
                por painéis de publicidade nos modelos convencionais ou do tipo
                Megalight.
              </Text>
              <Text size={"lg"}>
                Além disso, a Mídia Painéis também trabalha com outdoors e mídia
                aeroportuária, com pontos de exibição de propaganda nos
                aeroportos internacionais de Viracopos (Campinas) e Congonhas
                (São Paulo), possibilitando uma grande exposição da sua marca
                junto aos consumidores.
              </Text>
            </Stack>
          </Container>
        </Group>
      </Box>
    </Center>
  );
}
