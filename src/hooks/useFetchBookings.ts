import { getBookings } from "../api";
import { useFetch } from "./useFetch";
import { useUser } from "./useUser";

export function useFetchBookings(reloadKey: number = 0) {
  const { userId } = useUser();
  const { data, loading, error } = useFetch(
    () => getBookings(userId),
    [userId, reloadKey],
  );

  return { bookings: data ?? [], loading, error };
}
