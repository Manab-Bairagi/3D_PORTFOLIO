import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-full">
      <NavLink 
        to="/" 
        className="w-12 h-12 rounded-lg bg-white flex justify-center items-center font-bold shadow-md hover:bg-blue-50 transition-all"
      >
        <p className="blue-gradient_text">MB</p>
      </NavLink>

      <nav className="flex text-lg gap-7 font-medium flex-wrap">
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `transition-colors duration-300 ${isActive ? "text-blue-600 font-semibold " : "text-gray-700 hover:text-blue-950"}`
          }
        >
          About
        </NavLink>
        <NavLink 
          to="/projects" 
          className={({ isActive }) => 
            `transition-colors duration-300 ${isActive ? "text-blue-600 font-semibold " : "text-gray-700 hover:text-blue-950"}`
          }
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;