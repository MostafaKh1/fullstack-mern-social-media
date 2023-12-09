import { setPosts } from "../../store/postSlice";
import { UseAppSelector, UseAppDispatch } from "../../store";

import CreatePost from "./CreatePost";
import PostList from "./PostList";
import { useEffect,  } from "react";
import { apiUrl } from  "../../config"

function Post() {
  const { user, token } = UseAppSelector((state) => state.user);
  const { posts } = UseAppSelector((state) => state.posts);
  // const [postData, setPostData] = useState(posts);
  const userPicture = user?.picturePath || "";
  const userId = user?._id || "";
  const userToken = token || "";
  const dispatch = UseAppDispatch();

  console

  const getPosts = async () => {
    const response = await fetch(`${apiUrl}/posts`, {
      method: "GET",
      headers: { Authorization: `Decode ${token}` },
    });

    const data = await response.json();
    dispatch(setPosts(data));
  };
  

  useEffect(() => {
    getPosts();

    console.log("data is Fetch");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps




  return (
    <div className="flex flex-col flex-1">
      <CreatePost image={userPicture} userId={userId} token={userToken} />
      <div className="pt-12 pb-8">
        <div className="flex flex-col gap-y-6 overflow-hidden">
          {
            posts?.map((post) => {
              return <PostList key={post._id} {...post} />;
            }).slice().reverse()}
        </div>
      </div>
    </div>
  );
}



export default Post;