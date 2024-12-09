import React, { useState, useEffect } from "react";
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
import { Line } from "react-chartjs-2";
import hargaBerasData from "../data/harga_beras.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ predictedData }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const labels = hargaBerasData.Sheet1.map(
      (item) => item["Tanggal Pencatatan"]
    );

    const actualHarga = hargaBerasData.Sheet1.map((item) =>
      parseFloat(item["Harga"].replace(",", ""))
    );

    const predictedLabels = [];
    const predictedHarga = [];

    if (predictedData.data) {
      predictedData.data.forEach((prediction) => {
        predictedLabels.push(formatDate(prediction.date));
        predictedHarga.push(prediction.predicted_price);
      });
      labels.push(...predictedLabels);
    }

    setChartData({
      labels,
      datasets: [
        {
          label: "Harga Aktual",
          data: actualHarga,
          borderColor: "rgb(6, 182, 212)",
          backgroundColor: "rgb(6, 182, 212)",
          showLine: true,
          fill: false,
          pointRadius: 1,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "#ffffff",
          pointHoverBorderColor: "rgb(6, 182, 212)",
          pointHoverBorderWidth: 5,
        },
        {
          label: "Harga Prediksi",
          // data: new Array(actualHarga.length).fill(null).concat(predictedHarga),
          data: [...actualHarga, ...predictedHarga],
          borderColor: "rgb(255, 102, 102)",
          backgroundColor: "rgb(255, 102, 102)",
          showLine: true,
          fill: false,
          pointRadius: 1,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "#ffffff",
          pointHoverBorderColor: "rgb(6, 182, 212)",
          pointHoverBorderWidth: 5,
        },
      ],
    });
  }, [predictedData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        displayColors: false,
        yAlign: "bottom",
        backgroundColor: "#ffffff",
        titleFontColor: "black",
        titleColor: "black",
        bodyColor: "rgb(6, 182, 212)",
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        callbacks: {
          label: function (context) {
            return `Rp ${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    hover: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return `Rp ${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  useEffect(() => {
    const registerCrosshairPlugin = () => {
      ChartJS.register({
        id: "crosshairPlugin",
        beforeDraw: (chart) => {
          if (chart.tooltip._active && chart.tooltip._active.length) {
            const activePoint = chart.tooltip._active[0];
            const { ctx } = chart;
            const { x } = activePoint.element;
            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgb(6, 182, 212)";
            ctx.stroke();
            ctx.restore();
          }
        },
      });
    };

    registerCrosshairPlugin();
  }, []);

  return (
    <div className="bg-zinc-100 rounded-2xl p-4 flex flex-col gap-y-4 my-8">
      <div>
        <p className="text-lg font-semibold text-gray-700">Tren Harga Beras di Indonesia</p>
        <p className="text-sm">
          Pantau pergerakan harga beras dalam 3 bulan terakhir untuk membantu
          Anda mengambil keputusan yang tepat.
        </p>
      </div>
      <div className="h-[512px] bg-white px-4 py-8 rounded-2xl">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
