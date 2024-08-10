import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { getLogoutAction } from "../../redux/actions";
import Cookies from "js-cookie";

//images
import userIcon from "../../img/user_icon.svg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const tokenState = useSelector((state) => state.tokenReducer);
  const authState = useSelector((state) => state.authReducer);

  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="w-full max-h-16 inPhone bg-white shadow-lg px-5">
      <div className="flex justify-between">
        <div className="flex items-center cursor-pointer">
          <img
            onClick={() => navigate("/")}
            src={logo}
            className="h-16 rounded-xl py-1"
            alt=""
          />
        </div>
        <div className="flex-2 w-5/12 mx-aut">
          <ul className="flex mt-4 items-around">
            <li
              onClick={() => navigate("/")}
              className="text-lg  cursor-pointer font-semibold hover:opacity-90 lg:ml-7 ml-6 mr-1.5"
            >
              Home
            </li>
            <li
              className="text-lg  cursor-pointer font-semibold hover:opacity-90 ml-6 mr-1.5"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </li>
            <li
              className="text-lg cursor-pointer font-semibold hover:opacity-90 ml-6 mr-1.5"
              onClick={() => navigate("/addProduct")}
            >
              Add Product
            </li>
            <li
              onClick={() => navigate("/help")}
              className="text-lg cursor-pointer font-semibold hover:opacity-90 ml-6 mr-1.5"
            >
              Help
            </li>
          </ul>
        </div>
        {!Cookies.get("refresh-token") ? (
          <div className="flex items-center">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="border-2 rounded-lg border-indigo-500 text-white hover:text-white hover:border-black transition bg-indigo-500 hover:bg-black font-bold py-1 px-8 mx-2"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="border-2 rounded-lg border-indigo-500 text-white hover:text-white hover:border-black transition bg-indigo-500 hover:bg-black font-bold py-1 px-8 mx-2"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div
            onMouseOver={(prev) => setShow(true)}
            onMouseLeave={(prev) => setShow(false)}
            className="my-auto"
          >
            <div className="bg-gray-200 relative rounded-full py-1 px-4 my-auto text-gray-700 flex items-center z-40 hover:bg-gray-300 mr-5 cursor-pointer">
              <img
                className="rounded-full w-8 h-8 mr-3"
                src={userIcon}
                alt="profile_pic"
              />
              <p className="text-lg font-semibold">
                {"Hi, " + authState.user.data.first_name}
              </p>
              {/* <p className="text-lg font-semibold">{"Hi, Gajendra"}</p> */}
            </div>
            {show && (
              <div
                onMouseOver={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                className="absolute bg-white rounded-lg z-40 border-2 border-slate-400 p-1"
              >
                <p
                  onClick={() => navigate("/update-profile")}
                  className="px-5 text-gray-600 py-2 bg-white cursor-pointer border-solid border-b border-slate-400 hover:bg-gray-200"
                >
                  Profile
                </p>
                <p
                  onClick={() => {
                    Cookies.remove("access-token");
                    Cookies.remove("refresh-token");
                    Cookies.remove("uuid");
                    dispatch(getLogoutAction());
                    navigate("/login");
                  }}
                  className="px-5 text-gray-600 py-2 bg-white cursor-pointer border-solid  border-slate-400 hover:bg-gray-200"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
