import { NavLink, Outlet } from "react-router";

function Layout() {
  return (
    <div>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Events
        </NavLink>
        <NavLink
          to="/bookings"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          My Bookings
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Profile
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}

export default Layout;
