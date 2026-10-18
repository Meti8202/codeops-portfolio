import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import SignInForm from "./SignInForm";

export default async function SignInPage({ searchParams }) {
  const user = await getSession();
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/";

  if (user) {
    if (next.startsWith("/") && !next.startsWith("//")) {
      redirect(next);
    }
    redirect("/");
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-2">Sign in</h1>
     
      <SignInForm next={next} />
    </div>
  );
}
