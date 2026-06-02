import { getEvents } from "../api";
import { useFetch } from "./useFetch";

export function useFetchEvents() {
  const { data, loading, error } = useFetch(getEvents, []);

  return { events: data ?? [], loading, error };
}
