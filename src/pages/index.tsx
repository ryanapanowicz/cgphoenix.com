import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useRef } from "react";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { default as Link } from "../components/Link";
import MainHeading from "../components/MainHeading";
import SEO from "../components/SEO";
import WebGlView from "../components/WebGLView";
import bufferShader from "../shaders/buffer";
import mainShader from "../shaders/main";

export const Head: React.FC = ({ data }: any) => (
    <SEO
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        keywords={data.site.siteMetadata.keywords}
        auther={data.site.siteMetadata.title}
    />
);

const IndexPage: React.FC = ({ data }: any) => {
    const mainSection = useRef(null);

    const featuredImage = (featured: any) => {
        const image = getImage(featured?.localFile);
        return (
            image && (
                <GatsbyImage
                    className="my-[-30px] aspect-video md:aspect-auto group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    image={image}
                    alt={featured.name}
                    loading="eager"
                    data-scroll
                    data-scroll-speed="-1"
                />
            )
        );
    };

    return (
        <Layout>
            <section
                id="top"
                className="relative overflow-hidden antialiased"
                ref={mainSection}
                data-scroll-section
            >
                <WebGlView
                    parent={mainSection}
                    className="absolute left-0 right-0 top-0 bottom-0 bg-neutral-100"
                    main={mainShader}
                    buffers={[bufferShader]}
                    fallback={<div>Fallback</div>}
                />
                <div className="flex flex-col max-w-container mx-auto min-h-screen justify-between">
                    <header className="flex flex-col px-6 py-8 sm:px-8 lg:px-16 mix-blend-exclusion select-none justify-between">
                        <nav className="relative flex justify-between">
                            <Link
                                to="/"
                                className="text-neutral-100 font-medium py-1"
                                aria-label="Home"
                            >
                                {data.site.siteMetadata.title}
                            </Link>
                            <div className="grid grid-flow-col items-center gap-x-5 md:gap-x-8">
                                <a
                                    href="#work"
                                    className="text-neutral-100 font-medium rounded-lg py-1"
                                    data-scroll-to
                                >
                                    Work
                                </a>
                                <a
                                    href="#about"
                                    className="text-neutral-100 font-medium rounded-lg py-1"
                                    data-scroll-to
                                >
                                    About
                                </a>
                            </div>
                        </nav>
                    </header>
                    <main className="mx-auto w-full max-w-6xl px-8 lg:px-16 py-8 text-center mix-blend-exclusion select-none">
                        <MainHeading />
                    </main>
                    <Footer className="px-6 sm:px-8 lg:px-16 mix-blend-exclusion select-none" />
                </div>
            </section>
            <section
                id="work"
                className="flex flex-col min-h-screen max-w-container mx-auto pt-24 py-16 px-6 sm:px-8 lg:px-16"
                data-scroll-section
            >
                <div className="flex flex-col w-full text-neutral-100 mb-16">
                    <p className="text-neutral-100 font-bold mb-4">
                        Featured projects —
                    </p>
                    <h2 className="text-6xl md:text-container font-bold mb-0">
                        Work
                    </h2>
                </div>
                <div
                    className="flex flex-col md:block md:columns-2 md:gap-16 w-full"
                    data-scoll
                >
                    {data.allProject.nodes.map(
                        ({
                            id,
                            slug,
                            title,
                            subtitle,
                            built_with,
                            featured,
                        }: any) => (
                            <div key={id} className="w-full mb-8 sm:mb-16">
                                <Link to={`work/${slug}`} className="flex flex-col overflow-hidden group">
                                    <div className="overflow-hidden rounded z-0">
                                        {featuredImage(featured)}
                                    </div>
                                    <div className="flex flex-row flex-wrap items-center">
                                        <div className="flex flex-col py-6 mr-3 md:mr-6 rounded whitespace-nowrap md:w-full xl:w-auto">
                                            <h3 className="text-lg sm:text-2xl font-normal text-neutral-100">
                                                {title}
                                            </h3>
                                            <p className="text-sm mb-0 text-neutral-400">
                                                {subtitle}
                                            </p>
                                        </div>
                                        <div className="grid grid-rows-2 grid-flow-col gap-2 ml-auto md:ml-0">
                                            {built_with &&
                                                built_with.map(
                                                    (
                                                        name: any,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="text-xs text-center items-center font-light px-3 py-1 text-neutral-100 border border-neutral-600 rounded"
                                                            >
                                                                {name}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    )}
                </div>
            </section>
            <section
                id="about"
                className="max-w-container mx-auto pt-16"
                data-scroll-section
            >
                <div className="flex flex-col justify-end min-h-screen px-6 sm:px-8 lg:px-16 bg-portrait bg-top bg-no-repeat">
                    <div className="mb-8 pt-[440px]">
                        <h3 className="text-neutral-100 font-bold">
                            About me —
                        </h3>
                        <h1 className="text-neutral-100 font-bold text-2xl  md:text-5xl md:leading-tight tracking-tight py-2">
                            I’m passionate about designing digital experiences
                            that make people's lives easier and a better for
                            everyone.
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            Working as a freelance Digital Design and PHP Web
                            Developer for 6+ years and then as a software
                            developer and project manager for an event ticketing
                            platform startup for another 6 years, I’m currently
                            back in freelance working on various projects. When
                            I’m not working you can catch me outside exploring,
                            hiking, or biking the parks in Pennsylvania.
                        </p>
                    </div>
                    <div className="mb-32 w-full">
                        <h3 className="text-neutral-100 font-bold mb-4">
                            Skills &amp; Experience —
                        </h3>
                        <ul className="list-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:text-lg justify-between text-neutral-100">
                            <li>UX/UI Design</li>
                            <li>Art Direction </li>
                            <li>Web Development</li>
                            <li>3D Visualization</li>
                            <li>Digital Design</li>
                            <li>Mobile Design</li>
                            <li>Fullstack Programming</li>
                            <li>Illustration</li>
                        </ul>
                    </div>
                    <Footer scrollTop={true} />
                </div>
            </section>
        </Layout>
    );
};

export const query = graphql`
    {
        site {
            siteMetadata {
                title
                description
                keywords
            }
        }
        allProject(sort: { id: ASC }) {
            nodes {
                id
                title
                subtitle
                slug
                featured {
                    id
                    name
                    localFile {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                built_with
            }
        }
    }
`;

export default IndexPage;
