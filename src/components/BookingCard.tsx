import type { Booking } from "../types";
import { isUpcoming } from "../utils/date";

type BookingCardProps = {
  booking: Booking;
  onCancel: (id: string) => void;
};

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  const ticketCount = booking.tickets.reduce(
    (count, ticket) => count + ticket.quantity,
    0,
  );
  const canCancel =
    booking.status === "confirmed" && isUpcoming(booking.eventDate);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
        {booking.status}
      </span>
      <h3 className="mt-2 text-lg font-semibold">{booking.eventTitle}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {booking.eventDate}
      </p>
      <p className="mt-1 text-sm">
        {ticketCount} {ticketCount === 1 ? "ticket" : "tickets"}
      </p>
      <p className="mt-2 text-sm font-medium">Total: ${booking.totalAmount}</p>
      {canCancel && (
        <button
          type="button"
          onClick={() => onCancel(booking.id)}
          className="mt-3 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
