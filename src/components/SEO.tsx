import React from "react";

export interface SEOProps {
    title: string;
    description: string;
    keywords: string;
    auther?: string;
    url?: string;
    image?: string;
    locale?: string;
    type?: string;
    children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    auther,
    url,
    image,
    locale = "en_US",
    type,
    children,
}) => (
    <>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {auther && <meta name="author" content={auther} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {url && <meta property="og:url" content={url} />}
        <meta property="og:locale" content={locale} />
        {image && <meta property="og:image" content={image} />}
        {type && <meta property="og:type" content={type} />}
        {children}
    </>
);

export default SEO;
