import { GroupAdd, GroupRemove } from "@mui/icons-material";
import UserImage from "./UserImage";
import { Button } from "@mui/material";
import { UseAppSelector } from "../store";
import { UseAppDispatch } from "./../store/index";
import { setFriends } from "../store/authSlice";
import { apiUrl } from "../config";

interface FriendsProps {
  friendId: string;
  fullName: string;
  location: string;
  userPicturePath: string;
}

function Friends({
  friendId,
  fullName,
  location,
  userPicturePath,
}: FriendsProps) {
  const { user, token } = UseAppSelector((state) => state.user);
  const id = user?._id || "";
  const dispatch = UseAppDispatch();

  const isFriend = user?.friends.find((friend) => friend._id === friendId);
  const sameUser = user?._id === friendId;

  const addFriend = async () => {
    if (!sameUser) {
      const response = await fetch(
        `${apiUrl}/users/${id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Decode ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      dispatch(setFriends(data));
    }
  };

  return (
    <div className="flex justify-between ">
      <div className="flex gap-x-4  items-center">
        <UserImage picturePath={userPicturePath} />
        <div className="flex  px-4 flex-col">
          <h5 className="text-xl">{fullName}</h5>
          <span className="text-sm">{location}</span>
        </div>
      </div>
      <div>
        {!sameUser && (
          <Button
            onClick={() => addFriend()}
            color={isFriend ? "error" : "primary"}
          >
            {isFriend ? <GroupRemove /> : <GroupAdd />}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Friends;
