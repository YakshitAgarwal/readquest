import { Search, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const tabs = [
    { name: "Why ReadQuest", route: "/" },
    { name: "Products", route: "/" },
    { name: "Solutions", route: "/" },
    { name: "Resources", route: "/" },
    { name: "About", route: "/" },
  ];

  return (
    <>
      <div className="flex justify-between item-center bg-white p-1 rounded-2xl border-2 border-[#e0e0e0]">
        <div className="flex justify-center items-center pl-5 text-[24px] font-semibold cursor-pointer">
          ReadQuest
        </div>
        <div className="flex justify-center items-center gap-8">
          {tabs.map((tab) => (
            <Link key={tab.name} to={tab.route}>
              {tab.name}
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center border-1 border-[#e0e0e0] rounded-full p-2 cursor-pointer">
            <Search size={24} />
          </div>
          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
            className="flex justify-center items-center border-1 border-[#e0e0e0] rounded-full p-2 cursor-pointer"
          >
            {darkMode ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          <button
            onClick={() => {
              setShowLogin(true);
            }}
            className="bg-black text-white py-2 px-5 text-[18px] rounded-xl cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-[400px] rounded-2xl bg-white p-6">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-4 top-4"
            >
              <X
                size={28}
                className="border-1 border-[#4b4b4b] rounded-full p-1 cursor-pointer"
              />
            </button>
            <Modal />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
