// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UserLayout from "./layout/UserLayout";
import Home from "./components/home/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import BookDetails from "./components/pages/BookDetails";
import AdminPanel from "./components/admin/AdminPanel";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppInitializer from "./components/auth/AppInitializer"; 

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppInitializer> 
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="/book-details/:id" element={<BookDetails />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<ProtectedRoute adminOnly={true} />}>
                <Route path="/admin" element={<AdminPanel />} />
              </Route>
            </Route>
          </Routes>
        </AppInitializer>
      </Router>
    </Provider>
  );
};

export default App;