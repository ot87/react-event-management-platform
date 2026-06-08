import { useUser } from "../hooks";

export function ProfilePage() {
  const { userId, name } = useUser();

  return (
    <>
      <h1>ProfilePage</h1>
      <p>User Id: {userId}</p>
      <p>User Name: {name}</p>
    </>
  );
}
