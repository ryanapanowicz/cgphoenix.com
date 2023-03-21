import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Link from "../components/Link";
import SEO from "../components/SEO";

export interface ProjectQuery {
    data: any;
    pageContext: any;
}

export const Head: React.FC<ProjectQuery> = ({
    data,
    pageContext: { next, previous },
}) => (
    <>
        <SEO
            title={`${data.site.siteMetadata.title} | ${data.project.title}`}
            description={data.project.description}
            keywords={data.project.keywords}
            auther={data.site.siteMetadata.title}
            url={data.project.link}
            image={data.project.featured.localFile.childImageSharp.fixed.src}
            type="website"
        >
            <meta property="og:site_name" content={data.project.title} />
        </SEO>
    </>
);

const Project: React.FC<ProjectQuery> = ({
    data,
    pageContext: { next, previous },
}) => (
    <Layout className="bg-neutral-100">
        <section
            id="top"
            className="flex flex-col mx-auto min-h-screen"
            data-scroll-section
        >
            <header className="max-w-container mx-auto w-full px-6 py-8 sm:px-8 lg:px-16 justify-between">
                <nav className="relative flex justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="font-medium" aria-label="Home">
                            {data.site.siteMetadata.title}
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="relative max-w-container mx-auto w-full px-6 pt-8 sm:px-8 lg:px-16">
                <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">
                    {data.project.title}
                </h1>
                <div className="mb-8 pb-8 border-b border-neutral-300">
                    <div
                        className="text-lg max-w-6xl"
                        dangerouslySetInnerHTML={{
                            __html: data.project.content,
                        }}
                    />
                </div>
                <div className="grid mb-12 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="mb-2">
                        <h4 className="text-lg font-medium mb-2">
                            Work Done
                        </h4>
                        <p className="text-neutral-600">
                            {data.project.work_done}
                        </p>
                    </div>
                    <div className="mb-2">
                        <h4 className="test-coal text-lg font-medium mb-2">
                            Project Timeline
                        </h4>
                        <p className="text-neutral-600">
                            {data.project.start &&
                                new Date(data.project.start).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}{" "}
                            —{" "}
                            {data.project.end &&
                                new Date(data.project.end).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                        </p>
                    </div>
                    <div className="mb-2">
                        <h4 className="test-coal text-lg font-medium mb-2">
                            Built With
                        </h4>
                        <div>
                            {data.project.built_with &&
                                data.project.built_with.map(
                                    (name: any, index: number) => {
                                        return (
                                            <div
                                                key={index}
                                                className="text-neutral-700 mr-4 mb-4 text-sm inline-flex items-center font-light px-3 py-1 border border-neutral-400 rounded"
                                            >
                                                {name}
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                    <div className="flex mb-2 items-center lg:justify-end">
                        <a
                            href={data.project.link}
                            target="_blank"
                            className="flex text-xl"
                        >
                            Visit
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px"
                                className="ml-4"
                            >
                                <path
                                    fill="#0B0B0D"
                                    d="M6.9 19c-.5.5-1.3.5-1.8.1-.4-.4-.4-1.3.1-1.8s1.2-.6 1.8-.1c.4.7.4 1.3-.1 1.8zm-3.5 1.8c-.6-.6-1.3-.4-1.8.1-.4.4-.5 1.2 0 1.7.5.4 1.3.4 1.8-.1.4-.4.6-1.1 0-1.7zM4.7 2.9c0 .6.5 1.2 1.2 1.2L18.5 4l-9.8 9.8c-.5.5-.5 1.3-.1 1.8.4.4 1.3.4 1.8-.1l9.8-9.8-.1 12.6c-.1.6.5 1.2 1.2 1.2.6-.1 1.2-.6 1.2-1.2l.1-15.4c0-.3-.2-.6-.4-.8-.2-.2-.6-.4-.8-.4l-15.3.1c-.9 0-1.3.5-1.4 1.1z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col">
                    {data.project.assets.map((asset: any, index: number) => {
                        const image = getImage(asset?.localFile);

                        return image ? (
                            <div
                                key={`image-${index}`}
                                className="d-block mb-6 sm:mb-8 lg:mb-16 overflow-hidden rounded"
                            >
                                <GatsbyImage
                                    className="w-full"
                                    imgClassName="rendering-crisp"
                                    image={image}
                                    alt={asset.name}
                                    loading="eager"
                                />
                            </div>
                        ) : (
                            ""
                        );
                    })}
                </div>
            </div>
            {(previous || next) && (
                <div className="mx-auto w-full max-w-container py-4 px-6 sm:px-8 lg:px-16">
                    <div className="flex flex-row mb-6 sm:mb-12 w-full">
                        {previous && (
                            <Link
                                to={`/work/${previous.slug}`}
                                className="flex flex-row items-center leading-none text-xl"
                            >
                                <svg
                                    width="23"
                                    height="20"
                                    viewBox="0 0 23 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="inline mr-4"
                                >
                                    <path
                                        className="fill-coal"
                                        d="M18 10.9c.5 0 1-.5 1-.9s-.5-.9-1-.9-1 .3-1 .9c.1.6.5.9 1 .9zm2.8-.9c0-.6.5-.9 1-.9s.9.4.9.9-.5.9-1 .9c-.4 0-.9-.3-.9-.9zM10.5.9c.4.3.4.9 0 1.3L3.6 9h10.6c.5 0 1 .5 1 .9s-.5.9-1 .9H3.5l6.9 6.8c.4.3.4.9 0 1.3-.4.3-1 .3-1.3 0L.5 10.6c-.1-.1-.1-.4-.1-.5 0-.2.2-.5.3-.6L9 1.2c.6-.5 1.1-.5 1.5-.3z"
                                        fill="#0b0b0d"
                                    />
                                </svg>
                                Previous
                            </Link>
                        )}
                        {next && (
                            <Link
                                to={`/work/${next.slug}`}
                                className="flex flex-row ml-auto items-center leading-none text-xl"
                            >
                                Next
                                <svg
                                    width="23"
                                    height="20"
                                    viewBox="0 0 23 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="inline ml-4"
                                >
                                    <path
                                        className="fill-coal"
                                        d="M6.1 10c0-.6-.5-.9-1-.9s-1 .5-1 .9.5.9 1 .9.9-.3 1-.9zm-4.7.9c-.5 0-1-.4-1-.9s.4-.9.9-.9 1 .3 1 .9c0 .6-.5.9-.9.9zm12.7-9.7 8.3 8.3c.1.1.3.4.3.6 0 .1 0 .4-.1.5L14 18.9c-.3.3-.9.3-1.3 0-.4-.4-.4-1 0-1.3l6.9-6.8H8.9c-.5 0-1-.5-1-.9s.5-.9 1-.9h10.6l-6.9-6.8c-.4-.4-.4-1 0-1.3.4-.2.9-.2 1.5.3z"
                                        fill="#0b0b0d"
                                    />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            )}
            <Footer
                className="w-full mx-auto max-w-container px-6 sm:px-8 lg:px-16"
                theme="light"
            />
        </section>
    </Layout>
);

export const query = graphql`
    query ($id: String) {
        site {
            siteMetadata {
                title
            }
        }
        project(id: { eq: $id }) {
            title
            subtitle
            slug
            content
            work_done
            built_with
            keywords
            description
            start
            end
            link
            featured {
                id
                name
                localFile {
                    childImageSharp {
                        fixed(width: 1024) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
            assets {
                id
                name
                localFile {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    }
`;

export default Project;
