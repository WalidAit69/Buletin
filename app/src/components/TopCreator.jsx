import axios from "axios";
import React, { useEffect } from "react";

function TopCreator() {
  async function GetUsers() {
    const res = await axios.get("/api/users");

  }

  useEffect(() => {
    GetUsers();
  }, []);

  return <div></div>;
}

export default TopCreator;
