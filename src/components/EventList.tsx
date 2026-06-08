import type { Event } from "../types";
import { EventCard } from "./EventCard";

type EventListProps = {
  events: Event[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
};

export function EventList({
  events,
  favorites,
  onToggleFavorite,
}: EventListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isFavorite={favorites.has(event.id)}
          onToggleFavorite={() => onToggleFavorite(event.id)}
        />
      ))}
    </div>
  );
}
