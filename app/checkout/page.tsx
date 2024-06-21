"use client";
import {
  Anchor,
  Box,
  Button,
  Card,
  Center,
  Code,
  Group,
  LoadingOverlay,
  Space,
  Stepper,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import BillboardTable from "../../components/BillboardTable";
import CheckoutForm from "@/components/CheckoutForm";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import PhoneForm from "@/components/PhoneForm";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);
  const session = useSession();
  const [needPhones, setNeedPhones] = useState(false);
  const [isPhoneModalOpen, { open, close }] = useDisclosure(false);
  async function fetchPhones() {
    //@ts-ignore
    const phoneResponse = await fetch(`/api/phones/${session.data?.id}`);
    const phoneData = await phoneResponse.json();
    const phoneNumbers = phoneData.phones.map((phone: any) => phone.Numero);
    if (phoneNumbers.length === 0) {
      setNeedPhones(true);
    } else {
      setNeedPhones(false);
    }
  }

  function handleStepSwitch(step: number) {
    setCurrentStep(Math.min(Math.max(step, 0), 3));
  }

  function handleNext() {
    handleStepSwitch(currentStep + 1);
  }

  function handlePrevious() {
    handleStepSwitch(currentStep - 1);
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      fetchPhones();
      handleStepSwitch(1);
    } else {
      handleStepSwitch(0);
    }
  }, [session]);

  return (
    <>
      <PhoneForm
        isOpen={isPhoneModalOpen}
        onConclude={handleNext}
        closeFn={close}
      />
      <LoadingOverlay visible={session.status === "loading"} />
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
              <Stepper.Step label="Etapa 3" description="Método de Pagamento" />
            </Stepper>
          </Card.Section>
          <Card.Section p={"xl"}>
            {currentStep === 0 && <LoginForm nextStepFn={handleNext} />}
            {currentStep === 1 && (
              <>
                <BillboardTable />
                <Group justify="flex-end" mt="md">
                  <Button
                    rightSection={<IconChevronRight size={15} />}
                    // onClick={handleNext}
                    onClick={() => {
                      if (needPhones) {
                        open();
                      } else {
                        handleNext();
                      }
                    }}
                  >
                    Avançar
                  </Button>
                </Group>
              </>
            )}
            {currentStep === 2 && (
              <>
                <CheckoutForm session={session.data} />
                <Button
                  rightSection={<IconChevronLeft size={15} />}
                  onClick={handlePrevious}
                >
                  Voltar
                </Button>
              </>
            )}
          </Card.Section>
        </Card>
      </Center>
    </>
  );
}
