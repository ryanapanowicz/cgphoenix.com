import * as React from "react";
import Layout from "../components/Layout";

// markup
const NotFoundPage = () => {
    return (
        <Layout className="bg-neutral-200">
            <main
                data-scroll-section
                className="flex flex-col items-center justify-center min-h-screen text-center"
            >
                <title>Server Error</title>
                <h1 className="mb-4 text-2xl text-coal px-8">
                    Sorry, something went wrong. Please try again later.
                </h1>
            </main>
        </Layout>
    );
};

export default NotFoundPage;
