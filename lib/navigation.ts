export type NavItem = {
  href: string;
  label: string;
};

export const brand = {
  email: "hello@maison-eternel.com",
  monogram: "M.E",
  name: "Maison Eternel",
  phone: "+1 (212) 555-0188",
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/venues", label: "Venues" },
  { href: "/vendors", label: "Vendors" },
  { href: "/packages", label: "Packages" },
  { href: "/planning", label: "Tools" },
  { href: "/gallery", label: "Inspiration" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const darkNavbarRoutes = new Set(["/", "/about", "/gallery", "/packages"]);

export function getActiveNavLabel(pathname: string) {
  return navItems.find((item) => item.href === pathname)?.label ?? brand.name;
}

export function getNavbarTone(pathname: string) {
  return darkNavbarRoutes.has(pathname) ? "dark" : "light";
}
