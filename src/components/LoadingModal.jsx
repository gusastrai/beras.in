import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-cyan-300 text-4xl mb-4" />
          <h2 className="text-lg font-semibold text-gray-800">Loading...</h2>
          <p className="text-sm text-gray-700">
            Tunggu sebentar, sedang memuat data
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
