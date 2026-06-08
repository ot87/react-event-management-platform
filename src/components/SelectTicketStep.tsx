import type { TicketType } from "../types";

interface SelectTicketStepProps {
  ticketTypes: TicketType[];
  ticketTypeId: string;
  selectedTicket: TicketType;
  quantity: number;
  total: number;
  selectTicket: (id: string) => void;
  setQuantity: (quantity: number) => void;
}

export function SelectTicketStep({
  ticketTypes,
  ticketTypeId,
  selectedTicket,
  quantity,
  total,
  selectTicket,
  setQuantity,
}: SelectTicketStepProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold">Step 1: Select Tickets</h3>

      <fieldset className="mt-3 space-y-2">
        <legend className="text-sm font-medium">Ticket type</legend>
        {ticketTypes.map((ticket) => (
          <label
            key={ticket.id}
            className="flex items-center gap-2 rounded border border-gray-200 px-3 py-2 dark:border-gray-700"
          >
            <input
              type="radio"
              name="ticketType"
              value={ticket.id}
              checked={ticket.id === ticketTypeId}
              onChange={() => selectTicket(ticket.id)}
            />
            <span>
              {ticket.name} - ${ticket.price} ({ticket.available} available)
            </span>
          </label>
        ))}
      </fieldset>

      <label className="mt-4 flex items-center gap-2">
        Quantity
        <input
          type="number"
          min={1}
          max={selectedTicket.available}
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Math.max(
                1,
                Math.min(Number(e.target.value), selectedTicket.available),
              ),
            )
          }
          className="w-20 rounded border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
        />
      </label>

      <p className="mt-4 font-semibold">Total: ${total}</p>
    </div>
  );
}
