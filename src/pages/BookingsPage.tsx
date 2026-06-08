import { useState } from "react";

import { cancelBooking } from "../api";
import { useFetchBookings } from "../hooks";

import { isUpcoming } from "../utils/date";

import { AsyncBoundary } from "../components/AsyncBoundary";
import { BookingList } from "../components/BookingList";
import { LabeledSelect } from "../components/LabeledSelect";
import { Modal } from "../components/Modal";
import { Toast } from "../components/Toast";

const FILTER_OPTIONS = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

export function BookingsPage() {
  const [reloadKey, setReloadKey] = useState(0);
  const { bookings, loading, error } = useFetchBookings(reloadKey);
  const [filter, setFilter] = useState("upcoming");
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const filteredBookings = bookings.filter(({ eventDate }) =>
    filter === "upcoming" ? isUpcoming(eventDate) : !isUpcoming(eventDate),
  );

  const handleConfirmCancel = async () => {
    if (!cancelingId) {
      return;
    }

    await cancelBooking(cancelingId);
    setCancelingId(null);
    setReloadKey((key) => key + 1);
    setShowToast(true);
  };

  return (
    <>
      <h1>My Bookings</h1>

      <LabeledSelect
        label="Upcoming or Past"
        options={FILTER_OPTIONS}
        value={filter}
        onChange={setFilter}
      />

      <AsyncBoundary
        loading={loading}
        error={error}
        isEmpty={filteredBookings.length === 0}
        emptyMessage="No bookings yet"
      >
        <BookingList bookings={filteredBookings} onCancel={setCancelingId} />
      </AsyncBoundary>

      <Modal isOpen={cancelingId !== null} onClose={() => setCancelingId(null)}>
        <p>Cancel this booking?</p>
        <button type="button" onClick={handleConfirmCancel}>
          Yes, cancel
        </button>
        <button type="button" onClick={() => setCancelingId(null)}>
          Keep booking
        </button>
      </Modal>

      {showToast && (
        <Toast
          message="Booking cancelled"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
