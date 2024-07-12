import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DataGrid from "./DataGrid";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Is user logged in ? if not, redirect to login page
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <h2 className="text-center text-3xl font-bold leading-tight mt-5">
        {`Welcome ${user && user.username}`}
      </h2>
      <div className="mt-5">
        <DataGrid />
      </div>
    </>
  );
}

export default Dashboard;
