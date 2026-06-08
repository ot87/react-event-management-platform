import type { Booking } from "../types";
import { BookingCard } from "./BookingCard";

type BookingListProps = {
  bookings: Booking[];
  onCancel: (id: string) => void;
};

export function BookingList({ bookings, onCancel }: BookingListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  );
}
