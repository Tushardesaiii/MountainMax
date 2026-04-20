export type MountainInfo = {
  id: string;
  name: string;
  country: string;
  heightMeters: number;
  geology: string;
  challengeLevel: "Beginner" | "Intermediate" | "Advanced";
  bestSeason: string;
  safetyTips: string[];
  whatItCanDo: string[];
};

export const MOUNTAINS: MountainInfo[] = [
  {
    id: "everest",
    name: "Mount Everest",
    country: "Nepal / Tibet",
    heightMeters: 8848,
    geology: "Sedimentary and metamorphic rock uplifted by tectonic collision.",
    challengeLevel: "Advanced",
    bestSeason: "April-May and September-October",
    safetyTips: [
      "Acclimatize slowly.",
      "Monitor weather windows.",
      "Use expert local guides.",
    ],
    whatItCanDo: [
      "Inspires extreme endurance training and high-altitude research.",
      "Supports local expedition economies through trekking routes.",
      "Provides climate and glacial change indicators for scientists.",
    ],
  },
  {
    id: "fuji",
    name: "Mount Fuji",
    country: "Japan",
    heightMeters: 3776,
    geology:
      "Composite stratovolcano formed by repeated lava and ash eruptions.",
    challengeLevel: "Intermediate",
    bestSeason: "July-September",
    safetyTips: [
      "Start summit attempts early.",
      "Carry layered clothing.",
      "Stay on marked trails.",
    ],
    whatItCanDo: [
      "Offers accessible high-elevation trekking for many skill levels.",
      "Supports spiritual and cultural tourism.",
      "Creates strong opportunities for sunrise and astro photography.",
    ],
  },
  {
    id: "kilimanjaro",
    name: "Mount Kilimanjaro",
    country: "Tanzania",
    heightMeters: 5895,
    geology: "Dormant volcanic massif with multiple volcanic cones.",
    challengeLevel: "Intermediate",
    bestSeason: "January-March and June-October",
    safetyTips: [
      "Choose longer routes for acclimatization.",
      "Hydrate consistently.",
      "Respect park regulations.",
    ],
    whatItCanDo: [
      "Enables non-technical summit adventures with guide support.",
      "Showcases multiple ecological zones in a single climb.",
      "Acts as a natural lab for altitude adaptation studies.",
    ],
  },
];

const mountainKeywords = ["mountain", "peak", "summit", "alp", "hill", "ridge"];

export function detectMountainFromUri(uri: string): MountainInfo | null {
  const value = uri.toLowerCase();
  const hasMountainHint = mountainKeywords.some((keyword) =>
    value.includes(keyword),
  );

  if (!hasMountainHint) {
    return null;
  }

  const match = MOUNTAINS.find((mountain) => value.includes(mountain.id));
  if (match) {
    return match;
  }

  return MOUNTAINS[Math.floor(Math.random() * MOUNTAINS.length)] ?? null;
}
