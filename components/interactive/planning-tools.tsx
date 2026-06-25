"use client";

import { differenceInSeconds } from "date-fns";
import { CalendarPlus, CheckCircle2, Clock, Download, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartFrame } from "@/components/primitives/chart-frame";
import { checklistGroups } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

type Guest = {
  id: number;
  name: string;
  relation: string;
  status: "Attending" | "Pending" | "Declined";
};

const initialGuests: Guest[] = [
  { id: 1, name: "Maya Haddad", relation: "Family", status: "Attending" },
  { id: 2, name: "Theo Laurent", relation: "Friend", status: "Pending" },
  { id: 3, name: "Sara Chen", relation: "Work", status: "Attending" },
  { id: 4, name: "Adam Moreau", relation: "Family", status: "Declined" },
];

const budgetDefaults = [
  { name: "Venue", percent: 34, color: "#C4A46E" },
  { name: "Catering", percent: 22, color: "#7A9E7E" },
  { name: "Florals", percent: 12, color: "#D48888" },
  { name: "Photo", percent: 10, color: "#7A8FA0" },
  { name: "Music", percent: 8, color: "#9A7840" },
  { name: "Other", percent: 14, color: "#8B847C" },
];

const timelineDefaults = [
  { time: "8:00 AM", title: "Hair and makeup begins", type: "Preparation" },
  { time: "2:30 PM", title: "Ceremony seating opens", type: "Ceremony" },
  { time: "3:00 PM", title: "Vows in the garden", type: "Ceremony" },
  { time: "5:00 PM", title: "Champagne reception", type: "Reception" },
  { time: "7:30 PM", title: "Dinner service", type: "Reception" },
  { time: "11:00 PM", title: "After-party transfer", type: "Transport" },
];

export function PlanningTools() {
  const [tab, setTab] = useState("Budget");
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="editorial-card grid gap-2 p-3">
            {["Budget", "Guests", "Timeline", "Checklist", "Countdown", "RSVP"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={cn(
                  "rounded-xl px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.14em]",
                  tab === item ? "bg-soft-black text-ivory-50 shadow-warm" : "text-warm-gray hover:bg-ivory-200",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>
        <div className="min-h-[640px]">
          {tab === "Budget" ? <BudgetPlanner /> : null}
          {tab === "Guests" ? <GuestList /> : null}
          {tab === "Timeline" ? <TimelineTool /> : null}
          {tab === "Checklist" ? <ChecklistTool /> : null}
          {tab === "Countdown" ? <CountdownTool /> : null}
          {tab === "RSVP" ? <RsvpSummary /> : null}
        </div>
      </div>
    </div>
  );
}

function BudgetPlanner() {
  const [total, setTotal] = useState(120000);
  const [allocations, setAllocations] = useState(budgetDefaults);
  const allocated = allocations.reduce((sum, item) => sum + item.percent, 0);
  const remaining = 100 - allocated;
  const chartData = allocations.map((item) => ({ ...item, value: Math.round((total * item.percent) / 100) }));

  return (
    <ToolPanel title="Budget Planner" copy="Adjust your total and allocation mix. The chart updates instantly so you can see the shape of the celebration.">
      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="editorial-card p-6">
          <label className="text-xs font-bold uppercase tracking-[0.18em] text-muted-stone">Total Budget</label>
          <input
            value={total}
            min={10000}
            step={5000}
            type="number"
            onChange={(event) => setTotal(Number(event.target.value))}
            className="mt-3 w-full rounded-xl border border-ivory-400 bg-ivory-50 px-4 py-4 text-2xl font-bold text-soft-black focus:border-champagne-500"
          />
          <div className="mt-6 space-y-5">
            {allocations.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{item.name}</span>
                  <span>{item.percent}% · {formatCurrency((total * item.percent) / 100)}</span>
                </div>
                <input
                  aria-label={`${item.name} allocation`}
                  className="mt-2 w-full accent-champagne-600"
                  max={60}
                  min={0}
                  type="range"
                  value={item.percent}
                  onChange={(event) =>
                    setAllocations((current) =>
                      current.map((entry) =>
                        entry.name === item.name ? { ...entry, percent: Number(event.target.value) } : entry,
                      ),
                    )
                  }
                />
              </div>
            ))}
          </div>
          <p className={cn("mt-6 rounded-xl px-4 py-3 text-sm font-bold", remaining >= 0 ? "bg-sage-100 text-success" : "bg-blush-100 text-error")}>
            {remaining >= 0 ? `${remaining}% unallocated` : `${Math.abs(remaining)}% over allocated`}
          </p>
        </div>
        <div className="editorial-card p-6">
          <div className="h-80">
            <ChartFrame>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={82} outerRadius={122} paddingAngle={4}>
                    {chartData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </ChartFrame>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl bg-ivory-50 p-3">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-3 w-3 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className="text-sm text-warm-gray">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}

function GuestList() {
  const [guests, setGuests] = useState(initialGuests);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState<Guest["status"] | "All">("All");
  const filtered = filter === "All" ? guests : guests.filter((guest) => guest.status === filter);
  const counts = {
    Attending: guests.filter((guest) => guest.status === "Attending").length,
    Pending: guests.filter((guest) => guest.status === "Pending").length,
    Declined: guests.filter((guest) => guest.status === "Declined").length,
  };
  return (
    <ToolPanel title="Guest List Manager" copy="Track RSVPs, relation groups, and the guest experience in a tidy operational view.">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="editorial-card overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-ivory-300 p-5 md:flex-row">
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Guest name" className="flex-1 rounded-xl border border-ivory-400 bg-ivory-50 px-4 py-3" />
            <button
              type="button"
              className="luxury-button"
              onClick={() => {
                if (!name.trim()) return;
                setGuests((current) => [...current, { id: Date.now(), name, relation: "Guest", status: "Pending" }]);
                setName("");
              }}
            >
              <Plus size={16} /> Add
            </button>
          </div>
          <div className="grid gap-3 p-5">
            {filtered.map((guest) => (
              <div key={guest.id} className="grid gap-3 rounded-xl bg-ivory-50 p-4 md:grid-cols-[1fr_160px_44px] md:items-center">
                <div>
                  <p className="font-semibold">{guest.name}</p>
                  <p className="text-sm text-warm-gray">{guest.relation}</p>
                </div>
                <select
                  value={guest.status}
                  onChange={(event) =>
                    setGuests((current) =>
                      current.map((entry) => (entry.id === guest.id ? { ...entry, status: event.target.value as Guest["status"] } : entry)),
                    )
                  }
                  className="rounded-lg border border-ivory-400 bg-pearl-white px-3 py-2 text-sm"
                >
                  <option>Attending</option>
                  <option>Pending</option>
                  <option>Declined</option>
                </select>
                <button type="button" aria-label={`Remove ${guest.name}`} onClick={() => setGuests((current) => current.filter((entry) => entry.id !== guest.id))} className="rounded-lg p-3 text-error hover:bg-blush-100">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {(["All", "Attending", "Pending", "Declined"] as const).map((item) => (
            <button key={item} type="button" onClick={() => setFilter(item)} className={cn("editorial-card w-full p-5 text-left", filter === item && "border-champagne-500 bg-champagne-500/10")}>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-stone">{item}</p>
              <p className="mt-2 font-display text-4xl">{item === "All" ? guests.length : counts[item]}</p>
            </button>
          ))}
        </div>
      </div>
    </ToolPanel>
  );
}

function TimelineTool() {
  const [items, setItems] = useState(timelineDefaults);
  return (
    <ToolPanel title="Event Timeline" copy="A vertical run-of-show for the day, color-coded by event category.">
      <div className="editorial-card p-6">
        <div className="space-y-5">
          {items.map((item, index) => (
            <div key={`${item.time}-${item.title}`} className="grid gap-4 rounded-xl bg-ivory-50 p-4 md:grid-cols-[110px_1fr_120px] md:items-center">
              <input
                value={item.time}
                onChange={(event) => setItems((current) => current.map((entry, i) => (i === index ? { ...entry, time: event.target.value } : entry)))}
                className="rounded-lg border border-ivory-400 bg-pearl-white px-3 py-2 font-mono text-sm"
              />
              <input
                value={item.title}
                onChange={(event) => setItems((current) => current.map((entry, i) => (i === index ? { ...entry, title: event.target.value } : entry)))}
                className="rounded-lg border border-ivory-400 bg-pearl-white px-3 py-2"
              />
              <span className="rounded-full bg-champagne-500/10 px-3 py-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-champagne-800">{item.type}</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setItems((current) => [...current, { time: "12:30 AM", title: "Late-night bites", type: "Reception" }])} className="outline-button mt-6">
          <CalendarPlus size={16} /> Add event
        </button>
      </div>
    </ToolPanel>
  );
}

function ChecklistTool() {
  const allItems = checklistGroups.flatMap((group) => group.items);
  const [done, setDone] = useState<string[]>(allItems.slice(0, 5));
  const progress = Math.round((done.length / allItems.length) * 100);
  return (
    <ToolPanel title="Checklist Tracker" copy="Progress by timeline, with a clear sense of what is complete and what deserves attention.">
      <div className="editorial-card p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-stone">Overall completion</p>
            <p className="mt-1 font-display text-5xl">{progress}%</p>
          </div>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-ivory-300">
            <div className="h-full rounded-full gold-gradient" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {checklistGroups.map((group) => {
            const groupDone = group.items.filter((item) => done.includes(item)).length;
            return (
              <div key={group.label} className="rounded-xl bg-ivory-50 p-5">
                <div className="flex justify-between">
                  <h3 className="font-display text-2xl font-semibold">{group.label}</h3>
                  <span className="text-sm text-warm-gray">{groupDone}/{group.items.length}</span>
                </div>
                <div className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <label key={item} className="flex cursor-pointer items-center gap-3 text-sm">
                      <input
                        checked={done.includes(item)}
                        type="checkbox"
                        onChange={(event) =>
                          setDone((current) => (event.target.checked ? [...current, item] : current.filter((entry) => entry !== item)))
                        }
                        className="h-5 w-5 accent-champagne-600"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ToolPanel>
  );
}

function CountdownTool() {
  const [date, setDate] = useState("2026-10-10");
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const seconds = Math.max(0, differenceInSeconds(new Date(date), now));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return (
    <ToolPanel title="Countdown Timer" copy="A live countdown for the day that quietly keeps everyone oriented.">
      <div className="hero-gradient rounded-3xl p-8 text-ivory-50 shadow-warm-lg">
        <label className="text-xs font-bold uppercase tracking-[0.18em] text-champagne-400">Wedding date</label>
        <input value={date} onChange={(event) => setDate(event.target.value)} type="date" className="mt-3 rounded-xl border border-champagne-400/30 bg-ivory-50/10 px-4 py-3 text-ivory-50" />
        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {[
            ["Days", days],
            ["Hours", hours],
            ["Minutes", minutes],
            ["Seconds", secs],
          ].map(([label, value]) => (
            <div key={label} className="glass-dark rounded-2xl p-6 text-center">
              <p className="font-display text-6xl font-semibold text-champagne-400">{value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ivory-300">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolPanel>
  );
}

function RsvpSummary() {
  const data = [
    { name: "Confirmed", value: 87, color: "#7A9E7E" },
    { name: "Pending", value: 12, color: "#C4A46E" },
    { name: "Declined", value: 5, color: "#B07070" },
  ];
  return (
    <ToolPanel title="RSVP Summary" copy="A concise view of confirmations, dietary signals, meal choices, and table readiness.">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="editorial-card p-6">
          <div className="h-80">
            <ChartFrame>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" innerRadius={76} outerRadius={118}>
                    {data.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartFrame>
          </div>
          <button type="button" className="luxury-button w-full" onClick={() => alert("Guest report exported for concierge review.")}>
            <Download size={16} /> Export Summary
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["18 vegetarian", "9 gluten-free", "12 children", "14 tables", "3 VIP arrivals", "6 accessibility notes"].map((item) => (
            <div key={item} className="editorial-card flex items-center gap-3 p-5">
              <CheckCircle2 className="text-success" />
              <span className="font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </ToolPanel>
  );
}

function ToolPanel({ title, copy, children }: { title: string; copy: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-8">
        <span className="gold-line mb-5" />
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-champagne-700">
          <Clock size={16} /> Concierge Tool
        </p>
        <h2 className="mt-3 font-display text-5xl font-semibold">{title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-warm-gray">{copy}</p>
      </div>
      {children}
    </section>
  );
}
