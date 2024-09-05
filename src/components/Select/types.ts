import { ValidateStatus } from "antd/es/form/FormItem";
import { DefaultOptionType } from "antd/es/select";

export interface ISelect {
  label: string;
  validateStatus?: ValidateStatus;
  placeholder?: string;
  help?: React.ReactNode;
  value: object[] | string | number | null;
  onChange?: (
    value: object[] | string | number | null,
    option: DefaultOptionType
  ) => void;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  options: { value: string; label: string }[];
  multiple?: boolean;
}
