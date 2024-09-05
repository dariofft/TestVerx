import { FC, useEffect } from "react";
import { Button } from "antd";

import { IPage } from "./types";
import { Container, Content, SectionTitle, Title } from "./styles";

export const Page: FC<IPage> = ({ title, btn, onClick, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Container>
      <SectionTitle>
        <Title>{title}</Title>
        {btn && <Button onClick={onClick}>{btn}</Button>}
      </SectionTitle>
      <Content>{children}</Content>
    </Container>
  );
};
