import { MatrixDataType } from "@/types/websiteTypes";
import { Table, TextInput, Center, Pagination, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function MatrixTable() {
  const [matrix, setMatrix] = useState<MatrixDataType[]>([]);
  const [address, setAddress] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [id, setID] = useState("");
  const [page, setPage] = useState(1);

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
    fetchMatrix();
  }, [address, id, page]);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            Código
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
  );
}
