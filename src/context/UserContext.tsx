import { UserContext, type User } from "./user-context";

interface UserContextProviderProps {
  children: React.ReactNode;
}

const USER: User = { userId: "user1", name: "Demo User" };

export function UserContextProvider({ children }: UserContextProviderProps) {
  return <UserContext.Provider value={USER}>{children}</UserContext.Provider>;
}
