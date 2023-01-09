/*
 TODO
 */
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../store/hook";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Weight",
    },
  },
};

const ProgressView = () => {
  const { t } = useTranslation();

  const [dateOption, setOption] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

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
      if(isApiSubscribed){
        const json = await response;
        console.log("data ==> ", json.data);
        let tempDate: string[] = [];
        let tempData: number[] = [];
        for (const x of json.data) {
          tempDate.push(x.date.split('T')[0]); // need to redo, please look the x-axis date tranformation in chartjs
          tempData.push(x.weight);
        }
  
        setOption(tempDate);
        setData(tempData);
      }

    }

    fetchProduct();

    // clean up function 
    return () => {
      isApiSubscribed = false
    }
  }, []);

  return (
    <MainLayout content="Progress">
      <>
        <p>This is the {t("Progress")} Page </p>
        <div style={{ width: "50%", height: "50%", backgroundColor: "white" }}>
          <Line
            options={options}
            data={{
              labels: dateOption,
              datasets: [
                {
                  label: "Kg",
                  data: data,
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
                // {
                //   label: "Dataset 2",
                //   data: [9, 8, 7, 6, 5, 4, 3],
                //   borderColor: "rgb(53, 162, 235)",
                //   backgroundColor: "rgba(53, 162, 235, 0.5)",
                // },
              ],
            }}
          />
        </div>
      </>
    </MainLayout>
  );
};
export default ProgressView;
