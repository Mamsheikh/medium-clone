export interface Post {
  category: string;
  content: string;
  createdAt: string;
  id: string;
  published: boolean;
  thumbnail: string;
  title: string;
  updatedAt: string;
  userId: string;
  user: {
    email: string;
    emailVerified: null;
    id: string;
    image: string;
    isAdmin: boolean;
    name: string;
  };
}

export interface Comment {
  content: string;
  id: string;
  postId: string;
  user: {
    string;
    email: string;
    emailVerified: null;
    id: string;
    image: string;
    isAdmin: boolean;
    name: string;
  };
  userId: string;
}
