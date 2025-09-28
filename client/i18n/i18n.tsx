import { createContext, ReactNode, useContext } from "react";
import en from "./en.json";

type Dict = typeof en;

const I18nContext = createContext<Dict>(en);

export function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nContext.Provider value={en}>{children}</I18nContext.Provider>;
}

export function useT() {
  return useContext(I18nContext);
}
