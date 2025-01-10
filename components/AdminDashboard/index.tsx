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
  Code,
  ScrollArea,
  Table,
  Stack,
  Flex,
  Collapse,
  TextInput,
  Pagination,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconChevronDown,
  IconChevronRight,
  IconFolder,
  IconFolderOpen,
  IconPhoto,
  IconPhotoFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import PIForm from "./PIForm";
import { MatrixDataType } from "@/types/websiteTypes";
import { useDisclosure, usePagination } from "@mantine/hooks";

export default function AdminDashboard() {
  const [treeData, setTreeData] = React.useState<TreeNodeData[]>([]);
  const [matrix, setMatrix] = React.useState<MatrixDataType[]>([]);
  const [address, setAddress] = React.useState("");
  const [id, setID] = React.useState("");
  const [opened, { toggle }] = useDisclosure(false);
  const [totalPages, setTotalPages] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const rows = matrix.map((row) => {
    return (
      <Table.Tr key={row.id}>
        <Table.Td>{row.id}</Table.Td>
        <Table.Td>{row.address}</Table.Td>
        <Table.Td>{row.coordinates}</Table.Td>
        <Table.Td>{row.type}</Table.Td>
        <Table.Td>{row.media}</Table.Td>
      </Table.Tr>
    );
  });
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

  async function fetchMatrix() {
    const response = await fetch(
      "/api/matrix?address=" + address + "&id=" + id + "&page=" + page
    );
    const data = await response.json();
    setMatrix(data.data);
    setTotalPages(data.numberOfPages);
    if (page > data.numberOfPages) setPage(data.numberOfPages);
  }

  useEffect(() => {
    fetchCheckingDirectoryTree();
    fetchMatrix();
  }, []);

  useEffect(() => {
    fetchMatrix();
  }, [address, id]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

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

  async function FetchBucket() {
    try {
      const response = await fetch("/api/bucket/checking");
      const data = await response.json();
    } catch {
      console.log("Couldn't fetch bucket.");
    }
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
          </Group>
          <Stack>
            <Text>Sistemas Auxiliares</Text>
            <Button
              // h={"100px"}
              // color="rgba(255, 255, 255, 1)"
              component={Link}
              href={"https://sistema.infooh.com.br/#/login"}
              target="_blank"
            >
              InfoOOH
              {/* <Image src="/infooh.png" h={"100%"} /> */}
            </Button>
            <Button
              // h={"100px"}
              // color="rgba(255, 255, 255, 1)"
              component={Link}
              href={"http://espacomais.srv.br/"}
              target="_blank"
            >
              EspaçoMais
              {/* <Image src="/EMLogo.png" h={"100%"} p={"xs"} /> */}
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
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                Código{" "}
                <TextInput
                  onChange={(e) => setID(e.target.value)}
                  placeholder="Buscar por código..."
                ></TextInput>
              </Table.Th>
              <Table.Th>
                Endereço
                <TextInput
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Buscar por endereço..."
                ></TextInput>
              </Table.Th>
              <Table.Th>Coordenadas</Table.Th>
              <Table.Th>Tipo</Table.Th>
              <Table.Th>Mídia</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text c={"dimmed"} fs={"italic"} ta={"center"}>
                    Nada encontrado
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
          <Table.Tfoot>
            <Table.Tr>
              <Table.Th colSpan={5}>
                <Center>
                  <Pagination
                    total={totalPages}
                    onChange={(value) => {
                      if (value !== page) {
                        setPage(value);
                        fetchMatrix();
                      }
                      setPage(value);
                    }}
                  />
                </Center>
              </Table.Th>
            </Table.Tr>
          </Table.Tfoot>
        </Table>
      </Collapse>
      {/* <Code>{JSON.stringify(matrix, null, 2)}</Code> */}
    </>
  );
}
