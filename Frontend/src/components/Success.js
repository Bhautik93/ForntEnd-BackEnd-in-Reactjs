import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  // toast.success("Welcome! Your Registration is successfully.");

  const Login = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-center">Registration Successfully</h1>
      <div className="pt-1 mb-4 text-center">
        <button
          className="btn btn-info btn-lg btn-block"
          onClick={Login}
          type="submit"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Success;
