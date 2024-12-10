import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import ModalError from "../components/ModalError";
import LoadingModal from "../components/LoadingModal";
import FileUpload from "../components/FileUpload";
import ResultDisplay from "../components/ResultDisplay";

const Identification = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [identificationResult, setIdentificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
    setIdentificationResult(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!selectedFile) {
      setError("Harap pilih file terlebih dahulu");
      setIsModalOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://guss2408-identification-berasin-flask.hf.space/identify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIdentificationResult({ ...response.data, selectedFile });
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
      setError("Tidak dapat terhubung ke server");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIdentificationResult(null);
    setError(null);
    setShowForm(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-semibold py-2 text-gray-800">
            Identifikasi Kualitas Beras
          </h1>
          <p className="text-sm sm:text-lg font-medium text-gray-500">
            Analisis kualitas beras dengan cepat dan akurat untuk memastikan
            hasil terbaik dalam pengolahan atau penjualan.
          </p>
        </div>
      </div>

      {isLoading && <LoadingModal />}

      {showForm ? (
        <FileUpload
          selectedFile={selectedFile}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          type="identification"
        />
      ) : (
        <ResultDisplay
          result={identificationResult}
          handleReset={handleReset}
          type="identification"
        />
      )}

      <ModalError isOpen={isModalOpen} onClose={closeModal} message={error} />
    </div>
  );
};

export default Identification;
