import { Link } from "react-router";
import type { Event } from "../types";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const priceFrom = Math.min(...event.ticketTypes.map((t) => t.price));

  return (
    <Link
      to={`/events/${event.id}`}
      className="block rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
        {event.category}
      </span>
      <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {event.date} · {event.location}
      </p>
      <p className="mt-2 text-sm font-medium">
        {priceFrom === 0 ? "Free" : `Starts from $${priceFrom}`}
      </p>
    </Link>
  );
}
