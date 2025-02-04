"use client";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import LEDPanel from "@/components/LEDPanel";
import MUPI from "@/components/MUPI";
import Panels from "@/components/Panels";
import Rent from "@/components/Rent";

export default function HomePage() {
  return (
    <>
      {/* <PasswordResetEmail uuid="test" /> */}
      <Hero />
      <Info />
      <Panels />
      <MUPI />
      <Rent />
      <LEDPanel />
    </>
  );
}
