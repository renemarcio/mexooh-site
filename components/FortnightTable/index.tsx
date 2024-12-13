import { Fortnight } from "@/types/websiteTypes";
import { Table } from "@mantine/core";
import React, { useEffect } from "react";

export default function FortnightTable() {
  const [fortnights, setFortnights] = React.useState<Fortnight[]>([]);

  useEffect(() => {
    fetchFortnights();
  }, []);

  async function fetchFortnights() {
    try {
      const response = await fetch(
        "/api/fortnights?years=" + new Date().getFullYear(),
        // + ", " +
        // (new Date().getFullYear() + 1),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFortnights(data.data);
    } catch (error) {
      throw error;
    }
  }

  const rows = fortnights.map((fortnight) => {
    return (
      <Table.Tr
        key={fortnight.id}
        bg={
          new Date().getTime() > new Date(fortnight.finish).getTime()
            ? "var(--mantine-color-red-light)"
            : new Date().getTime() > new Date(fortnight.start).getTime()
            ? "var(--mantine-color-green-light)"
            : ""
        }
      >
        <Table.Td ta={"center"}>{fortnight.number}</Table.Td>
        <Table.Td ta={"center"}>
          {`${Number(new Date(fortnight.start).getUTCDate()).toLocaleString(
            "pt-BR",
            {
              minimumIntegerDigits: 2,
            }
          )}/${Number(
            new Date(fortnight.start).getUTCMonth() + 1
          ).toLocaleString("pt-BR", {
            minimumIntegerDigits: 2,
          })}/${new Date(fortnight.start).getUTCFullYear()}`}
        </Table.Td>
        <Table.Td ta={"center"}>
          {`${Number(new Date(fortnight.finish).getUTCDate()).toLocaleString(
            "pt-BR",
            {
              minimumIntegerDigits: 2,
            }
          )}/${Number(
            new Date(fortnight.finish).getUTCMonth() + 1
          ).toLocaleString("pt-BR", {
            minimumIntegerDigits: 2,
          })}/${new Date(fortnight.finish).getUTCFullYear()}`}
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
