import React, { useEffect } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const labels = [
    "1 Jan",
    "7 Jan",
    "14 Jan",
    "21 Jan",
    "28 Jan",
    "4 Feb",
    "11 Feb",
    "18 Feb",
    "25 Feb",
    "4 Mar",
    "11 Mar",
    "18 Mar",
    "25 Mar",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [
          12000, 12200, 12400, 12600, 12800, 13000, 13200, 13400, 13500, 13800,
          14000, 14200, 14500,
        ],
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
    ],
  };

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
        <p className="text-lg font-semibold text-gray-700">Tren Harga Beras</p>
        <p className="text-sm">
          Pantau pergerakan harga beras dalam 3 bulan terakhir untuk membantu
          Anda mengambil keputusan yang tepat.
        </p>
      </div>
      <div className="h-[512px] bg-white px-4 py-8 rounded-2xl">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
