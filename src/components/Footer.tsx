import React from "react";

export interface FooterProps {
    scrollTop?: boolean;
    theme?: "light" | "dark";
    className?: string;
}

const Footer: React.FC<FooterProps> = ({
    scrollTop = false,
    theme = "dark",
    className,
}) => {
    const textPrimary = theme === "light" ? "text-coal" : "text-neutral-100";
    const fillPrimary = theme === "light" ? "fill-coal" : "fill-neutral-100";

    return (
        <footer>
            <div
                className={[
                    "flex flex-col py-8 sm:flex-row sm:justify-between",
                    className,
                ].join(" ")}
            >
                <div className="flex flex-row">
                    <a
                        href="https://www.linkedin.com/in/ryan-apanowicz/"
                        className={`inline-block rounded-lg py-1 ${textPrimary} transition`}
                        target="_blank"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/ryanapanowicz"
                        className={`inline-block rounded-lg py-1 ml-4 sm:ml-8 ${textPrimary} transition`}
                        target="_blank"
                    >
                        GitHub
                    </a>
                    <a
                        href="mailto:ryan.apanowicz@gmail.com"
                        className={`inline-block rounded-lg py-1 ml-4 sm:ml-8 ${textPrimary} transition`}
                    >
                        Contact me
                    </a>
                </div>
                <p className="flex flex-row text-neutral-500 items-center mt-2 sm:mt-0">
                    &copy; {new Date().getFullYear()} — All rights reserved
                    {scrollTop && (
                        <a
                            href="#top"
                            data-scroll-to
                            className={`inline-block rounded-lg py-1 ml-auto sm:ml-8 ${textPrimary} transition`}
                        >
                            <svg
                                width="15"
                                height="18"
                                viewBox="0 0 24 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline"
                            >
                                <path
                                    className={fillPrimary}
                                    d="M10.8 22.9c0 .7.6 1.3 1.2 1.3s1.2-.6 1.2-1.3c0-.7-.4-1.3-1.2-1.3-.8.1-1.2.6-1.2 1.3Zm1.2 3.7c.8 0 1.2.6 1.2 1.3 0 .6-.5 1.2-1.2 1.2s-1.2-.6-1.2-1.3c0-.6.4-1.2 1.2-1.2ZM23.7 13c-.4.5-1.2.5-1.7 0l-8.8-9v13.9c0 .7-.6 1.3-1.2 1.3s-1.2-.6-1.2-1.3V4L2 13c-.4.5-1.2.5-1.7 0-.4-.5-.4-1.3 0-1.7L11.1.3c.2-.2.6-.3.8-.3.3 0 .7.1.8.3l10.8 11c.6.6.6 1.2.2 1.7Z"
                                    fill="#fff"
                                />
                            </svg>
                        </a>
                    )}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
