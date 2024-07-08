"use client";

import { store } from "./store";
import { Provider } from "react-redux";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Provider store={store}>{children}</Provider>;
};

export { Providers };
