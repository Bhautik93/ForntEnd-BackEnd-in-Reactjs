import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RegisterValidation } from "./RegisterValidation";
import { toast } from 'react-hot-toast'

const Register = () => {
  const [users, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const { name, email, password } = users;

  const handleChange = (e) => {
    setUser({ ...users, [e.target.name]: e.target.value });
    console.log(users, 17);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = RegisterValidation(users);
    if (Object.keys(errors).length === 0) {
      const response = await axios.post(
        "http://localhost:8900/post/create",
        users
      );
      localStorage.setItem("user-info", JSON.stringify(users));
      localStorage.setItem(
        "token",
        JSON.stringify(response?.data?.data?.token)
      );
      navigate("/success");
      toast.success("Registration Successful!");
    } else {
      setErrors(errors);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="main_div">
      <div className="container">
        <section className="vh-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6 text-black">
                <div className="px-5 ms-xl-4"></div>

                <div className="d-flex align-items-center mt-5 h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <form className="mt-4" onSubmit={handleSubmit}>
                    <span className="h1 fw-bold mb-5">Registration Form</span>

                    <div className="form-outline mt-4">
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter Your Name"
                      />
                      {errors.name && (
                        <p style={{ color: "red" }}>{errors.name}</p>
                      )}
                    </div>

                    <div className="form-outline mt-4 mb-4">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => handleChange(e)}
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter Your Password"
                      />
                      {errors.password && (
                        <p style={{ color: "red" }}>{errors.password}</p>
                      )}
                    </div>

                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-info btn-lg btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>

                    <p>
                      You have an account?{" "}
                      <Link to="/" className="link-info">
                        Login here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
              <div className="col-sm-6 px-0 d-none d-sm-block">
                <img
                  src="https://img.freepik.com/free-vector/pair-programming-concept-illustration_114360-2170.jpg?size=626&ext=jpg&ga=GA1.2.118170896.1679489746&semt=robertav1_2_sidr"
                  alt="Login img"
                  className="w-100 vh-100"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
