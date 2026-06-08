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
      <h1 className="mb-4 text-2xl font-bold">My Bookings</h1>

      <div className="mb-6 max-w-xs">
        <LabeledSelect
          label="Show"
          options={FILTER_OPTIONS}
          value={filter}
          onChange={setFilter}
        />
      </div>

      <AsyncBoundary
        loading={loading}
        error={error}
        isEmpty={filteredBookings.length === 0}
        emptyMessage="No bookings yet"
      >
        <BookingList bookings={filteredBookings} onCancel={setCancelingId} />
      </AsyncBoundary>

      <Modal isOpen={cancelingId !== null} onClose={() => setCancelingId(null)}>
        <h3 className="text-lg font-semibold">Cancel this booking?</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          This action cannot be undone.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={handleConfirmCancel}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Yes, cancel
          </button>
          <button
            type="button"
            onClick={() => setCancelingId(null)}
            className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Keep booking
          </button>
        </div>
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
