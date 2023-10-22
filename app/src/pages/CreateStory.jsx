import React, { useEffect, useRef, useState } from "react";
import "./CreateStory.css";
import { LuImagePlus } from "react-icons/lu";
import { AiFillFileImage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateStory({ isStory, setisStory }) {
  const [image, setimage] = useState(null);
  const [files, setfiles] = useState("");
  const [filename, setfilename] = useState("No selected file");
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisStory(true);
  }, [isStory]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('file', files[0])
    try {
      setisLoading(true);
      const res = await axios('/api/story', {
        method: "post",
        data: data,
        withCredentials: true,
      })
      console.log(res);
      navigate('/')
    } catch (error) {
      setisLoading(false);
      console.error(error);
    }

  };

  return (
    <section className="story_section">
      <form ref={formRef} className="right-form form__story">
        <div className="container story_container">
          <div>
            <h1 className="text-center">Create Story</h1>
            <div>
              <div className="image-form story-form">
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  className="image-input"
                  hidden
                  onChange={({ target: { files } }) => {
                    files[0] && setfilename(files[0].name);
                    if (files) {
                      setimage(URL.createObjectURL(files[0]));
                      setfiles(files);
                    }
                  }}
                />
                {image ? (
                  <img src={image} className="image story"></img>
                ) : (
                  <div className="img-upload story-upload">
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

              <div className="file-name file-name-story">
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
          </div>

          {!isLoading ? <div className="story-btn">
            <a href="#" className="button" onClick={handleSubmit}>
              <div className="button__line"></div>
              <div className="button__line"></div>
              {<span className="button__text">POST</span>}
            </a>
          </div> : <div className="story-btn"><span class="bigloader"></span></div>}
        </div>
      </form>
    </section>
  );
}

export default CreateStory;
