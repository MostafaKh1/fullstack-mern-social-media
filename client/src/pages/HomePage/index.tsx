import React from "react";
import Navbar from "../../components/Navbar";
import UserInfo from "../../components/UserInfo";
import { UseAppSelector } from "../../store/";

function homePage() {
  const { user } = UseAppSelector((state) => state.user);
  const userId = user?._id || "";

  return (
    <div className="h-screen bg-gray-100 dark:bg-black ">
      <Navbar />
      <div className="container w-screen pt-8 pb-4  flex flex-col  gap-y-8   md:justify-between md:flex-row md:gap-y-0">
        <UserInfo id={userId} />
        <div>POST HERE</div>
        <div>Friends HERE</div>
      </div>
    </div>
  );
}

export default homePage;
