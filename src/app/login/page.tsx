import { redirect } from "next/navigation";
import { getPrincipal } from "@/lib/auth";
import LoginForm from "./login-form";

export default async function LoginPage() {
  if (await getPrincipal()) redirect("/dashboard");
  return <LoginForm />;
}
