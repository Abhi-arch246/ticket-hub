import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { RegisterUser } from "../api/users";

function Register() {
  const [type, setType] = useState("User");
  const [data, setData] = useState({});

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    data.userType = type;
    try {
      if (data.password === data.cpassword) {
        delete data.cpassword;

        const response = await RegisterUser({ data });
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error("Password's doesn't match");
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
        className={
          type == "User"
            ? "flex flex-col justify-center items-center card w-1/2 mx-auto py-6 rounded-md"
            : "flex flex-col justify-center items-center card w-3/4 mx-auto py-6 rounded-md"
        }
        onSubmit={registerSubmit}
      >
        <h2 className="text-2xl pb-4 font-bold">{type} Register</h2>
        <p className="text-sm pb-6">
          If you're not a member, easily register here
        </p>

        {/* User Register */}
        {type == "User" && (
          <>
            <div className="grid grid-cols-2 gap-x-20 gap-y-6">
              <div className="">
                <label>Name</label>
                <br />
                <input
                  className="rounded-md outline-none mt-2 p-3"
                  type="text"
                  placeholder="Enter Name"
                  onChange={updateData}
                  name="name"
                  required
                  autoFocus
                />
              </div>
              <div className="">
                <label>Email</label>
                <br />
                <input
                  className="rounded-md outline-none mt-2 p-3"
                  type="email"
                  onChange={updateData}
                  placeholder="Enter email"
                  name="email"
                  required
                />
              </div>
              <div className="">
                <label>Password</label>
                <br />
                <input
                  className="outline-none rounded-md mt-2 p-3"
                  type="password"
                  onChange={updateData}
                  name="password"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="">
                <label>Confirm Password</label>
                <br />
                <input
                  className="outline-none rounded-md mt-2 p-3"
                  type="password"
                  onChange={updateData}
                  name="cpassword"
                  placeholder="Enter confirm password"
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* Org Register */}
        {type !== "User" && (
          <>
            <div className="grid grid-cols-3 gap-x-20 gap-y-6">
              <div className="">
                <label>Owner Name</label>
                <br />
                <input
                  className="rounded-md outline-none mt-2 p-3"
                  type="text"
                  placeholder="Enter Owner Name"
                  name="ownername"
                  onChange={updateData}
                  required
                  autoFocus
                />
              </div>
              <div className="">
                <label>Email</label>
                <br />
                <input
                  className="rounded-md outline-none mt-2 p-3"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={updateData}
                  required
                />
              </div>
              <div className="">
                <label>Organisation name</label>
                <br />
                <input
                  className="outline-none rounded-md mt-2 p-3"
                  type="text"
                  name="orgname"
                  onChange={updateData}
                  placeholder="Enter organisation name"
                  required
                />
              </div>
              <div className="">
                <label>Phone</label>
                <br />
                <input
                  className="outline-none rounded-md mt-2 p-3"
                  type="number"
                  name="phone"
                  onChange={updateData}
                  placeholder="Enter phone"
                  required
                />
              </div>
              <div className="">
                <label>Website</label>
                <br />
                <input
                  className="outline-none rounded-md mt-2 p-3"
                  type="text"
                  name="website"
                  onChange={updateData}
                  placeholder="Enter website name"
                  required
                />
              </div>
              <div className="">
                <label>Organisation ID</label>
                <br />
                <input
                  className="border-2 border-gray-200 outline-none rounded-md mt-2 p-3"
                  type="text"
                  name="orgid"
                  onChange={updateData}
                  placeholder="Enter Organisation ID"
                  required
                />
              </div>
              <div className="">
                <label>Password</label>
                <br />
                <input
                  className="border-2 col-start-2 border-gray-200 outline-none rounded-md mt-2 p-3"
                  type="password"
                  name="password"
                  onChange={updateData}
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="">
                <label>Confirm Password</label>
                <br />
                <input
                  className="border-2 border-gray-200 outline-none rounded-md mt-2 p-3"
                  type="password"
                  name="cpassword"
                  onChange={updateData}
                  placeholder="Enter confirm password"
                  required
                />
              </div>
            </div>
          </>
        )}

        <button
          className=" active:scale-[.95] active:duration-100 transition-all mt-8 p-2 w-1/4 bg-white rounded-md hover:bg-green-500 ease-in"
          type="submit"
        >
          Register
        </button>
        <Link to="/" className="mt-6 underline">
          Already Member? Click to login
        </Link>
      </form>
    </div>
  );
}

export default Register;
