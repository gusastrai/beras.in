import React from "react";
import Header from "../components/Header";
import Chart from "../components/Chart";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Prediction() {
  return (
    <div>
      <Header />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-semibold py-2 text-gray-800">
            Prediksi Harga Beras
          </h1>
          <p className="text-lg font-medium text-gray-500">
            Dapatkan insight terkini mengenai tren harga beras
          </p>
        </div>
        <Link to="/prediction">
          <div className="bg-gray-800 text-cyan-300 py-4 px-8 rounded-full flex gap-4 items-center">
            <FaPlus size={20} />
            <p className="text-base font-semibold">Prediksi</p>
          </div>
        </Link>
      </div>

      <Chart />
    </div>
  );
}

export default Prediction;
