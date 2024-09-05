import { MenuItemType } from "antd/es/menu/interface";

export interface IMenuItem extends MenuItemType {
  to: string;
}
