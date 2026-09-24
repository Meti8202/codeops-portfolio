import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import "./SignInPage.css";

const initialForm = { name: "", phone: "" };

function SignInPage() {
     const { user, signIn } = useAuth();
     const [form, setForm] = useState(initialForm);
     const location = useLocation();
     const navigate = useNavigate();

     const from = location.state?.from?.pathname || "/menu";

     function handleChange(e) {
          const { name, value } = e.target;
          setForm((prev) => ({ ...prev, [name]: value }));
     }

     function handleSubmit(e) {
          e.preventDefault();
          signIn(form);
          navigate(from, { replace: true });
     }

     if (user) return <Navigate to="/menu" replace />;

     return (
          <section className="auth-page">
               <div className="auth-card">
                    <h1>Welcome back</h1>
                    <p className="auth-intro">
                         Sign in to continue to checkout and place your order.
                    </p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                         <label htmlFor="name">Your name</label>
                         <input
                              id="name"
                              name="name"
                              type="text"
                              value={form.name}
                              onChange={handleChange}
                              autoComplete="name"
                              required
                         />

                         <label htmlFor="phone">Phone number</label>
                         <input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="09xxxxxxxx"
                              autoComplete="tel"
                              pattern="^09[0-9]{8}$"
                              title="Ethiopian phone: 09xxxxxxxx"
                              required
                         />

                         <button type="submit" className="auth-primary-button">
                              Sign in
                         </button>
                    </form>

                    <p className="auth-switch">
                         New to Addis Eats? <Link to="/register">Create an account</Link>.
                    </p>
               </div>
          </section>
     );
}

export default SignInPage;