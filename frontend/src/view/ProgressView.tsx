/*
 TODO:
 ready to make a popup for click the event then show the photo
 */
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { LogoBase64 } from "../common/logo";
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
import { ConstructionOutlined } from "@mui/icons-material";

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
  const [comment, setComment] = useState<string[]>([])

  // https://www.chartjs.org/docs/latest/configuration/tooltip.html
  const footer = (tooltipItems:any) => {
    return 'Comments: '+ comment[tooltipItems[0].dataIndex];
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
        }
      }
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
        let tempComment: string[] = []
        let tempData: number[] = [];
        for (const x of json.data) {
          tempDate.push(x.date.split("T")[0]); // need to redo, please look the x-axis date tranformation in chartjs
          tempData.push(x.weight);
          tempComment.push(x.comments)
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

  // handle the click event and show the popup
  // ref: https://react-chartjs-2.js.org/examples/chart-events/
  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    // console.log(getDatasetAtEvent(chart, event));
    let element: InteractionItem[] = getElementAtEvent(chart, event);
    if (!element.length) return;
    const { datasetIndex, index } = element[0];
    console.log("datasetIndex, index -> ", datasetIndex, index);
  };

  return (
    <MainLayout content="Progress">
      <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 20}}>
        {
          // lol flex-grow doesnt work for chartjs's chart, you must set the height for the chart
        }
        <div style={{ flexGrow: 0.7, backgroundColor: "white" }}>
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
      </div>
    </MainLayout>
  );
};
export default ProgressView;
