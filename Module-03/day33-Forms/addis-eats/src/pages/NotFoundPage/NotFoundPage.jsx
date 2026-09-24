import { Link } from "react-router-dom";

function NotFoundPage() {
     return (
          <section className="page">
               <h1>404 — Page not found</h1>
               <p>The page you requested does not exist.</p>
               <Link to="/">Return home</Link>
          </section>
     );
}

export default NotFoundPage;