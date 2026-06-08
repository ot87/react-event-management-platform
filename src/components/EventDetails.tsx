import type { Event } from "../types";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <div>
        <span>{event.date}</span>
        <span>{event.time}</span>
      </div>
      <div>{event.location}</div>
      <div>Hosted by {event.organizerName}</div>
      <div>
        <div>Ticket Types</div>
        {event.ticketTypes.map(({ id, name, price, available }) => (
          <div key={id}>
            <div>{name}</div>
            <div>
              <span>{price}</span>
              <span>{available}</span>
            </div>
          </div>
        ))}
      </div>
      <button>Book Tickets</button>
    </div>
  );
}
