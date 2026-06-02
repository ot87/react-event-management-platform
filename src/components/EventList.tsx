import type { Event } from "../types";
import EventCard from "./EventCard";

type EventListProps = {
  events: Event[];
};

export function EventList({ events }: EventListProps) {
  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
