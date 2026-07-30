import SearchWidgetTH from './SearchWidgetTH';
import SearchWidgetEN from './SearchWidgetEN';

// destinations shape from home-client.js: { domestic: string[], outbound: string[] }
export default function SearchWidget({ locale, destinations = { domestic: [], outbound: [] } }) {
  if (locale === 'en') {
    return <SearchWidgetEN destinations={destinations.domestic || []} />;
  }

  return <SearchWidgetTH destinations={destinations} />;
}
