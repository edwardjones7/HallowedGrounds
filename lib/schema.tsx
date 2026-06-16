import { locations, type Location } from "@/content/locations";
import { site } from "@/content/site";
import { rating } from "@/content/reviews";

function cafeNode(loc: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: `${site.name} — ${loc.name}`,
    image: loc.image,
    url: `${site.url}/locations/${loc.slug}`,
    servesCuisine: ["Coffee", "Breakfast", "Cafe"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.street,
      addressLocality: loc.address.city,
      addressRegion: loc.address.state,
      postalCode: loc.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    sameAs: [site.social.instagram, site.social.facebook],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.score,
      reviewCount: rating.count,
    },
  };
}

export function LocalBusinessSchema({ slug }: { slug?: string } = {}) {
  const nodes = slug
    ? [cafeNode(locations.find((l) => l.slug === slug)!)]
    : locations.map(cafeNode);

  return (
    <>
      {nodes.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
