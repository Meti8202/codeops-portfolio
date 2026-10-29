"use client";

import { useActionState } from "react";
import { signIn } from "../actions";

export default function SignInForm({ next }) {
     const [state, formAction, pending] = useActionState(signIn, null);

     return (
          <form action={formAction} className="space-y-5">
               <input type="hidden" name="next" value={next} />

               <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-1">
                         Phone
                    </label>
                    <input
                         id="phone"
                         name="phone"
                         placeholder="0911121314"
                         className="w-full border border-[var(--line)] rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
                         required
                    />
                    {state?.error && (
                         <p role="alert" className="text-red-600 text-sm mt-1.5">
                              {state.error}
                         </p>
                    )}
               </div>

               <p className="text-xs text-[var(--muted)]">
                    0911121314 (customer) ,     0900000000 (staff)
               </p>

               <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-[var(--brand)] text-white px-6 py-3 rounded-full font-bold hover:bg-[var(--brand-dark)] disabled:opacity-50 transition"
               >
                    {pending ? "Signing in…" : "Sign in"}
               </button>
          </form>
     );
}