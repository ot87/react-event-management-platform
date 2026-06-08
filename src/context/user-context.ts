import { createContext } from "react";

export interface User {
  userId: string;
  name: string;
}

export const UserContext = createContext<User | null>(null);
