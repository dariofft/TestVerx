import { render, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

//#region mocks
vi.mock("antd", () => {
  const SelectMock = vi.fn(
    ({ mode, placeholder, value, onChange, onBlur, options }) => (
      <select
        multiple={mode === "multiple"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        data-testid="select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  );

  return {
    Form: {
      Item: vi.fn(({ label, validateStatus, help, children }) => (
        <div data-testid="form-item">
          {label && <label>{label}</label>}
          {validateStatus && <span>{validateStatus}</span>}
          {help && <span>{help}</span>}
          {children}
        </div>
      )),
    },
    Select: SelectMock,
  };
});
//#endregion

import { Select } from "./index";

describe("<Select />", () => {
  test("should render label, validation status, and help text", () => {
    const { getByText } = render(
      <Select
        label="Select Label"
        validateStatus="error"
        help="This is a help text."
        value=""
        onChange={() => {}}
        onBlur={() => {}}
        options={[]}
      />
    );

    expect(getByText("Select Label")).toBeInTheDocument();
    expect(getByText("error")).toBeInTheDocument();
    expect(getByText("This is a help text.")).toBeInTheDocument();
  });

  test("should render options correctly", () => {
    const { getByText } = render(
      <Select
        label="Select Label"
        value=""
        onChange={() => {}}
        onBlur={() => {}}
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
      />
    );

    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
  });

  test("should call onChange when an option is selected", async () => {
    const handleChange = vi.fn();
    const { getByTestId } = render(
      <Select
        label="Select Label"
        value=""
        onChange={handleChange}
        onBlur={() => {}}
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
      />
    );

    waitFor(() => {
      fireEvent.change(getByTestId("select"), { target: { value: "1" } });
      expect(handleChange).toHaveBeenCalledWith("1");
    });
  });

  test("should call onBlur when the select loses focus", async () => {
    const handleBlur = vi.fn();
    const { getByTestId } = render(
      <Select
        label="Select Label"
        value=""
        onChange={() => {}}
        onBlur={handleBlur}
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
      />
    );

    waitFor(() => {
      fireEvent.blur(getByTestId("select"));
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  test("should render in multiple mode correctly", () => {
    const { getByTestId } = render(
      <Select
        label="Select Label"
        multiple
        value={["1"]}
        onChange={() => {}}
        onBlur={() => {}}
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
      />
    );
    waitFor(() => {
      expect(getByTestId("select")).toHaveAttribute("multiple");
    });
  });
});
