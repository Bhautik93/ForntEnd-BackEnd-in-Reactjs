import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
      // console.log(userInfo, 14);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userToken = JSON.parse(token)
    axios
      .get("http://localhost:8900/get/listprofile", {
        headers : {
          Authorization : `${userToken}`
        }
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div>
        <div className="text-center">
          <h1>Welcome {user.name}</h1>
        </div>
        <div className="text-center">
          <h2>Your Hobbies</h2>
          {data?.hobbies && data?.hobbies.map((item, index) => {
           return ( <div key={index}>{item}</div>)
          }) }
        </div>
      </div>
    </>
  );
};

export default Home;
