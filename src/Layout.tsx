import { Link, Outlet } from "react-router";
import { Separator } from "./components/ui/separator";

export default function Layout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex flex-row">
        <Link to="/">Home</Link>
        <Separator orientation="vertical" />
        <Link to="/app">App</Link>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
