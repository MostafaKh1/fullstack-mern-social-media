import { UseAppSelector } from "../../store";
import CreatePost from "./CreatePost";

function index() {
  const { user, token } = UseAppSelector((state) => state.user);
  const userPicture = user?.picturePath || "";
  const userId = user?._id || "";
  const userToken = token || "";

  return (
    <div>
      <CreatePost image={userPicture} userId={userId} token={userToken} />
      <div>Post HERE</div>
    </div>
  );
}

export default index;
