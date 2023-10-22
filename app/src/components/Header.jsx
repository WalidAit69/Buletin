import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import Image from "./Image";



function Header({ isStory, setisStory }) {
  const { setuserInfo, userInfo } = useContext(UserContext);
  const [IsMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/profile", {
        withCredentials: true,
      })
      .then((response) => {
        setuserInfo(response.data);
      });
    const handleScroll = (event) => {
      document.querySelector("ul").classList.remove("responsive");
      document.querySelector(".nav_create").classList.remove("responsive");
      setIsMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const username = userInfo?.fullname;
  const id = userInfo?.UserId;


  const header = {
    backgroundColor: isStory ? "#1a1a1a" : "white",
    color: isStory ? "white" : "black",
  };

  function handleClick() {
    document.querySelector("ul").classList.toggle("responsive");
    document.querySelector(".nav_create").classList.toggle("responsive");
    setIsMenuOpen(!IsMenuOpen);
  }

  return (
    <header style={header}>
      <div className="header">
        <nav className="container">
          <div className="nav-links">
            <Link to={"/"} className="logo">
              Buletin
            </Link>
            <ul className="links">
              <li>Stories</li>
              <li>Creator</li>
              <li>Community</li>
              <li>Subscribe</li>
            </ul>
          </div>

          <div className="nav-btns">
            {id ? (
              <>
                <div className="nav_create">
                  <Link to={"/story/" + id} href="">
                    <div style={header} className="write">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Story
                    </div>
                  </Link>

                  <Link to={"/create/" + id} href="">
                    <div style={header} className="write">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Write
                    </div>
                  </Link>
                </div>
                <Link to={"/"} href="">
                  <div style={header} className="write">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                  </div>
                </Link>

                {userInfo.profile ? (
                  <Link to={"/profile/" + id} href="">
                    <Image src={userInfo.profile} className="header_img" alt="" />
                  </Link>
                ) : (
                  <Link
                    to={"/profile/" + id}
                    href=""
                    style={header}
                    className="profile"
                  >
                    <svg
                      width={'30px'}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Link>
                )}
              </>
            ) : (
              <div className="nav_create">
                <Link to={"/login"} href="">
                  Log in
                </Link>
                <Link to={"/register"} id="register">
                  Sign up
                </Link>
              </div>
            )}
            {!IsMenuOpen ? <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 menu">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg> :
              <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 menu">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>}

          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
