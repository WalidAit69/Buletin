import React, { useEffect, useState } from "react";
import "../components/Cards.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Image from "../components/Image";


function Profile_post_card({ _id, title, summary, topic, read, cover, createdAt, author }) {
  const today = new Date(createdAt);
  const date = format(today, "d MMMM yyyy");
  const maxtitlelength = 60;
  const maxsummarylength = 160;

  const truncatetitle =
    title.length > maxtitlelength
      ? title.slice(0, maxtitlelength) + "..."
      : title;
  const truncatesummary =
    summary.length > maxsummarylength
      ? summary.slice(0, maxsummarylength) + "..."
      : summary;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);



  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className="cards">
      <div className="card">
        <div className="card_img">
          <Link to={`/post/${_id}`}>
            <Image
              src={cover}
              width={"350px"}
              height={"300px"}
              alt="image"
            />
          </Link>
        </div>

        <div className="card_info">
          <h4 className="card_name_date">
            <div className="card_name_date_profile">
              <Link>
                {author?.profile ? (
                  <Image src={author?.profile} className="card_profile_pic" alt="" />
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
                )}</Link>
              <Link>{author?.fullname}</Link> - {date}
            </div>
          </h4>
          <Link to={`/post/${_id}`}>
            <h2 className="card_title">{truncatetitle}</h2>
            {screenWidth > 550 && <p className="card_description">{truncatesummary}</p>}
          </Link>

          <div className="card_topic">
            {screenWidth > 550 && <p>
              {topic ? topic : "topic"}
              <span> - {read ? read : ""}</span>
            </p>}
          </div>
        </div>
      </div>
    </div>
  );
}


export default Profile_post_card;