import React, { useState } from "react";

const ModalForm = ({ isOpen, onClose, onSubmit }) => {
  const [weeks, setWeeks] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-100 rounded-2xl shadow-lg p-4 max-w-md w-full">
        <div className="bg-white rounded-2xl p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Prediksi Harga Beras
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Masukkan jumlah minggu ke depan untuk prediksi harga beras
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (weeks > 0) {
                onSubmit({ weeks });
              } else {
                alert("Harap masukkan jumlah minggu yang valid");
              }
            }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="weeks"
              >
                Jumlah Minggu
              </label>
              <input
                type="number"
                id="weeks"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-300 focus:outline-none"
                value={weeks}
                onChange={(e) => setWeeks(e.target.value)}
                placeholder="Contoh: 1"
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 border-cyan-300 border-2 text-gray-800 rounded-full hover:bg-cyan-300 hover:border-gray-800 transition duration-300 ease-in-out"
                onClick={onClose}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 text-cyan-300 rounded-full hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                Prediksi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
