import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";
import Cards from "./Cards";
import Skeleton from "../widgets/Skeleton";


function Categories() {
  const [Business, setBusiness] = useState("");
  const [Sport, setSport] = useState("");

  async function getByCategorie() {
    const res = await axios.get("/api/posts/category");

    setBusiness(res.data.Business);
    setSport(res.data.Sport);
  }


  useEffect(() => {
    getByCategorie();
  }, []);

  const skeletonData = Array(2).fill(null);

  return (
    <div className="Categories_section">
      <div className="title_section">
        <div className="business_posts">
          <div className="Categories_posts_title">
            <h1>Business</h1>
            <Link to={"/posts/business"} className="posts_title_link">
              <div>See all</div>
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          <div className="posts_cards">
            {Business.length > 0 ?
              Business.slice(0, 2).map((post) => (
                <Cards key={post._id} {...post}></Cards>
              )) :
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

        <div className="sports_cards">
          <div className="Categories_posts_title">
            <h1>Sport</h1>
            <Link to={"/posts/sport"} className="posts_title_link">
              <div>See all</div>
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
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          <div className="posts_cards">
            {Sport.length > 0 ?
              Sport.slice(0, 2).map((post) => (
                <Cards key={post._id} {...post}></Cards>
              )) : <>
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
      </div>
    </div>
  );
}

export default Categories;
