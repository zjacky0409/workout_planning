import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { getStudentList, selectStudentList } from "../store/authSlice";
import { StudentObject } from "../common";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CustomButton from "../components/Button/CustomButton";
import ModifyStudent from "./StudentMan/ModifyStudent";
import ClearIcon from "@mui/icons-material/Clear";
import CustomTable from "../components/Table/CustomTable";
import { Column } from "../common";
import CustomTableData from "../components/Table/CustomData";
import CustomRow from "../components/Table/CustomRow";
// const StyledTable = styled.table`
//   border: 1px solid #dddddd;
//   text-align: left;
//   padding: 8px;
// `;

// const StyledTH = styled.th`
//   font-family: arial, sans-serif;
//   border-collapse: collapse;
//   /* width: 60%; */
// `;

// const StyledTD = styled.td`
//   font-family: arial, sans-serif;
//   border-collapse: collapse;
// `;

// const StyledTR = styled.tr`
//   :nth-child(even) {
//     background-color: #ffffff;
//   }
// `;

const StudentManView = () => {
  const { t } = useTranslation();

  const student_list = useAppSelector(selectStudentList);

  const [open, setOpen] = useState(false); // control the edit component display or not

  const [data, setData] = useState<StudentObject>({
    id: -999,
    display_name: "string",
    isVerified: false,
  });

  const [version, setVersion] = useState(0);

  // close the edit component ansd renew it
  const closeFunction = () => {
    setData({
      id: -999,
      display_name: "string",
      isVerified: false,
    });
    setVersion(version + 1);
    setOpen(false);
  };

  // define the column
  const column: Column[] = [
    {
      name: "ID",
      width: "20%",
    },
    {
      name: "Display Name",
      width: "50%",
    },
    {
      name: "Status",
      width: "20%",
    },
    {
      name: "Action",
      width: "10%",
    },
  ];

  // define thw row data for the table
  const row = (data: any) => {
    return (
      <CustomRow>
        <>
          <CustomTableData>{data.id}</CustomTableData>
          <CustomTableData>{data.display_name}</CustomTableData>
          <CustomTableData>
            {data.isVerified ? <CheckCircleOutlineIcon /> : <ClearIcon />}
          </CustomTableData>
          <CustomTableData>
            <CustomButton
              onClick={() => {
                setOpen(true);
                setData(data);
              }}
              shownText={"Modify"}
              variant={"primary"}
            />
          </CustomTableData>
        </>
      </CustomRow>
    );
  };

  return (
    <MainLayout content="Coach Area">
      <div>
        {/* <StyledTable style={{ width: "100%" }}>
          <StyledTR>
            <StyledTH style={{ width: "20%" }}>{"ID"}</StyledTH>
            <StyledTH style={{ width: "50%" }}>{"Display Name"}</StyledTH>
            <StyledTH style={{ width: "20%" }}>{"Status"}</StyledTH>
            <StyledTH style={{ width: "10%" }}>{"Action"}</StyledTH>
          </StyledTR>
          {student_list &&
            student_list.map((student: StudentObject) => {
              return (
                <StyledTR>
                  <StyledTD>{student.id}</StyledTD>
                  <StyledTD>{student.display_name}</StyledTD>
                  <StyledTD>
                    {student.isVerified ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <ClearIcon />
                    )}
                  </StyledTD>
                  <StyledTD>
                    <CustomButton
                      onClick={() => {
                        setOpen(true);
                        setData(student);
                      }}
                      shownText={"Modify"}
                      variant={"primary"}
                    />
                  </StyledTD>
                </StyledTR>
              );
            })}
        </StyledTable> */}


        <CustomTable
          row={row}
          numberOfColumn={4}
          data={student_list}
          column={column}
        />
        <ModifyStudent
          key={version}
          open={open}
          setOpen={setOpen}
          id={data.id}
          display_name={data.display_name}
          isVerified={data.isVerified}
          closeFunction={closeFunction}
        />
      </div>
    </MainLayout>
  );
};
export default StudentManView;
