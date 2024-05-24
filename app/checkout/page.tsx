"use client";
import { Anchor, Box, Card, Center, Space, Stepper } from "@mantine/core";
import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import { IconChevronLeft } from "@tabler/icons-react";
import BillboardTable from "../../components/BillboardTable";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);

  function handleStepSwitch(step: number) {
    setCurrentStep(Math.min(Math.max(step, 0), 3));
  }

  function handleNext() {
    handleStepSwitch(currentStep + 1);
  }

  return (
    <>
      <Space h={"100px"} />
      <Center>
        <Card w={"auto"} withBorder m={"xl"}>
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
            {currentStep > 0 && (
              <Anchor
                // pos={"absolute"}
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  handleStepSwitch(currentStep - 1);
                }}
                style={{ zIndex: 10 }}
              >
                <IconChevronLeft size={15} />
                Anterior
              </Anchor>
            )}
            {currentStep === 0 && <LoginForm nextStepFn={handleNext} />}
            {currentStep === 1 && <BillboardTable />}
            {currentStep === 2 && <LoginForm nextStepFn={handleNext} />}
          </Card.Section>
        </Card>
      </Center>
    </>
  );
}
