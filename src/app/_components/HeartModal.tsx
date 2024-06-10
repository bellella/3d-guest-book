"use client";
import React, { useEffect } from "react";
import { MiModalRefInterface, MiModal } from "@milibrary/react-interaction";
import { Div, Font, Button, Input, Flex } from "@milibrary/mi-style";
import { Toast } from "@milibrary/core";
import { useFormState } from "react-dom";
import submitMessage from "@/lib/actions/form.action";
import { Textarea } from "./mis/Textarea";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

const HeartModal: React.FC = () => {
  const [formState, action] = useFormState(submitMessage, {});
  const modalRef = React.useRef<MiModalRefInterface>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  const [isOpen, setIsOpen] = React.useState(false); // Track the open/close state
  const [isClosing, setIsClosing] = React.useState(false); // Track the closing state

  const handleOpen = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Duration should match the animation duration
  };

  React.useEffect(() => {
    if (formState?.success === undefined) {
      return;
    }
    if (formState.success) {
      console.log(formState, "???");
      modalRef.current?.dismiss();
      formRef.current?.reset();
    }
    Toast.create({ message: formState.message }).present();
  }, [formState]);
  return (
    <>
      <Dialog.Root open={isOpen}>
        <Dialog.Trigger asChild>
          <button
            onClick={handleOpen}
            className="fixed bottom-5 left-4 p-4 bg-purple-500 text-white rounded rounded-full"
          >
            <EnvelopeClosedIcon></EnvelopeClosedIcon>
          </button>
        </Dialog.Trigger>
        {isOpen && (
          <Dialog.Portal>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width={0}
              height={0}
              viewBox="0 0 512 512"
            >
              <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
                <path d="M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z"></path>
              </clipPath>
            </svg> */}
            <Dialog.Content
              className={`bg-purple-200 border-purple-300 border border-dashed border-2 fixed left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 p-6 rounded-lg shadow-lg transition-all ease-out ${
                isClosing ? "animate-slide-down" : "animate-slide-up"
              } focus:outline-none`}
            >
              <form action={action}>
                <Dialog.Title className="text-xl font-bold text-purple-800">
                  Leave a message!
                </Dialog.Title>
                <Dialog.Description className="mt-5">
                  <div>
                    <label htmlFor="name" className="label-base">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="mt-1 input-base"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="name" className="label-base">
                      Message
                    </label>
                    <label htmlFor=""></label>
                    <textarea name="message" className="input-base" />
                  </div>
                </Dialog.Description>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-purple-500 text-purple-100 rounded"
                  >
                    Send
                  </button>
                </div>
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 p-1"
                >
                  <Cross2Icon color="purple"></Cross2Icon>
                </button>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>
      {/* <MiModal ref={modalRef} >
        <Div
          className="modall"
          set="level-1"
          padding={[5]}
          background="hotpink"
          color="onSurface"
        >
       
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
      </MiModal> */}
    </>
  );
};

export default HeartModal;
