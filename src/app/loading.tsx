import React from "react";

export default function loading() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center bg-white">
      <div className="relative">
        {/* Animated circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-4 border-emerald-200 rounded-full animate-ping"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-emerald-400 rounded-full animate-pulse"></div>
        </div>

        {/* Shopping cart icon */}
        <div className="relative z-10 w-32 h-32 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-emerald-600 animate-bounce"
            fill="currentColor"
            stroke="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>

      {/* Loading text with gradient */}
      <div className="mt-8 text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent animate-pulse">
          FreshCart
        </h2>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0s]"></div>
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
        <p className="text-gray-500 text-sm font-medium">
          Loading your shopping experience
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 animate-[loading_1.5s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
}
