import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoginValidation } from "./LoginValidation";
import { toast } from "react-hot-toast";

const Login = () => {
  const [users, setUser] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const { name, password } = users;

  const handleChange = (e) => {
    setUser({ ...users, [e.target.name]: e.target.value });
    console.log(users, 17);
  };

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("user-info"));
  //   if (userInfo) {
  //     navigate("/");
  //   }
  //   else {
  //     navigate('/dashboard')
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = LoginValidation(users);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8900/post/login",
          users
        );
        localStorage.setItem("user-info", JSON.stringify(users));
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        if ("user-info") {
          navigate("/dashboard");
          toast.success("Login Successful");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        toast.error("Login failed");
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="main_div">
      <div className="container">
        <section className="vh-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6 text-black">
                <div className="d-flex align-items-center mt-5 h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <form className="mt-5" onSubmit={handleSubmit}>
                    <span className="h1 fw-bold mb-3">Login Form</span>
                    <div className="form-outline mt-4 mb-4">
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
                        placeholder="Enter name or email"
                      />
                      {errors.name && (
                        <p style={{ color: "red" }}>{errors.name}</p>
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
                        placeholder="Enter a password"
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
                        Login
                      </button>
                    </div>

                    <p>
                      Don't have an account?
                      <Link to="/register" className="link-info">
                        Register here
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

export default Login;
