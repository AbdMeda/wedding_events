import { CalendarDays, LayoutDashboard, Settings, Store, type LucideIcon } from "lucide-react";
import { bookings as seedBookings, type Booking } from "@/lib/data";

export type AdminSection =
  | "Dashboard"
  | "Bookings"
  | "Venues"
  | "Vendors"
  | "Leads"
  | "Calendar"
  | "Analytics"
  | "Reviews"
  | "Settings"
  | "Notifications";

export type LeadStatus = "New" | "Contacted" | "Proposal" | "Booked";

export const revenueData = [
  { month: "Jan", revenue: 124000, leads: 28 },
  { month: "Feb", revenue: 148000, leads: 34 },
  { month: "Mar", revenue: 136000, leads: 31 },
  { month: "Apr", revenue: 184000, leads: 43 },
  { month: "May", revenue: 214000, leads: 52 },
  { month: "Jun", revenue: 196000, leads: 47 },
  { month: "Jul", revenue: 236000, leads: 56 },
  { month: "Aug", revenue: 284500, leads: 61 },
];

export const leadSourceData = [
  { name: "Referral", value: 38 },
  { name: "Instagram", value: 29 },
  { name: "Venue", value: 22 },
  { name: "Press", value: 11 },
];

export const statusColors: Record<Booking["status"], string> = {
  Confirmed: "#7A9E7E",
  Pending: "#C4A46E",
  Cancelled: "#B07070",
  Completed: "#7A8FA0",
};

export const leadColor: Record<LeadStatus, string> = {
  New: "#C4A46E",
  Contacted: "#7A8FA0",
  Proposal: "#B08E55",
  Booked: "#7A9E7E",
};

export const navGroups: Array<{ label: string; icon: LucideIcon; items: AdminSection[] }> = [
  { label: "Overview", icon: LayoutDashboard, items: ["Dashboard"] },
  { label: "Manage", icon: Store, items: ["Bookings", "Venues", "Vendors", "Leads"] },
  { label: "Insights", icon: CalendarDays, items: ["Calendar", "Analytics", "Reviews"] },
  { label: "System", icon: Settings, items: ["Settings", "Notifications"] },
];

export const sectionEyebrows: Record<AdminSection, string> = {
  Dashboard: "Overview",
  Bookings: "Manage",
  Venues: "Manage",
  Vendors: "Manage",
  Leads: "Pipeline",
  Calendar: "Timeline",
  Analytics: "Insights",
  Reviews: "Reputation",
  Settings: "System",
  Notifications: "System",
};

export const initialLeads = seedBookings
  .filter((booking) => booking.status === "Pending")
  .slice(0, 7)
  .map((booking, index) => ({
    id: `LD-${String(index + 1).padStart(3, "0")}`,
    couple: booking.couple,
    interest: booking.packageName,
    source: leadSourceData[index % leadSourceData.length].name,
    value: booking.value,
    status: (["New", "Contacted", "Proposal", "Booked"] as LeadStatus[])[index % 4],
  }));

export const reviewData = [
  { id: "RV-001", name: "Amira & Nicolas", venue: "Aurora Palace", rating: 5, status: "Featured" },
  { id: "RV-002", name: "Claire & Julian", venue: "The Marble House", rating: 5, status: "Draft" },
  { id: "RV-003", name: "Maya & Sami", venue: "Amana Desert Sanctuary", rating: 4, status: "Published" },
  { id: "RV-004", name: "Elena & Theo", venue: "Montclair Chateau", rating: 5, status: "Published" },
];

export const settingLabels = {
  autoConfirm: "Auto-confirm eligible bookings",
  conciergeAlerts: "Concierge alerts",
  weeklySummary: "Weekly summary",
};
