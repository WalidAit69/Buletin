import React, { useEffect, useState } from "react";
import "./Main_card.css";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Image from "./Image";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Main_Card({ posts }) {
  const [randompost, setrandompost] = useState("");
  const [timestamp, settimestamp] = useState(new Date());

  function randomPost() {
    if (posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length);
      setrandompost(posts[randomIndex]);
      settimestamp(randompost.createdAt);
    }
  }

  useEffect(() => {
    randomPost();
  }, [posts]);


  return (
    <div className="main_card">
      <Skeleton count={2} />
      <Link to={"/post/" + randompost?._id}>
        {randompost?.cover ? <Image className="main_card_img" src={randompost?.cover} alt="" /> : <Skeleton className="main_card_img" />}
      </Link>
      <div className="main_card_info">
        <div className="main_card_name_date">
          <Link to={`/user/${randompost?.author?._id}`}>
            {randompost?.author?.profile && (
              <Image
                className="Editorpick_info_img"
                src={randompost?.author?.profile}
              />
            )}
            {randompost?.author?.fullname}
          </Link>{" "}
          -
          {
            <ReactTimeAgo
              date={randompost?.createdAt ? randompost?.createdAt : "2024-02-22T10:12:34.922Z"}
              locale="en-US"
              timeStyle="long"
              className="custom-timeago"
            />
          }
        </div>
        <h2 className="main_card_title">{randompost?.title}</h2>
        <p className="main_card_description">{randompost?.summary}</p>

        <div className="main_card_type">
          <p>
            {randompost?.topic}{" "}
            <span>- {randompost?.read ? randompost?.read + " read" : ""}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main_Card;
