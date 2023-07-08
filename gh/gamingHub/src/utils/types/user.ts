

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  friends: string[];
  resetToken: string;
  userPicturePath: string;
};
