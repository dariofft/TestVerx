import { render, fireEvent } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

//#region mocks
vi.mock("@ant-design/icons", () => ({
  PieChartOutlined: vi.fn(() => (
    <span data-testid="icon-dashboard">Dashboard Icon</span>
  )),
  TableOutlined: vi.fn(() => (
    <span data-testid="icon-farmers">Farmers Icon</span>
  )),
  UserAddOutlined: vi.fn(() => (
    <span data-testid="icon-new-farmers">New Farmer Icon</span>
  )),
}));

vi.mock("antd", () => ({
  Menu: vi.fn(({ items, onClick }) => (
    <ul data-testid="menu">
      {items.map((item: { icon: ReactNode; key: string; label: string }) => (
        <li
          key={item.key}
          data-testid={`menu-item-${item.key}`}
          onClick={() => onClick({ key: item.key })}
        >
          {item.icon}
          {item.label}
        </li>
      ))}
    </ul>
  )),
}));

//#endregion

import { Menu } from "./index";
import { ReactNode } from "react";

describe("<Menu />", () => {
  test("should render the menu with correct items", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Menu />
      </MemoryRouter>
    );

    expect(getByTestId("menu-item-dashboard")).toHaveTextContent("Dashboard");
    expect(getByTestId("menu-item-farmers")).toHaveTextContent("Agricultores");
    expect(getByTestId("menu-item-new-farmers")).toHaveTextContent(
      "Novo Agricultor"
    );
    fireEvent.click(getByTestId("menu-item-farmers"));
  });
});
