import "./App.css";
import "./components/Main_Card.jsx";
import Main_Card from "./components/Main_Card.jsx";
import Cards from "./components/Cards";
import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import { useEffect, useState } from "react";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import ProfilePage from "./pages/ProfilePage";
import Categories from "./components/Categories";
import TopCreator from "./components/TopCreator";
import CreateStory from "./pages/CreateStory";
import Buletin_story from "./components/Buletin_story";
import axios from "axios";
import ProfilesPage from "./pages/ProfilesPage";
import AllPosts from "./pages/AllPosts";
import MustRead from "./components/EditorPick";
import Contact from "./widgets/Contact";
import Skeleton from "./widgets/Skeleton.jsx";


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  const [posts, setposts] = useState([]);
  const [unsortedposts, setunsortedposts] = useState([]);
  const [isStory, setisStory] = useState(null);
  const [user, setuser] = useState("");
  const areCookiesEmpty = document.cookie === "";



  function Profile() {
    axios("/api/profile", {
      method: "get",
      withCredentials: true,
    }).then((response) => {
      setuser(response.data);
    });
  }

  async function Posts() {
    const res = await axios("/api/posts")
    setposts(res.data);
    {
      areCookiesEmpty && localStorage.setItem("UserID", "");
    }
  }

  function GetAllPosts() {
    axios.get(`/api/Allposts`).then((res) => {
      setunsortedposts(res.data)
    });
  }

  useEffect(() => {
    setisStory(false);
    Posts();
    Profile();
    GetAllPosts();
  }, []);

  const skeletonData = Array(4).fill(null);

  return (
    <UserContextProvider>
      <Routes>
        <Route
          index
          element={
            <main>
              <Header></Header>
              <div className="container">
                <div className="title">
                  <h4>WELCOME TO BULETIN</h4>
                  <h1>
                    Craft narratives that ignite <span>inspiration </span>,
                    <span> knowledge </span>, and<span> entertainment</span>.
                  </h1>
                </div>

                <Main_Card posts={posts}></Main_Card>

                <div className="posts">
                  <div className="posts_title">
                    <h1>Latest Posts</h1>
                    <Link to={"/posts/latest"} className="posts_title_link">
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

                  {posts.length > 0
                    ? posts
                      .slice(0, 4)
                      .map((post) => <Cards key={post._id} {...post}></Cards>)
                    : <div className="posts">
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
                </div>

                <Buletin_story></Buletin_story>
                <MustRead unsortedposts={unsortedposts}></MustRead>
                <Categories></Categories>
                <TopCreator></TopCreator>
                <Contact></Contact>
              </div>
            </main>
          }
        />
        <Route path={"/login"} element={<LoginPage></LoginPage>} />
        <Route path={"/register"} element={<RegisterPage></RegisterPage>} />
        <Route
          path={"/create/:id"}
          element={
            <>
              <Header></Header> <CreatePost></CreatePost>
            </>
          }
        />
        <Route
          path={"/post/:id"}
          element={
            <>
              <Header></Header> <PostPage></PostPage>
            </>
          }
        />
        <Route
          path={"/edit/:id"}
          element={
            <>
              <Header></Header> <EditPost></EditPost>
            </>
          }
        />
        <Route
          path={"/profile/:id"}
          element={
            <>
              <Header></Header> <ProfilePage></ProfilePage>
            </>
          }
        />
        <Route
          path={"/user/:id"}
          element={
            <>
              <Header></Header> <ProfilesPage></ProfilesPage>
            </>
          }
        />
        <Route
          path={"/posts/:topic"}
          element={
            <>
              <Header></Header> <AllPosts></AllPosts>
            </>
          }
        />
        <Route
          path={"/story/:id"}
          element={
            <>
              <Header isStory={isStory} setisStory={setisStory}></Header>{" "}
              <CreateStory
                isStory={isStory}
                setisStory={setisStory}
              ></CreateStory>
            </>
          }
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
