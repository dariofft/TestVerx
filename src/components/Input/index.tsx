import { Form, Input as InputAntd } from "antd";

import { IInput } from "./types";

export const Input: React.FC<IInput> = ({
  label,
  validateStatus,
  help,
  value,
  onChange,
  onBlur,
  placeholder,
  name,
  type = "text",
}) => {
  return (
    <Form.Item label={label} validateStatus={validateStatus} help={help}>
      <InputAntd
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Form.Item>
  );
};
