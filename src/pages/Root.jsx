import React, { useState } from "react";
import Hamburger from "../components/Hamburger";
import { Outlet, NavLink, Link } from "react-router";
import X from "../components/X";

export default function Root() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const toggle = () => {
    setNavbarVisible((prev) => !prev);
  };

  return (
    <div id="root" className={`h-screen w-screen overflow-x-hidden ${navbarVisible && "overflow-y-hidden"}`}>
      <header className="w-screen bg-emerald-500">
        <div className="relative flex items-center justify-between py-4 px-8 max-w-screen-lg m-auto text-white">
          <Link to="/">
            <h1 className="text-md font-bold">SHELF</h1>
          </Link>
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
            <ul className="flex gap-8 justify-between items-center">
              <NavLink to="/login">
                <li className="font-semibold">Login</li>
              </NavLink>
              <NavLink to="/signup">
                <li className="font-semibold bg-white text-emerald-600 py-2 px-4 rounded-sm">Signup</li>
              </NavLink>
            </ul>
          </nav>
        </div>
      </header>
      <div className="h-full max-w-screen-lg m-auto flex flex-col">
        <main className="w-full flex-grow relative">
          <nav className={`z-10 md:hidden absolute h-screen w-full bg-emerald-500 py-4 transform translate-x-full transition-transform duration-300 ${navbarVisible && "-translate-x-0"}`}>
            <ul className="flex flex-col items-center h-full gap-12 text-2xl mt-16 font-bold text-white">
              <NavLink
                to="/"
                onClick={() => {
                  setNavbarVisible(false);
                }}>
                <li className="relative before:bg-emerald-700 before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:transition-all before:duration-200 hover:before:w-full">Home</li>
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => {
                  setNavbarVisible(false);
                }}>
                <li className="relative before:bg-emerald-700 before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:transition-all before:duration-200 hover:before:w-full">Login</li>
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => {
                  setNavbarVisible(false);
                }}>
                <li className="relative before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-0 before:bg-emerald-700 hover:before:w-full before:transition-all before:duration-200">Signup</li>
              </NavLink>
            </ul>
          </nav>
          <section className={`relative`}>
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}
