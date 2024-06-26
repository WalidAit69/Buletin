import React, { useEffect, useState } from "react";
import "./EditorPick.css";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Image from "./Image";
import Skeleton from "../widgets/Skeleton";



function MustRead({ unsortedposts }) {
  const [randompost, setrandompost1] = useState("");
  const [timestamp, settimestamp] = useState(new Date());


  const truncatesummary = randompost?.summary?.length > 100 ? randompost?.summary.slice(0, 100) + " ..." : randompost?.summary;

  function randomPost() {
    if (unsortedposts.length > 0) {
      const randomIndex = Math.floor(Math.random() * unsortedposts.length);
      setrandompost1(unsortedposts[randomIndex]);
      settimestamp(randompost.createdAt);
    }
  }

  useEffect(() => {
    randomPost();

  }, [unsortedposts]);

  const profile = randompost?.author?.profile;

  const skeletonData = Array(4).fill(null);

  return (
    <div className="Editorpick">
      <div className="posts_title">
        <h1>Must Read</h1>
      </div>

      <div className="Editorpick_posts">

        {randompost._id ? <div className="Editorpick_cover">

          <Link to={`post/${randompost._id}`}>
            <Image
              className="Editorpick_cover_img"
              src={randompost.cover}
              alt={randompost.title}
            />
          </Link>

          <div className="Editorpick_info">

            <div>
              <Link to={`/user/${randompost?.author?._id}`}>
                {profile && <Image className="Editorpick_info_img" src={profile} />}
                {randompost?.author?.fullname}</Link> -
              {
                <ReactTimeAgo
                  date={timestamp ? timestamp : "2023-08-22T10:12:34.922Z"}
                  locale="en-US"
                  timeStyle="long"
                  className="custom-timeago"
                />
              }
            </div>
            <h1>{randompost.title}</h1>
            <p>{truncatesummary}</p>
            <div>
              {randompost.topic} - {randompost.read} read
            </div>
          </div>
        </div> : <Skeleton className={'Editorpick_cover_img'} />}



        <div className="Editorpick_Allposts">
          {unsortedposts.length > 0 ? unsortedposts.slice(0, 4).map((post) => <Cards key={post._id} {...post}></Cards>) :
            <>
              {skeletonData.map((_, index) => (
                <div key={index} className="card">
                  <Skeleton className={'card_img'} />
                  <div>
                    <Skeleton className={'mt-2'} height='16px' width='200px' />
                    <Skeleton className={'mt-1'} height='13px' width='200px' />
                  </div>
                </div>
              ))}
            </>}
        </div>

      </div>
    </div >
  );
}

export default MustRead;
