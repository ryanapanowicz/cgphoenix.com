import React, { useEffect } from "react";
import { useTransition } from "./TransitionProvider";

export interface LayoutProps {
    className?: string;
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
    const { play } = useTransition();

    useEffect(() => {
        play();
    }, []);

    return (
        <div className={["main-container", className].join(" ")}>
            {children}
        </div>
    );
};

export default Layout;
