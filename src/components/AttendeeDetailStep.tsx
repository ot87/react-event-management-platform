import { validateAttendee } from "../utils/validation";
import type { Attendee } from "../types";

interface AttendeeDetailStepProps {
  attendees: Attendee[];
  updateAttendee: (
    index: number,
    field: "name" | "email" | "phone",
    value: string,
  ) => void;
}

const inputClass =
  "mt-1 block w-full rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800";
const errorClass = "text-sm text-red-600 dark:text-red-400";

export function AttendeeDetailStep({
  attendees,
  updateAttendee,
}: AttendeeDetailStepProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold">Step 2: Attendee Details</h3>

      <div className="mt-3 space-y-4">
        {attendees.map((attendee, index) => {
          const errors = validateAttendee(attendee);

          return (
            <div
              key={index}
              className="space-y-2 rounded border border-gray-200 p-3 dark:border-gray-700"
            >
              <p className="font-medium">Attendee {index + 1}</p>

              <label className="block text-sm">
                Name
                <input
                  name={`name${index}`}
                  value={attendee.name}
                  onChange={(e) =>
                    updateAttendee(index, "name", e.target.value)
                  }
                  className={inputClass}
                />
              </label>
              {errors.name && (
                <span role="alert" className={errorClass}>
                  {errors.name}
                </span>
              )}

              <label className="block text-sm">
                Email
                <input
                  name={`email${index}`}
                  value={attendee.email}
                  onChange={(e) =>
                    updateAttendee(index, "email", e.target.value)
                  }
                  className={inputClass}
                />
              </label>
              {errors.email && (
                <span role="alert" className={errorClass}>
                  {errors.email}
                </span>
              )}

              <label className="block text-sm">
                Phone
                <input
                  name={`phone${index}`}
                  value={attendee.phone}
                  onChange={(e) =>
                    updateAttendee(index, "phone", e.target.value)
                  }
                  className={inputClass}
                />
              </label>
              {errors.phone && (
                <span role="alert" className={errorClass}>
                  {errors.phone}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
