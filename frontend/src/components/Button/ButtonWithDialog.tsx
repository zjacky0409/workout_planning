import React, { useState } from "react";
import styled from "styled-components";
import variantToColor from "../../common/styleFunction";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../Dialog/ConfirmDialog";
interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shownText: string; // The text in the button
  handler: () => void; // the action after clicking the button
  disabled: boolean,
  header: string,
  content: string,
  variant: "primary" | "danger" | "info" | "warning" | "cancel"; // i define different variant for the button
}
// React.ButtonHTMLAttributes<HTMLButtonElement> means that we also accept other props that from the button html

interface StyledButtonProps {
  variant: string;
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

export default function ButtonWithDialog({
  shownText,
  handler,
  variant,
  disabled,
  header,
  content,
  ...props
}: ButtonProp) {
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  console.log(open)
  
  return (
    <>
      <StyledButton variant={variant} onClick={() => setOpen(true)} {...props}>
        {t(shownText as unknown as TemplateStringsArray)}
      </StyledButton>
      <ConfirmDialog
        hanlder={handler}
        header={header}
        content={content}
        open={open}
        handleClose={() => setOpen(false)}
        disabled={disabled}
      />
    </>
  );
}
