import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";
import { getPrincipal } from "@/lib/auth";

export default async function DashboardPage() {
  const principal = await getPrincipal();
  if (!principal) redirect("/login");
  return <DashboardClient principal={principal} />;
}
