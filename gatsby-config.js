const autoprefixer = require("autoprefixer");

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
        "gatsby-plugin-image",
        "gatsby-plugin-sitemap",
        "gatsby-source-moiracms",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: "Ryan Apanowicz",
                short_name: "Ryan A",
                start_url: "/",
                background_color: "#0b0b0b",
                theme_color: "#f5f5f5",
                display: "standalone",
                icon: "src/images/icon.png",
            },
        },
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
        {
            resolve: `gatsby-plugin-postcss`,
            options: {
                postCssPlugins: [autoprefixer()],
            },
        },
    ],
};
