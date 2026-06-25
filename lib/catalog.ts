import type { GalleryItem, Vendor, Venue } from "@/lib/data";

export type WithAll<T extends string> = T | "All";

export const venueRegions: Array<WithAll<Venue["region"]>> = [
  "All",
  "Europe",
  "Middle East",
  "North America",
  "Asia",
];

export const venueStyles: Array<WithAll<Venue["style"]>> = [
  "All",
  "Ballroom",
  "Garden",
  "Coastal",
  "Palace",
  "Vineyard",
  "Desert",
];

export const vendorCategories: Array<WithAll<Vendor["category"]>> = [
  "All",
  "Photography",
  "Florals",
  "Catering",
  "Music",
  "Beauty",
  "Planning",
  "Lighting",
  "Cake",
];

export const galleryCategories: Array<WithAll<GalleryItem["category"]>> = [
  "All",
  "Ceremonies",
  "Receptions",
  "Florals",
  "Tables",
  "Gowns",
  "Venues",
  "Cakes",
  "Details",
];

export type VenueFilters = {
  capacity: number;
  query: string;
  region: WithAll<Venue["region"]>;
  style: WithAll<Venue["style"]>;
};

export type VendorFilters = {
  category: WithAll<Vendor["category"]>;
  query: string;
  verifiedOnly: boolean;
};

export type GalleryFilters = {
  category: WithAll<GalleryItem["category"]>;
  palette: string;
};

export function filterVenues(source: Venue[], filters: VenueFilters) {
  const query = normalizeSearch(filters.query);

  return source.filter((venue) => {
    const text = normalizeSearch(`${venue.name} ${venue.location} ${venue.description}`);
    return (
      text.includes(query) &&
      (filters.region === "All" || venue.region === filters.region) &&
      (filters.style === "All" || venue.style === filters.style) &&
      venue.capacity >= filters.capacity
    );
  });
}

export function filterVendors(source: Vendor[], filters: VendorFilters) {
  const query = normalizeSearch(filters.query);

  return source.filter((vendor) => {
    const text = normalizeSearch(`${vendor.name} ${vendor.category} ${vendor.location} ${vendor.description}`);
    return (
      text.includes(query) &&
      (filters.category === "All" || vendor.category === filters.category) &&
      (!filters.verifiedOnly || vendor.verified)
    );
  });
}

export function filterGalleryItems(source: GalleryItem[], filters: GalleryFilters) {
  return source.filter(
    (item) =>
      (filters.category === "All" || item.category === filters.category) &&
      (filters.palette === "All" || item.palette === filters.palette),
  );
}

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}
