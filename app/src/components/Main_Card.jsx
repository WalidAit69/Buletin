import React, { useEffect, useState } from "react";
import "./Main_card.css";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Image from "./Image";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from "../widgets/Skeleton";

function Main_Card({ posts }) {
  const [randompost, setrandompost] = useState("");
  const [screenWidth, setscreenWidth] = useState();
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


  useEffect(() => {
    setscreenWidth(window.innerWidth);

  }, [window.innerWidth])


  return (
    <div className="main_card">
      <Link to={"/post/" + randompost?._id}>
        {randompost?.cover ? <Image className="main_card_img" src={randompost?.cover} alt="" /> : <Skeleton className="main_card_img" />}
      </Link>
      <div className="main_card_info">
        <div className="main_card_name_date">
          {randompost?.author?.profile ? <Link to={`/user/${randompost?.author?._id}`}>
            <Image
              className="Editorpick_info_img"
              src={randompost?.author?.profile}
            />
            {randompost?.author?.fullname}
            -
          </Link> : <>
            <Skeleton className={'Editorpick_info_img'} />
            <Skeleton height='10px' width='200px' />
          </>}

          {randompost?.author?.fullname &&
            <ReactTimeAgo
              date={randompost?.createdAt ? randompost?.createdAt : "2024-02-22T10:12:34.922Z"}
              locale="en-US"
              timeStyle="long"
              className="custom-timeago"
            />
          }
        </div>
        {randompost?.title ? <h2 className="main_card_title">{randompost?.title}</h2> : <Skeleton className={'mt-1'} height='18px' width={screenWidth > 500 ? '130%' : '100%'} />}
        {randompost?.summary ? <p className="main_card_description">{randompost?.summary}</p> : <Skeleton className={'mt-1'} height='18px' width='300px ' />}

        <div className="main_card_type">
          {randompost?.topic ? <p>
            {randompost?.topic}{" "}
            <span>- {randompost?.read ? randompost?.read + " read" : ""}</span>
          </p> : <Skeleton className={'mt-2'} height='10px' width='200px' />}
        </div>
      </div>
    </div >
  );
}

export default Main_Card;
