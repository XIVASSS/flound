"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bluetooth,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Layers,
  LayoutGrid,
  Palette,
  Plus,
  Send,
  Smartphone,
  Sparkles,
  Truck,
  Wallet,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import {
  CAPABILITIES_TABS,
  TIME_RANGES,
  type CapabilitiesTab,
  type TimeRangeId,
} from "@/lib/capabilities-tabs";
import { services, serviceShortcuts } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import {
  DashboardCard,
  DashboardCounter,
  DashboardTabPanel,
} from "./dashboard-motion";
import { RadialGauge } from "./RadialGauge";

const SERVICE_ICONS = [Smartphone, Cpu, BrainCircuit, Palette];
const SERVICE_COUNTS = [15, 10, 8, 4];
const ACTIVITY_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const panel = "rounded-2xl border border-border/80 bg-card";
const soft = "rounded-2xl border border-border/60 bg-card/60";
const frost = "rounded-full border border-border/60 bg-card/80 backdrop-blur-sm";
const label =
  "text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground";
const iconBox =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foreground text-background";
const iconBoxLg =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground text-background";

const RAIL_ITEMS: {
  id: CapabilitiesTab;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
}[] = [
  { id: "overview", icon: LayoutGrid, label: "Overview" },
  { id: "capabilities", icon: Smartphone, label: "Capabilities" },
  { id: "stack", icon: BarChart3, label: "Stack" },
  { id: "delivery", icon: Truck, label: "Delivery" },
];

const shortcutIcons = {
  Bluetooth,
  Bot,
  Layers,
  Sparkles,
};

function avgActivity(values: number[]) {
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

function GrowthBadge({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums",
        positive
          ? "bg-dashboard-positive/15 text-dashboard-positive"
          : "bg-dashboard-negative/15 text-dashboard-negative",
      )}
    >
      {positive ? "+" : ""}
      {value}%
    </span>
  );
}

function CardLinkIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-muted/30 text-muted-foreground">
      <ArrowUpRight size={13} strokeWidth={2} />
    </span>
  );
}

export function CapabilitiesDashboard() {
  const [activeTab, setActiveTab] = useState<CapabilitiesTab>("capabilities");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [timeRangeId, setTimeRangeId] = useState<TimeRangeId>("all");

  const allTags = useMemo(
    () => [...new Set(services.flatMap((service) => service.items))],
    [],
  );

  const deliveryPct = useMemo(() => {
    const total = SERVICE_COUNTS.reduce((a, b) => a + b, 0);
    const weighted = services.reduce(
      (sum, service, i) => sum + avgActivity(service.activity) * SERVICE_COUNTS[i],
      0,
    );
    return Math.round(weighted / total);
  }, []);

  const activeService = services[activeIndex];
  const gaugePct = avgActivity(activeService.activity);
  const timeMultiplier =
    timeRangeId === "recent" ? 0.7 : timeRangeId === "quarter" ? 0.85 : 1;

  const selectService = (index: number) => {
    setActiveIndex(index);
    setActiveTag(null);
  };

  const toggleTag = (tag: string) => {
    setActiveTag((current) => (current === tag ? null : tag));
    const match = services.findIndex((service) => service.items.includes(tag));
    if (match >= 0) setActiveIndex(match);
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-[#0a0a0a] shadow-2xl shadow-black/40">
      <aside className="absolute inset-y-0 left-0 z-20 hidden w-[56px] flex-col items-center py-6 sm:flex lg:w-[72px]">
        <nav className="flex flex-1 flex-col items-center justify-center gap-3">
          {RAIL_ITEMS.map(({ id, icon: Icon, label: railLabel }) => {
            const active = activeTab === id;
            return (
              <motion.button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                aria-label={railLabel}
                aria-current={active ? "page" : undefined}
                title={railLabel}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card/40"
              >
                {active && (
                  <motion.span
                    layoutId="cap-rail-active"
                    className="absolute inset-0 rounded-full bg-foreground shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10",
                    active
                      ? "text-background"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  <Icon size={18} strokeWidth={1.9} />
                </span>
              </motion.button>
            );
          })}
        </nav>
      </aside>

      <div className="relative z-10 sm:pl-[56px] lg:pl-[72px]">
        <div className="p-4 sm:p-6 lg:p-8">
          <header className="mb-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className={cn(
                    frost,
                    "px-4 py-2 text-[13px] text-muted-foreground",
                  )}
                >
                  <DashboardCounter
                    value={deliveryPct}
                    suffix="%"
                    className="font-semibold text-foreground"
                  />
                  <span> delivery efficiency</span>
                </div>
              </motion.div>

              <div className="flex items-center gap-2">
                {activeTag && (
                  <button
                    type="button"
                    onClick={() => setActiveTag(null)}
                    className={cn(
                      frost,
                      "inline-flex h-10 items-center gap-1.5 px-3 text-[12px] text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <X size={14} />
                    Clear
                  </button>
                )}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setActiveTab("capabilities")}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background shadow-sm"
                  aria-label="View capabilities"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </motion.button>
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Capabilities at a glance
                </h3>
                <p className="mt-2 max-w-md text-[14px] text-muted-foreground">
                  {site.name} — apps, hardware, and AI shipped as one product
                  experience.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <QuickAction
                  label="View stack"
                  onClick={() => setActiveTab("stack")}
                />
                <QuickAction
                  label="Delivery pipeline"
                  onClick={() => setActiveTab("delivery")}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <nav
                role="tablist"
                aria-label="Dashboard sections"
                className="relative flex items-center gap-1 rounded-full border border-border/60 bg-card/40 p-1"
              >
                {CAPABILITIES_TABS.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "relative z-10 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300",
                        active
                          ? "text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="cap-tab-pill"
                          className="absolute inset-0 rounded-full bg-foreground shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div
                role="tablist"
                aria-label="Time range"
                className="flex items-center gap-1 rounded-full border border-border/60 bg-card/40 p-1"
              >
                {TIME_RANGES.map((range) => {
                  const active = timeRangeId === range.id;
                  return (
                    <motion.button
                      key={range.id}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTimeRangeId(range.id)}
                      whileTap={{ scale: 0.94 }}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors duration-300",
                        active
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {range.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </header>

          <DashboardTabPanel tabKey={activeTab}>
            {activeTab === "overview" && (
              <OverviewPanel
                activeIndex={activeIndex}
                deliveryPct={deliveryPct}
                gaugePct={gaugePct}
                timeMultiplier={timeMultiplier}
                onSelectService={selectService}
                onNavigateCapabilities={() => setActiveTab("capabilities")}
                onNavigateStack={() => setActiveTab("stack")}
              />
            )}
            {activeTab === "capabilities" && (
              <CapabilitiesPanel
                activeIndex={activeIndex}
                activeTag={activeTag}
                onSelectService={selectService}
                onToggleTag={toggleTag}
              />
            )}
            {activeTab === "stack" && (
              <StackPanel
                allTags={allTags}
                activeTag={activeTag}
                activeIndex={activeIndex}
                timeMultiplier={timeMultiplier}
                onToggleTag={toggleTag}
                onSelectService={selectService}
              />
            )}
            {activeTab === "delivery" && (
              <DeliveryPanel
                activeIndex={activeIndex}
                onSelectService={selectService}
              />
            )}
          </DashboardTabPanel>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-[13px] font-medium text-muted-foreground backdrop-blur-sm hover:text-foreground",
      )}
    >
      <Sparkles size={14} className="text-foreground/70" />
      {label}
      <ChevronRight
        size={14}
        className="text-muted-foreground group-hover:text-foreground"
      />
    </motion.button>
  );
}

function OverviewPanel({
  activeIndex,
  deliveryPct,
  gaugePct,
  timeMultiplier,
  onSelectService,
  onNavigateCapabilities,
  onNavigateStack,
}: {
  activeIndex: number;
  deliveryPct: number;
  gaugePct: number;
  timeMultiplier: number;
  onSelectService: (i: number) => void;
  onNavigateCapabilities: () => void;
  onNavigateStack: () => void;
}) {
  const activeService = services[activeIndex];
  const Icon = SERVICE_ICONS[activeIndex];
  const activityDelta = Math.round(
    (activeService.activity.at(-1)! - activeService.activity.at(-2)!) *
      timeMultiplier,
  );
  const peakDay = activeService.activity.indexOf(
    Math.max(...activeService.activity),
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
      <DashboardCard
        asButton
        index={0}
        onClick={onNavigateStack}
        className={cn(
          panel,
          "relative flex flex-col justify-between overflow-hidden p-6 text-left lg:col-span-4 lg:row-span-2 lg:min-h-[320px]",
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className={label}>Analytics</p>
            <p className="mt-3 text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
              {SERVICE_COUNTS[activeIndex]}+
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {activeService.title} shipped
            </p>
          </div>
          <CardLinkIcon />
        </div>
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <GrowthBadge value={activityDelta} />
            <span className="text-[11px] text-muted-foreground">Last 7 days</span>
          </div>
          <div
            className="relative flex h-28 items-end gap-2 rounded-xl bg-muted/20 px-3 py-3"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 8px, rgba(255,255,255,0.02) 8px, rgba(255,255,255,0.02) 9px)",
            }}
          >
            {activeService.activity.map((value, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t-lg bg-dashboard-positive"
                  initial={{ height: 0 }}
                  animate={{ height: `${value * timeMultiplier * 0.85}px` }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                />
                <span className="text-[9px] text-muted-foreground">
                  {ACTIVITY_DAYS[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        asButton
        index={1}
        onClick={onNavigateCapabilities}
        className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-dashboard-accent-orange p-6 text-left text-white lg:col-span-4"
      >
        <div className="flex items-start justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
            Statistics
          </p>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white">
            <ArrowUpRight size={13} strokeWidth={2} />
          </span>
        </div>
        <div>
          <p className="text-4xl font-bold tabular-nums tracking-tight sm:text-5xl">
            <DashboardCounter value={deliveryPct} suffix="%" />
          </p>
          <p className="mt-2 text-[13px] text-white/70">Delivery efficiency</p>
        </div>
        <div className="mt-4 flex h-16 items-end gap-1">
          {activeService.activity.slice(0, 7).map((value, i) => (
            <motion.div
              key={i}
              className={cn(
                "relative flex-1 rounded-t-sm bg-white/30",
                i === peakDay && "bg-white",
              )}
              initial={{ height: 0 }}
              animate={{ height: `${(value / 100) * 56}px` }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              {i === peakDay && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-semibold text-dashboard-accent-orange">
                  {Math.round(value * timeMultiplier)}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard
        asButton
        index={2}
        onClick={() => onSelectService(activeIndex)}
        className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-dashboard-accent-blue p-6 text-left text-white lg:col-span-4"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-4 top-12 h-28 w-28 rounded-full border border-white/10"
          aria-hidden
        />
        <div className="relative flex items-start justify-between">
          <div className="flex h-8 w-12 items-center justify-center rounded-md bg-white/20 text-[11px] font-bold tracking-widest">
            {activeService.number}
          </div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white">
            <ArrowUpRight size={13} strokeWidth={2} />
          </span>
        </div>
        <div className="relative mt-4">
          <div className="mb-3 flex items-center gap-2">
            <Icon size={20} strokeWidth={1.75} />
            <span className="text-[13px] font-medium text-white/80">
              Active capability
            </span>
          </div>
          <p className="text-2xl font-bold">{activeService.title}</p>
          <p className="mt-1 text-[13px] text-white/70">
            {activeService.metrics[0]?.value}
          </p>
        </div>
        <p className="relative mt-4 font-mono text-[13px] tracking-widest text-white/60">
          {activeService.items.length} tools · {gaugePct}% utilization
        </p>
      </DashboardCard>

      <DashboardCard
        index={3}
        className={cn(panel, "flex flex-col justify-between p-5 lg:col-span-3")}
      >
        <div className="flex items-start justify-between">
          <p className={label}>Weekly output</p>
          <CardLinkIcon />
        </div>
        <div>
          <p className="text-2xl font-bold tabular-nums">
            +{Math.round(gaugePct * timeMultiplier * 30)} hrs
          </p>
          <div className="mt-2">
            <GrowthBadge value={activityDelta} />
          </div>
        </div>
      </DashboardCard>

      <DashboardCard
        index={4}
        className={cn(panel, "p-5 lg:col-span-5")}
      >
        <p className={cn(label, "mb-4")}>Quick links</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: LayoutGrid, label: "Capabilities", action: onNavigateCapabilities },
            { icon: Send, label: "Stack", action: onNavigateStack },
            { icon: Wallet, label: "Delivery", action: onNavigateCapabilities },
          ].map(({ icon: ActionIcon, label: actionLabel, action }) => (
            <button
              key={actionLabel}
              type="button"
              onClick={action}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-muted/20 px-3 py-4 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card">
                <ActionIcon size={18} strokeWidth={1.75} />
              </span>
              {actionLabel}
            </button>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard
        index={5}
        className={cn(panel, "p-5 lg:col-span-4")}
      >
        <div className="mb-4 flex items-start justify-between">
          <p className={label}>Stack depth</p>
          <CardLinkIcon />
        </div>
        <RadialGauge
          percent={Math.round(gaugePct * timeMultiplier)}
          centerPrimary={`${activeService.items.length} tools`}
          centerSecondary={activeService.title}
        />
      </DashboardCard>

      <DashboardCard
        index={6}
        className={cn(panel, "p-5 lg:col-span-8")}
      >
        <div className="mb-4 flex items-start justify-between">
          <p className={label}>Capability coverage</p>
          <CardLinkIcon />
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          {services.map((service, i) => {
            const ServiceIcon = SERVICE_ICONS[i];
            return (
              <button
                key={service.number}
                type="button"
                onClick={() => onSelectService(i)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-transparent px-2 py-2 text-left transition-colors hover:border-border/60 hover:bg-muted/20",
                  activeIndex === i && "border-border/60 bg-muted/20",
                )}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/40">
                  <ServiceIcon size={15} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium">{service.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {SERVICE_COUNTS[i]}+ shipped
                  </p>
                </div>
                <span className="ml-auto text-[12px] font-semibold tabular-nums text-dashboard-positive">
                  {avgActivity(service.activity)}%
                </span>
              </button>
            );
          })}
        </div>
      </DashboardCard>

      <DashboardCard
        index={7}
        className={cn(panel, "p-5 lg:col-span-4")}
      >
        <div className="mb-4 flex items-start justify-between">
          <p className={label}>Ship stats</p>
          <CardLinkIcon />
        </div>
        <div className="space-y-3">
          {site.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/10 px-4 py-3"
            >
              <span className="text-[13px] text-muted-foreground">{stat.label}</span>
              <span className="text-[15px] font-bold tabular-nums">{stat.value}</span>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}

function CapabilitiesPanel({
  activeIndex,
  activeTag,
  onSelectService,
  onToggleTag,
}: {
  activeIndex: number;
  activeTag: string | null;
  onSelectService: (i: number) => void;
  onToggleTag: (tag: string) => void;
}) {
  const activeService = services[activeIndex];
  const Icon = SERVICE_ICONS[activeIndex];

  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
      <div className="flex flex-col gap-3 lg:col-span-5">
        {services.map((service, i) => {
          const ServiceIcon = SERVICE_ICONS[i];
          const selected = activeIndex === i;
          const dimmed =
            activeTag !== null && !service.items.includes(activeTag);
          return (
            <motion.button
              key={service.number}
              type="button"
              onClick={() => onSelectService(i)}
              animate={{ opacity: dimmed ? 0.35 : 1 }}
              className={cn(
                panel,
                "w-full p-4 text-left transition-all duration-300",
                selected
                  ? "border-foreground/30 ring-1 ring-foreground/10"
                  : "hover:border-border",
              )}
            >
              <div className="flex items-center gap-3">
                <div className={iconBox}>
                  <ServiceIcon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {service.number}
                    </span>
                    <span className="truncate text-[15px] font-semibold">
                      {service.title}
                    </span>
                  </div>
                  <p className="truncate text-[13px] text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                {selected && (
                  <CheckCircle2 size={18} className="shrink-0 text-foreground" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <DashboardCard index={0} className={cn(panel, "p-6 sm:p-8 lg:col-span-7")}>
        <div className="mb-6 flex items-start gap-4">
          <div className={iconBoxLg}>
            <Icon size={22} />
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted-foreground">
              {activeService.number}
            </p>
            <h4 className="text-xl font-semibold">{activeService.title}</h4>
            <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
              {activeService.description}
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3">
          {activeService.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border/60 bg-muted/20 px-3 py-3 text-center"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {metric.label}
              </p>
              <p className="mt-1.5 text-[13px] font-semibold leading-snug">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <p className={cn(label, "mb-3")}>Stack & tools</p>
        <div className="flex flex-wrap gap-2">
          {activeService.items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onToggleTag(item)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
                activeTag === item
                  ? "border-foreground bg-foreground text-background"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}

function StackPanel({
  allTags,
  activeTag,
  activeIndex,
  timeMultiplier,
  onToggleTag,
  onSelectService,
}: {
  allTags: string[];
  activeTag: string | null;
  activeIndex: number;
  timeMultiplier: number;
  onToggleTag: (tag: string) => void;
  onSelectService: (i: number) => void;
}) {
  const activeService = services[activeIndex];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const selected = activeTag === tag;
          return (
            <motion.button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              whileTap={{ scale: 0.94 }}
              className={cn(
                "rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors duration-300",
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground",
              )}
            >
              {tag}
            </motion.button>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {services.map((service, i) => {
          const visible = !activeTag || service.items.includes(activeTag);
          if (!visible) return null;
          return (
            <DashboardCard
              key={service.number}
              asButton
              index={i}
              onClick={() => onSelectService(i)}
              className={cn(panel, "p-6 text-left")}
            >
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-[15px] font-semibold">{service.title}</h4>
                <span className="rounded-full bg-muted/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                  {service.number}
                </span>
              </div>
              <div className="flex h-28 items-end gap-1.5">
                {service.activity.map((value, j) => (
                  <div
                    key={j}
                    className={cn(
                      "flex-1 rounded-t-sm",
                      activeIndex === i
                        ? "bg-dashboard-positive"
                        : "bg-foreground/30",
                    )}
                    style={{
                      height: `${value * timeMultiplier}%`,
                      opacity: activeIndex === i ? 0.9 : 0.5,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {service.items.map((item) => (
                  <span key={item} className="text-[11px] text-muted-foreground">
                    {item}
                    {item !== service.items[service.items.length - 1]
                      ? " ·"
                      : ""}
                  </span>
                ))}
              </div>
            </DashboardCard>
          );
        })}
      </div>

      <DashboardCard index={4} className={cn(panel, "p-6")}>
        <p className={cn(label, "mb-4")}>Selected stack depth</p>
        <RadialGauge
          percent={Math.round(avgActivity(activeService.activity) * timeMultiplier)}
          centerPrimary={`${activeService.items.length} tools`}
          centerSecondary={activeService.title}
        />
      </DashboardCard>
    </div>
  );
}

function DeliveryPanel({
  activeIndex,
  onSelectService,
}: {
  activeIndex: number;
  onSelectService: (i: number) => void;
}) {
  const pipeline = [
    { id: "01", label: "Discover", status: "complete" as const },
    { id: "02", label: "Build", status: "active" as const },
    { id: "03", label: "Ship", status: "pending" as const },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {serviceShortcuts.map((feat, i) => {
          const Icon = shortcutIcons[feat.icon];
          const linked = activeIndex === feat.serviceIndex;
          return (
            <DashboardCard
              key={feat.title}
              asButton
              index={i}
              onClick={() => onSelectService(feat.serviceIndex)}
              className={cn(
                soft,
                "p-5 text-left",
                linked && "border-foreground/30 ring-1 ring-foreground/10",
              )}
            >
              <div className={cn(iconBox, "mb-3 h-8 w-8")}>
                <Icon size={16} />
              </div>
              <h4 className="mb-1.5 text-sm font-semibold">{feat.title}</h4>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {feat.description}
              </p>
            </DashboardCard>
          );
        })}
      </div>

      <DashboardCard index={4} className={cn(panel, "p-6 sm:p-8")}>
        <p className={cn(label, "mb-6")}>Delivery pipeline</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {pipeline.map((step) => (
            <div
              key={step.id}
              className={cn(
                soft,
                "rounded-2xl px-4 py-5",
                step.status === "active" &&
                  "border-foreground/30 ring-1 ring-foreground/10",
              )}
            >
              <p className="font-mono text-[11px] text-muted-foreground">
                {step.id}
              </p>
              <p className="mt-1 text-base font-semibold">{step.label}</p>
              <p className="mt-2 text-[12px] capitalize text-muted-foreground">
                {step.status}
              </p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard
        asButton
        index={5}
        onClick={() => onSelectService(activeIndex)}
        className={cn(panel, "flex items-center justify-between p-6 text-left")}
      >
        <div>
          <h4 className="text-[17px] font-semibold">End-to-end delivery</h4>
          <p className="mt-1 text-[13px] text-muted-foreground">
            From prototype to App Store — design, development, and production
            support.
          </p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
          <ArrowRight size={16} />
        </span>
      </DashboardCard>
    </div>
  );
}
