import React from "react";
import Blogs from "./components/Blogs";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/error/NotFound";
import Blog from "./pages/blogs/Blog";
import MainNavigation from "./shared/MainNavigation";
import SignOut from "./pages/auth/SignOut";
import Home from "./components/Home";
const App = () => {
  return (
    <div>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/signout"
          element={
            <ProtectedRoute>
              <SignOut />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
