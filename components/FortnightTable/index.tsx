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
        `/api/fortnights?years=${new Date().getFullYear()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Erro na API:", response.status, text);
        setFortnights([]); // fallback seguro
        return;
      }

      let data = null;
      try {
        data = await response.json();
      } catch (e) {
        console.error("Erro ao converter JSON:", e);
        setFortnights([]); // fallback seguro
        return;
      }

      if (data?.data) {
        setFortnights(data.data);
      } else {
        console.warn("API retornou estrutura inesperada:", data);
        setFortnights([]); // fallback seguro
      }

    } catch (error) {
      console.error("Erro inesperado:", error);
      setFortnights([]); // fallback seguro
    }
  }

  const rows = (fortnights || []).map((fortnight) => (
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
        {`${Number(new Date(fortnight.start).getUTCDate()).toLocaleString("pt-BR", {
          minimumIntegerDigits: 2,
        })}/${Number(new Date(fortnight.start).getUTCMonth() + 1).toLocaleString("pt-BR", {
          minimumIntegerDigits: 2,
        })}/${new Date(fortnight.start).getUTCFullYear()}`}
      </Table.Td>
      <Table.Td ta={"center"}>
        {`${Number(new Date(fortnight.finish).getUTCDate()).toLocaleString("pt-BR", {
          minimumIntegerDigits: 2,
        })}/${Number(new Date(fortnight.finish).getUTCMonth() + 1).toLocaleString("pt-BR", {
          minimumIntegerDigits: 2,
        })}/${new Date(fortnight.finish).getUTCFullYear()}`}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped withTableBorder withRowBorders={false} highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th ta={"center"}>BI</Table.Th>
          <Table.Th ta={"center"}>Início</Table.Th>
          <Table.Th ta={"center"}>Final</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
