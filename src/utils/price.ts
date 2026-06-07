import type { Event } from "../types";

export function minPrice(event: Event): number {
  return Math.min(...event.ticketTypes.map((ticket) => ticket.price));
}

export function matchesPrice(event: Event, priceFilter: string): boolean {
  if (!priceFilter) {
    return true;
  }

  const price = minPrice(event);

  switch (priceFilter) {
    case "free":
      return price === 0;
    case "under50":
      return price > 0 && price < 50;
    case "over50":
      return price >= 50;
    default:
      return true;
  }
}
