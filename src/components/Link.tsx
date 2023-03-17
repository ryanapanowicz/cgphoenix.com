import { useLocation } from "@reach/router";
import { GatsbyLinkProps, Link as GatsbyLink, navigate } from "gatsby";
import React from "react";
import { useTransition } from "./TransitionProvider";

interface CustomGatsbyLink
    extends Omit<GatsbyLinkProps<Record<string, unknown>>, "ref"> {}

const Link: React.FC<CustomGatsbyLink> = ({ children, to, ...rest }) => {
    const location = useLocation();
    const { play } = useTransition();

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        if (event.defaultPrevented) {
            return;
        }
        event.preventDefault();

        // Prevent navigating to existing url
        // Causes errors with transition animation without this
        if (location.pathname == to) {
            return;
        }

        play("in", () => navigate(to));
    };

    return (
        <GatsbyLink to={to} {...rest} onClick={handleClick}>
            {children}
        </GatsbyLink>
    );
};

export default Link;
