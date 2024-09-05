import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;
  flex-direction: column;
`;

export const Image = styled.img`
  display: block;
  width: 800px;
  max-width: 100%;
  height: 100%;
`;

export const MessageWithLink = styled.span`
  font-family: "Poppins", sans-serif;

  margin-bottom: 10px;

  & > a {
    font-size: 1.5rem;
  }
`;
