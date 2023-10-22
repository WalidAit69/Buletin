import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img from "../../assets/user.png";
import Profile_post_card from "../widgets/Profile_post_card";
import Image from "../components/Image";

function ProfilesPage() {
  const { id } = useParams();
  const [user, setuser] = useState("");
  const [posts, setposts] = useState("");
  const [follow, setfollow] = useState();

  const currentId = localStorage.getItem("UserID");

  function Getuser() {
    axios.get(`/api/profile/${id}`).then((res) => {
      setuser(res.data);
    });
  }

  function getPosts() {
    axios.get(`/api/userposts/${id}`).then((res) => {
      setposts(res.data);
    });
  }

  function Follow(e){
    e.preventDefault();

    if (!currentId) {
      alert("Please Sign in")
      return;
    }


    const config = {
      method: "POST",
      url: `/api/users/${id}/${currentId}`,
      withCredentials : true,
    }

    axios(config).then((res) =>{
      setfollow(true);
    })
  }

  function UnFollow(e){
    e.preventDefault();

    if (!currentId) {
      alert("Please Sign in")
      return;
    }

    const config = {
      method: "DELETE",
      url: `/api/users/${id}/${currentId}`,
      withCredentials : true,
    }

    axios(config).then((res) =>{
      setfollow(false);
    })
  }


  useEffect(() => {
    Getuser();
    getPosts();
  }, [follow]);


  return (
    <div className="profile_preview_info">
      <div className="profile_preview_banner">
        {user.cover ? (
          <Image
            src={user.cover}
            alt=""
            className="profile_cover_img"
          />
        ) : (
          ""
        )}

        <div className="profile_preview_image_info">
          <div className="profile_pic">
            {user.profile ? (
              <Image src={user.profile} alt="" />
            ) : (
              <img src={img} alt="" />
            )}
          </div>

          <div className="profile_job_web">
            <h1>{user?.fullname}</h1>
            <p>
              {user.job ? (
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
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
              ) : (
                ""
              )}
              {user.job ? user.job + " | " : ""}{" "}
              <a href={`http://${user.website}`} target="_blank">
                {user?.website ? (
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
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                ) : (
                  ""
                )}
                {user?.website}
              </a>
            </p>

            <h4>{user.bio}</h4>

            {currentId != id ? user?.followers?.includes(currentId) || follow ? <button onClick={UnFollow}>Following</button> : <button onClick={Follow}>Follow</button> : ""}

            <h5>{user?.followers?.length} followers</h5>
          </div>

          <div className="profile_posts">
            <div className="profile_posts_title">
              <h1>{posts.length > 0 ? "My Latest Posts" : "No posts"}</h1>
            </div>

            {posts.length > 0 &&
              posts.map((post) => (
                <Profile_post_card key={post._id} {...post}></Profile_post_card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilesPage;
