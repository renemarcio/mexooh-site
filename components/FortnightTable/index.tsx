import { Table } from "@mantine/core";
import { bisemanas } from "@prisma/client";
import React, { useEffect } from "react";

export default function FortnightTable() {
  const [fortnights, setFortnights] = React.useState<bisemanas[]>([]);

  useEffect(() => {
    fetchFortnights();
  }, []);

  async function fetchFortnights() {
    try {
      const response = await fetch(
        "/api/fortnights?ano=" + new Date().getFullYear() + "",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(new Date().getFullYear());
      setFortnights(data);
    } catch (error) {
      console.log(error);
    }
  }

  const rows = fortnights.map((fortnight) => {
    return (
      <Table.Tr>
        <Table.Td ta={"center"}>{fortnight.numero}</Table.Td>
        <Table.Td ta={"center"}>
          {new Date(fortnight.dtInicio).toLocaleDateString("pt-br")}
        </Table.Td>
        <Table.Td ta={"center"}>
          {new Date(fortnight.dtFinal).toLocaleDateString("pt-br")}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table striped withTableBorder withRowBorders={false} highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th ta={"center"}>BI</Table.Th>
          <Table.Th ta={"center"}>Inicio</Table.Th>
          <Table.Th ta={"center"}>Final</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
