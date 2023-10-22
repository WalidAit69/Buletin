import React, { useState } from "react";
import "./LoginPage.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import logo from "../../assets/fingerprint.png";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineDribbble } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";


function LoginPage() {
  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    password: yup.string().required("Password is required").min(6).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function login() {
    try {
      setisLoading(true);
      const response = await axios("/api/login", {
        method: "POST",
        data: JSON.stringify({ email: email.value, password: password.value }),
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      Cookies.set("token", token, { expires: 1 / 24 }); // 1/24 represents 1 hour
      localStorage.setItem("UserID", response.data);
      setisLoading(false);
      navigate("/");
    } catch (error) {
      setisLoading(false);
      toast.error(error?.response?.data?.msg);
    }
  }

  const toasts = () => {
    toast.error(errors?.email?.message);
    toast.error(errors?.password?.message);
  };

  return (
    <div className="Login_Page">
      <div className="left_side">
        <Link to={"/"} className="left_side_back">
          <AiOutlineLeft></AiOutlineLeft>
          <p>Home</p>
        </Link>

        <div className="left_info">
          <h1>
            Exploring the World, <span>One Story at a Time</span> Welcome to Our
            News and Blogs Hub <span>Buletin</span>
          </h1>
          <h4>Rory Callaway</h4>

          <div className="left_info_2">
            <div>
              <h5>Host and Creator, 2pixels</h5>
              <p>Development Agency and Podcast</p>
            </div>

            <div className="left_arrows">
              <AiOutlineArrowLeft
                fontSize={"1.5rem"}
                cursor={"pointer"}
              ></AiOutlineArrowLeft>
              <AiOutlineArrowRight
                fontSize={"1.5rem"}
                cursor={"pointer"}
              ></AiOutlineArrowRight>
            </div>
          </div>
        </div>
      </div>

      <div className="right_side">
        <div className="right_title">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
          <h1>Login to your account</h1>
          <p>Welcome Back</p>
        </div>

        <div className="right_form">
          <form action="" onSubmit={handleSubmit(login)}>
            <div className="right_input">
              <input
                type="email"
                name=""
                id="email"
                placeholder="Email"
                {...register("email")}
              />
              <input
                type="password"
                name=""
                id="password"
                placeholder="Password"
                {...register("password")}
              />
            </div>

            <div className="right_cta">
              {!isLoading ? <button type="submit" id="right_cta_login" onClick={toasts}>
                Log in
              </button> : <button id="right_cta_login"><span className="loader"></span></button>}
              <button type="submit" id="right_cta_google">
                <FcGoogle fontSize={"25px"}></FcGoogle>Log in with Google
              </button>
              <p>
                Don't have an account? <Link to={"/register"}>Sign Up</Link>
              </p>
            </div>
          </form>
        </div>

        <div className="right_help">
          <div>
            <Link>Need help?</Link>
          </div>
          <div className="right_help_socials">
            <AiOutlineTwitter></AiOutlineTwitter>
            <AiFillLinkedin></AiFillLinkedin>
            <AiOutlineInstagram></AiOutlineInstagram>
            <AiOutlineDribbble></AiOutlineDribbble>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default LoginPage;
