import React, { useState } from "react";
import "../pages/ProfilePage.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

function Security_details({ user }) {
  // const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");
  // const [oldpassword, setoldpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const { id } = useParams();

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email address"),
    oldpassword: yup.string().required("Password is required"),
    password: yup.string().min(6, 'Password must be at least 6 characters long')
      .max(20, 'Password cannot exceed 20 characters'),
  });


  const formik = useFormik({
    initialValues: {
      email: "",
      oldpassword: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = new FormData();
      data.set("email", email.value);
      data.set("password", password.value);
      data.set("oldpassword", oldpassword.value);

      const config = {
        method: "PUT",
        url: `/api/user/${id}`,
        data: data,
        withCredentials: true,
      };

      setisLoading(true);
      axios(config)
        .then((res) => {
          setisLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          setisLoading(false);
          toast.error(err.response.data);
        });
    },
  });


  const toasts = () => {
    toast.error(formik.errors?.email);
    toast.error(formik.errors?.password);
    toast.error(formik.errors?.oldpassword);

  };

  return (
    <form className="security_info" onSubmit={formik.handleSubmit}>
      <div className="profile_inputs">
        <label htmlFor="">Email</label>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={user.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
      </div>

      <div className="profile_inputs">
        <label htmlFor="">
          Password <span>required</span>
        </label>
        <div>
          <input
            type="password"
            id="oldpassword"
            name="oldpassword"
            placeholder="Current Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldpassword}
          />
        </div>
      </div>

      <div className="profile_inputs">
        <label htmlFor="">New Password</label>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="New Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {/* {formik.touched.password && formik.errors.password ? (
            toast.error(formik.errors.password)
          ) : null} */}
        </div>
      </div>

      <div className="security_btns">
        {!isLoading ? <button type="submit" className="profile-btn" onClick={toasts}>
          Update
        </button> : <button className="profile-btn"><span class="loader"></span></button>}
        <button className="profile-btn">Cancel</button>
      </div>
      <ToastContainer></ToastContainer>
    </form>
  );
}

export default Security_details;
