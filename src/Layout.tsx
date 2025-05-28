import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/app">App</Link>
      <h1>Parent Content</h1>
      <Outlet />
    </div>
  );
}
