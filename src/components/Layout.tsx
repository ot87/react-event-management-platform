import { NavLink, Outlet } from "react-router";
import { useTheme } from "../hooks";

function Layout() {
  const { theme, toggleTheme } = useTheme();

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

      <button type="button" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <Outlet />
    </div>
  );
}

export default Layout;
