"use client";
import React, { useState, useEffect } from "react";

const Loading: React.FC = () => {
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500); // 3초 뒤에 숨김

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && (
        <div
          className={`z-20 fixed inset-0 w-full h-full transition-opacity ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onTransitionEnd={() => setShow(false)}
        >
          <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
            <Heart />
            <p className="text-white">loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

const Heart: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="animation-float size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      color="white"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

export default Loading;
