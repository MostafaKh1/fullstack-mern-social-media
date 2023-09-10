import { GroupAdd, GroupRemove } from "@mui/icons-material";
import UserImage from "./UserImage";
import { Button } from "@mui/material";
import { UseAppSelector } from "../store";
import { UseAppDispatch } from "./../store/index";
import { setFriend } from "../store/authSlice";

interface FriendsProps {
  userPostId: string;
  fullName: string;
  location: string;
  userPicturePath: string;
}

function Friends({
  userPostId,
  fullName,
  location,
  userPicturePath,
}: FriendsProps) {
  const { user, token } = UseAppSelector((state) => state.user);
  const id = user?._id || "";
  const dispatch = UseAppDispatch();

  const isFriend = user?.friends.find((friend) => friend._id === userPostId);
  const sameUser = user?._id === userPostId;

  const addFriend = async () => {
    if (!sameUser) {
      const response = await fetch(
        `http://localhost:5000/users/${id}/${userPostId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Decode ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      dispatch(setFriend(data));
    }
  };

  return (
    <>
      <div className="flex gap-x-4 items-center">
        <UserImage picturePath={userPicturePath} />
        <div className="flex flex-col">
          <h5>{fullName}</h5>
          <span>{location}</span>
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
    </>
  );
}

export default Friends;
