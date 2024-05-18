

const ErrorPage = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/dMSJRfs/error-page.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Oops!</h1>
                        <p className="mb-5">Something went wrong, please try again.</p>
                        <button className="btn btn-primary"><a href="/">Go Home</a></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
``
export default ErrorPage;