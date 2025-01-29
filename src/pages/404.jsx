import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="error-page">
            <h1 className="error-page__title">404</h1>
            <h2 className="error-page__subtitle">Page not found</h2>
            <div className="error-page__text">
                <p>The page you are looking for does not exist.</p>
                <p>Please check the URL and try again.</p>
                <p>If the problem persists, please contact me.</p>
            </div>
            <Link to="/" className="error-page__link">Back to homepage</Link>
        </div>
    );
}

export default ErrorPage
