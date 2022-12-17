import styled from "styled-components";
const StyledTD = styled.td`
  font-family: arial, sans-serif;
  border-collapse: collapse;
`;

interface CustomRowPropsType {
    children: JSX.Element;
}
const CustomTableData = ({children}: CustomRowPropsType) => {
    return <StyledTD>{children}</StyledTD>
}

export default CustomTableData