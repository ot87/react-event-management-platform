import { useState } from "react";

import { useFetchEvents } from "../hooks";
import { EventList } from "../components/EventList";
import { SearchInput } from "../components/SearchInput";

export function EventsPage() {
  const { events, loading, error } = useFetchEvents();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter(({ title }) =>
    title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  let content;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (filteredEvents.length === 0) {
    content = <p>No events found</p>;
  } else {
    content = <EventList events={filteredEvents} />;
  }

  return (
    <>
      <h1>EventsPage</h1>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      {content}
    </>
  );
}
