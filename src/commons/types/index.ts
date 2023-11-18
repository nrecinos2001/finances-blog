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
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  posts?: IPost[];
  createdAt: Date;
  deleted: boolean;
}