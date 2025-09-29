import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">BookReviewHub</h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          {user ? (
            <>
              {user.role === "admin" && (
                <li>
                  <Link to="/admin" className="hover:underline">
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin" className="hover:underline">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
