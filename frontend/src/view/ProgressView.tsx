/*
 TODO
 */

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
import type { ChartData, ChartOptions } from 'chart.js';

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<'line'> = {
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data: ChartData<'line'> = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [0, 1, 2, 3, 4, 5, 6],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [9, 8, 7, 6, 5, 4, 3],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const ProgressView = () => {
  const { t } = useTranslation();

  return (
    <MainLayout content="Progress">
      <>
        <p>This is the {t("Progress")} Page </p>
        <div style={{width: '50%', height: '50%', backgroundColor: 'white'}}>
          <Line options={options} data={data} />
        </div>
      </>
    </MainLayout>
  );
};
export default ProgressView;
