import { useState } from "react";

export default function UploadFile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-2xl">
      {/* Tab Header */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Upload Files
      </button> */}
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-full flex items-center justify-center gap-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            <img
            src="C:\Users\IFKhan\Downloads\ADF\adf-front\src\assets\upload.png"
            alt="Upload Icon"
            className="w-6 h-6"
            />
            Upload Files
        </button>
        </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="bg-white border border-t-0 border-gray-300 rounded-b-lg shadow-md p-6 space-y-6">
          {/* Upload Script */}
          <div>
            <label
              htmlFor="upload_script"
              className="block text-md font-semibold text-blue-600 mb-2"
            >
              {/* 📜 Upload Script */}
            </label>
            <input
              id="upload_script"
              type="file"
              className="block w-full text-sm text-white file:text-white file:bg-blue-600 file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer file:hover:bg-blue-700 bg-white border border-gray-300 rounded-lg cursor-pointer"
            />
            <p className="mt-1 text-sm text-gray-500">Accepted formats: .js, .ts, .py</p>
          </div>

          {/* Upload Config */}
          <div>
            <label
              htmlFor="upload_config"
              className="block text-md font-semibold text-green-600 mb-2"
            >
              {/* ⚙️ Upload Config */}
            </label>
            <input
              id="upload_config"
              type="file"
              className="block w-full text-sm text-white file:text-white file:bg-green-600 file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer file:hover:bg-green-700 bg-white border border-gray-300 rounded-lg cursor-pointer"
            />
            <p className="mt-1 text-sm text-gray-500">Accepted formats: .json, .yaml, .yml</p>
          </div>
        </div>
      )}
    </div>
  );
}
