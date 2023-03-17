import * as React from "react";
import Layout from "../components/Layout";
import Link from "../components/Link";

// markup
const NotFoundPage = () => {
    return (
        <Layout className="bg-neutral-200">
            <main
                data-scroll-section
                className="flex flex-col items-center justify-center min-h-screen text-center"
            >
                <title>Not found</title>
                <h1 className="mb-4 text-2xl text-coal px-8">
                    Sorry, we couldn’t find what you were looking for.
                </h1>
                <Link
                    to="/"
                    className="inline-block rounded-lg py-1 text-coal font-medium"
                >
                    <svg
                        width="23"
                        height="20"
                        viewBox="0 0 18 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline mr-4"
                    >
                        <path
                            className="fill-coal"
                            d="M14 8.2c.4 0 .8-.4.8-.7s-.4-.7-.8-.7-.8.2-.8.7c.1.5.4.7.8.7zm2.2-.7c0-.5.4-.7.8-.7s.7.3.7.7c0 .4-.4.7-.8.7-.3 0-.7-.2-.7-.7zM8.1.5c.3.2.3.7 0 1L2.7 6.8H11c.4 0 .8.4.8.7s-.4.7-.8.7H2.7l5.4 5.3c.3.2.3.7 0 1-.3.2-.8.2-1 0L.4 8c-.1-.1-.1-.3-.1-.4 0-.2.1-.4.2-.5L7 .6c.4-.4.8-.4 1.1-.1z"
                            fill="#fff"
                        />
                    </svg>
                    Go Home
                </Link>
            </main>
        </Layout>
    );
};

export default NotFoundPage;
