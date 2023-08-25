import React from "react";
import Navbar from "../../components/Navbar";
import UserInfo from "../../components/UserInfo";
import { UseAppSelector } from "../../store/";

function homePage() {
  const { user } = UseAppSelector((state) => state.user);
  return (
    <div className="h-screen bg-slate-100  dark:bg-black ">
      <Navbar />
      <div className="container py-16 gap-x-12 flex justify-between">
        <UserInfo id={user?._id} />
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default homePage;
