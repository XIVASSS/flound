export type ServiceMetric = {
  label: string;
  value: string;
};

export type Service = {
  number: string;
  title: string;
  description: string;
  items: string[];
  metrics: ServiceMetric[];
  activity: number[];
};

export const services: Service[] = [
  {
    number: "01",
    title: "App Development",
    description:
      "Native and cross-platform mobile apps, web dashboards, and production-ready backends.",
    items: [
      "iOS & Android",
      "React Native & Flutter",
      "Web dashboards",
      "APIs & backends",
    ],
    metrics: [
      { label: "Platforms", value: "iOS · Android · Web" },
      { label: "Avg. ship time", value: "8 weeks" },
      { label: "Stack", value: "RN · Flutter · Next" },
    ],
    activity: [40, 65, 45, 80, 55, 90, 70],
  },
  {
    number: "02",
    title: "Hardware Integration",
    description:
      "BLE, sensors, embedded devices — we connect software to physical products.",
    items: [
      "Bluetooth LE",
      "IoT & sensors",
      "Device pairing",
      "Firmware bridges",
    ],
    metrics: [
      { label: "Protocols", value: "BLE · MQTT · UART" },
      { label: "Pairing success", value: "99.2%" },
      { label: "Devices shipped", value: "10+" },
    ],
    activity: [30, 50, 70, 60, 85, 75, 95],
  },
  {
    number: "03",
    title: "AI & Intelligence",
    description:
      "On-device and cloud AI: analysis, assistants, and automation inside your product.",
    items: [
      "On-device ML",
      "LLM integrations",
      "Health analysis",
      "Smart automation",
    ],
    metrics: [
      { label: "Inference", value: "On-device + cloud" },
      { label: "Models deployed", value: "8+" },
      { label: "Latency", value: "< 200ms" },
    ],
    activity: [55, 40, 75, 90, 65, 80, 60],
  },
  {
    number: "04",
    title: "Product Design",
    description:
      "UX/UI and design systems so hardware and software feel like one product.",
    items: [
      "UX research",
      "UI design",
      "Design systems",
      "Prototyping",
    ],
    metrics: [
      { label: "Design systems", value: "4 built" },
      { label: "Research sprints", value: "2–3 wks" },
      { label: "Handoff", value: "Figma → code" },
    ],
    activity: [60, 45, 55, 70, 50, 65, 75],
  },
];

export const serviceShortcuts = [
  {
    icon: "Bluetooth" as const,
    title: "BLE & device pairing",
    description:
      "Reliable Bluetooth connections with auto-reconnect and live telemetry streams.",
    serviceIndex: 1,
  },
  {
    icon: "Bot" as const,
    title: "On-device AI",
    description:
      "Health analysis, assistants, and automation running on-device or in the cloud.",
    serviceIndex: 2,
  },
  {
    icon: "Layers" as const,
    title: "Cross-platform apps",
    description:
      "iOS, Android, and web dashboards built to match your hardware product.",
    serviceIndex: 0,
  },
  {
    icon: "Sparkles" as const,
    title: "End-to-end delivery",
    description:
      "From prototype to App Store — design, development, and production support.",
    serviceIndex: 3,
  },
];

export const marqueeItems = [
  "mobile apps",
  "hardware integration",
  "AI & ML",
  "BLE / IoT",
  "product design",
  "iOS & Android",
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "Product scope, hardware constraints, and a clear integration plan.",
  },
  {
    step: "02",
    title: "Build",
    description:
      "App development, firmware bridges, and AI pipelines — in parallel.",
  },
  {
    step: "03",
    title: "Ship",
    description:
      "TestFlight, Play Store, production monitoring, and iteration.",
  },
];
