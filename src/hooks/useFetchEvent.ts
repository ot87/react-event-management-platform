import type { Event } from "../types";
import { getEvent } from "../api";
import { useFetch } from "./useFetch";

export function useFetchEvent(id: Event["id"]) {
  const { data, loading, error } = useFetch(() => getEvent(id), [id]);

  return { event: data, loading, error };
}
