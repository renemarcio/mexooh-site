import {
  Box,
  Center,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import AboutUsPhoto from "../AboutUsPhoto";
import { handelGoth } from "@/styles/fonts/fonts";

export default function Info() {
  return (
    <Center my={"xl"}>
      <Box maw={"1920px"} w={"100%"} p={"lg"}>
        <Center>
          <Title>Quem somos</Title>
        </Center>
        <Group gap={0} mt={"lg"}>
          {/* <Image
            src={"https://source.unsplash.com/random"}
            w={"50%"}
            h={"700px"}
          /> */}
          <AboutUsPhoto />
          <Container w={"50%"}>
            <Stack justify="space-between">
              {/* <Text size={"lg"}>
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
              </Text> */}
              <Box>
                <Text size={"lg"} component="span">
                  Bem-vindo à{" "}
                </Text>
                <Text
                  size={"lg"}
                  component="span"
                  fw={800}
                  variant="gradient"
                  gradient={{
                    from: "var(--mantine-primary-color-9)",
                    to: "var(--mantine-primary-color-6)",
                    deg: 45,
                  }}
                  style={{
                    fontFamily: `${handelGoth.style.fontFamily}, sans-serif`,
                  }}
                >
                  MEX
                </Text>
                <Text component="span" size={"lg"}>
                  , o seu parceiro confiável em mídia externa na vibrante região
                  de Itapetininga, Sorocaba, São Paulo e arredores! Nós somos
                  mais do que apenas uma empresa de aluguel de outdoors e
                  painéis; somos impulsionadores de marcas, contadores de
                  histórias e conectores de comunidades. Desde a nossa humilde
                  origem, temos crescido de forma constante e rápida,
                  alimentados pela paixão em oferecer soluções de publicidade
                  externa que realmente fazem a diferença.
                </Text>
                <Text size={"lg"}>
                  O que nos diferencia? É o nosso compromisso com a excelência,
                  desde a seleção estratégica de locais premium até a execução
                  impecável de cada campanha. Com uma equipe experiente e
                  dedicada, estamos sempre prontos para entender as necessidades
                  exclusivas de cada cliente e oferecer soluções personalizadas
                  que garantem visibilidade e impacto. Imagine a sua marca
                  ganhando vida nas paisagens urbanas mais movimentadas,
                  capturando a atenção de milhares de pessoas todos os dias. Com
                  a nossa vasta rede de locais estratégicos, podemos transformar
                  essa visão em realidade, maximizando o alcance e a relevância
                  da sua mensagem. Além disso, a nossa presença em múltiplas
                  localidades significa que podemos levar a sua campanha além
                  das fronteiras de uma cidade, alcançando audiências em toda a
                  região metropolitana de São Paulo. Seja para promover um
                  evento, lançar um novo produto ou simplesmente aumentar a
                  visibilidade da sua marca, estamos aqui para tornar isso
                  possível.
                </Text>
                <Text size={"lg"}>
                  Mas não se trata apenas de números e métricas - é sobre criar
                  conexões emocionais e gerar resultados tangíveis. Cada vez que
                  uma pessoa vê o seu outdoor, é uma oportunidade para causar
                  impacto e inspirar ação. E é isso que nos motiva todos os
                  dias: o poder de transformar espaços públicos em plataformas
                  de comunicação poderosas e memoráveis. Então, se você está
                  pronto para elevar a sua marca a novos patamares de
                  reconhecimento e influência, junte-se a nós na jornada rumo ao
                  sucesso. Entre em contato hoje mesmo e descubra como podemos
                  fazer o seu negócio brilhar nas ruas de Itapetininga,
                  Sorocaba, São Paulo e além. Estamos ansiosos para colaborar
                  com você e criar experiências de publicidade externa que
                  deixam uma impressão duradoura.
                </Text>
                <Text size={"xs"} ta={"center"} c={"dimmed"}>
                  Texto feito por IA e é apenas um placeholder, trocar antes de
                  realizar o deploy!
                </Text>
              </Box>
            </Stack>
          </Container>
        </Group>
      </Box>
    </Center>
  );
}
