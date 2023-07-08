/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useState } from "react";

const Sidebar = ({ open, onClose, onMinimize }) => {
  const [isMinimize, setIsMinimize] = useState(true);
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"
        }
      ${isMinimize ? "-translate-x-64- w-[65px]" : "translate-x-0- w-auto"
        }
      `}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center transition-all duration-100 ${isMinimize ? 'opacity-0' : 'opacity-100'} `}>
        <div className={`mt-1 ml-1 h-2.5 font-poppins font-bold uppercase transition-all duration-50 text-navy-700 dark:text-white ${isMinimize ? 'text-[12px]' : 'text-[26px]'}`}>
          MATW <span className="font-medium">PROJECT</span>
        </div>
      </div>
      <div className="mt-[58px] mb-5 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}
      <ul className="mb-auto pt-1 pl-0">
        <Links routes={routes} isMinimize={isMinimize} />
      </ul>
      <div className="flex justify-end px-4">
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white"
          onClick={() => {setIsMinimize(!isMinimize);onMinimize()}}
        >
          {isMinimize ? <FiArrowRight className="h-5 w-5" /> : <FiArrowLeft className="h-5 w-5" />}
        </span>
      </div>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
