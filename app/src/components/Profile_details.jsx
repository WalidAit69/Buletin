import React, { useEffect } from "react";
import "./Profile_details.css";
import img from "../../assets/user.png";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Image from "./Image";

function Profile_details({
  user,
  profilepic,
  setprofilepic,
  profilecover,
  setprofilecover,
}) {
  const [image, setimage] = useState(null);
  const [fullname, setfullname] = useState("");
  const [website, setwebsite] = useState("");
  const [files, setfiles] = useState([]);
  const [filename, setfilename] = useState("");
  const [bio, setbio] = useState("");
  const [job, setjob] = useState("");
  const [altemail, setaltemail] = useState("");
  const [coverfiles, setcoverfiles] = useState("");
  const [cover, setcover] = useState("");
  const [profiledeleted, setprofiledeleted] = useState("");
  const [coverdeleted, setcoverdeleted] = useState("");

  const [isLoading, setisLoading] = useState(false);

  const { id } = useParams();

  async function updateUser(e) {
    setisLoading(true);
    e.preventDefault();

    const url = `/api/user/${id}`;

    const data1 = new FormData();

    data1.set("fullname", fullname);
    data1.set("file", files[0]);
    data1.set("file2", coverfiles[0]);
    data1.set("website", website);
    data1.set("bio", bio);
    data1.set("job", job);
    data1.set("job", job);
    data1.set("altemail", altemail);
    data1.set("profiledeleted", profiledeleted);
    data1.set("coverdeleted", coverdeleted);

    const config = {
      method: "PUT",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data1,
      withCredentials: true,
    };

    axios(config)
      .then((res) => {
        console.log(res.data);
        setisLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setisLoading(false);
        console.log(error);
      });
  }



  return (
    <div className="profile_info">
      <div className="profile_banner">
        {profilecover ? (
          <Image
            src={user.cover}
            alt=""
            className="profile_cover_img"
          />
        ) : cover ? (
          <img src={cover} alt="" className="profile_cover_img" />
        ) : (
          ""
        )}
        <input
          type="file"
          accept="image/*"
          className="profile_cover"
          hidden
          onChange={({ target: { files } }) => {
            if (files) {
              setcover(URL.createObjectURL(files[0]));
              setcoverfiles(files);
            }
          }}
        />
        {profilecover ? (
          <div
            className="img_svg"
            onClick={() => {
              setcover("");
              setcoverfiles("");
              setprofilecover("");
              setcoverdeleted("deleted")
            }}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ) : cover ? (
          <div
            className="img_svg"
            onClick={() => {
              setcover("");
              setcoverfiles("");
            }}
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ) : (
          <div
            className="img_svg"
            onClick={() => document.querySelector(".profile_cover").click()}
          >
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
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </div>
        )}

        <div className="profile_image_info">
          <div className="profile_pic">
            {profilepic ? (
              <Image src={user.profile} alt="" />
            ) : image ? (
              <img
                src={image}
                alt=""
                onClick={() =>
                  document.querySelector(".profile_img_input").click()
                }
              />
            ) : (
              <img
                src={img}
                alt=""
                onClick={() =>
                  document.querySelector(".profile_img_input").click()
                }
              />
            )}

            <div className="profile_pic_info">
              <h3>Profile</h3>
              <p>Update your photo and personal details</p>
            </div>
          </div>

          <div className="profile_cta">
            <a href="" id="cancel">
              Cancel
            </a>
            {!isLoading ? <a
              type="submit"
              href=""
              id="save"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(".profilesection_form").click();
              }}
            >
              Save
            </a> : <a id="save"><span class="smallloader"></span></a>}
          </div>
        </div>
      </div>

      <form action="" onSubmit={updateUser}>
        <button type="submit" className="profilesection_form" hidden></button>
        <div className="profile_form">
          <div className="profile_inputs">
            <label htmlFor="">Fullname</label>

            <div>
              <p className="placeholder">{user.fullname}</p>
              <input
                type="text"
                id="fullname"
                onChange={(e) => setfullname(e.target.value)}
              />
            </div>
          </div>

          <div className="profile_inputs">
            <label htmlFor="">Website</label>
            <div>
              <p className="placeholder">http://</p>
              <input
                type="text"
                placeholder={user.website}
                id="website"
                onChange={(e) => setwebsite(e.target.value)}
              />
            </div>
          </div>

          <div className="profile_img_inputs">
            <div className="profile_img_inputs_title">
              <label htmlFor="">Your photo</label>
              <p className="hint">this will be displayed on your profile</p>
            </div>

            <div>
              <input
                type="file"
                accept="image/*"
                hidden
                id="image"
                className="profile_img_input"
                onChange={({ target: { files } }) => {
                  files[0] && setfilename(files[0].name);
                  if (files) {
                    setimage(URL.createObjectURL(files[0]));
                    setfiles(files);
                  }
                }}
              />
              {profilepic ? (
                <Image src={user.profile} alt="" />
              ) : image ? (
                <img
                  src={image}
                  alt=""
                  onClick={() =>
                    document.querySelector(".profile_img_input").click()
                  }
                />
              ) : (
                <img
                  src={img}
                  alt=""
                  onClick={() =>
                    document.querySelector(".profile_img_input").click()
                  }
                />
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                setfiles("");
                setprofilepic("");
                setimage("");
                setprofiledeleted("deleted")
              }}
            >
              Delete
            </button>
          </div>

          <div className="profile_inputs">
            <label htmlFor="">
              Your bio <span className="hint">Write a short introduction</span>
            </label>
            <div>
              <input
                type="text"
                placeholder={user.bio}
                onChange={(e) => setbio(e.target.value)}
              />
            </div>
          </div>

          <div className="profile_inputs">
            <label htmlFor="">Job title</label>
            <div>
              <input
                type="text"
                placeholder={user.job}
                onChange={(e) => setjob(e.target.value)}
              />
            </div>
          </div>

          <div className="profile_inputs profile_inputs_lastchild">
            <label htmlFor="">
              Alternative contact email{" "}
              <span className="hint">
                Enter an alternative email if you'd like to be contacted via a
                different email.
              </span>
            </label>
            <div>
              <input
                type="email"
                placeholder={user.altemail}
                onChange={(e) => setaltemail(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile_details;
