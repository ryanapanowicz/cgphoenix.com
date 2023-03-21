import React, { useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Cursor from "./Cursor";

export interface PageWrapperProps {
    children: React.ReactNode;
    path: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, path }) => {
    const containerRef = useRef(null);

    return (
        <LocomotiveScrollProvider
            options={{
                smooth: true,
                lerp: 0.05,
            }}
            location={path}
            watch={[path]}
            onLocationChange={(scroll: any) => {
                scroll.scrollTo(0, { duration: 0, disableLerp: true });

                const hashlinks =
                    document.querySelectorAll("a[data-scroll-to]");

                hashlinks.forEach((link) => {
                    let hashval = link.getAttribute("href");

                    if (!hashval) return;

                    let target = document.querySelector(hashval);

                    link.addEventListener("click", (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        scroll.scrollTo(target);
                    });
                });
            }}
            containerRef={containerRef}
        >
            <main data-scroll-container ref={containerRef}>
                <Cursor watch={[path]} />
                {children}
            </main>
        </LocomotiveScrollProvider>
    );
};

export default PageWrapper;
