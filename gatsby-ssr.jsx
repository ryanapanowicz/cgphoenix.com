import React from "react";
import PageWrapper from "./src/components/PageWrapper";
import TransitionProvider from "./src/components/TransitionProvider";

export const wrapRootElement = ({ element }) => (
    <TransitionProvider>{element}</TransitionProvider>
);

export const wrapPageElement = ({ element, props }) => (
    <PageWrapper {...props}>{element}</PageWrapper>
);

export const onRenderBody = ({
    setBodyAttributes,
    setHtmlAttributes,
    setPreBodyComponents,
}) => {
    setHtmlAttributes({
        className: "h-full",
    });
    setBodyAttributes({
        className: "flex h-full flex-col bg-coal",
    });
    setPreBodyComponents([
        <noscript id="gatsby-noscript" key="noscript">
            This website needs Javascript enabled.
        </noscript>,
        <div
            id="overlay"
            key="overlay"
            className="flex fixed h-screen w-screen bg-coal z-10 overflow-hidden"
        >
            <div className="flex flex-col justify-center items-center h-screen w-screen">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="85"
                    height="80"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    className="scale-95"
                >
                    <defs>
                        <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#E5E7EB" />
                            <stop offset="100%" stopColor="#1B1B1D" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        strokeDasharray="128 128"
                        d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                        strokeLinecap="round"
                        className="animate-lemniscate"
                    ></path>
                </svg>
            </div>
        </div>,
    ]);
    return;
};
