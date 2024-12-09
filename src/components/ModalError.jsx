import React from "react";

const ModalError = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 sm:px-0 px-4">
      <div className="bg-zinc-100 rounded-2xl shadow-lg p-4 max-w-sm w-full">
        <div className="bg-white p-4 rounded-2xl">
          <h2 className="text-lg font-semibold text-cyan-400">
            Terjadi Kesalahan
          </h2>
          <p className="text-gray-800 mt-2">{message}</p>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-gray-800 text-cyan-300 font-medium rounded-full hover:bg-gray-700"
              onClick={onClose}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalError;
