import { EventList } from "../components/EventList";
import { useFetchEvents } from "../hooks";

function EventsPage() {
  const { events, loading, error } = useFetchEvents();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (events.length === 0) {
    return <p>No events available</p>;
  }

  return (
    <>
      <h1>EventsPage</h1>
      <EventList events={events} />
    </>
  );
}

export default EventsPage;
