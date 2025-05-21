import React from "react";
import RegisterUser from "./pages/RegisterUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import LoginUser from "./pages/LoginUser";
import WriteArticle from "./pages/WriteArticle";
import LogoutUser from "./pages/LogoutUser";
import SaveArticle from "./pages/SaveArticle";
import GetOneArticle from "./pages/GetOneArticle";
import Footer from "./components/Footer";
import UpdateProfile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import EditArticle from "./pages/EditArticle";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/logout" element={<LogoutUser />} />
            <Route path="/write" element={<WriteArticle />} />
            <Route path="/save" element={<SaveArticle />} />
            <Route path="/profile" element={<UpdateProfile />} />
            <Route path="/article/:id" element={<GetOneArticle />} />
            <Route path="/edit-profile/:id" element={<EditProfile />} />
            <Route path="/editArticle/:id" element={<EditArticle />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
