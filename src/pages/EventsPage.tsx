import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { useFetchEvents, useFiltersReducer } from "../hooks";
import { EventList } from "../components/EventList";
import { FilterSelect } from "../components/FilterSelect";
import { SearchInput } from "../components/SearchInput";
import { matchesDate } from "../utils/date";

const CATEGORY_OPTIONS = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Technology",
    label: "Technology",
  },
  {
    value: "Music",
    label: "Music",
  },
  {
    value: "Sports",
    label: "Sports",
  },
  {
    value: "Arts",
    label: "Arts",
  },
  {
    value: "Business",
    label: "Business",
  },
];
const DATE_OPTIONS = [
  { value: "", label: "Any" },
  { value: "upcoming", label: "Upcoming" },
  { value: "thisWeek", label: "This Week" },
  { value: "thisMonth", label: "This Month" },
];

export function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const handleOnCategoryChange = (value: string) => {
    setSearchParams(value === "All" ? {} : { category: value });
  };

  const { events, loading, error } = useFetchEvents(category);

  const [searchTerm, setSearchTerm] = useState("");

  const { filters, updateFilter } = useFiltersReducer();
  const handleOnDateChange = (value: string) => {
    updateFilter("date", value);
  };

  const filteredEvents = useMemo(
    () =>
      events
        .filter(({ title }) =>
          title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .filter(({ date }) => matchesDate(date, filters.date)),
    [events, searchTerm, filters.date],
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
      <FilterSelect
        label="Category"
        options={CATEGORY_OPTIONS}
        value={category ?? "All"}
        onChange={handleOnCategoryChange}
      />
      <FilterSelect
        label="Date"
        options={DATE_OPTIONS}
        value={filters.date}
        onChange={handleOnDateChange}
      />
      {content}
    </>
  );
}
