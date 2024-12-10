import React from "react";
import { FaPlus } from "react-icons/fa";

const FileUpload = ({ selectedFile, handleFileChange, handleSubmit, type }) => (
  <div className="flex flex-col gap-4 bg-zinc-100 p-4 rounded-2xl my-8">
    <div>
      <p className="text-lg font-semibold text-gray-700">Upload Gambar</p>
      <p className="text-sm">
        {type === "classification"
          ? "Unggah gambar penyakit padi yang ingin Anda klasifikasi."
          : "Unggah gambar beras yang ingin Anda identifikasi."}
        Pastikan gambar yang diunggah memiliki kualitas yang baik.
      </p>
    </div>

    <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl">
      {selectedFile && (
        <div className="text-gray-600 flex flex-col items-center gap-4 overflow-hidden">
          <p>
            File yang dipilih: 
          </p>
          <p className="font-bold">
            {selectedFile.name}
          </p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="w-full sm:w-1/2 h-auto object-fit rounded-lg border border-gray-300"
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FaPlus className="w-8 h-8 mb-2 text-gray-500" />
              <p className="text-sm text-gray-500">Upload Gambar</p>
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
);

export default FileUpload;
