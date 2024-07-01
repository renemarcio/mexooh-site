"use client";
import FortnightCalendarButton from "@/components/FortnightCalendarButton";
import Hero from "@/components/Hero";
import Info from "@/components/Info";
import Panels from "@/components/Panels";
import Rent from "@/components/Rent";
import { Button, Center } from "@mantine/core";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Center my={"lg"}>
        <FortnightCalendarButton />
      </Center>
      <Info />
      <Rent />
      <Panels />
    </>
  );
}
