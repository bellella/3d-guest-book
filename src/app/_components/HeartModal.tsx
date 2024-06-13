"use client";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import submitMessage from "@/lib/actions/form.action";
import * as Dialog from "@radix-ui/react-dialog";
import Toast, { ToastHandle } from "./Toast";
import useMessageStore from "@/lib/stores/message.store";
import {
  Cross2Icon,
  EnvelopeClosedIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { ga } from "@/lib/gtag";

const HeartModal: React.FC = React.memo(() => {
  const { addMessage, currentRoom } = useMessageStore();
  // todo isPending doesn't work..?
  const [submitting, setSubmitting] = React.useState(false);

  const [formState, action, isPending] = useFormState(
    submitMessage.bind(null, currentRoom()?.id!),
    {}
  );
  const toastRef = React.useRef<ToastHandle>(null);
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
    }, 300);
  };

  React.useEffect(() => {
    if (formState?.success === undefined) {
      return;
    }
    if (formState.success) {
      ga({
        action: "메세지 남기기",
        category: "메세지",
      });
      handleClose();
      addMessage(formState.submission);
      toastRef.current?.showToast();
      formRef.current?.reset();
    }
  }, [formState, addMessage]);
  return (
    <>
      <Toast
        ref={toastRef}
        title="Thank you!"
        description="You made my day 🩷"
      />
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
            <Dialog.Overlay className="fixed inset-0" />
            <Dialog.Content
              className={`z-20 w-[90vw] max-w-[300px] fixed-center bg-purple-200 border-purple-300 border border-dashed border-2 p-6 rounded-lg shadow-lg transition-all ease-out ${
                isClosing ? "animate-slide-down" : "animate-slide-up"
              } focus:outline-none`}
            >
              <Dialog.Title className="text-xl font-bold text-purple-800 mb-3">
                Leave a message!
              </Dialog.Title>
              <form action={action} onSubmit={() => setSubmitting(true)}>
                <div>
                  <label htmlFor="name" className="label-base">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="mt-1 input-base"
                    disabled={submitting}
                    maxLength={12}
                    required
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="name" className="label-base">
                    Message
                  </label>
                  <label htmlFor=""></label>
                  <textarea
                    maxLength={150}
                    name="message"
                    className="input-base resize-none"
                    disabled={submitting}
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-purple-500 text-purple-100 rounded"
                  >
                    {submitting ? (
                      <PaperPlaneIcon className="animate-spin h-5 w-5 text-white" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1"
                >
                  <Cross2Icon color="purple"></Cross2Icon>
                </button>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    </>
  );
});

HeartModal.displayName = "HeartModal";

export default HeartModal;
