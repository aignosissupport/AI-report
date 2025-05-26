import { Helmet } from "react-helmet-async";

const SEO = ({ pageTitle, canonicalUrl, metaDescription }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        {/* <meta name="robots" content="noindex, follow" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}
        {metaDescription && <meta name="description" content={metaDescription} />}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>
    </>
  );
};

export default SEO;
