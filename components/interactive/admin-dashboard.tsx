"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  CircleDollarSign,
  MapPin,
  Menu,
  Search,
  Sparkles,
  Star,
  Store,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ChartFrame } from "@/components/primitives/chart-frame";
import {
  initialLeads,
  leadColor,
  leadSourceData,
  navGroups,
  reviewData,
  revenueData,
  sectionEyebrows,
  settingLabels,
  statusColors,
  type AdminSection,
  type LeadStatus,
} from "@/components/interactive/admin-dashboard.config";
import {
  bookings as seedBookings,
  packages,
  venues,
  vendors,
  type Booking,
  type Venue,
  type Vendor,
} from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>("Dashboard");
  const [bookings, setBookings] = useState(seedBookings);
  const [collapsed, setCollapsed] = useState(false);
  const [leadStatuses, setLeadStatuses] = useState<Record<string, LeadStatus>>(
    Object.fromEntries(initialLeads.map((lead) => [lead.id, lead.status])),
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Booking["status"]>("All");
  const [reviewStatuses, setReviewStatuses] = useState<Record<string, string>>(
    Object.fromEntries(reviewData.map((review) => [review.id, review.status])),
  );
  const [settings, setSettings] = useState({
    autoConfirm: false,
    conciergeAlerts: true,
    weeklySummary: true,
  });
  const [toast, setToast] = useState<string | null>(null);

  const queryText = query.trim().toLowerCase();
  const filteredBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const matchesQuery = `${booking.id} ${booking.couple} ${booking.venue} ${booking.packageName} ${booking.status} ${booking.planner}`
          .toLowerCase()
          .includes(queryText);
        const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
        return matchesQuery && matchesStatus;
      }),
    [bookings, queryText, statusFilter],
  );

  const filteredVenues = useMemo(
    () =>
      venues.filter((venue) =>
        `${venue.name} ${venue.location} ${venue.region} ${venue.style} ${venue.status}`.toLowerCase().includes(queryText),
      ),
    [queryText],
  );

  const filteredVendors = useMemo(
    () =>
      vendors.filter((vendor) =>
        `${vendor.name} ${vendor.category} ${vendor.location} ${vendor.accepting ? "accepting" : "limited"}`.toLowerCase().includes(queryText),
      ),
    [queryText],
  );

  const filteredLeads = useMemo(
    () =>
      initialLeads.filter((lead) =>
        `${lead.id} ${lead.couple} ${lead.interest} ${lead.source} ${leadStatuses[lead.id]}`.toLowerCase().includes(queryText),
      ),
    [leadStatuses, queryText],
  );

  const confirmedRevenue = bookings.filter((booking) => booking.status !== "Cancelled").reduce((sum, booking) => sum + booking.value, 0);
  const averageVenueRating = venues.reduce((sum, venue) => sum + venue.rating, 0) / venues.length;
  const pendingCount = bookings.filter((booking) => booking.status === "Pending").length;
  const statusData = Object.entries(statusColors).map(([status, color]) => ({
    color,
    name: status,
    value: bookings.filter((booking) => booking.status === status).length,
  }));
  const unreadNotifications = pendingCount + initialLeads.filter((lead) => leadStatuses[lead.id] === "New").length;

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  }

  function updateStatus(id: string, status: Booking["status"]) {
    setBookings((current) => current.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
    showToast(`Booking ${id} marked ${status.toLowerCase()}`);
  }

  function updateLeadStatus(id: string, status: LeadStatus) {
    setLeadStatuses((current) => ({ ...current, [id]: status }));
    showToast(`Lead ${id} moved to ${status}`);
  }

  function selectSection(section: AdminSection) {
    setActiveSection(section);
    setMobileOpen(false);
  }

  function toggleSetting(key: keyof typeof settings) {
    setSettings((current) => {
      const next = { ...current, [key]: !current[key] };
      showToast(`${settingLabels[key]} ${next[key] ? "enabled" : "disabled"}`);
      return next;
    });
  }

  const searchPlaceholder =
    activeSection === "Venues"
      ? "Search venues, regions, styles"
      : activeSection === "Vendors"
        ? "Search vendors, categories, cities"
        : activeSection === "Leads"
          ? "Search leads, sources, packages"
          : "Search bookings, venues, couples";

  return (
    <div className="flex min-h-screen bg-ivory-100 text-soft-black">
      <Sidebar
        activeSection={activeSection}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        notifications={unreadNotifications}
        onClose={() => setMobileOpen(false)}
        onSelect={selectSection}
        onToggleCollapse={() => setCollapsed((value) => !value)}
      />

      <main className={cn("min-w-0 flex-1 transition-[padding] duration-300", collapsed ? "lg:pl-[88px]" : "lg:pl-[260px]")}>
        <header className="sticky top-0 z-30 border-b border-ivory-300 bg-ivory-50/90 px-4 backdrop-blur-xl md:px-6">
          <div className="flex min-h-16 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Open admin menu" onClick={() => setMobileOpen(true)} className="rounded-lg border border-ivory-400 p-2 lg:hidden">
                <Menu size={18} />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-stone">{sectionEyebrows[activeSection]}</p>
                <h1 className="font-display text-3xl font-semibold leading-none">{activeSection}</h1>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 sm:flex-row lg:max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-stone" size={18} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-xl border border-ivory-400 bg-pearl-white py-3 pl-10 pr-4 text-sm shadow-warm"
                />
              </div>
              <button type="button" onClick={() => setQuery("")} className="outline-button px-4 py-3">
                Clear
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Notifications" onClick={() => selectSection("Notifications")} className="relative rounded-full border border-ivory-400 bg-pearl-white p-3 shadow-warm">
                <Bell size={18} />
                {unreadNotifications ? <span className="absolute -right-1 -top-1 rounded-full bg-error px-1.5 text-[10px] font-bold text-ivory-50">{unreadNotifications}</span> : null}
              </button>
              <button type="button" onClick={() => selectSection("Settings")} className="h-10 w-10 rounded-full bg-soft-black text-center font-display text-2xl leading-10 text-champagne-400">
                M
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-4 md:p-6">
          {activeSection === "Dashboard" ? (
            <DashboardView
              averageVenueRating={averageVenueRating}
              bookings={bookings}
              confirmedRevenue={confirmedRevenue}
              filteredBookings={filteredBookings}
              statusData={statusData}
              updateStatus={updateStatus}
            />
          ) : null}
          {activeSection === "Bookings" ? (
            <BookingsView
              bookings={filteredBookings}
              statusFilter={statusFilter}
              updateStatus={updateStatus}
              onStatusFilter={setStatusFilter}
            />
          ) : null}
          {activeSection === "Venues" ? <VenuesView venues={filteredVenues} /> : null}
          {activeSection === "Vendors" ? <VendorsView vendors={filteredVendors} /> : null}
          {activeSection === "Leads" ? <LeadsView leads={filteredLeads} leadStatuses={leadStatuses} updateLeadStatus={updateLeadStatus} /> : null}
          {activeSection === "Calendar" ? <CalendarView bookings={bookings} /> : null}
          {activeSection === "Analytics" ? <AnalyticsView statusData={statusData} /> : null}
          {activeSection === "Reviews" ? (
            <ReviewsView
              reviewStatuses={reviewStatuses}
              updateReviewStatus={(id, status) => {
                setReviewStatuses((current) => ({ ...current, [id]: status }));
                showToast(`Review ${id} set to ${status}`);
              }}
            />
          ) : null}
          {activeSection === "Settings" ? <SettingsView settings={settings} toggleSetting={toggleSetting} /> : null}
          {activeSection === "Notifications" ? (
            <NotificationsView
              leads={initialLeads}
              leadStatuses={leadStatuses}
              pendingBookings={bookings.filter((booking) => booking.status === "Pending")}
              updateStatus={updateStatus}
              updateLeadStatus={updateLeadStatus}
            />
          ) : null}
        </div>
      </main>

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="glass-light fixed bottom-5 right-5 z-[100] max-w-sm rounded-xl border-l-4 border-champagne-500 p-5 shadow-warm-lg"
          >
            <p className="flex items-center gap-3 font-semibold"><Check className="shrink-0 text-success" /> {toast}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function DashboardView({
  averageVenueRating,
  bookings,
  confirmedRevenue,
  filteredBookings,
  statusData,
  updateStatus,
}: {
  averageVenueRating: number;
  bookings: Booking[];
  confirmedRevenue: number;
  filteredBookings: Booking[];
  statusData: Array<{ color: string; name: string; value: number }>;
  updateStatus: (id: string, status: Booking["status"]) => void;
}) {
  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={CalendarDays} label="Total Bookings" value={bookings.length.toString()} change="+18.4%" />
        <KpiCard icon={CircleDollarSign} label="Revenue" value={formatCurrency(confirmedRevenue)} change="+22.1%" />
        <KpiCard icon={Store} label="Active Venues" value={venues.length.toString()} change="+6.8%" />
        <KpiCard icon={Star} label="Avg. Rating" value={averageVenueRating.toFixed(2)} change="+0.3" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Panel title="Monthly Revenue" action={<Badge>Live</Badge>}>
          <div className="h-80">
            <ChartFrame>
              <ResponsiveContainer>
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" stroke="#8B847C" />
                  <YAxis stroke="#8B847C" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Line type="monotone" dataKey="revenue" stroke="#C4A46E" strokeWidth={3} dot={{ fill: "#C4A46E" }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartFrame>
          </div>
        </Panel>
        <Panel title="Booking Status">
          <div className="h-80">
            <ChartFrame>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}>
                    {statusData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartFrame>
          </div>
        </Panel>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Panel title="Recent Bookings">
          <BookingList bookings={filteredBookings.slice(0, 8)} updateStatus={updateStatus} />
        </Panel>
        <div className="grid gap-6">
          <Panel title="Upcoming Events">
            <Timeline bookings={bookings.slice(0, 5)} compact />
          </Panel>
          <Panel title="Lead Sources">
            <LeadSourcesChart />
          </Panel>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Top Venues">
          <Ranking names={venues.slice(0, 4).map((venue) => venue.name)} />
        </Panel>
        <Panel title="New Leads">
          <LeadsChart />
        </Panel>
      </section>
    </>
  );
}

function BookingsView({
  bookings,
  statusFilter,
  updateStatus,
  onStatusFilter,
}: {
  bookings: Booking[];
  statusFilter: "All" | Booking["status"];
  updateStatus: (id: string, status: Booking["status"]) => void;
  onStatusFilter: (status: "All" | Booking["status"]) => void;
}) {
  const statuses: Array<"All" | Booking["status"]> = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];
  return (
    <div className="grid gap-6">
      <Panel
        title="Booking Command"
        action={
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onStatusFilter(status)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]",
                  statusFilter === status ? "border-champagne-500 bg-champagne-500 text-soft-black" : "border-ivory-400 text-warm-gray hover:bg-ivory-100",
                )}
              >
                {status}
              </button>
            ))}
          </div>
        }
      >
        <BookingList bookings={bookings} updateStatus={updateStatus} />
      </Panel>
    </div>
  );
}

function BookingList({ bookings, updateStatus }: { bookings: Booking[]; updateStatus: (id: string, status: Booking["status"]) => void }) {
  if (!bookings.length) return <EmptyState title="No bookings found" copy="Try another search term or status filter." />;
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-ivory-300 xl:block">
        <table className="w-full text-left">
          <thead className="bg-ivory-200 text-xs uppercase tracking-[0.16em] text-muted-stone">
            <tr>
              <th className="p-4">Couple</th>
              <th className="p-4">Venue</th>
              <th className="p-4">Package</th>
              <th className="p-4">Date</th>
              <th className="p-4">Value</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-ivory-300 hover:bg-ivory-100">
                <td className="p-4">
                  <p className="font-semibold">{booking.couple}</p>
                  <p className="font-mono text-xs text-muted-stone">{booking.id} · {booking.planner}</p>
                </td>
                <td className="p-4 text-sm text-warm-gray">{booking.venue}</td>
                <td className="p-4 text-sm text-warm-gray">{booking.packageName}</td>
                <td className="p-4 font-mono text-sm">{booking.date}</td>
                <td className="p-4 text-sm font-semibold">{formatCurrency(booking.value)}</td>
                <td className="p-4"><StatusPill status={booking.status} /></td>
                <td className="p-4">
                  <StatusActions booking={booking} updateStatus={updateStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 xl:hidden">
        {bookings.map((booking) => (
          <div key={booking.id} className="rounded-xl border border-ivory-300 bg-ivory-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{booking.couple}</p>
                <p className="mt-1 text-sm text-warm-gray">{booking.venue}</p>
                <p className="mt-1 font-mono text-xs text-muted-stone">{booking.date} · {formatCurrency(booking.value)}</p>
              </div>
              <StatusPill status={booking.status} />
            </div>
            <div className="mt-4">
              <StatusActions booking={booking} updateStatus={updateStatus} align="left" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function StatusActions({
  align = "right",
  booking,
  updateStatus,
}: {
  align?: "left" | "right";
  booking: Booking;
  updateStatus: (id: string, status: Booking["status"]) => void;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", align === "right" && "justify-end")}>
      <button type="button" onClick={() => updateStatus(booking.id, "Confirmed")} className="rounded-lg px-3 py-2 text-xs font-bold text-success hover:bg-sage-100">Confirm</button>
      <button type="button" onClick={() => updateStatus(booking.id, "Completed")} className="rounded-lg px-3 py-2 text-xs font-bold text-info hover:bg-sage-100">Complete</button>
      <button type="button" onClick={() => updateStatus(booking.id, "Cancelled")} className="rounded-lg px-3 py-2 text-xs font-bold text-error hover:bg-blush-100">Cancel</button>
    </div>
  );
}

function VenuesView({ venues: filteredVenues }: { venues: Venue[] }) {
  if (!filteredVenues.length) return <EmptyState title="No venues found" copy="Search another city, region, or venue style." />;
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {filteredVenues.map((venue) => (
        <article key={venue.id} className="editorial-card overflow-hidden">
          <div className="h-2 gold-gradient" />
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-champagne-700">{venue.region} · {venue.style}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold">{venue.name}</h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-warm-gray"><MapPin size={15} /> {venue.location}</p>
              </div>
              <Rating value={venue.rating} />
            </div>
            <p className="mt-5 text-sm leading-7 text-warm-gray">{venue.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Metric label="Capacity" value={`${venue.capacity}`} />
              <Metric label="From" value={formatCurrency(venue.priceFrom)} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {venue.features.slice(0, 3).map((feature) => <Badge key={feature}>{feature}</Badge>)}
            </div>
            <p className="mt-5 text-sm font-semibold text-champagne-800">{venue.status}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function VendorsView({ vendors: filteredVendors }: { vendors: Vendor[] }) {
  if (!filteredVendors.length) return <EmptyState title="No vendors found" copy="Search another vendor category, city, or availability." />;
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {filteredVendors.map((vendor) => (
        <article key={vendor.id} className="editorial-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-champagne-700">{vendor.category}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">{vendor.name}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-warm-gray"><MapPin size={15} /> {vendor.location}</p>
            </div>
            <Rating value={vendor.rating} />
          </div>
          <p className="mt-5 text-sm leading-7 text-warm-gray">{vendor.description}</p>
          <div className="mt-5 flex items-center justify-between border-t border-ivory-300 pt-5">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-stone">From</p>
              <p className="font-semibold text-champagne-800">{formatCurrency(vendor.priceFrom)}</p>
            </div>
            <span className={cn("rounded-full px-3 py-1 text-xs font-bold", vendor.accepting ? "bg-sage-100 text-success" : "bg-blush-100 text-error")}>
              {vendor.accepting ? "Accepting" : "Limited"}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

function LeadsView({
  leadStatuses,
  leads,
  updateLeadStatus,
}: {
  leadStatuses: Record<string, LeadStatus>;
  leads: typeof initialLeads;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
}) {
  if (!leads.length) return <EmptyState title="No leads found" copy="Search another couple, package, source, or status." />;
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {leads.map((lead) => {
        const status = leadStatuses[lead.id];
        return (
          <article key={lead.id} className="editorial-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-muted-stone">{lead.id} · {lead.source}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold">{lead.couple}</h2>
                <p className="mt-2 text-sm text-warm-gray">{lead.interest} · {formatCurrency(lead.value)}</p>
              </div>
              <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${leadColor[status]}22`, color: leadColor[status] }}>
                {status}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {(["Contacted", "Proposal", "Booked"] as LeadStatus[]).map((nextStatus) => (
                <button key={nextStatus} type="button" onClick={() => updateLeadStatus(lead.id, nextStatus)} className="outline-button px-3 py-2">
                  {nextStatus}
                </button>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function CalendarView({ bookings }: { bookings: Booking[] }) {
  const sorted = [...bookings].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <Panel title="Event Calendar" action={<Badge>{sorted.length} dates</Badge>}>
      <Timeline bookings={sorted} />
    </Panel>
  );
}

function AnalyticsView({ statusData }: { statusData: Array<{ color: string; name: string; value: number }> }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Panel title="Revenue Trend">
        <div className="h-80">
          <ChartFrame>
            <ResponsiveContainer>
              <AreaChart data={revenueData}>
                <XAxis dataKey="month" stroke="#8B847C" />
                <YAxis stroke="#8B847C" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area dataKey="revenue" stroke="#C4A46E" fill="#F5F1E8" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>
        </div>
      </Panel>
      <Panel title="Lead Sources">
        <LeadSourcesChart />
      </Panel>
      <Panel title="New Leads">
        <LeadsChart />
      </Panel>
      <Panel title="Status Mix">
        <div className="h-64">
          <ChartFrame>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={100}>
                  {statusData.map((item) => <Cell key={item.name} fill={item.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartFrame>
        </div>
      </Panel>
    </div>
  );
}

function ReviewsView({
  reviewStatuses,
  updateReviewStatus,
}: {
  reviewStatuses: Record<string, string>;
  updateReviewStatus: (id: string, status: string) => void;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {reviewData.map((review) => (
        <article key={review.id} className="editorial-card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-muted-stone">{review.id}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">{review.name}</h2>
              <p className="mt-2 text-sm text-warm-gray">{review.venue}</p>
            </div>
            <Rating value={review.rating} />
          </div>
          <p className="mt-5 text-sm leading-7 text-warm-gray">
            &quot;The planning felt seamless, calm, and deeply personal from the first meeting to the final farewell.&quot;
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ivory-300 pt-5">
            <Badge>{reviewStatuses[review.id]}</Badge>
            <div className="flex gap-2">
              {["Published", "Featured", "Draft"].map((status) => (
                <button key={status} type="button" onClick={() => updateReviewStatus(review.id, status)} className="outline-button px-3 py-2">
                  {status}
                </button>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function SettingsView({ settings, toggleSetting }: { settings: Record<keyof typeof settingLabels, boolean>; toggleSetting: (key: keyof typeof settingLabels) => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
      <Panel title="Workspace Settings">
        <div className="grid gap-4">
          {(Object.keys(settingLabels) as Array<keyof typeof settingLabels>).map((key) => (
            <button key={key} type="button" onClick={() => toggleSetting(key)} className="flex items-center justify-between rounded-xl border border-ivory-300 bg-ivory-50 p-4 text-left">
              <div>
                <p className="font-semibold">{settingLabels[key]}</p>
                <p className="mt-1 text-sm text-warm-gray">{settings[key] ? "Enabled for this workspace." : "Disabled for this workspace."}</p>
              </div>
              <span className={cn("relative h-7 w-12 rounded-full transition", settings[key] ? "bg-champagne-500" : "bg-ivory-400")}>
                <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-ivory-50 transition", settings[key] ? "left-6" : "left-1")} />
              </span>
            </button>
          ))}
        </div>
      </Panel>
      <Panel title="Package Floors">
        <div className="space-y-4">
          {packages.slice(0, 4).map((tier) => (
            <div key={tier.id} className="flex items-center justify-between rounded-xl bg-ivory-50 p-4">
              <div>
                <p className="font-semibold">{tier.name}</p>
                <p className="mt-1 text-sm text-warm-gray">{tier.badge}</p>
              </div>
              <p className="font-semibold text-champagne-800">{formatCurrency(tier.price)}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function NotificationsView({
  leadStatuses,
  leads,
  pendingBookings,
  updateLeadStatus,
  updateStatus,
}: {
  leadStatuses: Record<string, LeadStatus>;
  leads: typeof initialLeads;
  pendingBookings: Booking[];
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateStatus: (id: string, status: Booking["status"]) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel title="Pending Bookings">
        <div className="space-y-4">
          {pendingBookings.length ? pendingBookings.map((booking) => (
            <div key={booking.id} className="rounded-xl bg-ivory-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{booking.couple}</p>
                  <p className="mt-1 text-sm text-warm-gray">{booking.packageName} at {booking.venue}</p>
                </div>
                <StatusPill status={booking.status} />
              </div>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => updateStatus(booking.id, "Confirmed")} className="luxury-button px-3 py-2">Confirm</button>
                <button type="button" onClick={() => updateStatus(booking.id, "Cancelled")} className="outline-button px-3 py-2">Cancel</button>
              </div>
            </div>
          )) : <EmptyState title="No pending bookings" copy="Everything is handled for now." />}
        </div>
      </Panel>
      <Panel title="New Leads">
        <div className="space-y-4">
          {leads.filter((lead) => leadStatuses[lead.id] === "New").length ? leads.filter((lead) => leadStatuses[lead.id] === "New").map((lead) => (
            <div key={lead.id} className="rounded-xl bg-ivory-50 p-4">
              <p className="font-semibold">{lead.couple}</p>
              <p className="mt-1 text-sm text-warm-gray">{lead.source} · {lead.interest}</p>
              <button type="button" onClick={() => updateLeadStatus(lead.id, "Contacted")} className="outline-button mt-4 px-3 py-2">
                Mark contacted
              </button>
            </div>
          )) : <EmptyState title="No new leads" copy="All leads have been touched." />}
        </div>
      </Panel>
    </div>
  );
}

function Sidebar({
  activeSection,
  collapsed,
  mobileOpen,
  notifications,
  onClose,
  onSelect,
  onToggleCollapse,
}: {
  activeSection: AdminSection;
  collapsed: boolean;
  mobileOpen: boolean;
  notifications: number;
  onClose: () => void;
  onSelect: (section: AdminSection) => void;
  onToggleCollapse: () => void;
}) {
  const content = (
    <aside className={cn("flex h-full flex-col bg-[#1E1B18] p-5 text-ivory-50 transition-[width] duration-300", collapsed ? "lg:w-[88px]" : "lg:w-[260px]")}>
      <div className="flex items-center justify-between">
        <div className={cn(collapsed && "lg:text-center")}>
          <p className="font-display text-3xl text-champagne-400">M.E</p>
          {!collapsed ? <p className="text-xs uppercase tracking-[0.18em] text-ivory-400">Admin Studio</p> : null}
        </div>
        <button type="button" aria-label="Close admin menu" onClick={onClose} className="rounded-lg border border-ivory-50/10 p-2 lg:hidden"><X size={18} /></button>
      </div>
      <div className="mt-10 space-y-8">
        {navGroups.map((group) => (
          <NavGroup
            key={group.label}
            activeSection={activeSection}
            collapsed={collapsed}
            group={group}
            notifications={notifications}
            onSelect={onSelect}
          />
        ))}
      </div>
      <button type="button" onClick={onToggleCollapse} className="mt-auto hidden items-center gap-2 rounded-xl border border-ivory-50/10 p-3 text-sm text-ivory-300 hover:bg-ivory-50/5 lg:flex">
        <ChevronLeft className={cn("transition", collapsed && "rotate-180")} size={16} />
        {!collapsed ? "Collapse" : null}
      </button>
    </aside>
  );
  return (
    <>
      <div className={cn("fixed inset-y-0 left-0 z-50 hidden transition-[width] duration-300 lg:block", collapsed ? "w-[88px]" : "w-[260px]")}>{content}</div>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div className="fixed inset-0 z-50 bg-soft-black/60 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="h-full w-[280px]" initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}>{content}</motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function NavGroup({
  activeSection,
  collapsed,
  group,
  notifications,
  onSelect,
}: {
  activeSection: AdminSection;
  collapsed: boolean;
  group: { label: string; icon: LucideIcon; items: AdminSection[] };
  notifications: number;
  onSelect: (section: AdminSection) => void;
}) {
  const Icon = group.icon;
  return (
    <div>
      {!collapsed ? <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ivory-400">{group.label}</p> : null}
      <div className="space-y-1">
        {group.items.map((item) => {
          const active = activeSection === item;
          return (
            <button
              key={item}
              type="button"
              aria-label={item}
              onClick={() => onSelect(item)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-ivory-300 hover:bg-champagne-500/10",
                active && "border-l-4 border-champagne-500 bg-champagne-500/10 text-champagne-400",
                collapsed && "justify-center border-l-0 px-2",
              )}
              title={collapsed ? item : undefined}
            >
              <Icon size={18} />
              {!collapsed ? <span>{item}</span> : null}
              {!collapsed && item === "Notifications" && notifications ? (
                <span className="ml-auto rounded-full bg-champagne-500 px-2 py-0.5 text-xs text-soft-black">{notifications}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, change }: { icon: LucideIcon; label: string; value: string; change: string }) {
  return (
    <div className="editorial-card p-6">
      <div className="flex items-start justify-between">
        <span className="rounded-full bg-champagne-500/10 p-3 text-champagne-700"><Icon size={22} /></span>
        <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-bold text-success">{change}</span>
      </div>
      <p className="mt-6 text-sm text-warm-gray">{label}</p>
      <p className="mt-2 font-mono text-3xl font-semibold">{value}</p>
    </div>
  );
}

function Panel({ action, title, children }: { action?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="editorial-card p-5 md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-3xl font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function StatusPill({ status }: { status: Booking["status"] }) {
  return (
    <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: `${statusColors[status]}22`, color: statusColors[status] }}>
      {status}
    </span>
  );
}

function Timeline({ bookings, compact = false }: { bookings: Booking[]; compact?: boolean }) {
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="rounded-xl bg-ivory-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">{booking.couple}</p>
              <p className="mt-1 text-sm text-warm-gray">{booking.date} · {booking.venue}</p>
              {!compact ? <p className="mt-1 text-sm text-muted-stone">{booking.packageName} · {booking.planner}</p> : null}
            </div>
            <StatusPill status={booking.status} />
          </div>
        </div>
      ))}
    </div>
  );
}

function LeadSourcesChart() {
  return (
    <div className="h-64">
      <ChartFrame>
        <ResponsiveContainer>
          <BarChart data={leadSourceData}>
            <XAxis dataKey="name" stroke="#8B847C" />
            <YAxis stroke="#8B847C" />
            <Tooltip />
            <Bar dataKey="value" fill="#C4A46E" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
  );
}

function LeadsChart() {
  return (
    <div className="h-64">
      <ChartFrame>
        <ResponsiveContainer>
          <AreaChart data={revenueData}>
            <XAxis dataKey="month" stroke="#8B847C" />
            <YAxis stroke="#8B847C" />
            <Tooltip />
            <Area dataKey="leads" stroke="#7A9E7E" fill="#E8EDE4" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
  );
}

function Ranking({ names }: { names: string[] }) {
  return (
    <div className="space-y-4">
      {names.map((name, index) => (
        <div key={name} className="flex items-center gap-4 rounded-xl bg-ivory-50 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-soft-black font-mono text-sm text-champagne-400">{index + 1}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{name}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-ivory-300">
              <div className="h-full rounded-full gold-gradient" style={{ width: `${92 - index * 12}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-ivory-50 p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-stone">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-champagne-500/10 px-3 py-1 text-sm font-bold text-champagne-800">
      <Star size={15} fill="currentColor" /> {value.toFixed(2)}
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-champagne-400/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-champagne-800">{children}</span>;
}

function EmptyState({ copy, title }: { copy: string; title: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-champagne-400/40 bg-ivory-50 p-8 text-center">
      <Sparkles className="mx-auto text-champagne-600" size={28} />
      <h3 className="mt-4 font-display text-3xl font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-warm-gray">{copy}</p>
    </div>
  );
}
