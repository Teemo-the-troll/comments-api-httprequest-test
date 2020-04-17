export interface ReturnedData {
  access_token: string;
  user: User;
  users: User[];
}
export interface CommentPage {
  comments: Comment[];
  page: number;
  page_count: number;
}
export interface UserPage {
  users: User[];
  page: number;
  page_count: number
}

export interface User {
  email: string;
  id: number;
  username: string;
}

export interface Comment {
  body: string;
  user_id: number;
  id: number;
  author_id: Author;
}

export interface Author {
  id: number;
  email: string;
  username: string;
}
