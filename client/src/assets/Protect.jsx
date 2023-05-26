import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GetCurrentUser } from "../api/users";
import { useNavigate } from "react-router-dom";

function Protect({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        toast.success(response.message);
        setCurrentUser(response.data);
      } else toast.error(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      getCurrentUser();
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      {currentUser && <h1>{currentUser?.name}</h1>}
      {children}
      <Toaster />
    </>
  );
}

export default Protect;
