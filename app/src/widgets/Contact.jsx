import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="container Contact_page">
      <div className="Contact_page_layout">
        <div className="Contact_title">
          <p>Get first update</p>
          <h1>
            Get the news in front line <br /> <span>Subscribe </span> to get
            our latest updates
          </h1>
        </div>

        <div className="Contact_form">
          <input type="email" placeholder="Your email" name="" id="" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
