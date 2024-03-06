import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./ProfilePage.css";
import Profile_details from "../components/Profile_details";
import { useNavigate, useParams } from "react-router-dom";
import Security_details from "../components/Security_details";
import Profile_preview from "../components/Profile_preview";


function ProfilePage() {
  const [title, settitle] = useState("Details");
  const [selectedItem, setselectedItem] = useState(0);
  const [user, setuser] = useState("");
  const [profilepic, setprofilepic] = useState("");
  const [profilecover, setprofilecover] = useState("");
  const [isLoading, setisLoading] = useState(true);


  const navigate = useNavigate();

  const { id } = useParams();

  async function profile() {
    try {
      const res = await axios.get(`/api/profile/${id}`, {
        withCredentials: true,
      });

      setuser(res.data);
      setprofilepic(res.data.profile);
      setprofilecover(res.data.cover);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      alert('User not found');
      navigate('/')
    }

  }

  function logout() {
    axios("/api/logout", {
      method: "post",
      withCredentials: true,
    });
    localStorage.setItem("UserID", "");
    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    profile();
  }, []);

  return (
    <main className="container">
      {!isLoading ? <>
        <h1 className="profile_title">{title}</h1>

        <div className="profile_page">

          <div className="profile_links">
            <List
              title={title}
              settitle={settitle}
              selectedItem={selectedItem}
              setselectedItem={setselectedItem}
            ></List>
          </div>

          {title === "Details" && (
            <Profile_details
              user={user}
              profilepic={profilepic}
              profilecover={profilecover}
              setprofilecover={setprofilecover}
              setprofilepic={setprofilepic}
            ></Profile_details>
          )}

          {title === "Profile" && (
            <Profile_preview
              user={user}
              profilepic={profilepic}
              profilecover={profilecover}
            ></Profile_preview>
          )}

          {title === "Security" && (
            <Security_details user={user}></Security_details>
          )}

          {title === "Log out" && (
            <div className="logOut">
              <h3>Are you sure you want to log out</h3>
              <div>
                <button className="profile-btn" onClick={logout}>
                  Yes
                </button>

                <button
                  className="profile-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    settitle("Profile");
                    setselectedItem(1);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          )}

        </div>
      </> : <div className="loading"><span className="bigloader"></span></div>}
    </main >
  );
}

function List({ settitle, selectedItem, setselectedItem }) {
  const items = ["Details", "Profile", "Security", "Plan", "Log out"];

  const handleclick = (index) => {
    setselectedItem(index);
    settitle(items[index]);
  };

  return (
    <ul className="profile_links">
      {items.map((item, index) => (
        <li
          key={index}
          className={selectedItem === index ? "profile_links_selected" : ""}
          onClick={() => handleclick(index)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default ProfilePage;
