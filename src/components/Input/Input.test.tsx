import { render, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

//#region mocks
vi.mock("antd", () => ({
  Form: {
    Item: vi.fn(({ label, validateStatus, help, children }) => (
      <div data-testid="form-item">
        {label && <label>{label}</label>}
        {validateStatus && <span>{validateStatus}</span>}
        {help && <span>{help}</span>}
        {children}
      </div>
    )),
    useForm: vi.fn(() => [[], {}]),
  },
  Input: vi.fn((props) => <input {...props} data-testid="input" />),
}));
//#endregion

import { Input } from "./index";

describe("<Input />", () => {
  test("should render label, validation status, and help text", () => {
    const { getByText } = render(
      <Input
        label="Input Label"
        validateStatus="error"
        help="This is a help text."
        value=""
        onChange={() => {}}
        onBlur={() => {}}
        placeholder="Type here..."
      />
    );

    expect(getByText("Input Label")).toBeInTheDocument();
    expect(getByText("error")).toBeInTheDocument();
    expect(getByText("This is a help text.")).toBeInTheDocument();
  });

  test("should render the input element with the correct attributes", () => {
    const { getByTestId } = render(
      <Input
        name="input-test"
        label="Test Value"
        value="Test Value"
        onChange={() => {}}
        onBlur={() => {}}
        placeholder="Type here..."
      />
    );

    waitFor(() => {
      const inputElement = getByTestId("input");
      expect(inputElement).toHaveAttribute("type", "password");
      expect(inputElement).toHaveAttribute("placeholder", "Type here...");
      expect(inputElement).toHaveValue("Test Value");
    });
  });

  test("should call onChange when input value changes", () => {
    const handleChange = vi.fn();
    const { getByTestId } = render(
      <Input
        name="input-test"
        label="onchange"
        value=""
        onChange={handleChange}
        onBlur={() => {}}
        placeholder="Type here..."
      />
    );

    waitFor(() => {
      fireEvent.change(getByTestId("input"), {
        target: { value: "New Value" },
      });
      expect(handleChange).toHaveBeenCalledWith(expect.anything());
    });
  });

  test("should call onBlur when input loses focus", () => {
    const handleBlur = vi.fn();
    const { getByTestId } = render(
      <Input
        name="input-test"
        label="onblur"
        value=""
        onChange={() => {}}
        onBlur={handleBlur}
        placeholder="Type here..."
      />
    );

    waitFor(() => {
      fireEvent.blur(getByTestId("input"));
      expect(handleBlur).toHaveBeenCalled();
    });
  });
});
