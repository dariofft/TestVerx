import { ReactNode } from "react";

export interface ICardStatistic {
  title: string;
  icon: ReactNode;
  statistic: string;
  loading: boolean;
}
