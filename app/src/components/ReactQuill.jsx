import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../pages/CreatePost.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];


function ReactQuillInput({content , setcontent }) {
  return (
    <ReactQuill
      className="desc"
      value={content}
      modules={modules}
      formats={formats}
      placeholder='Content'
      onChange={(newValue) => setcontent(newValue)}
    ></ReactQuill>
  );
}

export default ReactQuillInput;
