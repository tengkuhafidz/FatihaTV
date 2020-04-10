import React, { useEffect, useState } from "react";
import { FaCaretUp } from "react-icons/fa";

const BackToTop: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);

  const listener: EventListener = () => {
    if (window.scrollY > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return (): void => {
      window.removeEventListener("scroll", listener);
    };
  });

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className={`transition-opacity fixed bottom-0 right-0 z-50 p-6 duration-500 ${
        visible ? "opacity-50 hover:opacity-100 cursor-pointer" : "opacity-0"
      }`}
    >
      <div className="rounded-lg bg-gray-500 hover:bg-gray-700">
        <FaCaretUp className="text-5xl text-white" />
      </div>
    </div>
  );
};

export default BackToTop;
