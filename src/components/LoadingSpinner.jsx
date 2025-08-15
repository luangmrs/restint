import React from "react";

const sizeClasses = {
  2: "h-2 w-2",
  3: "h-3 w-3",
  4: "h-4 w-4",
  5: "h-5 w-5", // A classe que você estava usando
  6: "h-6 w-6",
  7: "h-7 w-7",
  8: "h-8 w-8",
  10: "h-10 w-10",
  12: "h-12 w-12",
  16: "h-16 w-16",
};

const LoadingSpinner = ({ size = 5, color = "text-white" }) => {
  const selectedSizeClass = sizeClasses[size] || sizeClasses[5]; // Garante um valor padrão caso o `size` não exista no mapeamento

  return (
    <svg
      className={`animate-spin ${selectedSizeClass} mr-2 ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );
};

export default LoadingSpinner;