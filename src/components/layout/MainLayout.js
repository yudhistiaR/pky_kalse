"use client";
import { motion } from "framer-motion";
import Aside from "../aside";
import TopNavbar from "../aside/TopNavbar";
import { useState } from "react";

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <motion.section layout className="flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <TopNavbar onClick={handleClick} open={open} />
      {/* Main Content */}
      <div className="w-full h-full flex overflow-hidden">
        <Aside open={open} />
        <main
          className={`overflow-y-scroll transition-all duration-300 p-4 w-full h-full ${
            open ? "ml-60" : "ml-0"
          }`}
        >
          {children}
        </main>
      </div>
    </motion.section>
  );
};

export default MainLayout;
