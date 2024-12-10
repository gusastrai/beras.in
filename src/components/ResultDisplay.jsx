import React from "react";

const ResultDisplay = ({ result, handleReset, type }) => (
  <div className="flex flex-col gap-4 bg-zinc-100 p-4 rounded-2xl my-8">
    <div>
      <p className="text-lg font-semibold text-gray-700">
        {type === "classification" ? "Hasil Klasifikasi" : "Hasil Identifikasi"}
      </p>
      <p className="text-sm">
        {type === "classification"
          ? "Hasil klasifikasi penyakit padi berdasarkan gambar yang diunggah."
          : "Hasil identifikasi kualitas beras berdasarkan gambar yang diunggah."}
      </p>
    </div>
    <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl">
      <div className="text-gray-600 flex flex-col items-center gap-4">
        {type === "classification" ? (
          <>
            <p>
              Label: <strong className="text-cyan-500">{result.label}</strong>
            </p>
            <p>
              Akurasi: <strong className="text-cyan-500">90%</strong>
            </p>
            <img
              src={URL.createObjectURL(result.selectedFile)}
              alt="Hasil Klasifikasi"
              className="w-full sm:w-1/2 h-auto object-fit rounded-lg border border-gray-300"
            />
          </>
        ) : (
          <>
            <div className="flex sm:flex-row flex-col gap-4">
              <p>
                Persentase Butir kepala:{" "}
                <strong className="text-cyan-500">
                  {result.class_1_percentage.toFixed(2)}%
                </strong>
              </p>
              <p>
                Persentase Butir menir:{" "}
                <strong className="text-cyan-500">
                  {result.class_2_percentage.toFixed(2)}%
                </strong>
              </p>
              <p>
                Persentase Butir patah:{" "}
                <strong className="text-cyan-500">
                  {result.class_3_percentage.toFixed(2)}%
                </strong>
              </p>
            </div>
            <img
              src={`data:image/jpeg;base64,${result.image_with_boxes}`}
              alt="Hasil Identifikasi"
              className="w-full sm:w-1/2 h-auto object-fit rounded-lg border border-gray-300"
            />
          </>
        )}
        <button
          onClick={handleReset}
          className="w-full block mt-4 py-2 px-6 text-cyan-300 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer transition-all duration-300 font-semibold"
        >
          Upload Gambar Baru
        </button>
      </div>
    </div>
  </div>
);

export default ResultDisplay;
