import { render, waitFor, fireEvent } from "@testing-library/react";
import { vi, expect, describe, test } from "vitest";
import "@testing-library/jest-dom/vitest";

//#region mocks
vi.mock("antd", () => ({
  Button: vi.fn(({ children, onClick }) => (
    <button data-testid="button" onClick={onClick}>
      {children}
    </button>
  )),
}));
//#endregion

import { Page } from "./index";

describe("<Page />", () => {
  test("should set the document title", () => {
    render(<Page title="Test Page">Content</Page>);
    expect(document.title).toBe("Test Page");
  });

  test("should render the title", () => {
    const { getByText } = render(<Page title="Test Page">Content</Page>);

    waitFor(() => {
      expect(getByText("Test Page")).toBeInTheDocument();
    });
  });

  test("should render the button if btn prop is provided", () => {
    const mockClick = vi.fn();
    const { getByTestId } = render(
      <Page title="Test Page" btn="Click Me" onClick={mockClick}>
        Content
      </Page>
    );

    expect(getByTestId("button")).toBeInTheDocument();

    const btn = getByTestId("button");

    fireEvent.click(btn);

    expect(btn).toHaveTextContent("Click Me");
    expect(mockClick).toBeCalledTimes(1);
  });

  test("should not render the button if btn prop is not provided", () => {
    const { queryByTestId } = render(<Page title="Test Page">Content</Page>);

    waitFor(() => {
      expect(queryByTestId("button")).not.toBeInTheDocument();
    });
  });

  test("should render children content", () => {
    const { getByText } = render(
      <Page title="Test Page">
        <div>Child Content</div>
      </Page>
    );

    expect(getByText("Child Content")).toBeInTheDocument();
  });
});
