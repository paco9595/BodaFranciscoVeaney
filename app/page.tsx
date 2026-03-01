import { redirect } from "next/navigation";

export default function Home() {
  // Cambia "ejemplo" por el ID de invitación por defecto al que quieras redirigir.
  redirect("/404");
}
