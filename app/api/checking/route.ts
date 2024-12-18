import { TreeNodeData } from "@mantine/core";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const checkingDirPath = "./public/restrictedpageimages/";
  function readDirectoryTree(dirPath: string): TreeNodeData[] {
    const items = fs.readdirSync(dirPath);
    const fileTree: TreeNodeData[] = [];

    items.forEach((item) => {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        fileTree.unshift({
          value: fullPath.slice(7).replace(/\\/g, "/"),
          label: item,
          // type: "directory",
          children: readDirectoryTree(fullPath), // Recurso recursivo
        });
      } else if (stats.isFile()) {
        fileTree.push({
          value: fullPath.slice(7).replace(/\\/g, "/"),
          label: item,
          // type: "file",
        });
      }
    });
    return fileTree;
  }
  return NextResponse.json(readDirectoryTree(checkingDirPath));
}
