import { redirect } from "next/navigation";
import { getPrincipal } from "@/lib/auth";

export default async function HomePage() {
  redirect((await getPrincipal()) ? "/dashboard" : "/login");
}
