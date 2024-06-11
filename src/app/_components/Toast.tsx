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
      //setTimeout(() => setOpen(false), 1500);
    }
  }));

  return (
    <ToastPrimitive.Provider swipeDirection="down" duration={3000}>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        className="p-4 w-80 bg-purple-100 border-purple-300 border-dashed border-2 rounded-lg"
      >
        <ToastPrimitive.Title className="font-semibold">{props.title}</ToastPrimitive.Title>
        <ToastPrimitive.Description className="mt-2 text-sm text-gray-700">{props.description}</ToastPrimitive.Description>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed-center-bottom bottom-5"/>
    </ToastPrimitive.Provider>
  );
});

Toast.displayName = "Toast";

export default Toast;