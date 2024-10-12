import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark"); // thêm class 'dark' vào thẻ html
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark"); // loại bỏ class 'dark' nếu không có
    }
  }, []);
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-transparent text-white fixed top-0 left-0 w-full z-50 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-[40px]  py-2 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <h1 className="text-cyan-200 font-bold text-lg md:text-xl">
              BỘT PHIM
            </h1>
          </Link>
        </div>

        {/* Menu Items for larger screens */}
        <nav className="hidden md:flex space-x-4">
          <a
            href="#"
            className="px-4 py-2 bg-transparent border border-gray-500 rounded-full text-cyan-200 dark:text-white hover:text-cyan-500 "
          >
            Anime
          </a>
          <a
            href="#"
            className="px-4 py-2 bg-transparent border border-gray-500 rounded-full text-cyan-200 dark:text-white hover:text-cyan-500 "
          >
            Movie
          </a>
          <a
            href="#"
            className="px-4 py-2 bg-transparent border border-gray-500 rounded-full text-cyan-200 dark:text-white hover:text-cyan-500 "
          >
            English 1-1
          </a>
          <a
            href="#"
            className="px-4 py-2 bg-transparent border border-gray-500 rounded-full text-cyan-200 dark:text-white hover:text-cyan-500 "
          >
            BXH
          </a>
        </nav>
        {/* Search Bar (hidden on mobile) */}
        <div className="hidden lg:block relative border border-gray-500 rounded-full">
          <input
            type="text"
            className="bg-transparent rounded-full px-4 py-2 w-[200px] md:w-[320px] text-white focus:outline-none"
            placeholder="Search..."
          />
          <span className="absolute right-3 top-2 text-gray-400">
            <i className="fas fa-search"></i>
          </span>
        </div>
        {/* Icons */}
        <div className="flex space-x-4 items-center">
          <button
            onClick={toggleTheme}
            className="focus:outline-none border border-gray-500 p-2 rounded-full"
          >
            {darkMode ? (
              <i className="fa-solid fa-moon text-gray-400 hover:text-white w-[16px]"></i>
            ) : (
              <i className="fa-solid fa-sun text-gray-400 hover:text-white"></i>
            )}
          </button>
          <button className="focus:outline-none border border-gray-500 p-2 rounded-full">
            <i className="fas fa-bell text-gray-400 hover:text-white"></i>
          </button>
          <div className="border border-gray-500 rounded-full">
            <img
              src="https://avatarfiles.alphacoders.com/375/375863.jpeg"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-transparent p-4 space-y-2 backdrop-blur-sm">
          <a href="#" className="block text-white hover:text-cyan-500">
            Anime
          </a>
          <a href="#" className="block text-white hover:text-cyan-500">
            Movie
          </a>
          <a href="#" className="block text-white hover:text-cyan-500">
            English 1-1
          </a>
          <a href="#" className="block text-white hover:text-cyan-500">
            BXH
          </a>
        </nav>
      )}
    </header>
  );
}

export default Header;
