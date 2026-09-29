import { createFileRoute } from "@tanstack/react-router";
import { MuseumApp } from "@/components/game/MuseumApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <MuseumApp />;
}
