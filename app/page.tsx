"use client";
import { useState } from "react";
import Hero from "../components/Hero";
import Info from "../components/Info";
import Rent from "../components/Rent";

export default function HomePage() {
  const [city, setCity] = useState("Itapetininga");

  return (
    <>
      <Hero />
      <Info />
      <Rent city={city} setCity={setCity} />
    </>
  );
}
