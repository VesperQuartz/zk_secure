import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "auth",
  description: "Login - Register to the Reddit marketplace!",
};
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default AuthLayout;
