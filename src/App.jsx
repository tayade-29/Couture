import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Forms/Home";
import SignupForm from "./Forms/SignUpForm";
import LoginForm from "./Forms/LoginForm";
import ProductUploadForm from "./Forms/ProductUploadForm";
import { ShopWithUsForm } from "./Forms/ShopWithUsForm";
import Profile from "./Page/Profile";


export const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route → Signup */}
        <Route path="/" element={<SignupForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-product" element={<ProductUploadForm />} />
        <Route path="/shop-with-us" element={<ShopWithUsForm/>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};
