export type NavItem = {
  id: string;
  index: string;
  label: string;
};

/* Single source of truth for section anchors — used by header, sidebar, and page. */
export const SECTIONS: NavItem[] = [
  { id: "overview", index: "00", label: "Overview" },
  { id: "context", index: "01", label: "Context & goals" },
  { id: "tokens", index: "02", label: "Tokens & foundations" },
  { id: "components", index: "03", label: "Components" },
  { id: "accessibility", index: "04", label: "Accessibility" },
  { id: "content", index: "05", label: "Content & tone" },
  { id: "antipatterns", index: "06", label: "Anti-patterns" },
  { id: "qa", index: "07", label: "QA checklist" },
];

/* Known component density on the Carolina documentation surface. */
export const DENSITY = [
  { label: "Links", value: 27 },
  { label: "Inputs", value: 14 },
  { label: "Buttons", value: 7 },
  { label: "Navigation", value: 2 },
  { label: "Lists", value: 2 },
] as const;

export const TOKENS = {
  colors: [
    {
      name: "color.surface.base",
      value: "#000000",
      role: "Primary canvas surface (dark-first).",
      swatch: "#000000",
      text: "on-dark",
    },
    {
      name: "color.surface.strong",
      value: "#171312",
      role: "Elevated cards, popovers, sidebars.",
      swatch: "#171312",
      text: "on-dark",
    },
    {
      name: "color.surface.muted",
      value: "#f2f2f2",
      role: "Inverse light surface for code & callouts.",
      swatch: "#f2f2f2",
      text: "on-light",
    },
    {
      name: "color.text.secondary",
      value: "#ffffff",
      role: "Primary readable ink on dark surfaces.",
      swatch: "#ffffff",
      text: "on-dark",
    },
    {
      name: "color.text.tertiary",
      value: "#fc7200",
      role: "Accent, primary action, active emphasis.",
      swatch: "#fc7200",
      text: "on-dark",
    },
    {
      name: "color.text.inverse",
      value: "#0000ee",
      role: "Links & ink on the muted (light) surface.",
      swatch: "#0000ee",
      text: "on-light",
    },
  ],
  type: [
    { name: "font.size.xs", value: "12px", use: "Captions, labels, metadata" },
    { name: "font.size.sm", value: "14px", use: "Secondary body, helper text" },
    { name: "font.size.md", value: "16px", use: "Base body text" },
    { name: "font.size.lg", value: "18px", use: "Lead paragraphs" },
    { name: "font.size.xl", value: "20px", use: "Subsection headings" },
    { name: "font.size.2xl", value: "24px", use: "Card titles" },
    { name: "font.size.3xl", value: "32px", use: "Section headings" },
    { name: "font.size.4xl", value: "48px", use: "Display / hero" },
  ],
  space: [
    { name: "space.1", value: "4px" },
    { name: "space.2", value: "5px" },
    { name: "space.3", value: "6px" },
    { name: "space.4", value: "8px" },
    { name: "space.5", value: "10px" },
    { name: "space.6", value: "12px" },
    { name: "space.7", value: "24px" },
    { name: "space.8", value: "80px" },
  ],
  radius: [{ name: "radius.xs", value: "4px", use: "All controls, cards, surfaces" }],
};
