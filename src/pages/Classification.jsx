import React, { useState } from "react";
import Header from "../components/Header";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const Classification = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true); 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
    setClassificationResult(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:5001/predict",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setClassificationResult(response.data);
        setShowForm(false); 
      } catch (error) {
        console.error("Error:", error);
        setError("Terjadi kesalahan saat mengirim gambar.");
      }
    } else {
      setError("Harap pilih file terlebih dahulu.");
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setClassificationResult(null);
    setError(null);
    setShowForm(true);
  };

  return (
    <div>
      <Header />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-semibold py-2 text-gray-800">
            Klasifikasi Penyakit Padi
          </h1>
          <p className="text-lg font-medium text-gray-500">
            Unggah gambar tanaman padi Anda dan temukan jenis penyakit yang
            terdeteksi secara akurat untuk mendukung langkah pengelolaan yang
            tepat.
          </p>
        </div>
      </div>

      {showForm ? (
        <div className="flex flex-col gap-4 bg-zinc-100 p-4 rounded-2xl">
          <div>
            <p className="text-lg font-semibold text-gray-700">Upload Gambar</p>
            <p className="text-sm">
              Unggah gambar penyakit padi yang ingin Anda klasifikasikan.
              Pastikan gambar yang diunggah memiliki kualitas yang baik.
            </p>
          </div>

          <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl">
            {selectedFile && (
              <div className="text-gray-600 flex flex-col items-center gap-4">
                <p>
                  File yang dipilih: <strong>{selectedFile.name}</strong>
                </p>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-1/2 h-auto object-fit rounded-lg border border-gray-300"
                />
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaPlus className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500">Upload Image</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <button
                  type="submit"
                  className="block w-full mt-4 py-2 px-6 text-cyan-300 bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer transition-all duration-300 font-semibold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {!showForm && (
        <div className="flex flex-col gap-4 bg-zinc-100 p-4 rounded-2xl my-8">
          <div>
            <p className="text-lg font-semibold text-gray-700">
              Hasil Klasifikasi
            </p>
            <p className="text-sm">
              Hasil klasifikasi penyakit padi berdasarkan gambar yang diunggah.
            </p>
          </div>
          <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl">
            {classificationResult ? (
              <div className="text-gray-600 flex flex-col items-center gap-4">
                <p>
                  Label:{" "}
                  <strong className="text-cyan-500">
                    {classificationResult.label}
                  </strong>
                </p>
                <p>
                  Akurasi: <strong className="text-cyan-500">90%</strong>
                </p>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Hasil Klasifikasi"
                  className="w-1/2 h-auto object-fit rounded-lg border border-gray-300"
                />
                <button
                  onClick={handleReset}
                  className="w-full block mt-4 py-2 px-6 text-cyan-300 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer transition-all duration-300 font-semibold"
                >
                  Upload Gambar Baru
                </button>
              </div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <p className="text-gray-500">
                Hasil akan ditampilkan di sini setelah Anda mengunggah gambar.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Classification;
