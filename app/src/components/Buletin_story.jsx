import axios from "axios";
import React, { useEffect, useState } from "react";
import Story from "../widgets/story";

function Buletin_story() {
  const [stories, setstories] = useState([]);

  function GetStory() {
    axios("/api/story").then((res) => {
      setstories(res.data);
    });
  }

  useEffect(() => {
    GetStory();
  }, []);
  

  return (
    <div className="buletin_story">
      <div className="posts_title">
        <h1>Buletin Story</h1>
      </div>

      <div className="story">
        {stories.length > 0 ?  stories.slice(0,8).map((story) => <Story key={story._id} {...story}></Story>) : <p>No Story available</p>}
      </div>
    </div>
  );
}

export default Buletin_story;
