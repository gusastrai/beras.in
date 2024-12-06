import React, { useState } from "react";
import Header from "../components/Header";
import Chart from "../components/Chart";
import { FaPlus } from "react-icons/fa";
import ModalForm from "../components/ModalForm";

function Prediction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalSubmit = (data) => {
    console.log("Data Prediksi:", data);
    setIsModalOpen(false);
    // Tambahkan logika pengiriman data ke server atau pemrosesan di sini
  };

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
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-800 text-cyan-300 py-4 px-8 rounded-full flex gap-4 items-center hover:bg-gray-700"
        >
          <FaPlus size={20} />
          <p className="text-base font-semibold">Prediksi</p>
        </button>
      </div>

      <Chart />

      {/* Modal untuk Prediksi */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default Prediction;
