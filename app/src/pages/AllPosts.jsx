import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { useParams } from "react-router-dom";

function AllPosts() {
  const [posts, setposts] = useState("");
  const [Business, setBusiness] = useState("");
  const [Sport, setSport] = useState("");

  const { topic } = useParams();

  function GetPosts() {
    axios.get("/api/posts").then((res) => {
      setposts(res.data);
    });
  }

  async function getByCategorie() {
    const res = await axios.get("/api/posts/category");

    setBusiness(res.data.Business);
    setSport(res.data.Sport);
  }

  useEffect(() => {
    GetPosts();
    getByCategorie();
  }, []);

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
              : "No posts"}
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
              : "No posts"}
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
              : "No posts"}
          </div>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default AllPosts;
