import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import {
  TableOutlined,
  UserAddOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

import { IMenuItem } from "./types";
import { Container, MenuStyled } from "./styles";

const menuItens: IMenuItem[] = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <PieChartOutlined />,
    to: "/",
  },
  {
    label: "Agricultores",
    key: "farmers",
    icon: <TableOutlined />,
    to: "/farmers",
  },
  {
    label: "Novo Agricultor",
    key: "new-farmers",
    icon: <UserAddOutlined />,
    to: "/farmers/new",
  },
];

export const Menu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState("dashboard");

  useEffect(() => {
    if (location.pathname) {
      const menuItem = menuItens.filter((i) => i.to == location.pathname)[0];
      setCurrent(menuItem?.key?.toString() ?? "");
    }
  }, [location]);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);

    const url = menuItens.filter((i) => i.key === e.key)[0]?.to ?? "";
    navigate(url);
  };

  return (
    <Container>
      <MenuStyled
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menuItens}
      />
    </Container>
  );
};
