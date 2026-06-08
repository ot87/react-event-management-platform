# Event Booking App

A single-user event booking application. Browse events, filter and sort them, book tickets through a multi-step flow, view your bookings, and cancel upcoming ones. Includes a persistent light/dark theme.

The user is hardcoded (`userId: "user1"`, no authentication). The backend is a local [json-server](https://github.com/typicode/json-server) reading from `db.json`.

## Tech stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** (v4) for styling
- **React Router** (v7) for navigation
- **json-server** for the REST backend
- Data fetching with plain `fetch` inside `useEffect` (no data-fetching library)

## Prerequisites

- **Node.js 20+** (developed on Node 24)
- **Yarn** (the project uses a `yarn.lock`)

## Setup & running

Install dependencies:

```bash
yarn
```

The app needs **two processes running at the same time**, in two terminals:

**1. Start the backend (json-server)** on port 3001:

```bash
yarn server
```

This serves `db.json` at `http://localhost:3001`. Leave it running.

**2. Start the frontend (Vite dev server):**

```bash
yarn dev
```

Open the URL Vite prints (default `http://localhost:5173`).

> The frontend expects the backend at `http://localhost:3001`. If json-server isn't running, the app shows error states.

### Other scripts

```bash
yarn build     # type-check and build for production
yarn preview   # preview the production build
yarn lint      # run ESLint
```

## Features / how to use

- **Events** (`/`) — card grid of events. Search by title, filter by category / date (Upcoming, This Week, This Month) / price (Free, Under $50, $50+), sort by date or price, and favorite events (persisted in `localStorage`).
- **Event details** (`/events/:id`) — full event info and ticket types; **Book Tickets** opens the booking modal.
- **Booking flow** — a 3-step modal: select ticket type + quantity (live total) → attendee details (validated) → confirm and submit. Shows a booking reference and a success toast.
- **My Bookings** (`/bookings`) — your bookings, filterable by Upcoming / Past. Upcoming bookings can be cancelled (with a confirmation dialog).
- **Theme** — light/dark toggle in the header; the choice persists across reloads.

## Required React concepts — where each lives

| Concept                       | File(s)                                                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Component composition & props | `components/EventList.tsx` → `EventCard.tsx`, `components/BookingList.tsx` → `BookingCard.tsx`, `components/Layout.tsx`, booking step components |
| `useState`                    | `pages/EventsPage.tsx` (search, sort), `hooks/useFavorites.ts`, dialog/modal state across pages                                                  |
| `useReducer`                  | `reducers/booking.reducer.ts` (3-step booking flow), `reducers/filters.reducer.ts` (event filters)                                               |
| `useEffect` (data fetching)   | `hooks/useFetch.ts` (generic fetch lifecycle), used by `useFetchEvents` / `useFetchEvent` / `useFetchBookings`                                   |
| Context API                   | `context/theme-context.ts` + `ThemeContext.tsx` (theme), `context/user-context.ts` + `UserContext.tsx` (user)                                    |
| Refs                          | `components/SearchInput.tsx` (auto-focus the search input on mount)                                                                              |
| Portals                       | `components/Modal.tsx` (booking + confirm dialog), `components/Toast.tsx` (notifications)                                                        |
| Conditional rendering         | `components/AsyncBoundary.tsx` (loading / error / empty states)                                                                                  |
| List rendering + keys         | `components/EventList.tsx`, `BookingList.tsx`, `AttendeeDetailStep.tsx`                                                                          |
| Event handling                | filters, forms, and buttons throughout (e.g. `EventFilters.tsx`, `BookingFlow.tsx`)                                                              |
| Form handling + validation    | `components/AttendeeDetailStep.tsx` + `utils/validation.ts`                                                                                      |
| Memo / performance            | `pages/EventsPage.tsx` — `useMemo` over the filter + sort pipeline                                                                               |

## Architecture notes

- **Data layer** — `api/` holds plain `fetch` wrappers for the five endpoints. `hooks/useFetch.ts` is a generic hook that owns the `data` / `loading` / `error` lifecycle; thin wrappers (`useFetchEvents`, etc.) supply the specific request.
- **State** — event filters and the booking flow each use a `useReducer`. Theme and user are global via Context. Favorites and theme persist to `localStorage`.
- **Shared UI patterns** — `AsyncBoundary` centralizes loading/error/empty rendering so every list/detail page handles them consistently; `Modal` and `Toast` render through a Portal into `#modal-root`.
- **Folder layout** — `api/`, `components/`, `context/`, `hooks/`, `pages/`, `reducers/`, `types/`, `utils/`.

## API endpoints (json-server)

- `GET /events` (optionally `?category=`)
- `GET /events/:id`
- `GET /bookings?userId=user1`
- `POST /bookings`
- `PATCH /bookings/:id` (cancellation sets `status` to `"cancelled"`)
