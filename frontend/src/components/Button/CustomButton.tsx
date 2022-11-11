import React from "react";
import styled from "styled-components";

interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shownText: string; // The text in the button
  handler: () => void; // the action after clicking the button
  variant: 'primary' | 'danger' | 'info' | 'warning' | 'cancel'; // i define different variant for the button
}
// React.ButtonHTMLAttributes<HTMLButtonElement> means that we also accept other props that from the button html 

interface StyledButtonProps {
  variant: string;
}


const variantToColor = (variant: string): string => {

  let buttonColor = '#ea4c89'
  switch (variant) {
    case 'primary':
      buttonColor = '#ea4c89'
      break;
    case 'danger':
      buttonColor = "#d9534f";
      break;
    case 'info':
      buttonColor = "#5bc0de"
      break;
    case "warning":
      buttonColor = "#f0ad4e"
      break;
    case "cancel":
      buttonColor = '#c2c2c2';
      break;
    default:
      buttonColor = "#ea4c89";
  }

  return buttonColor
}

// I try to use styled-component to perform css 
// noted that if we want to use styled-component in ts, we need to npm install another package called @types/styled-components
const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) =>
    variantToColor(props.variant)}; // should do switch here
  border-radius: 4px;
  border-style: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
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
