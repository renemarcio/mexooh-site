"use client";

import PasswordResetConfirmationForm from "@/components/_Forms/PasswordResetConfirmationForm";
import { Code } from "@mantine/core";
import { useParams } from "next/navigation";
export default function PasswordReset() {
  const uuid = useParams().uuid as string;
  return <PasswordResetConfirmationForm UUID={uuid} />;
}
