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

const StudentManView = () => {
  const { t } = useTranslation();

  const student_list = useAppSelector(selectStudentList);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<StudentObject>({
    id: -999,
    display_name: "string",
    isVerified: false,
  });
  const [version, setVersion ] = useState(0)
  const closeFunction = () => {
    setData({
      id: -999,
      display_name: "string",
      isVerified: false,
    })
    setVersion(version + 1)
    setOpen(false)
  }

  return (
    <MainLayout content="Coach Area">
      <div>
        <StyledTable style={{ width: "100%" }}>
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
        </StyledTable>
        <ModifyStudent
          key={version}
          open={open}
          setOpen={setOpen}
          id={data.id}
          display_name={data.display_name}
          isVerified={data.isVerified} 
          closeFunction={closeFunction}        />
      </div>
    </MainLayout>
  );
};
export default StudentManView;
