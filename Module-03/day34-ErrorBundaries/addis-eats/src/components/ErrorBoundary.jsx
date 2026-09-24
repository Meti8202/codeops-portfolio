import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
     state = { error: null };

     static getDerivedStateFromError(error) {
          return { error };
     }

     componentDidCatch(error, info) {
          console.error("ErrorBoundary caught:", error, info);
     }

     handleRetry = () => {
          this.setState({ error: null });
     };

     render() {
          if (this.state.error) {
               if (this.props.fallback) {
                    return this.props.fallback;
               }

               return (
                    <section className="error-fallback">
                         <h2>Something went wrong</h2>
                         <p>
                              {this.props.message ||
                                   "This part of the app failed. The rest should still work."}
                         </p>
                         <div className="error-fallback-actions">
                              <button type="button" onClick={this.handleRetry}>
                                   Try again
                              </button>
                              <Link to="/menu">Back to menu</Link>
                         </div>
                    </section>
               );
          }

          return this.props.children;
     }
}

export default ErrorBoundary;