import { render, waitFor } from "@testing-library/react";
import { vi, expect, describe, test } from "vitest";
import "@testing-library/jest-dom/vitest";

//#region mocks
vi.mock("antd", () => ({
  Skeleton: {
    Input: vi.fn(() => <div data-testid="skeleton">Loading...</div>),
  },
  Statistic: vi.fn(({ value, prefix }) => (
    <div data-testid="statistic">
      {prefix && <span data-testid="icon">{prefix}</span>}
      <span>{value}</span>
    </div>
  )),
  Typography: {
    Title: vi.fn(({ level, children }) => (
      <h1 data-testid="title" aria-level={level}>
        {children}
      </h1>
    )),
  },
  Card: vi.fn(({ children }) => <div data-testid="card">{children}</div>),
}));
//#endregion

import { CardStatistic } from "./index";

describe("<CardStatistic />", () => {
  test("should render the title", () => {
    const { getByTestId } = render(
      <CardStatistic
        title="Test Title"
        statistic={"100"}
        icon={<span>Icon</span>}
        loading={false}
      />
    );

    expect(getByTestId("title")).toHaveTextContent("Test Title");
  });

  test("should show skeleton loader when loading is true", () => {
    const { getByTestId } = render(
      <CardStatistic
        title="Test Title"
        statistic={"100"}
        icon={<span>Icon</span>}
        loading={true}
      />
    );

    expect(getByTestId("skeleton")).toBeInTheDocument();
    expect(getByTestId("skeleton")).toHaveTextContent("Loading...");
  });

  test("should render Statistic when loading is false", () => {
    const { queryByTestId, getByTestId } = render(
      <CardStatistic
        title="Test Title"
        statistic={"100"}
        icon={<span>Icon</span>}
        loading={false}
      />
    );

    waitFor(() => {
      expect(queryByTestId("skeleton")).not.toBeInTheDocument();
      expect(getByTestId("statistic")).toBeInTheDocument();
      expect(getByTestId("statistic")).toHaveTextContent("100");
      expect(getByTestId("icon")).toHaveTextContent("Icon");
    });
  });
});
