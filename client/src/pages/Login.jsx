import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginUser } from "../api/users";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [type, setType] = useState("User");
  const [data, setData] = useState({});

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    data.userType = type;
    try {
      const response = await LoginUser({ data });
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-pattern w-full h-screen">
      <h1 className="p-3 mb-8 text-white bg-green-500 text-5xl font-bold">
        Tickets Hub.
      </h1>
      <Toaster />
      {/* Radiogroup */}
      <div className="flex w-full mb-4 justify-center gap-10">
        <div>
          <input
            type="radio"
            name="type"
            checked={type == "User"}
            value="User"
            id="user"
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="user">User</label>
        </div>
        <div>
          <input
            type="radio"
            name="type"
            value="Organiser"
            checked={type == "Organiser"}
            id="org"
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="org">Organiser</label>
        </div>
      </div>

      <form
        className="flex flex-col justify-center items-center card w-1/3 mx-auto p-8 rounded-md"
        onSubmit={loginSubmit}
      >
        <h2 className="text-2xl pb-4 font-bold">{type} Login</h2>
        <p className="text-sm pb-10">
          If you're already member, easily login here
        </p>

        {/* Email Input */}
        <div className="w-full">
          <label>Email</label>
          <br />
          <input
            className="w-full rounded-md outline-none mt-2 p-3"
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={updateData}
            required
            autoFocus
          />
        </div>

        {/* Password Input */}
        <div className="w-full pt-2">
          <label>Password</label>
          <br />
          <input
            className="w-full border-2 border-gray-200 outline-none rounded-md mt-2 p-3"
            type="password"
            onChange={updateData}
            name="password"
            placeholder="Enter password"
            required
          />
        </div>

        <button
          className=" active:scale-[.95] active:duration-100 transition-all mt-8 p-2 w-1/2 bg-white rounded-md hover:bg-green-500 ease-in"
          type="submit"
        >
          Login
        </button>

        <Link to="/register" className="mt-6 underline">
          New here? Click to register
        </Link>
      </form>
    </div>
  );
}

export default Login;
