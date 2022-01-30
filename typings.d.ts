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
