import type { Booking } from "../types";
import { fetchData } from "./client";

export async function getBookings(
  userId: Booking["userId"],
): Promise<Booking[]> {
  return fetchData("GET", `/bookings?userId=${userId}`);
}

export async function createBooking(
  data: Omit<Booking, "id">,
): Promise<Booking> {
  return fetchData("POST", "/bookings", data);
}

export async function cancelBooking(id: Booking["id"]): Promise<Booking> {
  return fetchData("PATCH", `/bookings/${id}`, { status: "cancelled" });
}
