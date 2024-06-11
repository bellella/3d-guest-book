'use client';

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';

export interface ToastHandle {
  showToast: () => void;
}

interface ToastProps {
  title: string;
  description: string;
}

const Toast = React.forwardRef<ToastHandle, ToastProps>((props, ref) => {
  const [open, setOpen] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    showToast() {
      setOpen(true);
      setTimeout(() => setOpen(false), 3000);
    }
  }));

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className="fixed bottom-4 right-4 bg-white shadow-md rounded-md p-4 w-80"
      >
        <ToastPrimitive.Title className="font-semibold">{props.title}</ToastPrimitive.Title>
        <ToastPrimitive.Description className="mt-2 text-sm text-gray-700">{props.description}</ToastPrimitive.Description>
        <ToastPrimitive.Close className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">
          X
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
});

Toast.displayName = "Toast";

export default Toast;