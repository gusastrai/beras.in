import React, { useState } from "react";
import Header from "../components/Header";
import { FaPlus } from "react-icons/fa";

function Classification() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      console.log("File uploaded:", selectedFile.name);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
      <Header />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-semibold py-2 text-gray-800">
            Identifikasi Kualitas Beras
          </h1>
          <p className="text-lg font-medium text-gray-500">
            Analisis kualitas beras dengan cepat dan akurat untuk memastikan
            hasil terbaik dalam pengolahan atau penjualan.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-zinc-100 p-4 rounded-2xl">
        <div>
          <p className="text-lg font-semibold text-gray-700">Upload Gambar</p>
          <p className="text-sm">
            Unggah gambar beras yang ingin Anda identifikasi kualitasnya.
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
          <form onSubmit={handleSubmit} className="">
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
    </div>
  );
}

export default Classification;
