"use client";
import { Button, Card, Center, Space, Stepper } from "@mantine/core";
import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterPFForm from "../../components/RegisterPFForm";
import RegisterPJForm from "../../components/RegisterPJForm";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);

  function handleStepSwitch(step: number) {
    setCurrentStep(Math.min(Math.max(step, 0), 3));
  }

  return (
    <>
      <Space h={"100px"} />
      <Center>
        <Card w={"900px"} withBorder>
          <Card.Section p={"xl"} withBorder>
            <Stepper active={currentStep}>
              <Stepper.Step label="Etapa 1" description="Entre na sua conta" />
              <Stepper.Step
                label="Etapa 2"
                description="Selecione os pontos de interesse"
              />
              <Stepper.Step label="Etapa 3" description="Pagamento" />
            </Stepper>
          </Card.Section>
          <Card.Section p={"xl"}>
            <LoginForm />
            <RegisterPFForm />
            <RegisterPJForm />
          </Card.Section>
        </Card>
      </Center>
    </>
  );
}
