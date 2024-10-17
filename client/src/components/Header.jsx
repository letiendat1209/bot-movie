import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './SidebarUser';

function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark'); // thêm class 'dark' vào thẻ html
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark'); // loại bỏ class 'dark' nếu không có
        }
    }, []);
    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setDarkMode(!darkMode);
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <header className="fixed left-0 top-0 z-50 w-full bg-transparent text-white shadow-lg backdrop-blur-sm">
            <div className="container mx-auto flex items-center justify-between gap-2 px-[40px] py-2">
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
                        <h1 className="whitespace-nowrap text-lg font-bold text-cyan-200 md:text-xl">BỘT PHIM</h1>
                    </Link>
                </div>

                {/* Menu Items for larger screens */}
                <nav className="hidden gap-2 md:flex">
                    <a
                        href="#"
                        className="whitespace-nowrap rounded-full border border-gray-500 bg-transparent px-4 py-2 text-cyan-200 hover:text-cyan-500 dark:text-white"
                    >
                        Anime
                    </a>
                    <a
                        href="#"
                        className="whitespace-nowrap rounded-full border border-gray-500 bg-transparent px-4 py-2 text-cyan-200 hover:text-cyan-500 dark:text-white"
                    >
                        Movie
                    </a>
                    <a
                        href="#"
                        className="whitespace-nowrap rounded-full border border-gray-500 bg-transparent px-4 py-2 text-cyan-200 hover:text-cyan-500 dark:text-white"
                    >
                        English 1-1
                    </a>
                    <a
                        href="#"
                        className="whitespace-nowrap rounded-full border border-gray-500 bg-transparent px-4 py-2 text-cyan-200 hover:text-cyan-500 dark:text-white"
                    >
                        BXH
                    </a>
                </nav>
                {/* Search Bar (hidden on mobile) */}
                <div className="relative hidden rounded-full border border-gray-500 lg:block">
                    <input
                        type="text"
                        className="w-[200px] rounded-full border border-gray-600 bg-opacity-70 px-4 py-2 text-white placeholder-gray-400 shadow-md transition-all duration-300 ease-in-out hover:bg-gray-700 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-[320px]"
                        placeholder="Search..."
                    />

                    <Link to="/search">
                        <span className="absolute right-3 top-2 text-gray-400 hover:text-white">
                            <i className="fas fa-search"></i>
                        </span>
                    </Link>
                </div>
                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} className="rounded-full border border-gray-500 p-2 focus:outline-none">
                        {darkMode ? (
                            <i className="fa-solid fa-moon w-[16px] text-gray-400 hover:text-white"></i>
                        ) : (
                            <i className="fa-solid fa-sun text-gray-400 hover:text-white"></i>
                        )}
                    </button>
                    <button className="rounded-full border border-gray-500 p-2 focus:outline-none">
                        <i className="fas fa-bell text-gray-400 hover:text-white"></i>
                    </button>
                    <div className="cursor-pointer rounded-full border border-gray-500" onClick={toggleSidebar}>
                        <img src="https://avatarfiles.alphacoders.com/375/375863.jpeg" alt="Profile" className="h-10 w-10 rounded-full" />
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <nav className="space-y-2 bg-transparent p-4 backdrop-blur-sm md:hidden">
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
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </header>
    );
}

export default Header;
