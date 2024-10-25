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
import React, { useMemo } from "react";
import PIForm from "./PIForm";
export default function AdminDashboard() {
  const tree = useTree();
  const data = useMemo<TreeNodeData[]>(
    () => [
      {
        value: "checking",
        label: "Checking Fotográfico",
        children: [
          {
            value: "checking/1",
            label: "1",
            children: [
              { value: "checking/1/1.png", label: "1.png" },
              { value: "checking/1/2.png", label: "2.png" },
              { value: "checking/1/3.png", label: "3.png" },
            ],
          },
          {
            value: "checking/2",
            label: "2",
            children: [
              { value: "checking/2/1.png", label: "1.png" },
              { value: "checking/2/2.png", label: "2.png" },
              { value: "checking/2/3.png", label: "3.png" },
            ],
          },
        ],
      },
    ],
    []
  );

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
      console.log(data);
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
        <Group>
          <Button
            h={"100px"}
            color="rgba(255, 255, 255, 1)"
            component={Link}
            href={"https://sistema.infooh.com.br/#/login"}
            target="_blank"
          >
            <Image src="/infooh.png" h={"100%"} />
          </Button>
          <Button
            h={"100px"}
            color="rgba(255, 255, 255, 1)"
            component={Link}
            href={"http://espacomais.srv.br/"}
            target="_blank"
          >
            <Image src="/EMLogo.png" h={"100%"} p={"xs"} />
          </Button>
          <Button onClick={FetchBucket}>Fetch do Bucket</Button>
          <Button
            onClick={() =>
              modals.open({ title: "Imprimir PI", children: <PIForm /> })
            }
          >
            Imprimir PI
          </Button>
        </Group>
      </Center>
      <Grid columns={3}>
        <Grid.Col span={1}>
          <Paper m={"lg"} p={"lg"} h={"100%"}>
            <Button onClick={() => tree.expandAllNodes()}>
              Expandir Todos
            </Button>
            <Button onClick={() => tree.collapseAllNodes()}>
              Recolher Todos
            </Button>
            <Tree
              data={data}
              tree={tree}
              renderNode={(payload) => <Leaf {...payload} />}
              selectOnClick
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={2}>
          <Image src={"https://placehold.co/2068x1082"} h={"100%"} />
        </Grid.Col>
      </Grid>
    </>
  );
}
