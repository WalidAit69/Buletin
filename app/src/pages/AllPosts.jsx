import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { useParams } from "react-router-dom";
import Skeleton from "../widgets/Skeleton";

function AllPosts() {
  const [posts, setposts] = useState("");
  const [Business, setBusiness] = useState("");
  const [Sport, setSport] = useState("");
  const [isloading, setisloading] = useState(true);

  const { topic } = useParams();

  async function GetPosts() {
    try {
      const res = await axios.get("/api/posts");
      setposts(res.data);
      setisloading(false);
    } catch (error) {
      setisloading(false);
      alert('No Posts')
    }

  }

  async function getByCategorie() {
    try {
      const res = await axios.get("/api/posts/category");
      setBusiness(res.data.Business);
      setSport(res.data.Sport);
      setisloading(false);
    } catch (error) {
      setisloading(false);
      alert('No Posts');
    }
  }

  useEffect(() => {
    GetPosts();
    getByCategorie();
  }, []);

  const skeletonData = Array(12).fill(null);

  return (
    <div>
      {topic === "latest" ? (
        <>
          {" "}
          <div className="posts_page">
            <h1>All Latest Posts</h1>
          </div>
          <div className="posts_page">
            {posts.length > 0
              ? posts.map((post) => <Cards key={post._id} {...post}></Cards>)
              : <div className="posts_page">
                {skeletonData.map((_, index) => (
                  <div key={index} className="card">
                    <Skeleton className={'card_img'} />
                    <div>
                      <Skeleton className={'mt-2'} height='16px' width='200px' />
                      <Skeleton className={'mt-1'} height='13px' width='200px' />
                    </div>
                  </div>
                ))}
              </div>}
          </div>{" "}
        </>
      ) : topic === "business" ? (
        <>
          {" "}
          <div className="posts_page">
            <h1>All Business Posts</h1>
          </div>
          <div className="posts_page">
            {Business.length > 0
              ? Business.map((post) => <Cards key={post._id} {...post}></Cards>)
              : <div className="posts_page">
                {skeletonData.map((_, index) => (
                  <div key={index} className="card">
                    <Skeleton className={'card_img'} />
                    <div>
                      <Skeleton className={'mt-2'} height='16px' width='200px' />
                      <Skeleton className={'mt-1'} height='13px' width='200px' />
                    </div>
                  </div>
                ))}
              </div>}
          </div>{" "}
        </>
      ) : topic === "sport" ? (
        <>
          {" "}
          <div className="posts_page">
            <h1>All Sport Posts</h1>
          </div>
          <div className="posts_page">
            {Sport.length > 0
              ? Sport.map((post) => <Cards key={post._id} {...post}></Cards>)
              : <div className="posts_page">
                {skeletonData.map((_, index) => (
                  <div key={index} className="card">
                    <Skeleton className={'card_img'} />
                    <div>
                      <Skeleton className={'mt-2'} height='16px' width='200px' />
                      <Skeleton className={'mt-1'} height='13px' width='200px' />
                    </div>
                  </div>
                ))}
              </div>}
          </div>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default AllPosts;
