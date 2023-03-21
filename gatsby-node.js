const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query MyQuery {
            allProject(sort: { id: ASC }) {
                edges {
                    next {
                        id
                        slug
                        title
                    }
                    node {
                        id
                        slug
                        title
                    }
                    previous {
                        id
                        slug
                        title
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    result.data.allProject.edges.forEach(({ node, next, previous }) => {
        createPage({
            path: `/work/${node.slug}`,
            component: path.resolve("./src/templates/project-template.tsx"),
            context: {
                id: node.id,
                next,
                previous,
            },
        });
    });
};
