import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className="md:h-20 h-16 shadow-md shadow-black-200 w-full m-0 lg:my-4  lg:rounded-full flex justify-between px-4 font-inter bg-[rgba(255,255,255,0.9)] sticky top-0 left-0 right-0 mx-auto max-w-[1400px] z-50">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold font-nunito text-blue-950">
            <span className="text-4xl lg:text-5xl ">Q</span>uiz
          </h1>
        </div>
        <div className="flex items-center lg:hidden" onClick={toggleDropdown}>
          {dropdownVisible ? (
            <RxCross2 className="text-3xl cursor-pointer" />
          ) : (
            <FaBars className="text-3xl cursor-pointer" />
          )}
        </div>
        <ul className="hidden lg:flex justify-between items-center list-none gap-12">
          <a href="#">
            <li className="hover:font-medium">Home</li>
          </a>
          <a href="#">
            <li className="hover:font-medium">About</li>
          </a>
          <a href="#">
            <li className="hover:font-medium">Services</li>
          </a>
          <a href="#">
            <li className="hover:font-medium">Leaderboard</li>
          </a>
        </ul>
        <div className="hidden lg:flex items-center justify-center relative">
          <a href="/signin">
            <button className="btn">Get Started</button>
          </a>
        </div>
      </div>

      {/* Dropdown */}
      {dropdownVisible && (
        <div
          className={`lg:hidden absolute top-[-20px] rounded-[30px] w-full shadow-lg z-50 transition-transform duration-300 ${
            dropdownVisible
              ? "translate-y-[100px] opacity-100 bg-[rgba(255,255,255,1)]"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="flex flex-col items-center mt-4 z-50">
            <a href="#" className="mb-4 text-lg block w-full text-center py-1">
              Home
            </a>
            <a href="#" className="mb-4 text-lg block w-full text-center py-1">
              About
            </a>
            <a href="#" className="mb-4 text-lg block w-full text-center py-1">
              Services
            </a>
            <a href="#" className="mb-4 text-lg block w-full text-center py-1">
              Courses
            </a>
            <a href="#" className="mb-4 text-lg block w-full text-center py-1">
              Contact
            </a>

            <a
              href="/signin"
              className="mb-4 text-lg block w-full text-center py-1"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
