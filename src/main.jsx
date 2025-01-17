import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Root from "./pages/Root.jsx";
import "./index.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/home/Login.jsx";
import Signup from "./pages/home/Signup.jsx";
import ProtectedUser from "./util/ProtectedUser.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ViewBooks from "./pages/dashboard/ViewBooks.jsx";
import AddBook from "./pages/dashboard/AddBook.jsx";
import EditBook from "./pages/dashboard/EditBook.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route element={<ProtectedUser />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<ViewBooks />}></Route>
              <Route path="books" element={<ViewBooks />}></Route>
              <Route path="add-book" element={<AddBook />}></Route>
              <Route path="edit-book/:bookId" element={<EditBook />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
