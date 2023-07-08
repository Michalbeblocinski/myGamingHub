export type Likes = {
  [userId: string]: boolean;
};

export type Post = {
  _id: string;
  userID: string | null;
  userName: string;
  content: string;
  imagePath: string;
  userPicturePath: string;
  category: string;
  likes: Likes;
};
