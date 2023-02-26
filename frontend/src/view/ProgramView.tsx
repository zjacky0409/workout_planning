import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";

import { useAppSelector, useAppDispatch } from "../store/hook";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { selectRole, selectStudentList } from "../store/authSlice";
import { StudentObject, WeightObject } from "../common";

import { useState } from "react";
import { Divider, ListItemText } from "@mui/material";

const ProgramView = () => {
  const { t } = useTranslation();

  const role = useAppSelector(selectRole);
  const student_list = useAppSelector(selectStudentList);
  const [currentStudentID, setCurrentStudentID] = useState<number>(-999);

  return (
    <MainLayout content="Program">
            <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "90%",
            gap: 10,
          }}
        >
          {role.includes("coach") && (
            <div style={{ flexGrow: 0.1, backgroundColor: "white" }}>
              <List dense={false}>
                {student_list.map((data: StudentObject) => {
                  return (
                    <ListItem
                      component="div"
                      button={true}
                      divider={true}
                      onClick={() => setCurrentStudentID(data.id)}
                      // sx={{bgcolor:'red'}}
                    >
                      <div
                        style={{
                          width: "100%",
                          // backgroundColor:'red',
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 10,
                        }}
                      >
                        <ListItemText
                          primary={data.display_name}
                          // secondary={data.id}
                        />
                        <Divider
                          orientation="vertical"
                          // variant="middle"
                          flexItem
                          sx={{
                            background:
                              data.id === currentStudentID
                                ? "skyblue"
                                : "white",
                            borderRightWidth: 5,
                          }}
                        />
                      </div>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: 20,
              flexGrow: role.includes("coach") ? 0.9 : 1,
            }}
          >
            HIHIH
          </div>
        </div>
      </>
    </MainLayout>
  );
};
export default ProgramView;
