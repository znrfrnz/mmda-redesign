// Mock data for the MMDA website prototype

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  titleFil: string;
  excerpt: string;
  excerptFil: string;
  category: "advisory" | "press" | "notice";
  date: string;
  imageUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleFil: string;
  description: string;
  descriptionFil: string;
  href: string;
  icon: string;
}

export interface TrafficRoute {
  id: string;
  name: string;
  status: "light" | "moderate" | "heavy";
  speed: number; // km/h
  updatedAt: string;
}

export const mockNews: NewsArticle[] = [
  {
    id: "1",
    slug: "mmda-implements-new-traffic-scheme-edsa",
    title: "MMDA Implements New Traffic Scheme Along EDSA Southbound",
    titleFil: "MMDA Nagpatupad ng Bagong Traffic Scheme sa EDSA Southbound",
    excerpt:
      "The Metropolitan Manila Development Authority announces a new traffic management plan along EDSA Southbound corridor to ease congestion during peak hours.",
    excerptFil:
      "Inanunsyo ng Metropolitan Manila Development Authority ang bagong traffic management plan sa EDSA Southbound corridor upang mabawasan ang trapiko sa peak hours.",
    category: "advisory",
    date: "2026-04-25",
  },
  {
    id: "2",
    slug: "flood-control-pumping-stations-operational",
    title: "All Flood Control Pumping Stations Now Fully Operational",
    titleFil: "Lahat ng Flood Control Pumping Stations Ganap nang Operational",
    excerpt:
      "In preparation for the rainy season, MMDA confirms that all 72 pumping stations across Metro Manila are fully operational and ready for deployment.",
    excerptFil:
      "Bilang paghahanda sa tag-ulan, kinumpirma ng MMDA na ang lahat ng 72 pumping stations sa Metro Manila ay ganap nang operational.",
    category: "press",
    date: "2026-04-23",
  },
  {
    id: "3",
    slug: "number-coding-scheme-update-may-2026",
    title: "Updated Number Coding Scheme Effective May 2026",
    titleFil: "Na-update na Number Coding Scheme Epektibo sa Mayo 2026",
    excerpt:
      "MMDA releases updated number coding guidelines effective May 1, 2026. Window hours and exemptions have been revised to accommodate new public transport routes.",
    excerptFil:
      "Inilabas ng MMDA ang na-update na number coding guidelines na epektibo simula Mayo 1, 2026. Binago ang window hours at exemptions.",
    category: "notice",
    date: "2026-04-20",
  },
];

export const mockServices: ServiceItem[] = [
  {
    id: "drivers-license",
    title: "Driver's License",
    titleFil: "Lisensya sa Pagmamaneho",
    description: "Verify violations, check clearance status, and resolve license-related concerns.",
    descriptionFil: "I-verify ang mga paglabag, i-check ang clearance status, at resolbahin ang mga usapin sa lisensya.",
    href: "/services/drivers-license",
    icon: "IdentificationCard",
  },
  {
    id: "traffic-violations",
    title: "Traffic Violations",
    titleFil: "Paglabag sa Trapiko",
    description: "Look up violations, pay fines, and understand penalties for traffic infractions.",
    descriptionFil: "Hanapin ang mga paglabag, magbayad ng multa, at unawain ang mga parusa sa trapiko.",
    href: "/services/traffic-violations",
    icon: "Warning",
  },
  {
    id: "report-concern",
    title: "Report a Concern",
    titleFil: "Mag-ulat ng Problema",
    description: "Submit reports about road issues, illegal structures, flooding, or other concerns.",
    descriptionFil: "Mag-submit ng ulat tungkol sa mga problema sa kalsada, iligal na istruktura, baha, o iba pa.",
    href: "/services/report-concern",
    icon: "ChatCircleDots",
  },
  {
    id: "towing-impound",
    title: "Towing & Impound",
    titleFil: "Towing at Impound",
    description: "Locate towed vehicles, check impound status, and process vehicle release.",
    descriptionFil: "Hanapin ang na-tow na sasakyan, i-check ang impound status, at i-process ang paglabas.",
    href: "/services/towing-impound",
    icon: "Truck",
  },
];

export const mockTrafficRoutes: TrafficRoute[] = [
  { id: "edsa-nb", name: "EDSA Northbound", status: "heavy", speed: 12, updatedAt: "2 min ago" },
  { id: "edsa-sb", name: "EDSA Southbound", status: "moderate", speed: 25, updatedAt: "2 min ago" },
  { id: "c5-nb", name: "C5 Northbound", status: "light", speed: 45, updatedAt: "3 min ago" },
  { id: "c5-sb", name: "C5 Southbound", status: "moderate", speed: 30, updatedAt: "3 min ago" },
  { id: "commonwealth", name: "Commonwealth Ave", status: "heavy", speed: 15, updatedAt: "1 min ago" },
  { id: "quezon-ave", name: "Quezon Avenue", status: "light", speed: 40, updatedAt: "4 min ago" },
];

export const mockAdvisory = {
  active: true,
  type: "weather" as const,
  title: "Rainfall Advisory: Heavy rains expected in NCR this afternoon",
  titleFil: "Rainfall Advisory: Malakas na ulan na inaasahan sa NCR ngayong hapon",
  severity: "moderate" as const,
};
