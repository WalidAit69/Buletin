import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import { BsImage } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import ReactQuillInput from "../components/ReactQuill";

function CreatePost() {
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [topic, settopic] = useState("");
  const [read, setread] = useState("");
  const [content, setcontent] = useState("");
  const [user, setuser] = useState("");
  const [image, setimage] = useState(null);
  const [files, setfiles] = useState("");
  const [filename, setfilename] = useState("No selected file");

  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const today = new Date();
  const date = format(today, "d MMMM yyyy");


  const { id } = useParams();

  const Userid = localStorage.getItem("UserID");

  function profile() {
    axios(`/api/profile/${Userid}`, {
      method: "get",
      withCredentials: true,
    }).then((response) => {
      setuser(response.data);
    });
  }


  async function createPost(e) {

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("topic", topic);
    data.set("read", read);
    data.set("content", content);
    data.set("file", files[0]);


    e.preventDefault();

    setisLoading(true);

    try {
      const response = await axios(`/api/post/${Userid}`, {
        method: "post",
        data: data,
        withCredentials: true,
      });
      console.log(response);
      setisLoading(false);
      if (response.status == 200) {
        setisLoading(false);
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setisLoading(false);
    }

  }

  useEffect(() => {
    profile();
  }, []);



  return (
    <section className="create-post">
      <div className="create-left">
        <div className="left-info">
          <h2>Post Showcase</h2>
        </div>

        <div className="cards-left">
          <div className="card">
            <div className="card_img">
              {image ? (
                <img src={image} width={"400px"} height={"300px"} alt="image" />
              ) : (
                <div className="card_img_empty">
                  <BsImage size={35} color="gray"></BsImage>
                </div>
              )}
            </div>

            <div className="card_info">
              <h4 className="card_name_date">
                {user.fullname} - {date}
              </h4>
              <h2 className="card_title">{title ? title : "Title"}</h2>
              <p className="card_description">
                {summary ? summary : "Summary"}
              </p>

              <div className="card_type">
                <p>{topic ? topic : "topic"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="create-right">
        <div className="right-title">
          <h2>Post Details</h2>
          <p>Complete your post details</p>
        </div>

        <form onSubmit={createPost} className="right-form">
          <div>
            <label htmlFor="" id="label">
              Add image <span>required</span>
            </label>
            <div className="image-form">
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                className="image-input"
                hidden
                required
                onChange={({ target: { files } }) => {
                  files[0] && setfilename(files[0].name);
                  if (files) {
                    setimage(URL.createObjectURL(files[0]));
                    setfiles(files);
                  }
                }}
              />
              {image ? (
                <img src={image} className="image"></img>
              ) : (
                <div className="img-upload">
                  <div>
                    <LuImagePlus size={40} className="add-icon"></LuImagePlus>
                  </div>

                  <div className="upload-info">
                    <h4>
                      Drag & drop your image here or browse your computer.
                    </h4>
                    <p>Support .jpg .png max 10mb</p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(".image-input").click();
                      }}
                    >
                      Add Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="file-name">
              <span>
                <AiFillFileImage color="#e70f1b"></AiFillFileImage>
                {filename}
              </span>
              <span>
                <MdDelete
                  size={20}
                  cursor={"pointer"}
                  onClick={() => {
                    setfilename("No selected file");
                    setimage(null);
                  }}
                ></MdDelete>
              </span>
            </div>
          </div>

          <div className="input">
            <label>Add title</label>
            <input
              value={title}
              type="text"
              placeholder="Ex: New Post Engagement"
              onChange={(e) => settitle(e.target.value)}
            />
          </div>

          <div className="input">
            <label>Add summary</label>
            <input
              value={summary}
              type="text"
              placeholder="Ex: Best ice cream in town"
              onChange={(e) => setsummary(e.target.value)}
            />
          </div>

          <div className="input">
            <label>Add topic</label>
            <input
              value={topic}
              type="text"
              placeholder="Ex: cars,architecture,design..."
              onChange={(e) => settopic(e.target.value)}
            />
          </div>

          <div className="input">
            <label>Minutes to read</label>
            <input
              value={read}
              type="text"
              placeholder="Ex: 5min,10min..."
              onChange={(e) => setread(e.target.value)}
            />
          </div>

          <div className="input">
            <label>Add description</label>
            <ReactQuillInput
              content={content}
              setcontent={setcontent}
            ></ReactQuillInput>
          </div>

          <div className="right-cta">
            <Link to={'/'}>
              <input type="button" id="cancel" value="Cancel" />
            </Link>
            {!isLoading ? <input type="submit" id="submit" value="Submit" />
              : <button id="submit"><span class="loader"></span></button>}
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreatePost;
