import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
     return (
          <section className="home-page">
               <div className="home-hero">
                    <p className="home-eyebrow">Ethiopian food, made with care</p>
                    <h1>Welcome to Addis Eats</h1>
                    <p className="home-lead">
                         Discover traditional stews, tibs, kitfo, and fasting platters —
                         prepared for sharing around the communal table.
                    </p>
                    <div className="home-actions">
                         <Link className="home-primary" to="/menu">
                              Explore the menu
                         </Link>
                         <Link className="home-secondary" to="/featured">
                              View specials
                         </Link>
                    </div>
               </div>

               <div className="home-features">
                    <article className="home-card">
                         <h2>Traditional recipes</h2>
                         <p>
                              Slow-simmered wats, crisp tibs, and classic kitfo — the flavours of
                              Addis in every dish.
                         </p>
                    </article>
                    <article className="home-card">
                         <h2>Order in minutes</h2>
                         <p>
                              Browse the menu, add what you like to your cart, and check out when
                              you are ready.
                         </p>
                    </article>
                    <article className="home-card">
                         <h2>Chef’s specials</h2>
                         <p>
                              A rotating selection of highlighted dishes chosen for tradition and
                              flavour. See what is on today.
                         </p>
                    </article>
               </div>
          </section>
     );
}

export default Home;