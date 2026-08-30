import { ArchetypeKey } from '../types';

export interface DailyTransitResult {
  transitTitle: string;
  prediction: string;
  dailyRitual: string;
  powerWord: string;
  planetaryFocus: string;
  zodiacHarmonic: string;
}

const PLANETARY_CYCLES = [
  { planet: "Solar Core", gate: "Gateway of Radiance", element: "Fire & Gold" },
  { planet: "Lunar Crest", gate: "Tides of the Intuitive Ocean", element: "Water & Silver" },
  { planet: "Mercurial Nexus", gate: "Crystalline Transmission Portal", element: "Air & Quick-Silver" },
  { planet: "Venusian Ray", gate: "Harmonic Heart Frequency", element: "Rose Light & Copper" },
  { planet: "Martian Surge", gate: "Sovereign Will Catalyst", element: "Electric Crimson" },
  { planet: "Jupiter Octave", gate: "Galactic Cosmic Expansion", element: "Royal Purple & Topaz" },
  { planet: "Saturnian Crest", gate: "Mastery of Time & Structure", element: "Obsidian & Diamond" },
  { planet: "Chiron Gateway", gate: "Sacred Alchemical Integration", element: "Emerald Aether" }
];

const ARCHETYPE_INSIGHTS: Record<ArchetypeKey, { theme: string; advice: string; ritualSeed: string; mantra: string }> = {
  [ArchetypeKey.MYSTIC]: {
    theme: "The Veil of High Perception",
    advice: "Your clairvoyant receptors are receiving high-octave subtle frequencies today. Trust the silent whispers that arise between breaths.",
    ritualSeed: "Sit in still darkness for 3 minutes before sunset. Place your fingertips lightly over your brow chakra and envision an indigo vortex opening to receive truth.",
    mantra: "AJNA ANANDA ✧"
  },
  [ArchetypeKey.ALCHEMIST]: {
    theme: "Transmutation of Density into Gold",
    advice: "Any friction or resistance you encounter today is raw spiritual gold waiting to be transformed. Reframe every challenge as your catalyst for sovereign acceleration.",
    ritualSeed: "Write down one limiting belief on paper, draw a golden circle around it, fold it away from you, and declare out loud: 'I transmute this into supreme power.'",
    mantra: "RASAYANA ✧"
  },
  [ArchetypeKey.ORACLE]: {
    theme: "The Quantum Transceiver",
    advice: "You are acting as a direct mirror for collective consciousness today. Record spontaneous insights or dreams immediately upon waking.",
    ritualSeed: "Hold a glass of pure structured water between both hands. Whisper your highest intention into the water three times before drinking with reverent stillness.",
    mantra: "DIVYA DRISHTI ✧"
  },
  [ArchetypeKey.VISIONARY]: {
    theme: "Sovereign Solar Illumination",
    advice: "Your magnetic field is commanding authority and warmth. Step forward and express your leadership without apologizing for your radiance.",
    ritualSeed: "Face the sun or a bright light source for 60 seconds with open palms. Inhale golden light through the heart center, and exhale any remnant self-doubt.",
    mantra: "SURYA TEJAS ✧"
  },
  [ArchetypeKey.SOVEREIGN]: {
    theme: "The Golden Perimeter of Safety",
    advice: "Your energetic boundaries are your sacred superpower today. Discern between what belongs to your field and what is projected by others.",
    ritualSeed: "Stand firmly with bare feet. Visualize a sphere of radiant golden glass extending 3 feet around your entire body, sealing out all lower resonance.",
    mantra: "KAVACHA ✧"
  },
  [ArchetypeKey.CREATOR]: {
    theme: "Sacred Geometry of Manifestation",
    advice: "Your mind has direct access to blueprints of the higher realms today. Focus on tangible execution, structural integrity, and long-term legacy.",
    ritualSeed: "Outline your 3-year vision into 3 definitive pillars. Trace a triangle in the air with your index finger to seal the geometric manifestation.",
    mantra: "STHAPATYA ✧"
  },
  [ArchetypeKey.EMPATH]: {
    theme: "The Compassionate Crystalline Resonance",
    advice: "Your heart center is broadcasting healing waves. Remember to anchor your own vessel in peace before absorbing the emotional currents of others.",
    ritualSeed: "Place a hand over your heart, breathe in green emerald light for 4 counts, and release all foreign cords with a gentle exhale.",
    mantra: "ANAHATA PREMA ✧"
  }
};

const ZODIAC_QUALITIES: Record<string, { element: string; power: string }> = {
  Aries: { element: "Primal Fire", power: "Initiating Sovereign Momentum" },
  Taurus: { element: "Sacred Earth", power: "Grounded Magnetic Abundance" },
  Gemini: { element: "Crystalline Air", power: "Multidimensional Communication" },
  Cancer: { element: "Ancestral Water", power: "Deep Emotional Intuition" },
  Leo: { element: "Solar Fire", power: "Radiant Heart Sovereignty" },
  Virgo: { element: "Refined Earth", power: "Precision Mastery & Healing" },
  Libra: { element: "Cosmic Air", power: "Harmonic Balance & Grace" },
  Scorpio: { element: "Alchemical Water", power: "Deep Rebirth & Transmutation" },
  Sagittarius: { element: "Galactic Fire", power: "Expansive Visionary Quest" },
  Capricorn: { element: "Master Earth", power: "Architectural Endurance" },
  Aquarius: { element: "Electric Air", power: "Future Codex Awakening" },
  Pisces: { element: "Oceanic Aether", power: "Universal Oneness & Mystic Vision" }
};

/**
 * 100% Client-Side Deterministic Celestial Transit Generator
 * Operates completely in the browser with ZERO external API calls or costs.
 */
export function generateDailyTransit(params: {
  userName?: string;
  archetype?: ArchetypeKey | string;
  zodiacSign?: string;
  birthday?: string;
  date?: Date;
}): DailyTransitResult {
  const {
    userName = "Beloved Soul",
    archetype = "mystic",
    zodiacSign = "Aries",
    birthday = "",
    date = new Date()
  } = params;

  const values = Object.values(ArchetypeKey);
  const matched = values.find(v => v.toLowerCase() === String(archetype).toLowerCase());
  const validArchetype: ArchetypeKey = matched || ArchetypeKey.MYSTIC;

  const archData = ARCHETYPE_INSIGHTS[validArchetype] || ARCHETYPE_INSIGHTS[ArchetypeKey.MYSTIC];
  const zodiacData = ZODIAC_QUALITIES[zodiacSign] || { element: "Cosmic Aether", power: "Universal Alignment" };

  // Calculate day seed based on calendar date + user specific traits
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const userSeed = (userName.length * 7 + (birthday.length || 5) * 13 + dayOfYear) % 1000;
  
  const cycleIndex = (dayOfYear + userSeed) % PLANETARY_CYCLES.length;
  const activeCycle = PLANETARY_CYCLES[cycleIndex];

  const transitTitle = `${activeCycle.gate} • ${activeCycle.planet}`;
  
  const prediction = `Beloved ${userName}, under today's ${activeCycle.planet} alignment, the cosmos activates the ${zodiacData.element} streams of your ${zodiacSign} constellation. 
  
As an embodied ${validArchetype.toUpperCase()}, your energy field is tuned directly into "${archData.theme}". ${archData.advice} 

The prevailing planetary vibration focuses on ${zodiacData.power.toLowerCase()}. Allow your nervous system to ground into this golden cosmic rhythm without force.`;

  const dailyRitual = `${archData.ritualSeed} Combine this with 4 cycles of conscious deep belly breathing attuned to the ${activeCycle.element} frequency.`;

  const powerWord = archData.mantra;

  return {
    transitTitle,
    prediction,
    dailyRitual,
    powerWord,
    planetaryFocus: `${activeCycle.planet} (${activeCycle.element})`,
    zodiacHarmonic: `${zodiacSign} • ${zodiacData.element}`
  };
}
