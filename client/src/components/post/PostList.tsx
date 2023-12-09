import { PostsInterface } from "../../typing";
import { memo } from "react";
import Friends from "../Friends";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";
import { UseAppSelector, UseAppDispatch } from "../../store";
import { setPost } from "../../store/postSlice";
import { apiUrl } from "../../config";

function PostList({
  _id, // post ID
  userId,
  firstName,
  lastName,
  location,
  description,
  userPicturePath,
  likes,
  picturePath,
}: PostsInterface) {
  const { user, token } = UseAppSelector((state) => state.user);
  const userLoggedIn = user?._id || "";
  const dispatch = UseAppDispatch();
  const likeCount = Object.keys(likes).length;
  const isLiked: boolean = Boolean(
    (likes as unknown as Record<string, boolean>)[userLoggedIn]
  );

  const patchLike = async () => {
    const response = await fetch(`${apiUrl}/posts/${_id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Decode ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userLoggedIn }),
    });
    const updateLike = await response.json();
    console.log(updateLike);
    dispatch(setPost(updateLike));
  };

  return (
    <div className="rounded-xl   bg-white  w-full h-auto shadow-lg border border-gray-200  p-4  pb-2 dark:bg-darkMain  dark:border-gray-950">
      <div className=" items-center">
        <Friends
          fullName={`${firstName} ${lastName}`}
          userPicturePath={userPicturePath}
          location={location}
          friendId={userId}
        />
      </div>
      <div className="py-4 ">
        <p className="text-sm text-black  dark:text-darkText">{description}</p>
      </div>
      {picturePath && (
        <div className="w-full max-h-[400px] py-4 overflow-hidden">
          <img
            src={`${apiUrl}/assets/${picturePath}`}
            className="w-full max-h-[400px] object-cover object-center"
            alt="Post Image"
          />
        </div>
      )}
      <div className="mt-2 pt-1">
        <Button color="success" onClick={patchLike}>
          {isLiked ? <Favorite /> : <FavoriteBorder />}
          <span>{likeCount}</span>
        </Button>
      </div>
    </div>
  );
}

const MemoizedPostList = memo(PostList);

export default MemoizedPostList;
