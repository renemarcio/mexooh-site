import AdminDashboard from "@/components/AdminDashboard";
import { Center, Paper, Title } from "@mantine/core";
import React from "react";

export default function admin() {
  return (
    <Center>
      <Paper p={"md"}>
        <AdminDashboard />
      </Paper>
    </Center>
  );
}
