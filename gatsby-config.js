/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
    siteMetadata: {
        title: "Ryan Apanowicz",
        description: "Ryan Apanowicz is Web Developer and Digital Designer",
        keywords:
            "Ryan Apanowicz, Web Developer, Digital Designer, Graphic Design, Developer, Designer,",
        siteUrl: "https://ryan.apanowicz.io",
    },
    plugins: [
        "gatsby-plugin-postcss",
        "gatsby-plugin-image",
        "gatsby-plugin-sitemap",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-plugin-sharp",
            options: {
                defaults: {
                    formats: ["jpg"],
                    quality: 100,
                },
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
        {
            resolve: "gatsby-source-moiracms",
        },
    ],
};
