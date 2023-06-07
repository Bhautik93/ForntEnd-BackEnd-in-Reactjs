import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProfileValidation } from "./ProfileValidation";
import { toast } from "react-hot-toast";

const Profile = () => {
  // const [users, setUsers] = useState({
  //   name: "",
  //   email: "",
  // hobbies: ""
  // });

  // const { name, email } = users;

  // const [checkedValue, setCheckedValue] = useState([]);

  // const navigate = useNavigate()

  // const handleChange = (e) => {
  //   setUsers({ ...users, [e.target.name]: e.target.value });
  //   console.log({ ...users, [e.target.name]: e.target.value }, "23")
  // };

  // const checkboxValue = (e) => {
  //   const { value, checked } = e.target;
  //   console.log(`${value} is ${checked}`);
  //   if (checked) {
  //     setCheckedValue([...checkedValue, value]);
  //   } else {
  //     setCheckedValue(checkedValue && checkedValue.filter((e) => e !== value));
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     users.hobbies = checkedValue;
  //     const resp = await axios.put("http://localhost:8900/profile/update", users);
  //     console.log(resp)
  //     navigate('/dashboard')
  // toast.success("Profile Created")
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8900/get/listprofile"
  //       );
  //       setUsers(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const [users, setUsers] = useState({
    name: "",
    email: "",
    hobbies: [],
  });

  const [errors, setErrors] = useState({});

  // const [checkedValue, setCheckedValue] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const checkboxValue = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setUsers({ ...users, [name]: [...users[name], value] });
    } else {
      let finalValue = users[name] && users[name].filter((e) => e !== value);
      setUsers({ ...users, [name]: finalValue });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // users.hobbies = checkedValue;
    // console.log(checkedValue, "92");
    const errors = ProfileValidation(users)
    if (Object.keys(errors).length === 0) {
      await axios.put("http://localhost:8900/profile/put", users);
      navigate("/dashboard");
      toast.success("Profile updated")
    }
    else {
      setErrors(errors);
      toast.error("Profile was not updated");
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const userToken = JSON.parse(token)
      const response = await axios.get("http://localhost:8900/get/listprofile",{
        headers : {
          Authorization : `${userToken}`
        }
      });
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      <NavBar />
      <div className="main_div">
        <div className="container">
          <section className="vh-100">
            <div className="container-fluid">
              <div className="row">
                <div className="text-black d-flex justify-content-center">
                  <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 pt-xl-0 mt-xl-n5">
                    <form className="mt-4" onSubmit={handleSubmit}>
                      <span className="h1 fw-bold mb-5">Profile Page</span>
                      <div className="form-outline mt-4">
                        <label className="form-label" htmlFor="name">
                          Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="name"
                          name="name"
                          value={users.name}
                          onChange={(e) => handleChange(e)}
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
                          className="form-control"
                          type="email"
                          id="email"
                          name="email"
                          value={users.email}
                          onChange={(e) => handleChange(e)}
                        />
                        {errors.email && (
                          <p style={{ color: "red" }}>{errors.email}</p>
                        )}
                      </div>
                      <div className="form-outline mt-4 mb-4">
                        <label className="form-check-label" htmlFor="cricket">
                          Hobbies
                        </label>
                        <br></br>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="Cricket"
                            name="hobbies"
                            checked={users?.hobbies?.includes("Cricket")}
                            onChange={(e) => checkboxValue(e)}
                          />
                          <label className="form-check-label" htmlFor="Reading">
                            Cricket
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="Reading"
                            name="hobbies"
                            checked={users?.hobbies?.includes("Reading")}
                            onChange={(e) => checkboxValue(e)}
                          />
                          <label className="form-check-label" htmlFor="Reading">
                            Reading
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="Traveling"
                            name="hobbies"
                            checked={users?.hobbies?.includes("Traveling")}
                            onChange={(e) => checkboxValue(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="Traveling"
                          >
                            Traveling
                          </label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-info btn-xl btn-block"
                            type="submit"
                          >
                            Profile Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;
