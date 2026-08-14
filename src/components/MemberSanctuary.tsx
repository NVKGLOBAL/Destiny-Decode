import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Sparkles, Moon, Heart, Zap, Play, Square, 
  Trophy, Lock, Unlock, RefreshCw, Calendar, Flame, 
  Eye, Music, ChevronRight, HelpCircle
} from "lucide-react";
import { ArchetypeData } from "../types";
import { generateDailyTransit, DailyTransitResult } from "../utils/celestialEngine";

interface MemberSanctuaryProps {
  userName: string;
  resultArchetype: ArchetypeData;
  zodiacSign: string;
  userBirthday: string;
  playHapticSound: (type: 'light' | 'pulse' | 'success' | 'space') => void;
  toggleFrequency: (freqStr: string) => void;
  isPlayingFrequency: boolean;
}

interface TransitData {
  transitTitle: string;
  prediction: string;
  dailyRitual: string;
  powerWord: string;
}

export default function MemberSanctuary({
  userName,
  resultArchetype,
  zodiacSign,
  userBirthday,
  playHapticSound,
  toggleFrequency,
  isPlayingFrequency
}: MemberSanctuaryProps) {
  // State variables for persistence & UI interaction
  const [activeTab, setActiveTab] = useState<'daily' | 'harmonics' | 'weekly' | 'monthly'>('daily');
  const [loadingTransit, setLoadingTransit] = useState(false);
  const [transitData, setTransitData] = useState<TransitData | null>(null);
  
  // Harmonics state (streak, breathing phase, selected Solfeggio)
  const [selectedFreq, setSelectedFreq] = useState<string>("528");
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [streakCount, setStreakCount] = useState<number>(() => {
    return Number(localStorage.getItem(`ms_streak_${userName}`) || "0");
  });
  const [lastMeditation, setLastMeditation] = useState<string>(() => {
    return localStorage.getItem(`ms_last_date_${userName}`) || "";
  });
  const [meditationCompleted, setMeditationCompleted] = useState(false);

  // Weekly Portal state
  const [weeklyRune, setWeeklyRune] = useState<any>(() => {
    const saved = localStorage.getItem(`ms_weekly_rune_${userName}`);
    return saved ? JSON.parse(saved) : null;
  });
  const [weeklyStatus, setWeeklyStatus] = useState<'locked' | 'unlocked' | 'pulled'>(() => {
    const saved = localStorage.getItem(`ms_weekly_rune_${userName}`);
    return saved ? 'pulled' : 'unlocked';
  });
  const [isShuffling, setIsShuffling] = useState(false);

  // Monthly Portal state
  const [monthlyProphecy, setMonthlyProphecy] = useState<any>(() => {
    const saved = localStorage.getItem(`ms_monthly_prophecy_${userName}`);
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [isMandalaFlashed, setIsMandalaFlashed] = useState(false);

  // Sound Synthesizer toggle bridge
  const handleToggleSound = (freq: string) => {
    setSelectedFreq(freq);
    playHapticSound('pulse');
    toggleFrequency(freq);
  };

  // Breathing Orb cyclical routine
  useEffect(() => {
    if (activeTab !== 'harmonics') return;
    const interval = setInterval(() => {
      setBreathTimer(prev => {
        if (prev <= 1) {
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            return 2; // Hold breath for 2s
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return 4; // Exhale breath for 4s
          } else {
            setBreathPhase('Inhale');
            return 4; // Inhale breath for 4s
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTab, breathPhase]);

  // Calculate Daily Celestial Transit prediction 100% client-side (Zero API keys, Zero costs)
  const handleFetchTransit = (force: boolean = false) => {
    if (transitData && !force) return;
    setLoadingTransit(true);
    playHapticSound('space');
    
    setTimeout(() => {
      try {
        const result = generateDailyTransit({
          userName,
          archetype: resultArchetype.key,
          zodiacSign,
          birthday: userBirthday,
          date: new Date()
        });
        setTransitData(result);
        localStorage.setItem(`ms_transit_${userName}_${new Date().toDateString()}`, JSON.stringify(result));
      } catch (e) {
        console.error("Error generating transit locally:", e);
      } finally {
        setLoadingTransit(false);
      }
    }, force ? 500 : 250);
  };

  // Run automatically when loading component
  useEffect(() => {
    handleFetchTransit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Complete Daily Meditation streak increment
  const handleCompleteMeditation = () => {
    if (meditationCompleted) return;
    playHapticSound('success');
    
    const todayStr = new Date().toDateString();
    let newStreak = streakCount;
    if (lastMeditation !== todayStr) {
      newStreak += 1;
      setStreakCount(newStreak);
      setLastMeditation(todayStr);
      localStorage.setItem(`ms_streak_${userName}`, String(newStreak));
      localStorage.setItem(`ms_last_date_${userName}`, todayStr);
    }
    setMeditationCompleted(true);
  };

  // Drawer routine for Weekly rune flip
  const handlePullWeeklyRune = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    playHapticSound('space');
    
    const runesList = [
      {
        name: "The Gateway of Chiron",
        element: "Aether & Fire",
        meaning: "A deep portal of self-acceptance is opening. You are being aligned to integrate professional trauma as a catalyst for supreme, high-resonance business alignment.",
        quest: "Perform a quiet walk in nature today. Look for a circular stone or gateway branch, and pass through it while setting the intention to release 2025 timelines.",
        runicSymbol: "⚜"
      },
      {
        name: "Jupiter's Alabaster Octave",
        element: "Gold & Expansion",
        meaning: "The planet of destiny is casting a pure golden Ray on your throat and heart. Cosmic windfalls, sync events, and unexpected financial downloads are ready to trigger.",
        quest: "Write down an unvarnished vision of your maximum self on a blank sheet of paper. Fold it three times and store it in your pillow for 7 nights.",
        runicSymbol: "💮"
      },
      {
        name: "Saturn's Sovereign Ring",
        element: "Earthy Crystals",
        meaning: "A week of powerful structural integration. Boundaries are your magic keys. The council suggests severing connections that drain your celestial battery index.",
        quest: "Say 'No' to at least one request that is not a full-body YES. Protect your sovereign space like a golden star seal.",
        runicSymbol: "☸"
      }
    ];

    setTimeout(() => {
      const selected = runesList[Math.floor(Math.random() * runesList.length)];
      setWeeklyRune(selected);
      setWeeklyStatus('pulled');
      localStorage.setItem(`ms_weekly_rune_${userName}`, JSON.stringify(selected));
      setIsShuffling(false);
      playHapticSound('success');
    }, 1800);
  };

  // Reveal Mandala prophetic projection
  const handleSelectMandalaSector = (sectorIdx: number) => {
    if (selectedSector !== null) return;
    setSelectedSector(sectorIdx);
    setIsMandalaFlashed(true);
    playHapticSound('space');

    const prophecies = [
      {
        theme: "Ancestral Codex Recall",
        keyphrase: "Recoding DNA blueprints of your maternal lineage",
        ritual: "Hold a glass of water, speak your birth name backward into the water three times to neutralize lineage loops, then drink it with complete presence."
      },
      {
        theme: "Quantum Leap of Abundance",
        keyphrase: "Expanding to receive a 10x magnetic field expansion",
        ritual: "Place a golden item on your throat chakra for 3 minutes while hum-toning at 528Hz to stabilize your field to higher-frequency assets."
      },
      {
        theme: "The Alchemist's Shadow Integration",
        keyphrase: "Transmuting suppressed anger into creative dynamic fuel",
        ritual: "Write down your greatest current frustration, burn the paper safely, and release the ash outside in direct moonlight."
      }
    ];

    setTimeout(() => {
      const selectedProphecy = prophecies[sectorIdx % prophecies.length];
      setMonthlyProphecy(selectedProphecy);
      localStorage.setItem(`ms_monthly_prophecy_${userName}`, JSON.stringify(selectedProphecy));
      playHapticSound('success');
    }, 1200);
  };

  return (
    <div id="celestial-member-sanctuary" className="flex-1 w-full text-[#1e1b4b] relative z-10">
      {/* Welcome Banner */}
      <div className="mb-8 p-6 md:p-8 rounded-[32px] bg-gradient-to-br from-indigo-900/90 via-[#07070d]/95 to-indigo-950/90 text-white border-2 border-amber-500/10 shadow-[0_20px_50px_rgba(79,70,229,0.15)] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/sacred-geometry.png")` }} />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />
        
        <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
          <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-[9px] font-mono tracking-[0.3em] text-amber-400 font-extrabold uppercase">Ecosystem Sanctuary</span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-[9px] font-bold text-indigo-300 uppercase">MEMBERSHIP ACTIVE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-1">
              Welcome, {userName || "Noble Soul"}
            </h2>
            <p className="text-xs text-indigo-200/70 font-medium">
              Daily Alignment Blueprint • Archetype: <span className="text-amber-300 font-bold">{resultArchetype.key}</span>
            </p>
          </div>
        </div>

        {/* Streak Indicator */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl relative z-10 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-indigo-950 font-bold shadow-md">
            <Flame className="w-5 h-5 text-indigo-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-indigo-200 uppercase tracking-widest leading-none font-bold">Resonance Streak</span>
            <span className="text-xl font-extrabold text-[#fdfcf7] mt-1">{streakCount} Days Active</span>
          </div>
        </div>
      </div>

      {/* Tabs Selector Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 bg-indigo-50/50 p-2 rounded-[24px] border border-indigo-100 shadow-sm">
        {[
          { id: 'daily', label: "✧ Daily Transit", icon: <Compass className="w-4 h-4" /> },
          { id: 'harmonics', label: "✧ Harmonics (Orb)", icon: <Music className="w-4 h-4" /> },
          { id: 'weekly', label: "✧ Weekly Rune (Rare)", icon: <Sparkles className="w-4 h-4" /> },
          { id: 'monthly', label: "✧ Monthly Prophecy (Legendary)", icon: <Moon className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { playHapticSound('light'); setActiveTab(tab.id as any); }}
            className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === tab.id ? 'bg-[#1e1b4b] text-white shadow-md shadow-indigo-950/20 scale-[1.02]' : 'text-indigo-950/60 hover:text-indigo-950 hover:bg-white/50'}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Portals Content Screen */}
      <div className="min-h-[500px] bg-white border-2 border-indigo-100 rounded-[40px] p-6 sm:p-8 md:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/sacred-geometry.png")` }} />
        
        <AnimatePresence mode="wait">
          {/* DAILY TRANSIT TAB */}
          {activeTab === 'daily' && (
            <motion.div
              key="daily"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-100 pb-6">
                <div>
                  <h3 className="text-xs font-mono text-amber-700 tracking-[0.4em] uppercase font-bold">Portal 1 • Core Blueprint Transits</h3>
                  <h4 className="text-3xl font-black text-indigo-950">Daily Star alignments</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">Generated by Council for: {new Date().toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => handleFetchTransit(true)}
                  disabled={loadingTransit}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 font-mono text-xs font-bold hover:bg-indigo-100 active:scale-95 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4.5 h-4.5 ${loadingTransit ? 'animate-spin' : ''}`} />
                  <span>{loadingTransit ? "CALIBRATING ORBIT..." : "RE-ALIGNS CELLULAR BLUEPRINT"}</span>
                </button>
              </div>

              {loadingTransit ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    className="relative w-16 h-16"
                  >
                    <div className="absolute inset-0 border-2 border-amber-500/50 rounded-full border-dashed" />
                    <Compass className="absolute inset-0 m-auto text-indigo-950 w-8 h-8" />
                  </motion.div>
                  <p className="text-xs font-mono tracking-widest text-indigo-950/60 uppercase animate-pulse font-bold">RECEIVING TRANSIT FREQUENCIES FROM CELESTIAL PROXIES...</p>
                </div>
              ) : transitData ? (
                <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-8 space-y-6">
                    <div className="p-6 rounded-3xl bg-indigo-50/40 border border-indigo-100/50 relative overflow-hidden">
                      <div className="absolute top-4 right-4 text-indigo-500/10">
                        <Calendar className="w-12 h-12" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-[10px] font-mono tracking-wider uppercase font-bold">Transit Alignments Active</span>
                      <h5 className="text-2xl font-black text-indigo-950 mt-4 italic">{transitData.transitTitle}</h5>
                      <p className="text-slate-800 font-medium leading-relaxed mt-4 whitespace-pre-line text-base text-justify">
                        {transitData.prediction}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-4 space-y-6">
                    {/* Ritual Box */}
                    <div className="p-6 rounded-3xl bg-amber-50/60 border-2 border-amber-200/50 shadow-sm">
                      <div className="flex items-center gap-3 text-amber-800 mb-4">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                        <h6 className="text-[11px] font-mono tracking-wider uppercase font-extrabold text-amber-900">EVERYDAY TRANSIT ALIGNMENT RITUAL</h6>
                      </div>
                      <p className="text-slate-900 text-sm font-semibold italic bg-white/60 p-4 rounded-2xl border border-amber-100 leading-relaxed">
                        "{transitData.dailyRitual}"
                      </p>
                    </div>

                    {/* Word of Power */}
                    <div className="p-6 rounded-3xl bg-[#07070d] text-center border-2 border-indigo-950 text-[#fdfcf7] relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/sacred-geometry.png")` }} />
                      <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-[0.3em]">RESONANCE POWER MANTRA</span>
                      <p className="text-3xl font-black text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] my-4 tracking-widest">{transitData.powerWord}</p>
                      <p className="text-[10px] text-indigo-200/50 font-medium">Meditate on this sound capsule to lock your field frequency today</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <HelpCircle className="w-12 h-12 text-indigo-200 mb-4" />
                  <p className="text-slate-500 font-medium">Failed to establish connection to Star Archive.</p>
                  <button onClick={() => handleFetchTransit()} className="mt-4 px-6 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-bold">RETRY HANDSHAKE</button>
                </div>
              )}
            </motion.div>
          )}

          {/* DAILY HARMONICS & WAVE MEDITATION */}
          {activeTab === 'harmonics' && (
            <motion.div
              key="harmonics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="border-b border-indigo-100 pb-6">
                <h3 className="text-xs font-mono text-amber-700 tracking-[0.4em] uppercase font-bold">Portal 2 • Celestial Tones</h3>
                <h4 className="text-3xl font-black text-indigo-950">Vibrational Wave Orb</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Every day, meditate inside the harmonic field to charge your star cells</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                
                {/* Breathing Interactive Stage */}
                <div className="flex flex-col items-center justify-center p-6 bg-indigo-50/30 rounded-3xl border border-indigo-100/50 relative min-h-[380px]">
                  
                  {/* Outer Breathing guide rings */}
                  <div className="relative flex items-center justify-center w-64 h-64">
                    
                    {/* Pulsing guided orb */}
                    <motion.div
                      animate={{
                        scale: breathPhase === 'Inhale' ? 1.35 : breathPhase === 'Hold' ? 1.35 : 0.85,
                        backgroundColor: breathPhase === 'Inhale' ? 'rgba(79, 70, 229, 0.15)' : breathPhase === 'Hold' ? 'rgba(217, 70, 239, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        borderColor: breathPhase === 'Inhale' ? 'rgba(79, 70, 229, 0.4)' : breathPhase === 'Hold' ? 'rgba(217, 70, 239, 0.4)' : 'rgba(245, 158, 11, 0.4)'
                      }}
                      transition={{ duration: breathPhase === 'Hold' ? 0.4 : 4, ease: "easeInOut" }}
                      className="absolute w-44 h-44 rounded-full border-2 flex flex-col items-center justify-center text-center shadow-lg relative z-10 backdrop-blur-md"
                    >
                      <motion.span
                        key={breathPhase}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-lg font-black text-indigo-950 tracking-widest uppercase font-mono"
                      >
                        {breathPhase}
                      </motion.span>
                      <span className="text-3xl font-extrabold text-indigo-900/60 mt-1">{breathTimer}s</span>
                    </motion.div>

                    {/* Aura Wave backdrops */}
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-full animate-ping [animation-duration:5s] pointer-events-none" />
                    <div className="absolute inset-8 bg-amber-500/5 rounded-full animate-pulse [animation-duration:3s] pointer-events-none" />
                  </div>

                  <p className="text-xs font-mono text-center text-indigo-900/60 font-bold uppercase tracking-widest mt-4">
                    Synchronize your respiratory breath loops with the sphere expansion.
                  </p>
                </div>

                {/* Controls & Harmonics tuning */}
                <div className="space-y-6">
                  <div>
                    <h5 className="text-[11px] font-mono tracking-widest uppercase text-slate-500 font-bold mb-4">Select Solfeggio Tuning Frequency</h5>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { Hz: "396", desc: "Liberating Guilt & fear" },
                        { Hz: "432", desc: "Cosmic Natural alignment" },
                        { Hz: "528", desc: "Transformation & repair" },
                        { Hz: "639", desc: "Heart-led integration" }
                      ].map(item => (
                        <button
                          key={item.Hz}
                          onClick={() => handleToggleSound(item.Hz)}
                          className={`p-4 rounded-2xl text-left border-2 transition-all ${selectedFreq === item.Hz && isPlayingFrequency ? 'bg-indigo-950 border-indigo-950 text-white shadow-md' : 'bg-white border-indigo-100 text-indigo-950 hov:border-indigo-300'}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono font-extrabold uppercase text-amber-500">{item.Hz} HZ</span>
                            {selectedFreq === item.Hz && isPlayingFrequency ? (
                              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                            ) : null}
                          </div>
                          <span className="text-xs font-bold leading-tight block">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Play Synth activator button */}
                  <button
                    onClick={() => handleToggleSound(selectedFreq)}
                    className={`w-full py-4.5 rounded-3xl font-mono uppercase text-xs tracking-wider transition-all font-bold flex items-center justify-center gap-3 ${isPlayingFrequency ? 'bg-amber-600 text-white shadow-md hover:bg-amber-500' : 'bg-indigo-900 text-white hover:bg-indigo-950 shadow-md shadow-indigo-900/10'}`}
                  >
                    {isPlayingFrequency ? (
                      <>
                        <Square className="w-4 h-4 fill-white" />
                        <span>Cease Tonal Resonance</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        <span>Activate {selectedFreq}Hz Tonal Sound bath</span>
                      </>
                    )}
                  </button>

                  {/* Daily Harmonization completed button */}
                  <div className="pt-4 border-t border-indigo-50">
                    <button
                      onClick={handleCompleteMeditation}
                      disabled={meditationCompleted}
                      className={`w-full py-4 rounded-3xl font-bold font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-3 ${meditationCompleted ? 'bg-emerald-50 text-emerald-800 border border-emerald-100 cursor-default' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-950 active:scale-[0.98]'}`}
                    >
                      <Trophy className="w-4 h-4" />
                      <span>{meditationCompleted ? "Alignments Locked Today (Streak Charged)" : "Deduct Session: Seal Daily Alignment"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* RARE WEEKLY RUNE ENTRY */}
          {activeTab === 'weekly' && (
            <motion.div
              key="weekly"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-indigo-100 pb-6">
                <div>
                  <h3 className="text-xs font-mono text-amber-700 tracking-[0.4em] uppercase font-bold">Portal 3 • Rare Weekly Alignment</h3>
                  <h4 className="text-3xl font-black text-indigo-950">The Guild's Rune Draw</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">Unlockable once per calendar cycle. Calibrate to your supreme weekly vector.</p>
                </div>
                {weeklyStatus === 'pulled' && (
                  <button 
                    onClick={() => { playHapticSound('light'); setWeeklyStatus('unlocked'); setWeeklyRune(null); localStorage.removeItem(`ms_weekly_rune_${userName}`); }}
                    className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-mono font-bold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>DRAWS FRESH RUNE</span>
                  </button>
                )}
              </div>

              {weeklyStatus === 'unlocked' && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-8 w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h5 className="text-2xl font-black text-indigo-950 mb-2">Sacred Weekly Rune Vault Ready</h5>
                  <p className="text-slate-600 max-w-md mx-auto text-sm mb-8 leading-relaxed">
                    The Council has encoded three legendary rune stones for you this week. Hover and tap to release the seals and draw your guide coordinate.
                  </p>

                  <div className="grid grid-cols-3 gap-6 max-w-lg w-full mb-10">
                    {[1, 2, 3].map(item => (
                      <motion.button
                        key={item}
                        onClick={handlePullWeeklyRune}
                        whileHover={{ y: -12, scale: 1.05 }}
                        className="aspect-[2/3] rounded-2xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-[#07070d] border-2 border-amber-500/30 text-[#fdfcf7] flex flex-col items-center justify-center relative p-4 shadow-lg cursor-pointer overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-transparent group-hover:bg-amber-400/[0.04] transition-colors" />
                        <Sparkles className="w-6 h-6 text-amber-400 opacity-40 group-hover:scale-135 transition-transform" />
                        <span className="text-[9px] font-mono text-indigo-300 mt-4 font-bold uppercase tracking-widest">Rune 0{item}</span>
                      </motion.button>
                    ))}
                  </div>

                  {isShuffling && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-mono text-indigo-950 font-bold uppercase tracking-[0.2em] animate-pulse"
                    >
                      SHUFFLING SACRED Runes IN Quantum DECK...
                    </motion.div>
                  )}
                </div>
              )}

              {weeklyStatus === 'pulled' && weeklyRune && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-2xl mx-auto p-8 rounded-3xl bg-indigo-50/40 border-2 border-indigo-100 shadow-sm relative text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-500/15 text-amber-600 font-extrabold flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
                    {weeklyRune.runicSymbol}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-700 font-bold">YOUR RARE ALIGNMENT VECTOR</span>
                  <h5 className="text-3xl font-black text-indigo-950 mt-2 mb-4">{weeklyRune.name}</h5>
                  <p className="text-xs font-mono text-medium bg-white px-3 py-1 rounded-full text-indigo-800 border border-indigo-100 uppercase inline-block mb-6">ELEMENT: {weeklyRune.element}</p>
                  
                  <p className="text-slate-850 font-medium leading-relaxed my-6 italic text-lg px-6 py-4 bg-white/60 rounded-2xl border border-indigo-100/50">
                    "{weeklyRune.meaning}"
                  </p>
                  
                  <div className="p-6 rounded-2xl bg-amber-500/10 border-2 border-amber-500/20 text-indigo-950 font-bold text-left mt-8">
                    <span className="text-[10px] font-mono text-amber-900 tracking-wider uppercase font-bold block mb-2">WEEKLY SACRED QUEST</span>
                    <p className="text-sm font-semibold italic text-[#1e1b4b]">
                      {weeklyRune.quest}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* LEGENDARY MONTHLY PROPHECY MODULE */}
          {activeTab === 'monthly' && (
            <motion.div
              key="monthly"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-indigo-100 pb-6">
                <div>
                  <h3 className="text-xs font-mono text-amber-700 tracking-[0.4em] uppercase font-bold">Portal 4 • Legendary Monthly Projection</h3>
                  <h4 className="text-3xl font-black text-indigo-950">The Mandala Matrix</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">Epic once-a-month major shadow-work and timeline calibration prophecy.</p>
                </div>
                {selectedSector !== null && (
                  <button 
                    onClick={() => { playHapticSound('light'); setSelectedSector(null); setMonthlyProphecy(null); localStorage.removeItem(`ms_monthly_prophecy_${userName}`); }}
                    className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-mono font-bold"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>UNLOCKS MATRIX</span>
                  </button>
                )}
              </div>

              {selectedSector === null && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <h5 className="text-xl font-bold text-indigo-950 mb-6">Tap the Galactic Node of Intention</h5>
                  <p className="text-xs text-slate-500 max-w-sm mb-12">
                     Concentrate on your central question of survival or purpose. Tap one of the constellation vectors in the sacred geometry schema below.
                  </p>

                  {/* Interactive Mandala Constellation Ring */}
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <motion.svg 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                      className="absolute inset-0 w-full h-full text-indigo-950 opacity-40" 
                      viewBox="0 0 200 200"
                    >
                      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,3" />
                      <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.8" />
                      <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.8" />
                      {/* Radiating lines */}
                      {Array.from({ length: 8 }).map((_, i) => {
                        const angle = (i * Math.PI) / 4;
                        return (
                          <line 
                            key={i} 
                            x1="100" y1="100" 
                            x2={100 + 90 * Math.cos(angle)} y2={100 + 90 * Math.sin(angle)} 
                            stroke="currentColor" strokeWidth="0.5" 
                          />
                        );
                      })}
                    </motion.svg>

                    {/* Interactive Node Taps (Outer perimeter) */}
                    {[
                      { l: "Timeline A", top: "10%", left: "50%" },
                      { l: "Timeline B", top: "50%", left: "90%" },
                      { l: "Timeline C", top: "90%", left: "50%" },
                      { l: "Timeline D", top: "50%", left: "10%" }
                    ].map((node, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelectMandalaSector(idx)}
                        whileHover={{ scale: 1.4 }}
                        className="absolute w-8 h-8 rounded-full bg-white border-2 border-amber-500 text-indigo-950 shadow-md text-glow text-[10px] font-mono font-bold flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                        style={{ top: node.top, left: node.left }}
                      >
                        {idx + 1}
                      </motion.button>
                    ))}
                    
                    <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-indigo-50 border border-indigo-150 animate-ping opacity-25" />
                    <Sparkles className="text-amber-500 w-8 h-8 absolute" />
                  </div>
                </div>
              )}

              {selectedSector !== null && monthlyProphecy && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto space-y-8"
                >
                  <div className="relative p-8 rounded-3xl bg-indigo-950 text-white border border-[#2e1065] text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/sacred-geometry.png")` }} />
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    >
                      <Moon className="w-12 h-12 text-amber-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                    </motion.div>
                    
                    <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-300 font-bold">MONTHLY PROPHETIC projection</span>
                    <h5 className="text-3xl font-black text-[#fdfcf7] mt-2 mb-4">{monthlyProphecy.theme}</h5>
                    <p className="text-amber-300 italic text-lg leading-relaxed font-semibold max-w-lg mx-auto">
                      "{monthlyProphecy.keyphrase}"
                    </p>
                  </div>

                  <div className="p-8 rounded-3xl bg-white border-2 border-indigo-100 text-slate-800">
                    <div className="flex items-center gap-3 text-indigo-950 mb-4 font-extrabold uppercase font-mono tracking-wider text-xs">
                      <Zap className="w-5 h-5 text-indigo-800" />
                      <span>MONTHLY SHADOW-WORK ACTIVE RITUAL</span>
                    </div>
                    <p className="text-base text-slate-700 leading-relaxed font-semibold bg-indigo-50/40 p-5 rounded-2xl border border-indigo-100">
                      {monthlyProphecy.ritual}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust & Upgrade Marketing Trigger Card */}
      <div className="mt-8 p-8 rounded-[36px] bg-indigo-50 border-2 border-indigo-100/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold text-amber-700 uppercase tracking-widest font-mono">Unlock full ecosystem</span>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono">• Monthly portal archive</span>
          </div>
          <h4 className="text-lg md:text-xl font-black text-indigo-950">Upgrade to Cosmic Sanctuary Premium (SaaS)</h4>
          <p className="text-xs text-slate-600 max-w-xl font-semibold leading-relaxed">
            Get unlimited server-side Gemini transit updates, downloadable daily audio frequency waves, custom birth blueprint decodes, and direct support from Lisa Garcia Ruiz.
          </p>
        </div>

        <button 
          onClick={() => playHapticSound('space')}
          className="flex-shrink-0 px-8 py-4.5 rounded-full bg-indigo-600 text-white font-mono text-xs uppercase tracking-[0.15em] font-extrabold hover:bg-slate-950 transition-all cursor-pointer shadow-md shadow-indigo-600/10"
        >
          Activate premium for $29/mo
        </button>
      </div>
    </div>
  );
}
