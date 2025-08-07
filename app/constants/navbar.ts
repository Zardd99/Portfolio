type NavbarContents = {
  cta: string;
};

const NAVBAR_CONTENT: NavbarContents[] = [
  {
    cta: "Let's Talk",
  },
];

type NavItems = {
  href: string;
  label: string;
};

const NAV_ITEMS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export { NAVBAR_CONTENT, NAV_ITEMS };
export type { NavbarContents, NavItems };
