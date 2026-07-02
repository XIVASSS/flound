export type CapabilitiesTab = "overview" | "capabilities" | "stack" | "delivery";

export const CAPABILITIES_TABS: { id: CapabilitiesTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "capabilities", label: "Capabilities" },
  { id: "stack", label: "Stack" },
  { id: "delivery", label: "Delivery" },
];

export type TimeRangeId = "recent" | "quarter" | "all";

export const TIME_RANGES: { id: TimeRangeId; label: string }[] = [
  { id: "recent", label: "Recent" },
  { id: "quarter", label: "Quarter" },
  { id: "all", label: "All time" },
];
