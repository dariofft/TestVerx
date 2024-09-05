import styled from "styled-components";
import { Menu as MenuAntd } from "antd";

export const Container = styled.header`
  background: #ffffff;
  height: 60px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
`;

export const MenuStyled = styled(MenuAntd)`
  justify-content: flex-end;
  border: none;
  max-width: 1600px !important;
  width: 100%;
  margin: 0 auto;
`;
