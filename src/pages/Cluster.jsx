import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { FaChartLine, FaList, FaSearch } from "react-icons/fa";
import Map from "../components/Map";

const Cluster = () => {
  return (
    <div>
      <Header />

      <div className="flex justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-semibold py-2 text-gray-800">
            Pemetaan Tingkat Produksi Padi di Indonesia
          </h1>
          <p className="text-lg font-medium text-gray-500">
            Dengan informasi pemetaan berikut, Anda dapat melihat potensi
            produksi padi dari setiap provinsi di Indonesia
          </p>
        </div>
        <div className="flex-1"></div>
        <Link to="/prediction">
          <div className="bg-gray-800 text-cyan-300 py-4 px-8 rounded-full flex gap-4 items-center hover:bg-gray-700">
            <FaChartLine size={20} />
            <p className="text-base font-semibold">Prediksi</p>
          </div>
        </Link>
        <Link to="/classification">
          <div className="bg-gray-800 text-cyan-300 py-4 px-8 rounded-full flex gap-4 items-center hover:bg-gray-700">
            <FaList size={20} />
            <p className="text-base font-semibold">Klasifikasi</p>
          </div>
        </Link>
        <Link to="/identification">
          <div className="bg-gray-800 text-cyan-300 py-4 px-8 rounded-full flex gap-4 items-center hover:bg-gray-700">
            <FaSearch size={20} />
            <p className="text-base font-semibold">Identifikasi</p>
          </div>
        </Link>
      </div>

      <div className="bg-zinc-100 p-4 rounded-2xl my-8">
        <Map />
      </div>
    </div>
  );
};

export default Cluster;
