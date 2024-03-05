import axios from "axios";
import React, { useEffect, useState } from "react";
import Story from "../widgets/story";
import Skeleton from "../widgets/Skeleton";

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

  const skeletonData = Array(8).fill(null);

  return (
    <div className="buletin_story">
      <div className="posts_title">
        <h1>Buletin Story</h1>
      </div>

      <div className="story">
        {stories.length > 0 ? stories.slice(0, 8).map((story) => <Story key={story._id} {...story}></Story>) :
          <>
            {skeletonData.map((_, index) => (
              <div className="story_div">
                <Skeleton className={'story_div_img mt-1'} />
              </div>
            ))}
          </>}
      </div>
    </div>
  );
}

export default Buletin_story;
