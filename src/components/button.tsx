import React from "react";
import styled from "styled-components";

interface StyledButtonProps {
  color?: string;
  padding?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ color }) => color && color};
  padding: ${({ padding }) => padding && padding};
`;

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  color?: string;
  padding?: string;
}

const Button = ({
  className,
  color,
  padding,
  onClick,
  children,
}: ButtonProps) => (
  <StyledButton
    className={className}
    color={color}
    padding={padding}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

export default Button;
