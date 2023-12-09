import Dropzone from "react-dropzone";

import UserImage from "../UserImage";
import { useCallback, useState } from "react";
import { Button } from "@mui/material";
import { HiPhotograph, HiVideoCamera } from "react-icons/hi";
import { BsCalendarEventFill } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { setPosts } from "../../store/postSlice";
import { UseAppDispatch } from "./../../store/index";
import useWindowSize from "../../hooks/useWindowSize";
import { apiUrl } from "../../config";
interface CreatePostProps {
  userId: string;
  image: string;
  token: string;
}
function CreatePost({ userId, image, token }: CreatePostProps) {
  const [postText, setPostText] = useState<string>("");
  const [disableButton,setDisableButton] =  useState(false)
  const [imagePost, setImagePost] = useState<File | null>(null);
  const { width } = useWindowSize();
  const iconSize = width < 400 ? 20 : 28;
  const dispatch = UseAppDispatch();

  const handlePost = async () => {
    if (!imagePost && !postText) {
      return true;
    }

    setDisableButton(true)

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", postText);
    if (imagePost) {
      formData.append("picture", imagePost);
      formData.append("picturePath", imagePost.name);
    }

   try {
    const response = await fetch(`${apiUrl}/posts`, {
      method: "POST",
      headers: { Authorization: `Decode ${token}` },
      body: formData,
    });
    setDisableButton(true)
    const posts = await response.json();
    if (posts) {
      dispatch(setPosts(posts));
      setImagePost(null);
      setPostText("");
      setDisableButton(false)
    }
   } catch (error) {
    console.error('Error posting:', error);
   } 
   finally {
    setDisableButton(false); 
  }
  };

  const memoizedHandlePost = useCallback(handlePost, [
    dispatch,
    token,
    userId,
    imagePost,
    postText,
  ]);
  //  md:w-[25rem] lg:w-[37.5rem]
  return (
    <div className="rounded-xl  flex flex-col  bg-white  w-full shadow-lg border border-gray-200   p-3  dark:bg-darkMain  dark:border-gray-950">
      <div className="flex flex-col  gap-y-4 gap-x-4 w-full  justify-between items-center md:flex-row">
        <UserImage picturePath={image} />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPostText(e.target.value)
          }
          value={postText}
          type="text"
          className="w-full border text-black  border-gray-400 bg-white rounded-full h-[50px] dark:text-darkText dark:bg-darkTwo dark:border-darkMain placeholder:dark:text-darkText text-sm "
          placeholder="Start Post ..."
        />
      </div>
      <div className="py-4">
        <Dropzone
          multiple={false}
          onDrop={(acceptedFiles: File[]) => {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const file = acceptedFiles[0];
            if (file && allowedTypes.includes(file.type)) {
              setImagePost(acceptedFiles[0]);
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className=" p-4 w-full cursor-pointer rounded-lg mt-4 border  border-green-400"
            >
              <input {...getInputProps()} />
              {!imagePost ? (
                <div className="flex">
                  <span className=" dark:text-green-300">Add Picture Here</span>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className=" text-sm   max-w-[600px] ">{imagePost?.name}</p>
                  <Button>
                    <MdOutlineEdit size={iconSize} className="text-gray-200" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </div>
      <div className="flex justify-between items-center px-0 py-2 md:px-3">
        <Button className="flex  flex-col  md:flex-row gap-y-1 items-center gap-x-2">
          <HiPhotograph size={iconSize} className="text-green-700 " />
          <span className=" text-xs md:text-sm">Photo</span>
        </Button>
        <Button className="flex flex-col  md:flex-row gap-y-1  items-center  gap-x-2">
          <HiVideoCamera size={iconSize} className="text-red-800" />
          <span className=" text-xs md:text-sm">Video</span>
        </Button>
        <div className="hidden md:block">
          <Button className="flex  flex-col  gap-y-1 md:flex-row  items-center  gap-x-2">
            <BsCalendarEventFill size={iconSize} className="text-orange-300" />
            <span className=" text-xs md:text-sm">Event</span>
          </Button>
        </div>
        <div className="">
          <Button
            variant="contained"
            size={width < 400 ? "small" : "medium"}
            color="success"
            onClick={memoizedHandlePost}
            disabled={disableButton}
            
          >
           <span className="text-white"> Post</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
