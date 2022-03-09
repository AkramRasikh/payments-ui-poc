import React from "react";
import styled from "styled-components";

interface ListItemTypes {
  flex?: boolean;
  cta?: React.ReactNode;
  children: React.ReactNode;
}

interface ListTypes {
  children: React.ReactNode;
}

const StyledListItem = styled.li<ListItemTypes>`
  ${({ flex }) =>
    flex &&
    `
  display: flex;
  :not(:last-child) {
    border-bottom: 1px solid #EEEEEE;
  }
`}
`;

const ULStyled = styled.ul`
  margin: 10px;
  background: #ffffff;
  border-radius: 10px;
  padding: 5px;
`;

export const ListItem = ({ flex, cta, children }: ListItemTypes) => (
  <StyledListItem flex={flex}>
    {children}
    {cta}
  </StyledListItem>
);

const List = ({ children }: ListTypes) => <ULStyled>{children}</ULStyled>;

export default List;
