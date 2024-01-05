import { useState, useEffect } from "react";
import logo from "../assets/DOST.png";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // const baseUrl = "http://127.0.0.1:8001";
  const baseUrl = "http://192.168.1.101:8000";
  // const baseUrl = "https://6srqqqzf-8000.asse.devtunnels.ms";
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/auth/login/`, {
        email: email,
        password: password,
      });
      console.log(response);
      if (response.status === 200) {
        const data = response.data;

        if (data.role == null) {
          setMessage(data.Message);
        } else {
          signIn({
            token: data.access_token,
            expiresIn: 3600,
            tokenType: data.token_type,
            authState: {
              email: data.email,
              office: data.office,
              id: data.user_id,
              role: data.role,
            },
          });
          setMessage(data.Message);
          navigate("/");
        }
      } else {
        setMessage("An error occurred while logging in.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while logging in.");
    }
  };

  useEffect(() => {
    setMessage("");
  }, []);

  return (
    <div className="font-textFont min-h-screen  h-[100vh] w-[100vw] bg-site bg-cover">
      <div className="w-full h-full flex justify-center bg-white bg-opacity-40">
        <div className="lg:h-[80%] h-[50%] w-[60%] place-self-center rounded-3xl p-2 bg-white shadow-lg">
          <div className=" h-full">
            <div className="lg:hidden flex justify-center gap-3 mt-3  ">
              <div className="">
                <img
                  src={logo}
                  alt="dost_logo"
                  height={70}
                  width={70}
                  className=""
                />
              </div>
            </div>
            <div className="text-center text-lg lg:text-3xl text-text_color font-semibold mt-3 lg:mt-9 xl:mt-14">
              Procurement Management System
            </div>
            <div className="lg:flex p-2 justify-center h-[80%] gap-3">
              <div className="hidden lg:block place-self-center h-[90%] w-[40%]">
                <div className="hidden lg:flex justify-center">
                  <img
                    src={logo}
                    alt="dost_logo"
                    height={250}
                    width={250}
                    className="h-auto w-48 md:w-64 lg:w-80"
                  />
                </div>
                <div className="hidden lg:block text-sm font-semibold text-center mt-5 text-gray-800">
                  DEPARTMENT OF
                  <br />
                  SCIENCE AND TECHNOLOGY
                </div>
              </div>

              <div className="place-self-center h-[80%] w-[100%] lg:w-[40%] ">
                <form onSubmit={handleLogin} className=" h-full p-3 lg:mt-2">
                  <div className="flex flex-col gap-5">
                    <div className="hidden lg:block font-bold text-sm lg:text-xl text-gray-800">
                      Welcome Back
                    </div>
                    <div className="hidden lg:block text-sm font-thin text-gray-800">
                      Log in to your account to continue
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 mt-2">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button type="submit" className="w-[50%]">
                      <div className=" bg-text_color flex justify-center shadow-lg rounded-lg h-10">
                        <div className="text-center text-white place-self-center">
                          Login
                        </div>
                      </div>
                    </button>
                    <div className="text-xs text-red-600 font-bold">
                      {message}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="text-xs text-center hidden lg:block">
              @ 2023 Procurement Management System - DOST Caraga
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
