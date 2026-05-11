export interface User {
  id: number;
  email: string;
  username: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}
