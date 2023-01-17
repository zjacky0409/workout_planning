/*
 TODO:
 ready to make a popup for click the event then show the photo
 */
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { LogoBase64 } from "../common/logo";
import ModifyWeightProcess from "./WeightProcess/ModifyWeightProcess";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  InteractionItem,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";

import {
  getDatasetAtEvent,
  Line,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { StudentObject, WeightObject } from "../common";
import { selectRole, selectStudentList } from "../store/authSlice";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressView = () => {
  const { t } = useTranslation();

  const [dateOption, setOption] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [comment, setComment] = useState<string[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const role = useAppSelector(selectRole);
  const student_list = useAppSelector(selectStudentList);
  const [currentStudentID, setCurrentStudentID] = useState<number>(-999);

  // need to pass to ModifyFood Component
  const [modify, setModify] = useState<{
    viewOnly: boolean;
    modify: boolean;
    data: WeightObject;
  }>({
    modify: false,
    viewOnly: false,
    data: {
      id: -999,
      weight: -999,
      date: "",
      comment: "",
    },
  });

  const [version, setVersion] = useState<number>(0);

  const handleReset = () => {
    setVersion(version + 1);
  };

  // https://www.chartjs.org/docs/latest/configuration/tooltip.html
  const footer = (tooltipItems: any) => {
    return "Comments: " + comment[tooltipItems[0].dataIndex];
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    // https://stackoverflow.com/questions/41953158/set-height-of-chart-in-chart-js
    maintainAspectRatio: false, // this parameter let me set the width and height for the chart
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "Weight",
      },
      tooltip: {
        // boxWidth: 40,
        // boxHeight: 50,
        callbacks: {
          footer: footer,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 120,
      },
    },
  };

  const chartRef = useRef();

  useEffect(() => {
    let isApiSubscribed = true;

    // fetch the user wieght from the server
    async function fetchProduct() {
      const response: any = await axios.get(
        "http://localhost:4000/process/get_all_weight",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // precessing the data
      if (isApiSubscribed) {
        const json = await response;
        console.log("data ==> ", json.data);
        let tempDate: string[] = [];
        let tempComment: string[] = [];
        let tempData: number[] = [];
        for (const x of json.data) {
          tempDate.push(x.date.split("T")[0]); // need to redo, please look the x-axis date tranformation in chartjs
          tempData.push(x.weight);
          tempComment.push(x.comments);
        }
        setComment(tempComment);
        setOption(tempDate);
        setData(tempData);
      }
    }

    fetchProduct();

    // clean up function
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  useEffect(() => {
    let isApiSubscribed = true;
    async function fetchProduct() {
      const response: any = await axios.post(
        "http://localhost:4000/process/get_student_weight",
        {
          id: currentStudentID,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // precessing the data
      if (isApiSubscribed) {
        const json = await response;
        console.log("data ==> ", json.data);
        let tempDate: string[] = [];
        let tempComment: string[] = [];
        let tempData: number[] = [];
        for (const x of json.data) {
          tempDate.push(x.date.split("T")[0]); // need to redo, please look the x-axis date tranformation in chartjs
          tempData.push(x.weight);
          tempComment.push(x.comments);
        }
        setComment(tempComment);
        setOption(tempDate);
        setData(tempData);
      }
    }

    if (currentStudentID !== -999) {
      // fetch the user wieght from the server
      fetchProduct();
    }
    // clean up function
    return () => {
      isApiSubscribed = false;
    };
  }, [currentStudentID]);

  // handle the click event and show the popup
  // ref: https://react-chartjs-2.js.org/examples/chart-events/
  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }
    let element: InteractionItem[] = getElementAtEvent(chart, event);
    if (!element.length) return;
    const { datasetIndex, index } = element[0];
    console.log("datasetIndex, index -> ", datasetIndex, index);
    setModify({
      viewOnly: false,
      modify: true,
      data: {
        id: -999,
        weight: data[index],
        comment: comment[index],
        date: dateOption[index],
      },
    });
    setOpen(true);
  };

  const handleClose = () => {
    setModify({
      ...modify,
      modify: false,
    });
    handleReset();
    setOpen(false);
  };

  return (
    <MainLayout content="Progress">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          gap: 10,
        }}
      >
        {role.includes("coach") && (
          <div style={{ flexGrow: 0.2, backgroundColor: "white" }}>
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
                        width:'100%',
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
                            data.id === currentStudentID ? "skyblue" : "white",
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
            flexGrow: 0.8,
          }}
        >
          {
            // lol flex-grow doesnt work for chartjs's chart, you must set the height/width for the chart
          }
          <div style={{ flexGrow: 1, backgroundColor: "white" }}>
            <Line
              style={{ padding: 20 }}
              options={options}
              ref={chartRef}
              onClick={onClick}
              data={{
                labels: dateOption,
                datasets: [
                  {
                    label: "kg",
                    data: data,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                ],
              }}
            />
          </div>
          {/* <div style={{ flexGrow: 0.3, backgroundColor: "blue" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              // width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <img
              src={LogoBase64}
              style={{ width: "30%", height: "90px" }}
              alt=""
            />
            <img
              src={LogoBase64}
              style={{ width: "30%", height: "90px" }}
              alt=""
            />
            <img
              src={LogoBase64}
              style={{ width: "30%", height: "90px" }}
              alt=""
            />
  
          </div>
        </div> */}

          <ModifyWeightProcess
            key={version}
            open={open}
            handleClose={handleClose}
            setOpen={setOpen}
            modify={modify.modify}
            viewOnly={modify.viewOnly}
            data={modify.data}
          />
        </div>
      </div>
    </MainLayout>
  );
};
export default ProgressView;
