import { Button } from "@mui/material";
import { PostsInterface } from "../../typing";
import React from "react";
import UserImage from "../UserImage";
import { GroupAdd } from "@mui/icons-material";

function PostList({
  firstName,
  lastName,
  location,
  comments,
  description,
  userPicturePath,
  likes,
  picturePath,
}: PostsInterface) {
  console.log(picturePath);
  return (
    <div className="rounded-xl   bg-white  md:w-[300px] lg:w-[700px] shadow-lg border border-gray-200  p-4  dark:bg-darkMain  dark:border-gray-950">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <UserImage picturePath={userPicturePath} />
          <div className="flex flex-col">
            <h5>{`${firstName} ${lastName}`}</h5>
            <span>{location}</span>
          </div>
        </div>
        <div>
          <Button>
            <GroupAdd />
          </Button>
        </div>
      </div>
      <div className="py-8">
        <p className="text-sm text-black dark:text-darkText">{description}</p>
      </div>
      {picturePath && (
        <div className="w-full max-h-[400px] overflow-hidden">
          <img
            src={`http://localhost:5000/assets/${picturePath}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
    </div>
  );
}

export default PostList;
