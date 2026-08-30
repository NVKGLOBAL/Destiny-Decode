/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ArchetypeKey {
  VISIONARY = 'Visionary',
  CREATOR = 'Creator',
  MYSTIC = 'Mystic',
  ALCHEMIST = 'Alchemist',
  SOVEREIGN = 'Sovereign',
  ORACLE = 'Oracle',
  EMPATH = 'Empath',
}

export interface ArchetypeData {
  key: ArchetypeKey;
  gift: string;
  shadow: string;
  signature: {
    color: string;
    accent: string;
    element: string;
    frequency: string;
    symbol: string;
    mantra: string;
  };
  description: string;
  activationCodes: string[];
  oracleMessage: {
    card: string;
    message: string;
  };
  affirmation: string;
  guidingQuestion: string;
  ritual: string[];
  growthPath: string;
  lifeChangingAdvice: string;
}

export const ARCHETYPES: Record<ArchetypeKey, ArchetypeData> = {
  [ArchetypeKey.VISIONARY]: {
    key: ArchetypeKey.VISIONARY,
    gift: "Seeing future timelines, higher celestial perspective, cosmic sight, and spiritual blueprinting.",
    shadow: "Intellectual overload, detachment from current reality, and being paralyzed by infinite possibilities.",
    signature: {
      color: "Indigo",
      accent: "#4f46e5",
      element: "Ether",
      frequency: "852 Hz",
      symbol: "Flower of Life",
      mantra: "I see all timelines and choose love.",
    },
    description: "You are a weaver of timelines, one who perceives the vast divine design behind the visible world. Your mission is to hold clarity, see what is emerging in the future, and light the path for humanity.",
    activationCodes: ["ILLUMINATION", "MULTI-DIMENSIONAL SIGHT", "BRIDGE BETWEEN WORLDS", "TIMELINE NAVIGATION"],
    oracleMessage: {
      card: "The Stargazer’s Lens",
      message: "You are standing at the threshold of a massive perspective shift. What once confused you will now appear as a coherent, beautiful pattern. Trust the delay as active calibration. Your inner compass is matching a higher star system.",
    },
    affirmation: "I am the clear vessel of cosmic sight. I allow my vision to guide my steps without needing to control the outcome.",
    guidingQuestion: "Where in your life are you being asked to step back and see the bigger picture?",
    ritual: [
      "Light a candle of indigo or white. Place the Flower of Life image before you.",
      "Sound the frequency: Hum or play 852 Hz tone. Let it vibrate at your third eye.",
      "Speak your mantra 3 times slowly, breathing into the center of your head.",
    ],
    growthPath: "Grounding your multidimensional visions into physical reality. Building the first brick of your universe instead of just drafting the entire cosmic city in your mind.",
    lifeChangingAdvice: "Your mind naturally lives decades ahead of the collective. However, the power to manifest lives solely in the present second, not the next timeline. Stop waiting for others to see what you see. Take one practical, grounded step today to anchor your vision in physical earth. Trust that those aligned with your vibration will gather once the foundation is laid.",
  },
  [ArchetypeKey.CREATOR]: {
    key: ArchetypeKey.CREATOR,
    gift: "Direct divine imagination, heart-led manifestation, and the power to build entire emotional and physical realities from zero.",
    shadow: "Scattered creative focus, chasing cheap novelty, ungrounded ideation, and cyclic burnout.",
    signature: {
      color: "Magenta & Gold",
      accent: "#d946ef",
      element: "Fire",
      frequency: "639 Hz",
      symbol: "Seed of Life",
      mantra: "I weave worlds with my sacred heart.",
    },
    description: "You are a radiant conduit for pure cosmic creation, pulling raw potential from the void to manifest love, beauty, and structure. Your imagination is a literal portal through which new realities are birthed.",
    activationCodes: ["GENESIS ENERGY", "COSMIC IMAGINATION", "HEART-LEAD MANIFESTATION", "VIBRATIONAL ARTISTRY"],
    oracleMessage: {
      card: "The Eternal Spark",
      message: "A major new creation is ready to emerge through you. Do not force or push it; let it arrive through absolute play, soft presence, and pure joy. Your sacred heart is the furnace of the divine.",
    },
    affirmation: "I am a divine conduit for innovation and beauty. My creations ripple through the quantum field.",
    guidingQuestion: "What beauty is currently calling to be expressed through your hands?",
    ritual: [
      "Light a golden flame. Visualize a seed of light in your heart.",
      "Listen to 639 Hz. Feel the harmony in your relationships and projects.",
      "Speak your mantra while moving your hands in a weaving motion.",
    ],
    growthPath: "Committing deeply to the completion of your creations. True creation requires your focus through the raw, repetitive, and quiet phases of birth, not just the thrill of the initial spark.",
    lifeChangingAdvice: "Your imagination has no ceiling, but an unchanneled river washes away the landscape instead of watering the fields. Limit your active focus to a single high-priority project. Say no to shiny distractions. Pour your heart's fire into one sacred vessel, and watch it become a monument of light that outlives your physical incarnation.",
  },
  [ArchetypeKey.MYSTIC]: {
    key: ArchetypeKey.MYSTIC,
    gift: "True divine union, dissolution of worldly illusion, deep cosmic stillness, and holding sacred space in chaotic environments.",
    shadow: "Spiritual escapism, active avoidance of physical reality, ignoring your body, and disassociating from human suffering.",
    signature: {
      color: "Violet",
      accent: "#8b5cf6",
      element: "Water",
      frequency: "432 Hz",
      symbol: "Sri Yantra",
      mantra: "I dissolve into the One and return renewed.",
    },
    description: "You walk the path of the unseen, finding the divine in absolute silence and the empty space between thoughts. Your presence is a deep, soothing balm that naturally returns others to their core center.",
    activationCodes: ["SACRED STILLNESS", "NON-DUAL AWARENESS", "DIVINE UNION", "ETERNAL PRESENCE"],
    oracleMessage: {
      card: "The Still Reflection",
      message: "The answer does not lie in more movement or seeking, but in the complete surrender of struggle. Rest in the absolute knowing that you are already the very home you are searching for.",
    },
    affirmation: "I am one with the infinite silence. Peace is my natural state.",
    guidingQuestion: "How can you invite more stillness into the noise of your current chapter?",
    ritual: [
      "Sit by a bowl of water. Watch the ripples settle into glass.",
      "Sound 432 Hz. Allow the frequency to ground you into your bones.",
      "Speak your mantra and exhale into total silence for one minute.",
    ],
    growthPath: "Embodying your divinity fully *through* your physical body, human desires, and messy connections, rather than seeking to escape them. Earth itself is your temple.",
    lifeChangingAdvice: "You naturally crave the peace of the void. Yet, your soul chose this physical incarnation for a reason. Real mastery is not fleeing the chaos of the human experience, but bringing the silent spaciousness of the stars directly into the center of the marketplace. Bless your human limits, feed your body well, and love your humanity unconditionally.",
  },
  [ArchetypeKey.ALCHEMIST]: {
    key: ArchetypeKey.ALCHEMIST,
    gift: "Transmutation of heavy energies, shadow alchemy, molecular alignment, and turning human suffering into spiritual power.",
    shadow: "Over-identifying with your wounds and struggles, feeling addicted to conflict, and isolating yourself in Stoic resilience.",
    signature: {
      color: "Liquid Gold",
      accent: "#fbbf24",
      element: "Fire & Water",
      frequency: "528 Hz",
      symbol: "Merkaba",
      mantra: "I transmute all that is heavy into light.",
    },
    description: "You are a master of transformation, understanding that pain is simply the raw fuel for your evolutionary upgrade. You do not run from the shadows, because you know they hold the keys to your greatness.",
    activationCodes: ["SHADOW INTEGRATION", "GOLDEN FREQUENCY", "MOLECULAR TRANSFORMATION", "DNA ACTIVATION"],
    oracleMessage: {
      card: "The Crucible’s Gift",
      message: "The intense heat you are experiencing is not meant to burn you; it is meant to purify you. Let the outdated stories of your past dissolve, exposing the brilliant, unbothered gold beneath.",
    },
    affirmation: "I transform every challenge into a portal of power. I am a master of my internal state.",
    guidingQuestion: "What is currently 'heavy' that is ready to be turned into 'light'?",
    ritual: [
      "Light a candle and have a vessel of water nearby. Balance the extremes.",
      "Tone 528 Hz. Feel the vibration repairing and elevating your cells.",
      "Speak your mantra while placing one hand on your solar plexus and one on your heart.",
    ],
    growthPath: "Shifting your self-conception from 'the warrior who is strong because they survived pain' to 'the creator who is free because they choose joy.' Growth can be beautiful, light, and effortless.",
    lifeChangingAdvice: "Because you can transmute poison into medicine, you unconsciously attract toxic situations to prove your power. You do not need to suffer to evolve. The highest level of alchemy is transmuting with a soft whisper and a playful smile. Stop choosing the hard way. Allow your life to be incredibly easy, and recognize you are already golden.",
  },
  [ArchetypeKey.SOVEREIGN]: {
    key: ArchetypeKey.SOVEREIGN,
    gift: "Absolute divine authority, healthy sacred boundaries, cosmic leadership, and creation of safe, rich containers for collective growth.",
    shadow: "Rigidity, hyper-control, toxic-protection mode, and hiding exhaustion behind a mask of unbreakable shielding.",
    signature: {
      color: "Emerald",
      accent: "#10b981",
      element: "Earth",
      frequency: "396 Hz",
      symbol: "Tree of Life",
      mantra: "I root into my divine power and serve from love.",
    },
    description: "You are the protective steward of your realm, embodying the deep gravity that walks with real authority and grounded service. You lead by being, establishing order where there is panic.",
    activationCodes: ["DIVINE STEWARDSHIP", "GENERATIONAL HEALING", "ANCHORING LIGHT", "SACRED AUTHORITY"],
    oracleMessage: {
      card: "The Rooted Throne",
      message: "Your authority stems from the sheer depth of your roots. Stand firm in your alignment, and do not be thrown off by the passing opinion or weather of others. You are deeply supported by Earth itself.",
    },
    affirmation: "I claim my divine right to lead my life with grace and power. I am protected.",
    guidingQuestion: "Where do you need to reclaim your authority or set a clearer boundary?",
    ritual: [
      "Stand barefoot on the earth or visualize roots extending from your feet.",
      "Hum along to 396 Hz. Feel the release of fear and the rise of courage.",
      "Speak your mantra with a hand on your lower belly, feeling your solid core.",
    ],
    growthPath: "Allowing yourself to step off the throne, be completely vulnerable, and receive support. Letting others carry the load while you rest your sacred armor.",
    lifeChangingAdvice: "You feel responsible for everyone's safety because your presence is highly grounded. But you cannot rule a kingdom if you are running on empty. True power is knowing when to delegate and rest. Your authority is not diluted by showing soft vulnerability; it is humanized. Let down your guard, ask for support, and let the universe serve you.",
  },
  [ArchetypeKey.ORACLE]: {
    key: ArchetypeKey.ORACLE,
    gift: "Uncanny pattern recognition, direct celestial prophecy, and speaking core vibrational codes that unlock sleeping DNA.",
    shadow: "Diluting or swallowing your truth to please others, intellectualizing direct intuitive hits, and chronic self-doubt in your voice.",
    signature: {
      color: "Silver-Iridescent",
      accent: "#94a3b8",
      element: "Air",
      frequency: "741 Hz",
      symbol: "Labyrinth",
      mantra: "I speak the language of stars and awaken minds.",
    },
    description: "You are a direct verbal bridge between the heavens and the earth, expressing deep cosmic patterns that make immediate sense to ready ears. You hear what is spoken in the silent margins of time.",
    activationCodes: ["TRUTH TRANSMISSION", "COSMIC LINGUISTICS", "PATTERN RECOGNITION", "VIBRATIONAL AWAKENING"],
    oracleMessage: {
      card: "The Whispering Wind",
      message: "The transmission is incredibly close. Listen with your solar plexus and heart, not just your intellect. Your voice carries the specific frequency that somebody else needs to hear to trigger their path.",
    },
    affirmation: "My voice is a sacred instrument of truth. I speak what is revealed with clarity.",
    guidingQuestion: "What truth have you been holding back that is now ready for expression?",
    ritual: [
      "Scent the air with frankincense or sage. Open a window.",
      "Sound 741 Hz. Feel the clearing of your throat and mind.",
      "Speak your mantra and whisper a blessing to the four directions.",
    ],
    growthPath: "Cultivating unshakeable confidence in your psychic impressions. Expressing controversial or mysterious truths even when there is no physical evidence or initial agreement.",
    lifeChangingAdvice: "Every time you censor your cosmic truth to fit in, you deny others the key to their own prison. You do not need logical proof, letters of approval, or permission from human establishments. Your direct connection to Source is your authority. Speak what is revealed in the quiet depths, and watch your voice rewrite reality itself.",
  },
  [ArchetypeKey.EMPATH]: {
    key: ArchetypeKey.EMPATH,
    gift: "Ultra-high sensory sensitivity, direct heart-field resonance, radical compassion, and cosmic emotional blueprinting.",
    shadow: "Absorbing collective anxiety and environmental toxins, losing your sense of shell in relationships, and porous psychic boundaries.",
    signature: {
      color: "Rose & Pearl",
      accent: "#f472b6",
      element: "Water & Light",
      frequency: "528 Hz",
      symbol: "Torus",
      mantra: "I hold the sacred ache and transform it with grace.",
    },
    description: "You are the loving heart of the world, feeling the deep energetic currents of the earth and holding the light grid of compassion. Your sensitive nervous system is a beautiful supercomputer.",
    activationCodes: ["RADICAL COMPASSION", "HEART-FIELD RESONANCE", "EMOTIONAL INTELLIGENCE", "UNCONDITIONAL LOVE"],
    oracleMessage: {
      card: "The Open Portal",
      message: "Your heart is not glass; it is as vast as the sky. Do not slam it shut to survive. Instead, expand your torus field outward until the heavy energy has no option but to match your high frequency.",
    },
    affirmation: "I am a conduit for healing. I am safe within my own heart.",
    guidingQuestion: "Whose energy are you carrying that is not yours to hold?",
    ritual: [
      "Draw a warm bath or use a wet cloth on your face. Cleanse your energy body.",
      "Play 528 Hz at your heart center. Visualize a rose opening in your chest.",
      "Speak your mantra and wrap your arms around yourself in a sacred hug.",
    ],
    growthPath: "Shifting from a passive emotional sponge that takes in energy to a shining stellar sun that projects light. Establishing impenetrable boundaries with sovereign love.",
    lifeChangingAdvice: "Your feeling body is a diagnostic radar, not a trash bin for other people's heavy luggage. Stop taking on emotions that belong to others under the guise of healing them. Your greatest service is to stand in your own peace. When you feel a wave of anxiety, ask aloud: 'Is this mine?' Return the rest, expand your field, and protect your space.",
  },
};

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    archetype: ArchetypeKey;
    icon?: string;
  }[];
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "As you close your eyes and tune into your soul’s core, a symbol arises. What is it?",
    options: [
      { text: "A spiraling galaxy of endless stars", archetype: ArchetypeKey.VISIONARY },
      { text: "A blazing golden sun radiating creation", archetype: ArchetypeKey.CREATOR },
      { text: "A still midnight lake reflecting a full moon", archetype: ArchetypeKey.MYSTIC },
      { text: "A luminous crystal pyramid emitting light codes", archetype: ArchetypeKey.ALCHEMIST },
      { text: "An ancient oak with roots deep in the earth", archetype: ArchetypeKey.SOVEREIGN },
      { text: "A silver labyrinth humming with secret patterns", archetype: ArchetypeKey.ORACLE },
      { text: "A softly glowing rose unfolding at the heart", archetype: ArchetypeKey.EMPATH },
    ],
  },
  {
    id: 2,
    text: "What is your current deepest soul longing?",
    options: [
      { text: "To see the hidden threads of fate and timelines", archetype: ArchetypeKey.VISIONARY },
      { text: "To birth a new reality from your sacred imagination", archetype: ArchetypeKey.CREATOR },
      { text: "To merge with the divine silence and know peace", archetype: ArchetypeKey.MYSTIC },
      { text: "To transmute what is heavy into luminous gold", archetype: ArchetypeKey.ALCHEMIST },
      { text: "To embody unshakable power and sacred duty", archetype: ArchetypeKey.SOVEREIGN },
      { text: "To speak truths that awaken sleeping minds", archetype: ArchetypeKey.ORACLE },
      { text: "To heal the fractures within and between hearts", archetype: ArchetypeKey.EMPATH },
    ],
  },
  {
    id: 3,
    text: "Which element feels most alive in your body right now?",
    options: [
      { text: "Ether – the space between worlds", archetype: ArchetypeKey.VISIONARY },
      { text: "Fire – creative ignition and passion", archetype: ArchetypeKey.CREATOR },
      { text: "Water – deep feeling, intuition, flow", archetype: ArchetypeKey.MYSTIC },
      { text: "Fire/Water blend – steam of transformation", archetype: ArchetypeKey.ALCHEMIST },
      { text: "Earth – grounding, permanence, structure", archetype: ArchetypeKey.SOVEREIGN },
      { text: "Air – clarity, thought, swift change", archetype: ArchetypeKey.ORACLE },
      { text: "Water/Light – compassionate tears, healing rain", archetype: ArchetypeKey.EMPATH },
    ],
  },
  {
    id: 4,
    text: "In your current chapter, what keeps appearing in dreams or meditations?",
    options: [
      { text: "Endless corridors of light and doorways", archetype: ArchetypeKey.VISIONARY },
      { text: "Vibrant art, music, or celestial cities", archetype: ArchetypeKey.CREATOR },
      { text: "Silence, temples, dissolving into fog", archetype: ArchetypeKey.MYSTIC },
      { text: "Furnaces, serpents, crucibles", archetype: ArchetypeKey.ALCHEMIST },
      { text: "Thrones, mountains, ancestral voices", archetype: ArchetypeKey.SOVEREIGN },
      { text: "Blueprints, codes, labyrinths, whispering winds", archetype: ArchetypeKey.ORACLE },
      { text: "Animals, heartbeats, hands touching, tears", archetype: ArchetypeKey.EMPATH },
    ],
  },
  {
    id: 5,
    text: "Your natural gift when walking into a room or space is:",
    options: [
      { text: "Seeing the true potential and timeline of everyone present", archetype: ArchetypeKey.VISIONARY },
      { text: "Igniting inspiration and new ideas without trying", archetype: ArchetypeKey.CREATOR },
      { text: "Making the energy stiller, calmer, more sacred", archetype: ArchetypeKey.MYSTIC },
      { text: "Sensing what needs to be released and subtly shifting it", archetype: ArchetypeKey.ALCHEMIST },
      { text: "Bringing order, safety, and a sense of being held", archetype: ArchetypeKey.SOVEREIGN },
      { text: "Offering the exact word or insight that cracks something open", archetype: ArchetypeKey.ORACLE },
      { text: "Feeling the emotional field and offering unspoken comfort", archetype: ArchetypeKey.EMPATH },
    ],
  },
  {
    id: 6,
    text: "In moments of deep challenge, what is your innate soul-response?",
    options: [
      { text: "Ascending to see if this challenge exists on all timelines", archetype: ArchetypeKey.VISIONARY },
      { text: "Finding a revolutionary new way to build around the obstacle", archetype: ArchetypeKey.CREATOR },
      { text: "Receding into the silence until the illusion of the problem dissolves", archetype: ArchetypeKey.MYSTIC },
      { text: "Facing the fire directly to see what part of you is being purified", archetype: ArchetypeKey.ALCHEMIST },
      { text: "Taking command and establishing a new order of protection", archetype: ArchetypeKey.SOVEREIGN },
      { text: "Listening for the hidden message the situation is trying to speak", archetype: ArchetypeKey.ORACLE },
      { text: "Softening your field to hold space for the emotions arising", archetype: ArchetypeKey.EMPATH },
    ],
  },
  {
    id: 7,
    text: "If you were to sum up your sacred mission in one word, what would it be?",
    options: [
      { text: "CLARITY", archetype: ArchetypeKey.VISIONARY },
      { text: "GENESIS", archetype: ArchetypeKey.CREATOR },
      { text: "UNION", archetype: ArchetypeKey.MYSTIC },
      { text: "TRANSMUTATION", archetype: ArchetypeKey.ALCHEMIST },
      { text: "STEWARDSHIP", archetype: ArchetypeKey.SOVEREIGN },
      { text: "REVELATION", archetype: ArchetypeKey.ORACLE },
      { text: "RESONANCE", archetype: ArchetypeKey.EMPATH },
    ],
  },
];
