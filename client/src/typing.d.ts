export interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  friends: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picturePath?: string;
  impression: number;
  viewedProfile: number;
}
