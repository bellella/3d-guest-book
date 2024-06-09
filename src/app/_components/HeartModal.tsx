'use client'
import React, { useEffect } from "react";
import { MiModalRefInterface, MiModal } from "@milibrary/react-interaction";
import { Div, Font, Button, Input, Flex } from "@milibrary/mi-style";
import { Toast } from "@milibrary/core";
import { useFormState } from "react-dom";
import submitMessage from "@/lib/actions/form.action";
import { Textarea } from "./mis/Textarea";

interface HeartModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const HeartModal: React.FC<HeartModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [formState, action] = useFormState(submitMessage, {});
  const modalRef = React.useRef<MiModalRefInterface>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  React.useEffect(() => {
    if(formState?.success === undefined) {
        return;
    }
    if (formState.success) {
        console.log(formState,'???')
      modalRef.current?.dismiss();
      formRef.current?.reset();
    } 
    Toast.create({ message: formState.message }).present();
  }, [formState]);
  return (
    <>
      <Button onClick={() => modalRef.current?.present()}>열어</Button>
      <MiModal ref={modalRef} useDefaultStyle={false}>
        <Div
          className="modall"
          set="level-1"
          padding={[5]}
          background="hotpink"
          color="onSurface"
        >
          <form action={action} ref={formRef}>
            <Flex
              flexFlow="column"
              alignItems="center"
              justifyContent="center"
              transform="scale(0.7)"
            >
              <Font set="h3" color="accent" fontWeight={800}>
                Contact Me!
              </Font>
              <Font padding={[4, 0, 1]}>Name</Font>
              <Input set="full" name="name" autoComplete="off" required />
              <Font padding={[4, 0, 1]}>Message</Font>
              <Textarea name="message" required />
              <Button set="accent" mt={10} width="50%">
                💕
              </Button>
            </Flex>
          </form>
        </Div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={0}
          height={0}
          viewBox="0 0 512 512"
        >
          <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
            <path d="M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z"></path>
          </clipPath>
        </svg>
      </MiModal>
    </>
  );
};

export default HeartModal;
