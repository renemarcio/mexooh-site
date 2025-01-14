import { InfoOOHPanelInfoType } from "@/types/websiteTypes";
import { Grid, Title, Text, Center, Group } from "@mantine/core";
import {
  IconCashBanknote,
  IconCompass,
  IconCurrencyReal,
  IconUsers,
} from "@tabler/icons-react";

interface Props {
  data: InfoOOHPanelInfoType;
}

export default function InfoOOHDisplay({ data }: Props) {
  if (data)
    return (
      <Center h={"100%"}>
        <Grid gutter={10} align="center">
          <Grid.Col span={6}>
            <Group gap={"sm"} justify="center">
              <IconUsers size={30} color="var(--mantine-color-midiagreen-7)" />
              <div>
                <Text size="md" c={"var(--mantine-color-midiagreen-7)"}>
                  Impacto Diário
                </Text>
                <Text size="xl">{data.dailyImpacts}</Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group gap={"sm"} justify="center">
              <IconUsers
                size={30}
                color={"var(--mantine-color-midiagreen-7)"}
              />
              <div>
                <Text size="md" c={"var(--mantine-color-midiagreen-7)"}>
                  Impacto Mensal
                </Text>
                <Text size="xl">{data.monthlyImpacts}</Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={12}>
            <Group gap={"sm"} justify="center">
              <IconCashBanknote
                size={30}
                color={"var(--mantine-color-midiagreen-7)"}
              />
              <div>
                <Text size="md" c={"var(--mantine-color-midiagreen-7)"}>
                  Valor
                </Text>
                <Text size="xl">{data.value}</Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group gap={"sm"} justify="center">
              <div>
                <Text
                  size="md"
                  ta={"center"}
                  c={"var(--mantine-color-midiagreen-7)"}
                >
                  CPM 30
                </Text>
                <Text size="xl" ta={"center"}>
                  {data.CPM30}
                </Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group gap={"sm"} justify="center">
              <div>
                <Text
                  size="md"
                  ta={"center"}
                  c={"var(--mantine-color-midiagreen-7)"}
                >
                  CPM 14
                </Text>
                <Text size="xl" ta={"center"}>
                  {data.CPM14}
                </Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group gap={"sm"} justify="center">
              <div>
                <Text
                  size="md"
                  ta={"center"}
                  c={"var(--mantine-color-midiagreen-7)"}
                >
                  CPM 7
                </Text>
                <Text size="xl" ta={"center"}>
                  {data.CPM7}
                </Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group gap={"sm"} justify="center">
              <div>
                <Text
                  size="md"
                  ta={"center"}
                  c={"var(--mantine-color-midiagreen-7)"}
                >
                  CPM 1
                </Text>
                <Text size="xl" ta={"center"}>
                  {data.CPM1}
                </Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={12}>
            <Group gap={"sm"} justify="center">
              <IconCompass
                size={30}
                color={"var(--mantine-color-midiagreen-7)"}
              />
              <div>
                <Text size="md" c={"var(--mantine-color-midiagreen-7)"}>
                  Coordenadas
                </Text>
                <Text size="xl">{data.latitude + ", " + data.longitude}</Text>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
      </Center>
    );
}
