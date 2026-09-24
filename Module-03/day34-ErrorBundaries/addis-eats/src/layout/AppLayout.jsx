import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./AppLayout.css";

function AppLayout() {
     return (
          <div className="app-layout">
               <Header />
               <main className="app-main">
                    <Outlet />
               </main>
               <Footer />
          </div>
     );
}

export default AppLayout;