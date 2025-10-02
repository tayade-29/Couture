import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import HamburgerMenu from "./Components/Hamburgermenu";
import HomePage from "./Page/HomePage";
import AddProductPage from "./Forms/ProductUploadForm";
import ExplorePage from "./Page/ExplorePage";
import ShopWithUsPage from "./Forms/ShopWithUsForm";
import ProfilePage from "./Page/Profile";
import ProductDetailPage from "./Page/ProductDetails";

import SignupForm from "./Forms/SignUpForm";
import LoginForm from "./Forms/LoginForm";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth?.token);
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignupForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <div style={{ backgroundColor: "#F8F4EF", minHeight: "100vh" }}>
                <HamburgerMenu />
                <HomePage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <div style={{ backgroundColor: "#F8F4EF", minHeight: "100vh" }}>
                <HamburgerMenu />
                <AddProductPage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <div style={{ backgroundColor: "#F8F4EF", minHeight: "100vh" }}>
                <HamburgerMenu />
                <ExplorePage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop-with-us"
          element={
            <ProtectedRoute>
              <div style={{ backgroundColor: "#F8F4EF", minHeight: "100vh" }}>
                <HamburgerMenu />
                <ShopWithUsPage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <div style={{ backgroundColor: "#F8F4EF", minHeight: "100vh" }}>
                <HamburgerMenu />
                <ProfilePage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <div style={{ backgroundColor: "#F8F4EF", minHeight: "100vh" }}>
                <HamburgerMenu />
                <ProductDetailPage />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
