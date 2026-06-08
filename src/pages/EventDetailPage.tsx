import { useParams } from "react-router";

import { useFetchEvent } from "../hooks";
import { AsyncBoundary } from "../components/AsyncBoundary";
import { EventDetails } from "../components/EventDetails";

export function EventDetailPage() {
  const { id } = useParams();
  const { event, loading, error } = useFetchEvent(id!);

  return (
    <>
      <h1>Event Details</h1>
      <AsyncBoundary
        loading={loading}
        error={error}
        isEmpty={event === null}
        emptyMessage="Event is not available"
      >
        {event && <EventDetails event={event} />}
      </AsyncBoundary>
    </>
  );
}
