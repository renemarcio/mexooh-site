import { InfoOOHPanelInfoType } from "@/types/websiteTypes";
import { Grid, Title, Text, Center, Group } from "@mantine/core";
import { InlineInputClasses } from "@mantine/core/lib/components/InlineInput";
import {
  IconCashBanknote,
  IconCompass,
  IconCurrencyReal,
  IconUsers,
} from "@tabler/icons-react";
import classes from "./styles.module.css";
interface Props {
  data?: InfoOOHPanelInfoType;
}

export default function InfoOOHDisplay({ data }: Props) {
  if (data)
    return (
      <>
        <Text
          ta={"center"}
          bg={"var(--mantine-primary-color-filled)"}
          c={"var(--mantine-color-bright)"}
          fw={"bold"}
          // size={"xl"}
          // className={classes.title}
        >
          InfoOOH
        </Text>
        <Center h={"100%"}>
          <Grid gutter={10} align="center" justify="space-around">
            <Grid.Col span={6}>
              <Group gap={"sm"} justify="center">
                <IconUsers
                  size={30}
                  color="var(--mantine-color-midiagreen-7)"
                />
                <div>
                  <Text className={classes.statTitle}>Impacto Diário</Text>
                  <Text size="xl" className={classes.statValue}>
                    {data.dailyImpacts}
                  </Text>
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
                  <Text size="md" className={classes.statTitle}>
                    Impacto Mensal
                  </Text>
                  <Text size="xl" className={classes.statValue}>
                    {data.monthlyImpacts}
                  </Text>
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
                  <Text size="md" className={classes.statTitle}>
                    Valor
                  </Text>
                  <Text size="xl" className={classes.statValue}>
                    {data.value}
                  </Text>
                </div>
              </Group>
            </Grid.Col>
            <Grid.Col span={3}>
              <Group gap={"sm"} justify="center">
                <div>
                  <Text size="md" ta={"center"} className={classes.statTitle}>
                    CPM 30
                  </Text>
                  <Text size="xl" ta={"center"} className={classes.statValue}>
                    {data.CPM30}
                  </Text>
                </div>
              </Group>
            </Grid.Col>
            <Grid.Col span={3}>
              <Group gap={"sm"} justify="center">
                <div>
                  <Text size="md" ta={"center"} className={classes.statTitle}>
                    CPM 14
                  </Text>
                  <Text size="xl" ta={"center"} className={classes.statValue}>
                    {data.CPM14}
                  </Text>
                </div>
              </Group>
            </Grid.Col>
            <Grid.Col span={3}>
              <Group gap={"sm"} justify="center">
                <div>
                  <Text size="md" ta={"center"} className={classes.statTitle}>
                    CPM 7
                  </Text>
                  <Text size="xl" ta={"center"} className={classes.statValue}>
                    {data.CPM7}
                  </Text>
                </div>
              </Group>
            </Grid.Col>
            <Grid.Col span={3}>
              <Group gap={"sm"} justify="center">
                <div>
                  <Text size="md" ta={"center"} className={classes.statTitle}>
                    CPM 1
                  </Text>
                  <Text size="xl" ta={"center"} className={classes.statValue}>
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
                  <Text size="md" className={classes.statTitle}>
                    Coordenadas
                  </Text>
                  <Text size="xl" className={classes.statValue}>
                    {data.latitude + ", " + data.longitude}
                  </Text>
                </div>
              </Group>
            </Grid.Col>
          </Grid>
        </Center>
      </>
    );
  else {
    return (
      <>
        <Center h={"100%"}>
          <Title c={"dimmed"}>InfoOOH</Title>
        </Center>
      </>
    );
  }
}
