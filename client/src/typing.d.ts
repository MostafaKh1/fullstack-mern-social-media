export interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  friends: FriendInterface[];
  email: string;
  password: string;
  location: string;
  occupation: string;
  picturePath?: string;
  impression: number;
  viewedProfile: number;
}
export interface PostsInterface {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  picturePath: string;
  description: string;
  userPicturePath: string;
  likes: Map<string, string>;
  comments: string[];
}

interface FriendInterface {
  _id: string;
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  picturePath: string;
}
