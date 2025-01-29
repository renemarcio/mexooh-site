"use client";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import LEDPanel from "@/components/LEDPanel";
import MUP from "@/components/MUP";
import Panels from "@/components/Panels";
import Rent from "@/components/Rent";
import InventoryDisplay from "@/components/InventoryDisplay";
import PasswordResetEmail from "@/emails/PasswordReset";

export default function HomePage() {
  return (
    <>
      {/* <PasswordResetEmail uuid="test" /> */}
      <Hero />
      <Info />
      <Panels />
      <MUP />
      <Rent />
      <LEDPanel />
    </>
  );
}
