import gsap, { Sine } from "gsap";
import React, { useContext, useEffect, useRef } from "react";

export interface TransitionContextType {
    transitioning: boolean;
    play: (option?: "in" | "out", callback?: () => void) => void;
}

export interface TransitionProviderType {
    children?: React.ReactNode;
}

export const TransitionContext = React.createContext<TransitionContextType>({
    transitioning: false,
    play: () => {},
});

export const useTransition = () => {
    return useContext(TransitionContext);
};

const TransitionProvider: React.FC<TransitionProviderType> = ({ children }) => {
    const transition = useRef(false);

    useEffect(() => {
        const onPageLoad = () => {
            handlePlay();
        };

        // Check if the page has already loaded
        if (document.readyState === "complete") {
            onPageLoad();
        } else {
            window.addEventListener("load", onPageLoad);

            return () => window.removeEventListener("load", onPageLoad);
        }
    }, []);

    const handlePlay = (option = "out", callback?: () => void) => {
        // Prevent being called multiple times if still transitioing
        if (transition.current) {
            return;
        }

        transition.current = true;
        if (option === "in") {
            gsap.set("#overlay", {
                top: 0,
                bottom: "",
            });
            gsap.fromTo(
                "#overlay",
                {
                    height: 0,
                },
                {
                    duration: 0.6,
                    height: "100%",
                    delay: 0.15,
                    ease: Sine.easeInOut,
                    onComplete: () => {
                        transition.current = false;
                        if (typeof callback === "function") {
                            callback();
                        }
                    },
                }
            );
        } else {
            gsap.set("#overlay", {
                top: "",
                bottom: 0,
            });
            gsap.fromTo(
                "#overlay",
                {
                    height: "100%",
                },
                {
                    duration: 0.6,
                    height: 0,
                    delay: 0.15,
                    ease: Sine.easeInOut,
                    onComplete: () => {
                        transition.current = false;
                        if (typeof callback === "function") {
                            callback();
                        }
                    },
                }
            );
        }
    };

    return (
        <TransitionContext.Provider
            value={{
                transitioning: transition.current,
                play: handlePlay,
            }}
        >
            {children}
        </TransitionContext.Provider>
    );
};

export default TransitionProvider;
