import { PropsWithChildren } from "react";
import { vi, expect, test, describe } from "vitest";
import { PieConfig } from "@ant-design/plots";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

//#region mocks
vi.mock("@ant-design/plots", () => ({
  Pie: vi.fn((data: PieConfig) => (
    <div>
      pie <div data-testid="pie-data">{JSON.stringify(data["data"])}</div>
    </div>
  )),
}));

vi.mock("antd", () => ({
  Skeleton: {
    Input: vi.fn(() => <div data-testid="skeleton">Loading...</div>),
  },
  Flex: vi.fn(({ children }: PropsWithChildren) => (
    <div data-testid="flex">{children}</div>
  )),
  Card: vi.fn(({ children }: PropsWithChildren) => (
    <div data-testid="card">{children}</div>
  )),
  Typography: {
    Title: vi.fn(({ children }: PropsWithChildren) => (
      <span data-testid="typography">{children}</span>
    )),
  },
}));

//#endregion

import { CardDash } from "./index";

describe("<CardDash />", () => {
  test("should render the title", () => {
    const { getByText } = render(
      <CardDash
        loading={false}
        title="Test Title"
        data={[{ "Type A": 30 }, { "Type B": 70 }]}
      />
    );

    expect(getByText("Test Title")).toBeInTheDocument();
  });

  test("should show skeleton loader when loading is true", () => {
    const { queryAllByTestId } = render(
      <CardDash loading title="Test Title" data={[]} />
    );

    expect(queryAllByTestId("skeleton")).toHaveLength(3);
  });

  test("should render Pie chart when loading is false", () => {
    const { rerender, queryAllByTestId, getByTestId } = render(
      <CardDash loading title="Test Title" data={[]} />
    );

    waitFor(() => {
      expect(queryAllByTestId("skeleton")).toHaveLength(3);
    });

    rerender(<CardDash loading={false} title="Test Title" data={[]} />);

    waitFor(() => {
      expect(queryAllByTestId("skeleton")).toHaveLength(3);
      expect(getByTestId("pie-data")).toBeInTheDocument();
    });
  });

  test("should render data Pie chart", () => {
    const { getByTestId } = render(
      <CardDash
        loading={false}
        title="Test Title"
        data={[{ "Type A": 30 }, { "Type B": 70 }]}
      />
    );

    waitFor(() => {
      expect(getByTestId("pie-data")).toBeInTheDocument();
      expect(getByTestId("pie-data")).toHaveTextContent(
        '[{"type":"Type A","value":30},{"type":"Type B","value":70}]'
      );
    });
  });
});
