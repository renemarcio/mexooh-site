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
      <Box maw={"1920px"} w={"100%"} p={"lg"} id="info">
        <Center>
          <Title>Quem Somos</Title>
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
              <Box style={{ textAlign: "justify" }}>
                <Text size={"lg"} component="span">
                  A{" "}
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
                  MEX OOH
                </Text>
                <Text component="span" size={"lg"}>
                  {" "}
                  atua há mais de 30 anos com mídia exterior, veiculando
                  anúncios em painéis rodoviários nas principais rodovias do
                  Estado e Outdoors na região metropolitana de Sorocaba e
                  Adjacências. De forma rápida, objetiva e constante a mídia
                  exterior abrange democraticamente todos os públicos. Está nas
                  ruas, avenidas em tudo que cerca o deslocamento das pessoas,
                  inclusive aquelas com poder de decisão, sendo assim
                  classificado como veículo de comunicação abrangente. Além de
                  forte presença no cotidiano de todos, possui grande poder de
                  fixação e proporciona aos anunciantes retorno desejado.
                </Text>
                <Text size={"lg"}>
                  Disponibilizamos excelentes pontos de painéis no Estado de São
                  Paulo nas principais rodovias sendo a região metropolitana da
                  capital paulista o maior potencial de consumo do país. A
                  Ligação entre a capital e o interior dá - se predominantemente
                  pelo modo rodoviário, através das principais auto-estradas
                  radiais do estado. O tráfego dessas rodovias é composto em
                  média de 30% de veículos de carga e 70% de veículos de passeio
                  conforme dados estatístico do DER/SP e ARTESP. São efetuadas
                  milhões de viagens a negócio, trabalho ou lazer, sendo assim
                  ter a sua marca e produto nessas rodovias, significa estar
                  sendo visto e lembrado nesse mercado por esse público de alto
                  poder aquisitivo. Um bom planejamento de OOH consiste em
                  veicular publicidade através de painéis rodoviários nas
                  principais rodovias São Paulo.
                </Text>
                {/* <Text size={"lg"}>
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
                </Text> */}
              </Box>
            </Stack>
          </Container>
        </Group>
      </Box>
    </Center>
  );
}
