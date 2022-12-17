import styled from "styled-components";
const StyledTR = styled.tr`
  :nth-child(even) {
    background-color: #ffffff;
  }
`;

interface CustomRowPropsType {
  children: JSX.Element;
}

const CustomRow = ({ children }: CustomRowPropsType) => {
  return <StyledTR>{children}</StyledTR>;
};

export default CustomRow
