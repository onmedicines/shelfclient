import React, { useState, useEffect } from "react";
import Hamburger from "../components/Hamburger";
import { Outlet, NavLink, Link } from "react-router";
import X from "../components/X";
import StateContext from "../context/Context";

export default function Root() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [status, setStatus] = useState({
    error: "",
    isLoading: false,
    success: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus({ ...status, error: "", success: "" });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [status.error, status.success]);

  const toggle = () => {
    setNavbarVisible((prev) => !prev);
  };

  return (
    <div id="container" className={`relative min-h-screen max-w-screen overflow-x-hidden ${navbarVisible && "overflow-y-hidden"}`}>
      <div id="loading-div" className={`z-10 absolute bottom-4 right-4 py-2 px-6 rounded-md bg-emerald-200 text-emerald-700 font-bold border-2 border-emerald-700 ${status.isLoading ? "transform translate-x-0" : "transform translate-x-[calc(100%+1rem)]"}`}>
        Loading...
        <br />
        Please wait
      </div>
      <div id="error-div" className={`z-10 absolute bottom-4 right-4 py-2 px-6 rounded-md bg-red-200 text-red-700 font-bold border-2 border-red-700 ${status.error ? "transform translate-x-0" : "transform translate-x-[calc(100%+1rem)]"}`}>
        {status.error}
      </div>
      <div id="success-div" className={`z-10 absolute bottom-4 right-4 py-2 px-6 rounded-md bg-emerald-200 text-emerald-700 font-bold border-2 border-emerald-700 ${status.success ? "transform translate-x-0" : "transform translate-x-[calc(100%+1rem)]"}`}>
        {status.success}
      </div>
      <header className="w-screen bg-emerald-500">
        <div className="relative flex items-center justify-between py-4 px-8 max-w-screen-lg m-auto text-white">
          <Link to="/">
            <h1 className="text-lg font-bold">SHELF</h1>
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
          <nav className={`z-10 md:hidden absolute h-screen w-full bg-emerald-500 py-4 transition-transform duration-300 ${navbarVisible ? "transform translate-x-0" : "transform translate-x-full"}`}>
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
            <StateContext.Provider value={{ setStatus }}>
              <Outlet />
            </StateContext.Provider>
          </section>
        </main>
      </div>
    </div>
  );
}
