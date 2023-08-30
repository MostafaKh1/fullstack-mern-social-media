import Dropzone from "react-dropzone";

import UserImage from "../UserImage";
import { useState } from "react";
import { Button } from "@mui/material";
import { HiPhotograph, HiVideoCamera } from "react-icons/hi";
import { BsCalendarEventFill } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";

interface CreatePostProps {
  userId: string;
  image: string;
  token: string;
}
function CreatePost({ userId, image, token }: CreatePostProps) {
  const [isImage, setIsImage] = useState(false);
  const [postText, setPostText] = useState<string>("");
  const [imagePost, setImagePost] = useState<File | null>(null);
  const iconSize = 28;

  const handlePost = async () => {
    if (!imagePost && !postText) {
      return true;
    }
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", postText);
    if (imagePost) {
      formData.append("picture", imagePost);
      formData.append("picturePath", imagePost.name);
    }

    const response = await fetch(`http://localhost:5000/posts`, {
      method: "POST",
      headers: { Authorization: `Decode ${token}` },
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    setImagePost(null);
    setIsImage(false);
    setPostText("");
  };
  return (
    <div className="rounded-xl   bg-white  md:w-[400px] lg:w-[600px] shadow-lg border border-gray-200  p-4  dark:bg-darkMain  dark:border-gray-950">
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
        {isImage && (
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
                    <span className=" dark:text-green-300">
                      Add Picture Here
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className=" text-sm   max-w-[600px] ">
                      {imagePost?.name}
                    </p>
                    <Button>
                      <MdOutlineEdit
                        size={iconSize}
                        className="text-gray-200"
                      />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        )}
      </div>
      <div className="flex justify-between items-center px-0 py-2 md:px-3">
        <Button
          className="flex  flex-col  md:flex-row gap-y-1 items-center gap-x-2"
          onClick={() => setIsImage(!isImage)}
        >
          <HiPhotograph size={iconSize} className="text-green-700 " />
          <span className=" text-sm">Photo</span>
        </Button>
        <Button className="flex flex-col  md:flex-row gap-y-1  items-center  gap-x-2">
          <HiVideoCamera size={iconSize} className="text-red-800" />
          <span className=" text-sm">Video</span>
        </Button>
        <Button className="flex flex-col gap-y-1 md:flex-row  items-center  gap-x-2">
          <BsCalendarEventFill size={iconSize} className="text-orange-300" />
          <span className=" text-sm">Event</span>
        </Button>
        <div>
          <Button variant="contained" color="success" onClick={handlePost}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
