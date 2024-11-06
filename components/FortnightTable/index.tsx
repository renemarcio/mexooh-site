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
        "/api/fortnights?years=" +
          new Date().getFullYear() +
          ", " +
          (new Date().getFullYear() + 1),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFortnights(data);
    } catch (error) {
      throw error;
    }
  }

  const rows = fortnights.map((fortnight) => {
    return (
      <Table.Tr
        key={fortnight.id}
        bg={
          new Date().getTime() > new Date(fortnight.dtFinal).getTime()
            ? "var(--mantine-color-red-light)"
            : new Date().getTime() > new Date(fortnight.dtInicio).getTime()
            ? "var(--mantine-color-green-light)"
            : ""
        }
      >
        <Table.Td ta={"center"}>{fortnight.numero}</Table.Td>
        <Table.Td ta={"center"}>
          {`${Number(new Date(fortnight.dtInicio).getUTCDate()).toLocaleString(
            "pt-BR",
            {
              minimumIntegerDigits: 2,
            }
          )}/${Number(
            new Date(fortnight.dtInicio).getUTCMonth() + 1
          ).toLocaleString("pt-BR", {
            minimumIntegerDigits: 2,
          })}/${new Date(fortnight.dtInicio).getUTCFullYear()}`}
        </Table.Td>
        <Table.Td ta={"center"}>
          {`${Number(new Date(fortnight.dtFinal).getUTCDate()).toLocaleString(
            "pt-BR",
            {
              minimumIntegerDigits: 2,
            }
          )}/${Number(
            new Date(fortnight.dtFinal).getUTCMonth() + 1
          ).toLocaleString("pt-BR", {
            minimumIntegerDigits: 2,
          })}/${new Date(fortnight.dtFinal).getUTCFullYear()}`}
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
