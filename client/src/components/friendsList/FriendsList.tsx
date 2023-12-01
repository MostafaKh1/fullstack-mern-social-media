import { UseAppDispatch, UseAppSelector } from "./../../store/index";
import { setFriends } from "../../store/authSlice";
import { useEffect } from "react";
import Friends from "../Friends";
import { apiUrl } from "../../config";

interface FriendsListProps {
  userId: string;
}

function FriendsList({ userId }: FriendsListProps) {
  const { token, user } = UseAppSelector((state) => state.user);
  const friends = user?.friends || [];
  const dispatch = UseAppDispatch();

  const getFriends = async () => {
    const response = await fetch(
      `${apiUrl}/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Decode ${token}`,
        },
      }
    );
    const friendsList = await response.json();
    dispatch(setFriends(friendsList));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {friends.length >= 1 && (
        <div className="  w-full  flex flex-col  gap-y-4   h-auto">
          {friends.map(
            ({ firstName, _id, lastName, location, picturePath }) => {
              return (
                <div
                  className="w-full p-4  rounded-lg bg-white dark:bg-darkMain"
                  key={_id}
                >
                  <Friends
                    friendId={_id}
                    fullName={`${firstName} ${lastName}`}
                    location={location}
                    userPicturePath={picturePath}
                  />
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default FriendsList;
