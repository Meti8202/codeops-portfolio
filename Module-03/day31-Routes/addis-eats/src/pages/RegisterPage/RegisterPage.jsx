import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import "./RegisterPage.css";

const initialForm = { name: "", phone: "" };

function RegisterPage() {
     const { user, register } = useAuth();
     const [form, setForm] = useState(initialForm);
     const navigate = useNavigate();

     function handleChange(e) {
          const { name, value } = e.target;
          setForm((prev) => ({ ...prev, [name]: value }));
     }

     function handleSubmit(e) {
          e.preventDefault();
          register(form);
          navigate("/menu", { replace: true });
     }

     if (user) return <Navigate to="/menu" replace />;

     return (
          <section className="auth-page">
               <div className="auth-card">
                    <h1>Create an account</h1>
                    <p className="auth-intro">
                         Create an account to continue to checkout and place your order.
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
                              Create account
                         </button>
                    </form>

                    <p className="auth-switch">
                         Already have an account? <Link to="/signin">Sign in</Link>.
                    </p>
               </div>
          </section>
     );
}

export default RegisterPage;