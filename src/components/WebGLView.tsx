import React, { useEffect, useRef, useState } from "react";
import WebGLRenderer, {
    BufferShader,
    WebGL2NotAvailable
} from "../util/WebGLRenderer";

export interface WebGLView {
    main: string;
    buffers?: [string];
    className?: string;
    parent: React.RefObject<HTMLElement>;
    fallback?: React.ReactNode;
}

const WebGlView: React.FC<WebGLView> = ({
    main,
    buffers,
    className = "",
    parent,
    fallback,
}) => {
    const webGLDom = useRef<HTMLDivElement>(null);
    const renderer = useRef<WebGLRenderer | null>(null);
    const [error, setError] = useState<boolean>(false);

    // Setup WebGLRenderer on mount
    useEffect(() => {
        const mainShader = new BufferShader(main);
        const bufferShaders = buffers?.map((buffer: string) => {
            return new BufferShader(buffer);
        });

        try {
            renderer.current = new WebGLRenderer({
                element: webGLDom.current,
                // Use window innerWidth to get around scrollbar removal not causing resize event.
                width: window.innerWidth,
                height: parent.current?.clientHeight,
                mainShader,
                bufferShaders,
            });
        } catch (e) {
            if (e instanceof WebGL2NotAvailable) {
                setError(true);
            }

            console.log(e);
        }

        // Bind window body event listeners
        if (parent && parent.current) {
            parent.current.addEventListener("mousedown", mousedown);
            parent.current.addEventListener("mouseup", mouseup);
            parent.current.addEventListener("mouseleave", mouseup);
            parent.current.addEventListener("mousemove", mousemove);
        }
        window.addEventListener("resize", resize);

        return () => {
            if (parent && parent.current) {
                parent.current.removeEventListener("mousedown", mousedown);
                parent.current.removeEventListener("mouseup", mouseup);
                parent.current.removeEventListener("mouseleave", mouseup);
                parent.current.removeEventListener("mousemove", mousemove);
            }
            window.removeEventListener("resize", resize);

            // stop renderer on unmount
            if (renderer.current) {
                renderer.current.destroy();
            }
        };
    }, [parent]);

    const mousedown = (event: MouseEvent) => {
        if (parent && parent.current) {
            const rect = parent.current.getBoundingClientRect();
            renderer.current?.mousedown(
                event.clientX - rect.left,
                event.clientY - rect.top
            );
        }
    };

    const mouseup = (event: MouseEvent) => {
        renderer.current?.mouseup();
    };

    const mousemove = (event: MouseEvent) => {
        if (parent && parent.current) {
            const rect = parent.current.getBoundingClientRect();
            renderer.current?.mousemove(
                event.clientX - rect.left,
                event.clientY - rect.top
            );
        }
    };

    const resize = (event: Event) => {
        if (parent.current) {
            const width = parent.current.clientWidth;
            const height = parent.current.clientHeight;
            renderer.current?.resize(width, height);
        }
    };

    return (
        <div className={[className, "webgl"].join(" ").trim()} ref={webGLDom}>
            {error ? fallback : <canvas className="webgl-canvas h-full" />}
        </div>
    );
};

export default WebGlView;
