import { Form, Select as SelectAntd } from "antd";

import { ISelect } from "./types";

export const Select: React.FC<ISelect> = ({
  label,
  validateStatus,
  help,
  value,
  placeholder,
  onChange,
  onBlur,
  options,
  multiple = false,
}) => {
  return (
    <Form.Item label={label} validateStatus={validateStatus} help={help}>
      <SelectAntd
        mode={multiple ? "multiple" : undefined}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        options={options}
      />
    </Form.Item>
  );
};
