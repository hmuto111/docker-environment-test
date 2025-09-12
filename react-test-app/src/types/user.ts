export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

export interface UserRequest {
  name: string;
  email: string;
}
