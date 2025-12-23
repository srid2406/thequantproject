"use client";
import { useEffect } from "react";

interface CustomAlertProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export default function CustomAlert({
  type,
  message,
  onClose,
}: CustomAlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-8 animate-in zoom-in-95 duration-300">
        <div className="relative">
          <div
            className={`w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center ${
              type === "success"
                ? "bg-emerald-500/10 ring-2 ring-emerald-500/20"
                : "bg-red-500/10 ring-2 ring-red-500/20"
            }`}
          >
            {type === "success" ? (
              <svg
                className="w-7 h-7 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>

          <p className="text-center text-zinc-100 font-medium text-base mb-6 leading-relaxed">
            {message}
          </p>

          <button
            onClick={onClose}
            className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200 ${
              type === "success"
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-red-600 hover:bg-red-500 text-white"
            }`}
          >
            OK
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
