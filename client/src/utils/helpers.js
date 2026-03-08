// ── Currency formatter (INR) ──────────────────────────────────────────────────
export const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const today = () => new Date().toISOString().split("T")[0];

export const thisMonth = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

// ── Categories ────────────────────────────────────────────────────────────────
export const CATS = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other Income"],
  expense: [
    "Food", "Rent", "Transport", "Health", "Entertainment",
    "Shopping", "Utilities", "Education", "Other",
  ],
};

export const FREQ = ["Daily", "Weekly", "Monthly", "Yearly"];

// ── Category accent colors ─────────────────────────────────────────────────────
export const CAT_COLORS = {
  // Income
  Salary:        "#7c3aed",
  Freelance:     "#0ea5e9",
  Investment:    "#f59e0b",
  Gift:          "#ec4899",
  "Other Income":"#14b8a6",
  // Expense
  Food:          "#ef4444",
  Rent:          "#8b5cf6",
  Transport:     "#3b82f6",
  Health:        "#10b981",
  Entertainment: "#f97316",
  Shopping:      "#e879f9",
  Utilities:     "#06b6d4",
  Education:     "#6366f1",
  Other:         "#64748b",
};