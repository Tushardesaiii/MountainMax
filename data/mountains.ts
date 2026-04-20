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

const positiveHints = [
  "mount",
  "mountain",
  "peak",
  "summit",
  "trail",
  "hike",
  "ridge",
  "alps",
  "snow",
  "landscape",
  "nature",
];

const negativeHints = [
  "selfie",
  "food",
  "cat",
  "dog",
  "document",
  "receipt",
  "invoice",
  "screen",
  "screenshot",
  "indoor",
  "room",
];

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function detectMountainFromUri(uri: string): MountainInfo | null {
  const value = uri.toLowerCase();

  const match = MOUNTAINS.find((mountain) => value.includes(mountain.id));
  if (match) {
    return match;
  }

  const positive = positiveHints.some((keyword) => value.includes(keyword));
  const negative = negativeHints.some((keyword) => value.includes(keyword));

  if (negative && !positive) {
    return null;
  }

  const hash = hashString(value);
  const noMountainGate = hash % 100;

  // Keep "no mountain found" possible, but not dominant for normal photos.
  if (!positive && noMountainGate < 18) {
    return null;
  }

  const selectedIndex = hash % MOUNTAINS.length;

  return MOUNTAINS[selectedIndex] ?? null;
}
