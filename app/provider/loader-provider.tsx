"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const NProgressProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#f97316"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NProgressProviders;
