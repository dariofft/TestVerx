import { ReactNode } from "react";

export interface IPage {
  title: string;
  children: ReactNode | null;
  btn?: string;
  onClick?: () => void;
}
