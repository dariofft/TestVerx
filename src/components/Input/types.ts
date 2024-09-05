import { ValidateStatus } from "antd/es/form/FormItem";
import { ChangeEventHandler } from "react";

export interface IInput {
  label: string;
  name: string;
  validateStatus?: ValidateStatus;
  help?: React.ReactNode;
  value: string | number;
  onChange?: ChangeEventHandler;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  type?: "text" | "number";
  placeholder?: string;
}
