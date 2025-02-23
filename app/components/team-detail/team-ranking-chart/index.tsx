"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import React from "react";

// Chart.js 플러그인 및 스케일 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const data = {
  labels: [
    "10/11",
    "11/12",
    "12/13",
    "13/14",
    "14/15",
    "15/16",
    "16/17",
    "17/18",
    "18/19",
    "19/20",
    "20/21",
    "21/22",
    "22/23",
    "23/24",
    "24/25",
  ],
  datasets: [
    {
      label: "순위",
      data: [1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 3, 2, 2, 3, 1],
      fill: false,
      borderColor: "#fff",
      backgroundColor: "#fff",
      tension: 0.3, // 선의 곡률
      pointBorderColor: "#fff",
      pointBackgroundColor: "#333",
      pointRadius: 20, // 포인트 크기 (예시)
    },
  ],
};

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: true,
      color: "#fff",
      backgroundColor: "#999",
      borderRadius: 12,
      padding: {
        top: 2,
        bottom: 2,
        left: 6,
        right: 6,
      },
      font: {
        weight: "bold",
      },
      align: "center",
      anchor: "center",
    },
  },
  scales: {
    y: {
      reverse: true,
      ticks: {
        display: false,
      },
      beginAtZero: true,
      max: 10,
    },
  },
};

export default function TeamRankingChart() {
  return (
    <div className='rounded-lg w-full mx-auto bg-neutral-900 pb-4'>
      <div
        className={
          "bg-neutral-700 w-full rounded-t-lg p-2 flex justify-center center-align text-white font-black mb-2"
        }
      >
        SEASON RANKING
      </div>
      <Line data={data} options={options} className={"p-5"} />
    </div>
  );
}
