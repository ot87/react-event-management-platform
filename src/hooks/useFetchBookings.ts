import { getBookings } from "../api";
import { useFetch } from "./useFetch";

export function useFetchBookings(reloadKey: number = 0) {
  const userId = "user1";
  const { data, loading, error } = useFetch(
    () => getBookings(userId),
    [userId, reloadKey],
  );

  return { bookings: data ?? [], loading, error };
}
