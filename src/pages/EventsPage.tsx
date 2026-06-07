import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { useFetchEvents, useFiltersReducer } from "../hooks";
import { EventFilters } from "../components/EventFilters";
import { EventList } from "../components/EventList";
import { SearchInput } from "../components/SearchInput";
import { matchesDate } from "../utils/date";
import { matchesPrice } from "../utils/price";

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const handleOnCategoryChange = (value: string) => {
    setSearchParams(value === "All" ? {} : { category: value });
  };

  const { events, loading, error } = useFetchEvents(category);

  const [searchTerm, setSearchTerm] = useState("");
  const { filters, updateFilter } = useFiltersReducer();

  const filteredEvents = useMemo(
    () =>
      events
        .filter(({ title }) =>
          title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .filter(({ date }) => matchesDate(date, filters.date))
        .filter((event) => matchesPrice(event, filters.price)),
    [events, searchTerm, filters.date, filters.price],
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
      <EventFilters
        category={category}
        filters={filters}
        onCategoryChange={handleOnCategoryChange}
        updateFilter={updateFilter}
      />
      {content}
    </>
  );
}
