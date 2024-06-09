'use client'
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';
import submitForm from '@/lib/actions/form.action';
import { useFormState } from 'react-dom';

const ModalForm = forwardRef((props, ref) => {
    const [state, formAction] = useFormState(submitForm, {
        message: ''
    })
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  }));

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="hidden">Trigger</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow p-6 max-w-sm w-full relative">
            <Dialog.Title className="text-lg font-medium">Submit Form</Dialog.Title>
            <form onSubmit={formAction}>
              <div className="mt-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded flex items-center justify-center"
                >
                  Submit
                </button>
              </div>
            </form>
            <Dialog.Close asChild>
              <button className="absolute top-2 right-2">
                <HeartIcon className="h-6 w-6 text-gray-600" />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default ModalForm;