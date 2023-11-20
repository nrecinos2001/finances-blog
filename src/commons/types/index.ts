export interface ILoggedUser {
  id: string;
  username: string;
}

export interface IPost {
  id: string;
  title: string;
  description: string;
  likes: number;
  // comments
  createdBy?: IUser;
  userId: string;
  createdAt: Date;
  receivedLikes?: ILikes[];
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  posts?: IPost[];
  createdAt: Date;
  deleted: boolean;
  givenLikes?: ILikes[];
}

export interface ILikes {
  id: string;
  userId: string;
  postId: string;
  user?: IUser;
  post?: IPost;
  createdAt: Date;
}
