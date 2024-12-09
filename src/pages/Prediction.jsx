import React, { useState } from "react";
import Header from "../components/Header";
import Chart from "../components/Chart";
import { FaPlus } from "react-icons/fa";
import ModalForm from "../components/ModalForm";
import LoadingModal from "../components/LoadingModal";
import ModalError from "../components/ModalError";

function Prediction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictedData, setPredictedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleModalSubmit = async (data) => {
    setIsModalOpen(false);
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(
        "https://gusssatria.us-east-1.aws.modelbit.com/v1/predict_harga/latest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: parseInt(data.weeks) }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Hasil Prediksi:", result);
      setPredictedData(result);
    } catch (error) {
      console.error("Error saat mengirim data ke API:", error);
      setErrorMessage(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <LoadingModal />}

      {isError && (
        <ModalError
          isOpen={isError}
          onClose={() => setIsError(false)}
          message={errorMessage}
        />
      )}
      
      <Header />

      <div className="flex sm:flex-row flex-col justify-between items-start mb-8 gap-y-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-semibold py-2 text-gray-800">
            Prediksi Harga Beras
          </h1>
          <p className="text-sm sm:text-lg font-medium text-gray-500">
            Dapatkan insight terkini mengenai tren harga beras
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-800 text-cyan-300 py-2 sm:py-4 px-8 rounded-full flex gap-4 items-center hover:bg-gray-700 sm:w-auto w-full justify-center mt-4"
        >
          <FaPlus className="block sm:hidden" size={16} />
          <FaPlus className="hidden sm:block" size={20} />
          <p className="text-base font-semibold">Prediksi</p>
        </button>
      </div>

      <Chart predictedData={predictedData} />

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}

export default Prediction;
