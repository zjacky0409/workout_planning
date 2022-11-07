import React from "react";
import styled from "styled-components";

interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shownText: string;
  handler: () => void;
  variant: string;
}

interface StyledButtonProps {
  variant: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) =>
    props.variant === "normal" ? "#ea4c89 " : "red"}; // should do switch here
  border-radius: 4px;
  border-style: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 35px;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  &:hover {
    background-color: #f082ac;
  }
  &:disabled {
    background-color: #d5d5d5;
  }
`;

export default function CustomButton({
  shownText,
  handler,
  variant,
  ...props
}: ButtonProp) {
  return (
    <StyledButton onClick={handler} variant={variant} {...props}>
      {shownText}
    </StyledButton>
  );
}
