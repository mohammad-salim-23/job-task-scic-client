import { Link } from "react-router-dom";

const Navbar = () => {
  // Navigation links extracted for reuse in multiple places
  const navLinks = (
    <>
      <li className="text-[18px]">
        <Link to="/">Overview</Link>
      </li>
      <li className="text-[18px]">
        <Link to="/transactions">My Transactions</Link>
      </li>
    </>
  );

  return (
    <div>
      {/* Navbar container with DaisyUI's base styling */}
      <div className="navbar bg-base-100">
        {/* Navbar start: contains dropdown for smaller screens */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              {/* Hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {/* Dropdown menu for smaller screens */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow lg:hidden"
            >
              {navLinks}
            </ul>
          </div>
        </div>
        
        {/* Navbar center: visible on larger screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks}
          </ul>
        </div>
        
        {/* Navbar end: button */}
        <div className="navbar-end">
          <Link to="/signUp"> <button className="btn bg-red-400 p-2">Registration</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
