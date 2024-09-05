import { Image, Container, MessageWithLink } from "./styles";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container>
      <Image src={""} alt="" />
      teste
      <MessageWithLink>
        <Link to="/">Voltar para a home</Link>
      </MessageWithLink>
    </Container>
  );
};
