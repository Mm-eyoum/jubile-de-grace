import { Helmet } from 'react-helmet-async';

const SEO = () => {
  return (
    <Helmet>
      <title>Jubilé de Grâce – 50 ans de grâce</title>
      <meta name="description" content="Jubilé de Grâce – 50 ans de grâce. Célébration et reconnaissance le 2 janvier 2026 à Dakar." />
      <meta name="keywords" content="jubilé, grâce, célébration, Dakar, événement, 50 ans" />
      <meta name="author" content="Jubilé de Grâce" />
      <meta property="og:title" content="Jubilé de Grâce – 50 ans de grâce" />
      <meta property="og:description" content="Rejoignez-nous pour célébrer 50 ans de grâce le 2 janvier 2026 à Dakar." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://jubile-de-grace.com" />
      <meta property="og:image" content="/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Jubilé de Grâce – 50 ans de grâce" />
      <meta name="twitter:description" content="Rejoignez-nous pour célébrer 50 ans de grâce le 2 janvier 2026 à Dakar." />
      <meta name="twitter:image" content="/og-image.jpg" />
      <link rel="canonical" href="https://jubile-de-grace.com" />
    </Helmet>
  );
};

export default SEO;