import React, { useEffect, useState } from "react";
import UserImage from "./UserImage";
import { UserInterface } from "../typing";
import { UseAppSelector } from "../store";

interface UserInfoProps {
  id: string;
}
export default function UserInfo({ id }: UserInfoProps) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const { token } = UseAppSelector((state) => state.user);
  const {
    firstName,
    lastName,
    location,
    occupation,
    impression,
    viewedProfile,
    picturePath,
    friends,
    email,
  } = user || {};

  console.log(user);

  const fullName = `${firstName ?? ""} ${lastName ?? ""}`;
  const getUserDate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "GET",
        headers: { Authorization: `Decode ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      // You might want to set an error state here to display an error message to the user
    }
  };

  useEffect(() => {
    getUserDate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="py-8  px-4 flex flex-col bg-white w-[450px] h-[500px] rounded-xl dark:bg-darkMain">
      {user && (
        <>
          <div className=" flex  mb-4 pb-4 items-center">
            <div className="mx-auto">
              <UserImage />
            </div>
            <div>
              <h5 className="mb-2 text-xl">{fullName}</h5>
              <p>{`friends ${0}`}</p>
            </div>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}
