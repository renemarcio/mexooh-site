"use client";
import {
  Button,
  Group,
  Image,
  Text,
  Tree,
  TreeNodeData,
  useTree,
  RenderTreeNodePayload,
  Paper,
  Grid,
  Center,
  ScrollArea,
  Table,
  Stack,
  Collapse,
  TextInput,
  Pagination,
  Divider,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconChevronRight,
  IconFolder,
  IconFolderOpen,
  IconPhoto,
  IconPhotoFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect } from "react";
import PIForm from "../_Forms/PIForm/PIForm";
import { MatrixDataType } from "@/types/websiteTypes";
import { useDisclosure } from "@mantine/hooks";
import PresentationForm from "../_Forms/PresentationForm";
import MatrixTable from "../_Tables/MatrixTable";

export default function AdminDashboard() {
  const [treeData, setTreeData] = React.useState<TreeNodeData[]>([]);
  const [opened, { toggle }] = useDisclosure(false);

  interface FileTree {
    name: string;
    type: "file" | "directory";
    children?: FileTree[];
  }

  async function fetchCheckingDirectoryTree() {
    const response = await fetch("/api/checking");
    const data = await response.json();
    setTreeData(data);
  }

  useEffect(() => {
    fetchCheckingDirectoryTree();
  }, []);

  const tree = useTree({
    multiple: false,
  });

  interface FileIconProps {
    // name: string;
    isFolder: boolean;
    expanded: boolean;
    selected: boolean;
  }

  function FileIcon({ isFolder, expanded, selected }: FileIconProps) {
    if (isFolder) {
      return expanded ? (
        <IconFolderOpen
          color="var(--mantine-color-yellow-9)"
          size={14}
          stroke={2.5}
        />
      ) : (
        <IconFolder
          color="var(--mantine-color-yellow-9)"
          size={14}
          stroke={2.5}
        />
      );
    } else {
      return selected ? (
        <IconPhotoFilled size={14} stroke={2.5} />
      ) : (
        <IconPhoto size={14} stroke={2.5} />
      );
    }
    return null;
  }

  function Leaf({
    node,
    expanded,
    hasChildren,
    elementProps,
    selected,
  }: RenderTreeNodePayload) {
    return (
      <Group gap={5} {...elementProps}>
        <FileIcon
          isFolder={hasChildren}
          expanded={expanded}
          selected={selected}
        />
        <span>{node.label}</span>
        {hasChildren && (
          <IconChevronRight
            size={14}
            color="var(--mantine-color-yellow-9)"
            stroke={2.5}
            style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        )}
      </Group>
    );
  }

  return (
    <>
      <Center m={"lg"}>
        <Group justify="space-between" w={"80%"}>
          <Group justify="center" m={"auto"}>
            <Button>Mídia</Button>
            {/* <Button onClick={FetchBucket}>Fetch do Bucket</Button> */}
            <Button
              onClick={() =>
                modals.open({ title: "Imprimir PI", children: <PIForm /> })
              }
            >
              Imprimir PI
            </Button>
            <Button onClick={toggle}>Coordenadas</Button>
            <Button
              onClick={() => {
                modals.open({
                  title: "Apresentação",
                  size: "lg",
                  children: <PresentationForm />,
                  centered: true,
                });
              }}
            >
              Apresentação
            </Button>
          </Group>
          <Stack>
            <Text>Sistemas Auxiliares</Text>
            <Button
              component={Link}
              href={"https://sistema.infooh.com.br/#/login"}
              target="_blank"
            >
              InfoOOH
            </Button>
            <Button
              component={Link}
              href={"http://espacomais.srv.br/"}
              target="_blank"
            >
              EspaçoMais
            </Button>
          </Stack>
        </Group>
      </Center>
      <Grid columns={3} h={"600px"} overflow="hidden" w={"80vw"}>
        <Grid.Col span={1} h={"100%"}>
          <Paper m={"lg"} p={"lg"} h={"100%"}>
            <Button onClick={() => tree.expandAllNodes()}>
              Expandir Todos
            </Button>
            <Button onClick={() => tree.collapseAllNodes()}>
              Recolher Todos
            </Button>
            <ScrollArea type="auto" h={"475px"}>
              <Tree
                data={treeData}
                tree={tree}
                renderNode={(payload) => <Leaf {...payload} />}
                selectOnClick
              />
            </ScrollArea>
          </Paper>
        </Grid.Col>
        <Grid.Col span={2} h={"100%"}>
          <Image
            src={tree.selectedState[0]}
            fallbackSrc="https://placehold.co/2068x1082?text=Selecione+um+arquivo"
            h={"600px"}
            fit="contain"
          />
        </Grid.Col>
      </Grid>
      <Collapse in={opened}>
        <MatrixTable />
      </Collapse>
    </>
  );
}
