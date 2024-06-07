"use server";

import { signIn } from "@/auth";

export async function login(values: any, nextStepFn?: () => void) {
  "use server";
  await signIn("credentials", values);
  //   if (nextStepFn) {
  //     nextStepFn();
  //   }
}
