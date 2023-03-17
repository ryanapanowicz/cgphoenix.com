import React from "react";
import PageWrapper from "./src/components/PageWrapper";
import TransitionProvider from "./src/components/TransitionProvider";
import "./src/styles/global.css";

export const wrapRootElement = ({ element }) => (
    <TransitionProvider>{element}</TransitionProvider>
);

export const wrapPageElement = ({ element, props }) => (
    <PageWrapper {...props}>{element}</PageWrapper>
);
