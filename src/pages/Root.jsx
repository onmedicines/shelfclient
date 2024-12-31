import React, { useState } from "react";
import Hamburger from "../components/Hamburger";
import { Outlet, NavLink } from "react-router";
import X from "../components/X";

export default function Root() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const toggle = () => {
    setNavbarVisible((prev) => !prev);
  };

  return (
    <div id="root" className="h-screen w-screen overflow-x-hidden">
      <div className="h-full max-w-screen-lg m-auto flex flex-col">
        <header className="relative flex justify-between p-4 bg-emerald-500 text-white">
          <h1 className="text-lg font-bold">Shelf</h1>
          {!navbarVisible ? (
            <button onClick={toggle} className="md:hidden">
              <Hamburger />
            </button>
          ) : (
            <button onClick={toggle} className="md:hidden">
              <X />
            </button>
          )}
          <nav className="hidden md:block">
            <ul className="flex gap-4 justify-between">
              <li>login</li>
              <li>signup</li>
            </ul>
          </nav>
        </header>
        <main className="w-full flex-grow">
          <nav className={`md:hidden h-full w-full bg-emerald-500 py-4 transform translate-x-full transition-transform duration-300 ${navbarVisible && "translate-x-0"}`}>
            <ul className="flex flex-col items-center justify-center h-full gap-16 text-2xl font-bold text-white">
              <NavLink to="/login">
                <li className="relative before:bg-emerald-700 before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:transition-all before:duration-200 hover:before:w-full">login</li>
              </NavLink>
              <NavLink to="/signup">
                <li className="relative before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:bg-emerald-700 hover:before:w-full before:transition-all before:duration-200">signup</li>
              </NavLink>
            </ul>
          </nav>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
