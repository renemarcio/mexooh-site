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
  Title,
  Text,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import LoginForm from "../../components/_Forms/Login/LoginForm";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import BillboardTable from "../../components/_Tables/BillboardTable";
import CheckoutForm from "@/components/_Forms/CheckoutForm";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import PhoneForm from "@/components/_Forms/PhoneForm";
import ShoppingCartSubmissionConfirmation from "@/components/ShoppingCartSubmissionConfirmation";
import { CartContext } from "@/contexts/CartContext";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);
  const session = useSession();
  const [needPhones, setNeedPhones] = useState(false);
  const [isPhoneModalOpen, { open, close }] = useDisclosure(false);
  const cartContext = useContext(CartContext);
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
              <Stepper.Step label="Etapa 3" description="Envio de pedido" />
            </Stepper>
          </Card.Section>
          <Card.Section p={"xl"}>
            {currentStep === 0 && <LoginForm nextStepFn={handleNext} />}
            {currentStep === 1 && (
              <>
                <ShoppingCartSubmissionConfirmation />
                {/* <Group justify="flex-end" mt="md">
                  <Button
                    rightSection={<IconChevronRight size={15} />}
                    onClick={() => {
                      if (needPhones) {
                        open();
                      } else {
                        handleNext();
                      }
                    }}
                  >
                    Finalizar carrinho
                  </Button>
                </Group> */}
                <Button
                  disabled={cartContext.cart.length <= 0}
                  my={"lg"}
                  fullWidth
                  rightSection={<IconChevronRight size={15} />}
                  onClick={() => {
                    if (needPhones) {
                      open();
                    } else {
                      handleNext();
                    }
                  }}
                >
                  Finalizar carrinho
                </Button>
              </>
            )}
            {currentStep === 2 && (
              <>
                <CheckoutForm session={session.data} />
                {/* <Button
                  rightSection={<IconChevronLeft size={15} />}
                  onClick={handlePrevious}
                >
                  Voltar
                </Button> */}
              </>
            )}
          </Card.Section>
        </Card>
      </Center>
    </>
  );
}
