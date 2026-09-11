import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/offres")({
  component: OffresLayout,
});

function OffresLayout() {
  return <Outlet />;
}
