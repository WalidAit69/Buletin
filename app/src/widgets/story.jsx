import React, { useEffect, useState } from "react";
import "./story.css";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../components/Image";

function Story({ author, cover, createdAt, _id }) {
  const [story, setstory] = useState({});
  const [popup, setpopup] = useState(false);

  const currentUser = localStorage.getItem("UserID");

  const timestamp = new Date(createdAt);

  function DeleteStory() {
    const res = axios.delete(`/api/story/${_id}`).then((res) =>{
      if(res.data === 'ok'){
        window.location.reload();
      }
    });

  }


  
  return (
    <div>
        <div className="story_div">
          {author?.profile ? (
            <Image
              src={author.profile}
              alt=""
              onClick={() => {
                setpopup(true);
                setstory({ author, cover });
              }}
            />
          ) : (
            <svg
              onClick={() => {
                setpopup(true);
                setstory({ author, cover });
              }}
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
          )}
          <p>{author?.fullname}</p>
        </div>
        {popup == true && (
        <div className="story_popup">
          <div className="overlay">
            <div className="overlay_div">
              <Image
                src={story.cover}
                className="story_cover_img"
                alt=""
              />

              <div className="popup_content">
                <div>
                  <Link to={`user/${author._id}`}>
                  {author?.profile ? (
                    <Image
                      src={author.profile}
                      alt=""
                      id="img"
                    />
                  ) : (
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
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                  </Link>
                  <Link to={`user/${author._id}`}>{author.fullname}</Link>
                  <p>
                    <ReactTimeAgo
                      date={timestamp}
                      locale="en-US"
                      timeStyle="long"
                      className="custom-timeago"
                    />
                  </p>
                </div>

                <div>
                  <svg
                    onClick={() => {
                      setpopup(false);
                      setstory({});
                    }}
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

                  {currentUser === author._id && (
                    <svg
                    onClick={DeleteStory}
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Story;
