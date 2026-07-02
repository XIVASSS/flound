export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectModel = {
  src: string;
  color?: string;
  scale?: number;
};

export type ProjectFloatingBadge = {
  label: string;
  side: "left" | "right";
  icon: "sparkles" | "chart";
};

export type ProjectCaseStudySection = {
  id: string;
  title: string;
  content: string;
};

export type ProjectDetail = {
  isNew?: boolean;
  heroHeadline: string;
  badgeTags: string;
  floatingBadges: ProjectFloatingBadge[];
  descriptionSegments: { text: string; emphasis?: boolean }[];
  outcomeHeadline: { text: string; emphasis?: boolean }[];
  caseStudySections: ProjectCaseStudySection[];
  caseStudyNav: string[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  model?: ProjectModel;
  images: ProjectImage[];
  /** Slide-layout fields (reference two-column project slides) */
  readTime: string;
  headline: string;
  /** Mixed-weight headline segments (reference style) */
  headlineSegments: { text: string; emphasis?: boolean }[];
  slideTags: string[];
  blurb: string;
  /** Pill badge color */
  badgeClass: string;
  /** Frosted preview panel gradient */
  panelClass: string;
  /** Tinted description box at bottom of left panel */
  insetClass: string;
  /** Outer gradient frame behind card border */
  frameGradient: string;
  /** Main preview image fit */
  previewFit: "cover" | "contain";
  status: "View Project" | "Coming Soon";
  detail: ProjectDetail;
};

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projects: Project[] = [
  {
    slug: "poplight",
    title: "Poplight",
    description:
      "Renter-friendly smart wall lighting with a companion app and Matter-connected hardware. Designed for easy install without wiring — peel, stick, and control from your phone.",
    tags: ["IoT", "Consumer", "Mobile App", "Matter"],
    thumbnail: "/assets/poplight/poplight-sconce.png",
    readTime: "12 mins read",
    headline: "Renter-friendly smart lighting, from peel to app.",
    headlineSegments: [
      { text: "Renter-friendly " },
      { text: "smart lighting", emphasis: true },
      { text: ", from peel to app." },
    ],
    slideTags: ["IoT", "Consumer", "Matter"],
    blurb:
      "Poplight makes smart lighting renter-friendly. We designed the hardware and its companion app end to end — install without wiring, then control every scene from your phone.",
    badgeClass: "bg-neutral-900",
    panelClass: "from-orange-300/60 via-rose-200/50 to-amber-200/45",
    insetClass: "bg-[#c8bfb2]",
    frameGradient: "from-orange-300 via-amber-200 to-sky-300",
    previewFit: "contain",
    status: "View Project",
    detail: {
      isNew: true,
      heroHeadline: "Renter-friendly smart lighting, from peel to app.",
      badgeTags: "IoT, Consumer, Matter",
      floatingBadges: [
        { label: "No wiring needed", side: "left", icon: "sparkles" },
        { label: "Matter connected", side: "right", icon: "chart" },
      ],
      descriptionSegments: [
        { text: "Designing a " },
        { text: "renter-friendly smart lighting", emphasis: true },
        { text: " system — peel-and-stick hardware with a companion app for scenes, schedules, and Matter-connected control at scale." },
      ],
      outcomeHeadline: [
        { text: "Poplight makes smart lighting " },
        { text: "installable in minutes", emphasis: true },
        { text: " without wiring — from hardware to companion app." },
      ],
      caseStudyNav: [
        "Overview",
        "Problem",
        "Target User",
        "Key Features",
        "Final UI",
        "Outcome",
      ],
      caseStudySections: [
        {
          id: "role",
          title: "My Role",
          content:
            "Brand Identity | Product Strategy | Hardware Design | UI/UX Design | Mobile App Design | Interactive Prototyping | Matter Integration",
        },
        {
          id: "team",
          title: "Team",
          content: "1 Designer, 1 Manager and 3 Developers",
        },
        {
          id: "timeline",
          title: "Timeline",
          content: "January 2025 – Present",
        },
        {
          id: "overview",
          title: "Overview",
          content:
            "Poplight is a renter-friendly smart wall light with a companion app. We designed the hardware and software end to end — easy install without wiring, then full scene control from your phone.",
        },
      ],
    },
    images: [
      {
        src: "/assets/poplight/poplight-logo.png",
        alt: "Poplight wordmark logo",
      },
      {
        src: "/assets/poplight/poplight-sconce.png",
        alt: "Poplight wall sconce product render",
      },
      {
        src: "/assets/poplight/poplight-lifestyle.png",
        alt: "Poplight lifestyle workspace scene",
      },
    ],
  },
  {
    slug: "spira",
    title: "Spira",
    description:
      "Pocket spirometer with a companion app for respiratory health. BLE device pairing, live session tracking with pressure rings, and a full session history dashboard.",
    tags: ["Health", "BLE", "iOS", "Hardware"],
    thumbnail: "/assets/spira/spira-device.png",
    readTime: "14 mins read",
    headline: "A pocket spirometer that makes lungs measurable.",
    headlineSegments: [
      { text: "A " },
      { text: "pocket spirometer", emphasis: true },
      { text: " that makes " },
      { text: "lungs measurable", emphasis: true },
      { text: "." },
    ],
    slideTags: ["Health", "BLE", "iOS"],
    blurb:
      "Spira pairs a pocket spirometer with an iOS app. We built the BLE pairing flow, live session tracking with pressure rings, and a full history dashboard — drag the model to explore the device.",
    badgeClass: "bg-sky-500",
    panelClass: "from-sky-300/55 via-blue-200/45 to-indigo-200/40",
    insetClass: "bg-[#adc8d9]",
    frameGradient: "from-sky-300 via-blue-200 to-indigo-300",
    previewFit: "cover",
    status: "View Project",
    detail: {
      heroHeadline: "A pocket spirometer that makes lungs measurable.",
      badgeTags: "Health, BLE, iOS",
      floatingBadges: [
        { label: "Live session tracking", side: "left", icon: "chart" },
        { label: "BLE device pairing", side: "right", icon: "sparkles" },
      ],
      descriptionSegments: [
        { text: "Designing a " },
        { text: "pocket spirometer", emphasis: true },
        { text: " with companion app — BLE pairing, live pressure rings, and a full session history dashboard for respiratory health." },
      ],
      outcomeHeadline: [
        { text: "Spira turns lung health into " },
        { text: "measurable daily data", emphasis: true },
        { text: " with a pocket device and iOS companion." },
      ],
      caseStudyNav: [
        "Overview",
        "Problem",
        "Target User",
        "Key Features",
        "Final UI",
        "Outcome",
      ],
      caseStudySections: [
        {
          id: "role",
          title: "My Role",
          content:
            "Product Strategy | User Research | UI/UX Design | iOS App Design | BLE Integration | Interactive Prototyping",
        },
        {
          id: "team",
          title: "Team",
          content: "1 Designer, 1 Manager and 4 Developers",
        },
        {
          id: "timeline",
          title: "Timeline",
          content: "March 2025 – Present",
        },
        {
          id: "overview",
          title: "Overview",
          content:
            "Spira pairs a pocket spirometer with an iOS app. We built the BLE pairing flow, live session tracking with pressure rings, and a full history dashboard.",
        },
      ],
    },
    model: {
      src: "/assets/spira/spira-device.stl",
      color: "#8a8a8a",
      scale: 0.9,
    },
    images: [
      {
        src: "/assets/spira/spira-device.png",
        alt: "Spira pocket spirometer device render",
      },
      {
        src: "/assets/spira/spira-app.webp",
        alt: "Spira app — connect, dashboard, and live exercise screens",
      },
    ],
  },
  {
    slug: "cardiogram",
    title: "Cardiogram",
    description:
      "ECG hardware paired with an iOS health app. Live waveform capture, detailed session reports, and on-device AI expert analysis for heart rhythm insights.",
    tags: ["Health", "AI", "iOS", "Medical Device"],
    thumbnail: "/assets/cardiogram/cardiogram-home.png",
    readTime: "16 mins read",
    headline: "ECG hardware with on-device AI heart insights.",
    headlineSegments: [
      { text: "ECG hardware with on-device " },
      { text: "AI heart insights", emphasis: true },
      { text: "." },
    ],
    slideTags: ["Health", "AI", "iOS"],
    blurb:
      "Cardiogram pairs ECG hardware with an iOS health app. We designed live waveform capture, detailed session reports, and an on-device AI expert that turns rhythms into plain-language insights.",
    badgeClass: "bg-rose-500",
    panelClass: "from-rose-300/55 via-orange-200/45 to-amber-200/40",
    insetClass: "bg-[#d4b0b0]",
    frameGradient: "from-rose-300 via-orange-200 to-amber-300",
    previewFit: "cover",
    status: "View Project",
    detail: {
      heroHeadline: "ECG hardware with on-device AI heart insights.",
      badgeTags: "Health, AI, iOS",
      floatingBadges: [
        { label: "Live ECG capture", side: "left", icon: "chart" },
        { label: "On-device AI expert", side: "right", icon: "sparkles" },
      ],
      descriptionSegments: [
        { text: "Designing an " },
        { text: "ECG health platform", emphasis: true },
        { text: " — live waveform capture, detailed session reports, and on-device AI that turns heart rhythms into plain-language insights." },
      ],
      outcomeHeadline: [
        { text: "Cardiogram delivers " },
        { text: "AI heart insights", emphasis: true },
        { text: " from live ECG capture to session reports on iOS." },
      ],
      caseStudyNav: [
        "Overview",
        "Problem",
        "Target User",
        "Key Features",
        "Final UI",
        "Outcome",
      ],
      caseStudySections: [
        {
          id: "role",
          title: "My Role",
          content:
            "Product Strategy | User Research | UI/UX Design | iOS App Design | Medical Device UX | AI Feature Design | Interactive Prototyping",
        },
        {
          id: "team",
          title: "Team",
          content: "1 Designer, 1 Manager and 4 Developers",
        },
        {
          id: "timeline",
          title: "Timeline",
          content: "February 2025 – Present",
        },
        {
          id: "overview",
          title: "Overview",
          content:
            "Cardiogram pairs ECG hardware with an iOS health app. We designed live waveform capture, detailed session reports, and an on-device AI expert for heart rhythm insights.",
        },
      ],
    },
    model: {
      src: "/assets/cardiogram/cardiogram-device.stl",
      color: "#d4d4d4",
      scale: 0.85,
    },
    images: [
      {
        src: "/assets/cardiogram/cardiogram-home.png",
        alt: "Cardiogram app home screen",
      },
      {
        src: "/assets/cardiogram/cardiogram-ecg.png",
        alt: "Cardiogram live ECG waveform view",
      },
      {
        src: "/assets/cardiogram/cardiogram-report.png",
        alt: "Cardiogram session report with AI analysis",
      },
      {
        src: "/assets/cardiogram/cardiogram-metrics.png",
        alt: "Cardiogram detailed heart rate metrics",
      },
      {
        src: "/assets/cardiogram/cardiogram-ai.png",
        alt: "Cardiogram ECG Expert AI chat",
      },
    ],
  },
];
