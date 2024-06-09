'use client'
import { defaultTheme } from "@/theme";
import { MiProvider } from "@milibrary/mi-style";
import React from "react";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <MiProvider theme={defaultTheme}>{children}</MiProvider>;
};

export default Providers;
