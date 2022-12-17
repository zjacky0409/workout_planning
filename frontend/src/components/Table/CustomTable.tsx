/*
    It is a table component.
    For data display
*/

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

const StyledTable = styled.table`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const StyledTH = styled.th`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  /* width: 60%; */
`;

const StyledTD = styled.td`
  font-family: arial, sans-serif;
  border-collapse: collapse;
`;

const StyledTR = styled.tr`
  :nth-child(even) {
    background-color: #ffffff;
  }
`;

interface Column {
  name: string;
  width: string;
}
interface TablePropsType {
  row: any;
  numberOfColumn: number;
  data: any[];
  column: Column[];
}

const CustomTable = ({ row, numberOfColumn, data, column }: TablePropsType) => {
  const { t } = useTranslation();

  return (
    <StyledTable style={{ width: "100%" }}>
      <StyledTR>
        {column.map((val: Column) => (
          <StyledTH style={{ width: val.width }}>{val.name}</StyledTH>
        ))}
      </StyledTR>
      {data.map((data) => {
        return row(data);
      })}
    </StyledTable>
  );
};

export default CustomTable;
