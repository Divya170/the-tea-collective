/** Shared select options for admin forms (kept out of page files: Next.js pages may only export page fields). */
export const TINT_OPTIONS = ['linen', 'sage', 'forest', 'oat', 'brown'].map((t) => ({ value: t, label: t[0].toUpperCase() + t.slice(1) }));
export const ICON_OPTIONS = ['leaf', 'cup', 'kettle', 'thermo', 'timer', 'jar', 'spoon', 'sun', 'compass'].map((i) => ({ value: i, label: i[0].toUpperCase() + i.slice(1) }));
