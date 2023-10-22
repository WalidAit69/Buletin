import React, { useContext, useEffect, useState } from "react";
import "./PostPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import Image from "../components/Image";

function PostPage() {
  const { id } = useParams();
  const [postInfo, setpostInfo] = useState("");

  const currentUser = localStorage.getItem("UserID");
  const navigate = useNavigate();

  async function fetchData() {
    const res = await axios(`/api/post/${id}`);
    setpostInfo(res.data);
  }

  async function deletePost() {
    await axios.delete(`/api/post/${id}`);

    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(postInfo);

  if (!postInfo) return "";

  return (
    <section className="container">
      <div className="post_info">
        <p className="post_info_topic">{postInfo.topic}</p>
        <h1>{postInfo.title}</h1>

        <div className="decorative-line">
          <div className="decorative-line-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16.395"
              height="20.284"
              viewBox="0 0 16.395 20.284"
            >
              <g data-name="Group 197" transform="translate(-689.803 -586.663)">
                <rect
                  data-name="Rectangle 362"
                  width="7"
                  height="13"
                  transform="translate(692.403 591.991) rotate(-21)"
                  fill="#fff"
                ></rect>
                <rect
                  data-name="Rectangle 198"
                  width="0.999"
                  height="19.965"
                  transform="translate(690.449 587.668) rotate(-21.05)"
                  stroke="#000"
                  stroke-width="1"
                ></rect>
                <rect
                  data-name="Rectangle 199"
                  width="0.999"
                  height="19.965"
                  transform="translate(697.448 587.668) rotate(-21.05)"
                  stroke="#000"
                  stroke-width="1"
                ></rect>
              </g>
            </svg>
          </div>
        </div>

        <h2>
          {format(new Date(postInfo.createdAt), "d MMMM yyyy")} | By{" "}
          <Link to={`/user/${postInfo.author._id}`}>@{postInfo.author.fullname}</Link>
        </h2>

        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31.103"
              height="30.914"
              viewBox="0 0 31.103 30.914"
            >
              <path
                data-name="Path 63"
                d="M31.1,15.551A15.551,15.551,0,1,0,13.122,30.914V20.047H9.173v-4.5h3.949V12.125c0-3.9,2.322-6.05,5.874-6.05a23.915,23.915,0,0,1,3.481.3v3.827H20.516a2.248,2.248,0,0,0-2.534,2.429v2.917h4.313l-.689,4.5H17.981V30.914A15.555,15.555,0,0,0,31.1,15.551Z"
              ></path>
            </svg>
          </li>

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31.327"
              height="31.327"
              viewBox="0 0 31.327 31.327"
            >
              <path
                data-name="Path 68"
                d="M15.664,0A15.663,15.663,0,1,0,31.327,15.663,15.664,15.664,0,0,0,15.664,0ZM23.53,12.694c.007.162.011.325.011.488A10.739,10.739,0,0,1,7.009,22.229a7.689,7.689,0,0,0,.9.052,7.577,7.577,0,0,0,4.69-1.616,3.78,3.78,0,0,1-3.528-2.623,3.769,3.769,0,0,0,1.705-.065,3.778,3.778,0,0,1-3.029-3.7c0-.017,0-.032,0-.048a3.749,3.749,0,0,0,1.71.472A3.779,3.779,0,0,1,8.29,9.659,10.72,10.72,0,0,0,16.074,13.6a3.778,3.778,0,0,1,6.435-3.444,7.567,7.567,0,0,0,2.4-.916,3.79,3.79,0,0,1-1.66,2.089,7.538,7.538,0,0,0,2.168-.594A7.682,7.682,0,0,1,23.53,12.694Z"
              ></path>
            </svg>
          </li>

          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 31 31"
            >
              <circle
                data-name="Ellipse 30"
                cx="15.5"
                cy="15.5"
                r="15.5"
              ></circle>
              <g data-name="Group 166" transform="translate(-365.684 -412.746)">
                <path
                  data-name="Path 145"
                  d="M372,423v11.023h18.372V423Zm9.186,5.9-7.716-5.2h15.414l-7.7,5.2Zm-3.527-1.543-4.979,5.42v-8.782l4.979,3.362Zm.57.4,2.958,1.984,2.94-1.984,5.089,5.548H373.139l5.089-5.548Zm6.467-.4,4.979-3.362v8.782l-4.979-5.42Z"
                  fill="#fff"
                  stroke="#fff"
                  stroke-miterlimit="10"
                  stroke-width="1"
                ></path>
              </g>
            </svg>
          </li>

        </ul>

        {currentUser === postInfo.author._id && (
          <div className="post_info_cta">
            <Link to={`/edit/${postInfo._id}`}>Edit</Link>
            <Link onClick={deletePost} to={"/"}>
              Delete
            </Link>
          </div>
        )}
        <Image src={postInfo.cover} alt="" />
        <p className="post_info_content" dangerouslySetInnerHTML={{ __html: postInfo.content }}></p>
      </div>
    </section>
  );
}

export default PostPage;
