import UserImage from "./UserImage";
import { MdLocationPin } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import useUserInfo from "../hooks/useUserInfo";

interface UserInfoProps {
  id: string;
}

export default function UserInfo({ id }: UserInfoProps) {
  const { user } = useUserInfo(id);

  const dataSocial = [
    {
      icon: (
        <AiFillInstagram
          size={28}
          className="text-[#9B999D] dark:text-gray-200"
        />
      ),
      title: "Instagram",
    },
    {
      icon: (
        <AiFillFacebook
          size={28}
          className="text-[#9B999D] dark:text-gray-200"
        />
      ),
      title: "Facebook",
    },
  ];

  const {
    firstName,
    lastName,
    location,
    occupation,
    impression,
    viewedProfile,
    picturePath,
  } = user || {};
  const Image = picturePath || "";
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`;

  return (
    <div className=" flex flex-col     md:w-[19rem] lg:w-[31rem]">
      <div className="bg-white shadow-lg py-8  px-4   rounded-xl dark:bg-darkMain">
      <div className=" flex  mb-2 pb-4 items-center">
        <div className="mx-auto">
          <UserImage picturePath={Image} />
        </div>
        <div>
          <h5 className="mb-2 text-xl">{fullName}</h5>
          <p>{`friends ${0}`}</p>
        </div>
      </div>
      <hr />
      <div className=" py-4">
        <div className="flex items-center gap-x-3 py-2">
          <span>
            <MdLocationPin
              size={25}
              className="text-[#9B999D] dark:text-gray-200"
            />
          </span>
          <p className="">{location}</p>
        </div>
        <div className="flex items-center gap-x-3 py-2">
          <span>
            <MdWork size={25} className="text-[#9B999D] dark:text-gray-200" />
          </span>
          <p className=" text-md lg:text-xl">{occupation}</p>
        </div>
      </div>
      <hr />
      <div className="py-4">
        <div className="flex mb-2 justify-between">
          <p className="text-sm md:text-base">who's viewed your profile</p>
          <span>{viewedProfile}</span>
        </div>
        <div className="flex justify-between">
          <p >impressions of your post</p>
          <span>{impression}</span>
        </div>
      </div>
      <hr />
      <div>
        <div className="px-2  pt-4 ">
          <h4 className="mb-3 text-[#9B999D] dark:text-gray-200 font-semibold">
            Social Profiles
          </h4>
          {dataSocial.length >= 2 &&
            dataSocial.map(({ icon, title }, index) => {
              return (
                <div
                  key={index}
                  className="flex py-1 justify-between items-center"
                >
                  <div className="flex gap-x-3 items-center">
                    <span>{icon}</span>
                    <div className="flex flex-col items-start">
                      <h5 className="text-lg text-[#9B999D] dark:text-gray-200">
                        {title}
                      </h5>
                      <div className="text-[#D8D6D8] dark:text-[#484748]">
                        Social Network
                      </div>
                    </div>
                  </div>
                  <div>
                    <MdOutlineEdit
                      className="text-[#9B999D] dark:text-gray-200"
                      size={22}
                    />
                  </div>
                </div>
              );
              // Add <hr /> except for the last item
            })}
        </div>
      </div>
      </div>
    </div>
  );
}
