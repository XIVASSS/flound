export const site = {
  name: "flound",
  tagline: "Apps, hardware & AI",
  email: "hello@flound.studio",
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    wordmark: "flound",
    resumeLabel: "Let's talk",
    resumeHref: "#contact",
    taglineLeft: "Building products that just make sense.",
    subheadRight:
      "A studio obsessed with connecting software to the real world.",
  },
  collage: {
    line1: { before: "Blending", bold: "bold", after: "ideas with" },
    line2: { serif: "design", mid: "to turn", faded: "hardware" },
    line3: { before: "into", after: "product." },
    avatar: "/assets/poplight/poplight-sconce.png",
    handle: "@flound",
  },
  about: {
    strapline: "A look into the messy, magical journey behind our products.",
    portrait: "/assets/poplight/poplight-sconce.png",
    body: [
      "flound is a product studio building at the seam of software and hardware. With years shipping apps, connected devices, and AI features, we help founders turn ideas into real, usable products.",
      "We design and build the whole stack — mobile and web apps, BLE and IoT integrations, and AI that lives inside the experience.",
      "Let's create something extraordinary together.",
    ],
    ctaLabel: "See more",
    ctaHref: "#work",
  },
  projectsIntro: {
    strapline: "A look into the messy, magical journey behind our products.",
    lead: "Prototypes",
    tail: ", Late Nights &",
    serifWord: "Shipped",
    end: "Products",
  },
  sideQuests: {
    title: "Design",
    titleAccent: "Side Quests",
    subtitle:
      "A collection of experiments, doodles, and explorations that keep our craft sharp.",
    items: [
      {
        title: "InSight feature overview",
        caption: "Your image recognition companion",
        image: "/assets/insight/insight-marketing.jpg",
        width: 5120,
        height: 2880,
      },
      {
        title: "Camera to conversation",
        caption: "Capture, describe, and chat",
        image: "/assets/insight/insight-phone.png",
        width: 1322,
        height: 1090,
      },
    ],
  },
  tools: {
    strapline:
      "Good design needs good tools — here's what we rely on daily.",
    headline: {
      before: "From ",
      faded: "Wireframes",
      after: " to",
      pill: "Ship",
    },
    eyebrow: "Building products",
    heading: "The tools we use to ship real things",
    items: [
      {
        name: "Figma",
        logo: "/assets/tools/figma.svg",
        bg: "bg-white",
      },
      {
        name: "Swift",
        logo: "/assets/tools/swift.svg",
        bg: "bg-white",
      },
      {
        name: "React",
        logo: "/assets/tools/react.svg",
        bg: "bg-white",
      },
      {
        name: "Next.js",
        logo: "/assets/tools/nextjs.svg",
        bg: "bg-white",
      },
      {
        name: "Three.js",
        logo: "/assets/tools/threejs.svg",
        bg: "bg-neutral-900",
        logoClass: "brightness-0 invert",
      },
      {
        name: "Python",
        logo: "/assets/tools/python.svg",
        bg: "bg-white",
      },
      {
        name: "Xcode",
        logo: "/assets/tools/xcode.svg",
        bg: "bg-white",
      },
      {
        name: "TensorFlow",
        logo: "/assets/tools/tensorflow.svg",
        bg: "bg-white",
      },
      {
        name: "BLE",
        logo: "/assets/tools/bluetooth.svg",
        bg: "bg-white",
      },
    ],
  },
  footer: {
    headline: "Let's discuss how we can make your product better!",
    ctaLabel: "Get in touch",
    ctaHref: "mailto:hello@flound.studio",
    wordmark: "flound",
    socials: [
      { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
      { label: "X", href: "https://x.com", icon: "x" },
      { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    ],
  },
  stats: [
    { value: "15+", label: "Apps shipped", serviceIndex: 0 },
    { value: "10+", label: "Hardware integrations", serviceIndex: 1 },
    { value: "8+", label: "AI features in production", serviceIndex: 2 },
  ],
  contact: {
    headline: "Let's build something",
    subhead: "Tell us about your product — we'll help you ship it.",
  },
} as const;
