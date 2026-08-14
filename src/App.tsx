/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Moon, 
  Sun, 
  Wind, 
  Zap, 
  Globe, 
  Heart, 
  Aperture,
  Compass,
  ArrowRight,
  Download,
  Volume2,
  TrendingUp
} from 'lucide-react';
import { ARCHETYPES, QUIZ_QUESTIONS, ArchetypeKey, ArchetypeData } from './types';
import StarryBackground from './components/StarryBackground';
import PortalOverlay from './components/PortalOverlay';
import MemberSanctuary from './components/MemberSanctuary';

// --- Components ---

const ShootingStar = ({ delay = 0, top = "10%", left = "70%" }) => {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0, scaleX: 0 }}
      animate={{
        x: [0, -450],
        y: [0, 450],
        opacity: [0, 0, 0.8, 0.8, 0, 0],
        scaleX: [0.1, 1, 1, 0.1, 0.1]
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        repeatDelay: delay,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.random() * 4
      }}
      style={{ 
        top, 
        left,
        transform: 'rotate(-38deg)',
        transformOrigin: 'right'
      }}
      className="absolute w-32 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500 to-amber-500 pointer-events-none filter blur-[0.2px]"
    />
  );
};

const CosmicBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const deepStars = useMemo(() => {
    return [...Array(60)].map((_, i) => ({
      id: i,
      x: (Math.random() * 100).toFixed(2) + '%',
      y: (Math.random() * 100).toFixed(2) + '%',
      size: (Math.random() * 1.5 + 0.6).toFixed(1) + 'px',
      delay: (Math.random() * 5).toFixed(1),
      duration: (3 + Math.random() * 4).toFixed(1),
    }));
  }, []);

  const midStars = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      x: (Math.random() * 100).toFixed(2) + '%',
      y: (Math.random() * 100).toFixed(2) + '%',
      size: (Math.random() * 2.0 + 1.5).toFixed(1) + 'px',
      delay: (Math.random() * 5).toFixed(1),
      duration: (4 + Math.random() * 5).toFixed(1),
    }));
  }, []);

  const flareStars = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      x: (Math.random() * 100).toFixed(2) + '%',
      y: (Math.random() * 100).toFixed(2) + '%',
      size: (Math.random() * 2.5 + 3.0).toFixed(1) + 'px',
      delay: (Math.random() * 5).toFixed(1),
      duration: (5 + Math.random() * 6).toFixed(1),
    }));
  }, []);

  useEffect(() => {
    let handle = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let lastInteractionTime = Date.now();

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) - 0.5;
      targetY = (e.clientY / window.innerHeight) - 0.5;
      lastInteractionTime = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = (e.touches[0].clientX / window.innerWidth) - 0.5;
        targetY = (e.touches[0].clientY / window.innerHeight) - 0.5;
        lastInteractionTime = Date.now();
      }
    };

    const update = () => {
      const now = Date.now();
      const timeSec = now * 0.0003;
      
      // Infinite ambient orbital trace (breathing motion for idle states)
      const idleSpeed = 0.12; 
      const idleX = Math.sin(timeSec) * idleSpeed;
      const idleY = Math.cos(timeSec * 0.7) * idleSpeed;

      // Revert into ambient rhythm after 3.5 seconds of stationary state
      const idleDelay = 3500;
      const fadeDuration = 3000;
      const timeSinceLastInteraction = now - lastInteractionTime;
      const idleWeight = Math.max(0, Math.min(1, (timeSinceLastInteraction - idleDelay) / fadeDuration));

      const blendedTargetX = targetX * (1 - idleWeight) + idleX * idleWeight;
      const blendedTargetY = targetY * (1 - idleWeight) + idleY * idleWeight;

      currentX += (blendedTargetX - currentX) * 0.04;
      currentY += (blendedTargetY - currentY) * 0.04;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mx', `${currentX}`);
        containerRef.current.style.setProperty('--my', `${currentY}`);
      }

      handle = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    handle = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(handle);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
    >
      {/* Radiant, bright pearl/alabaster base background */}
      <div className="absolute inset-0 bg-[#fdfbf7]" /> 
      <div className="absolute inset-0 bg-gradient-to-tr from-[#f9f5eb] via-[#fdfbf7] to-[#f4f0e6] opacity-60" />
      <div className="noise-overlay absolute inset-0 z-0 opacity-[0.03]" />
      
      {/* Cinematic Luminous Pastel Nebulae */}
      {/* 1. Amethyst Lavender Aura (Rich Purple Soft Glow) */}
      <motion.div 
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,_#ede9fe_0%,_transparent_65%)]"
        style={{
          transform: 'translate3d(calc(var(--mx, 0) * -12px), calc(var(--my, 0) * -12px), 0)',
        }}
      />
      
      {/* 2. Soft Rose-Quartz Orb */}
      <motion.div 
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.38, 0.25],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,_#fae8ff_0%,_transparent_60%)]"
        style={{
          transform: 'translate3d(calc(var(--mx, 0) * -18px), calc(var(--my, 0) * -18px), 0)',
        }}
      />

      {/* 3. Golden Amber Filament Glow */}
      <motion.div 
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(251,191,36,0.12)_0%,_transparent_55%)]"
        style={{
          transform: 'translate3d(calc(var(--mx, 0) * -25px), calc(var(--my, 0) * -25px), 0)',
        }}
      />

      {/* 4. Morning Celestial Ocean Blue Aura */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_80%,_rgba(196,181,253,0.18)_0%,_transparent_50%)]"
        style={{
          transform: 'translate3d(calc(var(--mx, 0) * -15px), calc(var(--my, 0) * -15px), 0)',
        }}
      />

      {/* Dynamic Cosmic Constellation Lines (Subtle Sacred Alignment in violet-indigo) */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.09] pointer-events-none"
        style={{
          transform: 'translate3d(calc(var(--mx, 0) * -16px), calc(var(--my, 0) * -16px), 0) rotate(calc(var(--mx, 0) * 12deg))',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <svg className="w-[90vh] h-[90vh] text-indigo-700 stroke-current animate-spin-slow" viewBox="0 0 200 200" fill="none" strokeWidth="0.25">
          <circle cx="100" cy="100" r="85" strokeDasharray="1,5" />
          <circle cx="100" cy="100" r="62" />
          <circle cx="100" cy="100" r="40" strokeDasharray="6,3" />
          <line x1="100" y1="5" x2="100" y2="195" strokeDasharray="3,3" />
          <line x1="5" y1="100" x2="195" y2="100" strokeDasharray="3,3" />
          <polygon points="100,38 154,131 46,131" strokeDasharray="1,2" />
          <polygon points="100,162 154,69 46,69" strokeDasharray="1,2" />
        </svg>
      </div>

      {/* Cosmic Alignment Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(79,70,229,0.2) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          transform: 'translate3d(calc(var(--mx, 0) * -10px), calc(var(--my, 0) * -10px), 0) scale(1.02)',
        }}
      />

      {/* Stellar Layer 1: Deep Starfield (Soft royal amethyst stars) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: 'translate3d(calc(var(--mx, 0) * -8px), calc(var(--my, 0) * -8px), 0)',
        }}
      >
        {deepStars.map((star) => (
          <motion.div
            key={`deep-star-${star.id}`}
            initial={{ opacity: Math.random() }}
            animate={{ opacity: [0.25, 0.75, 0.25] }}
            transition={{ duration: parseFloat(star.duration), repeat: Infinity, delay: parseFloat(star.delay), ease: "easeInOut" }}
            className="absolute bg-indigo-500 rounded-full shadow-[0_0_1px_rgba(79,70,229,0.3)]"
            style={{ 
              left: star.x, 
              top: star.y, 
              width: star.size, 
              height: star.size 
            }}
          />
        ))}
      </div>

      {/* Stellar Layer 2: Midground Twinklers (Sparkling gold stars) */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          transform: 'translate3d(calc(var(--mx, 0) * -20px), calc(var(--my, 0) * -20px), 0)',
        }}
      >
        {midStars.map((star) => (
          <motion.div
            key={`mid-star-${star.id}`}
            initial={{ opacity: Math.random() }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: parseFloat(star.duration), repeat: Infinity, delay: parseFloat(star.delay), ease: "easeInOut" }}
            className="absolute bg-amber-500 rounded-full shadow-[0_0_3px_rgba(245,158,11,0.6)]"
            style={{ 
              left: star.x, 
              top: star.y, 
              width: star.size, 
              height: star.size 
            }}
          />
        ))}
      </div>

      {/* Stellar Layer 3: Foreground Radiant Flares */}
      <div 
        className="absolute inset-0 z-20"
        style={{
          transform: 'translate3d(calc(var(--mx, 0) * -35px), calc(var(--my, 0) * -35px), 0)',
        }}
      >
        {flareStars.map((star) => (
          <motion.div
            key={`flare-star-${star.id}`}
            initial={{ opacity: Math.random(), scale: 0.9 }}
            animate={{ 
              opacity: [0.4, 0.95, 0.4],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{ duration: parseFloat(star.duration), repeat: Infinity, delay: parseFloat(star.delay), ease: "easeInOut" }}
            className="absolute bg-amber-500 rounded-full shadow-[0_0_6px_#f59e0b,0_0_2px_#d97706] flex items-center justify-center"
            style={{ 
              left: star.x, 
              top: star.y, 
              width: star.size, 
              height: star.size 
            }}
          >
            {/* Subtle multi-ray flare design */}
            <div className="absolute w-[240%] h-[0.5px] bg-amber-400/40 rotate-45 blur-[0.2px]" />
            <div className="absolute h-[240%] w-[0.5px] bg-amber-400/40 rotate-45 blur-[0.2px]" />
          </motion.div>
        ))}
      </div>

      {/* Floating Staggered Shooting Stars */}
      <ShootingStar delay={6} top="5%" left="85%" />
      <ShootingStar delay={14} top="18%" left="65%" />
      <ShootingStar delay={24} top="32%" left="92%" />
    </div>
  );
};

const ShimmerOverlay = ({ message }: { message: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl"
  >
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-32 h-32 mb-8"
    >
      <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-full" />
      <div className="absolute inset-2 border-2 border-amber-500/30 rounded-full border-dashed" />
      <Sparkles className="absolute inset-0 m-auto text-indigo-400 w-12 h-12" />
    </motion.div>
    <motion.p 
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-indigo-200 font-mono tracking-[0.2em] text-lg uppercase"
    >
      {message}
    </motion.p>
  </motion.div>
);

export default function App() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'decoding' | 'result'>('landing');
  const [dashboardMode, setDashboardMode] = useState<'scroll' | 'sanctuary'>('scroll');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ArchetypeKey[]>([]);
  const [userName, setUserName] = useState('');
  const [userBirthday, setUserBirthday] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [resultArchetype, setResultArchetype] = useState<ArchetypeData | null>(null);
  const [zodiacInfo, setZodiacInfo] = useState<{ sign: string; element: string; quality: string; wisdom: string; starCode: string } | null>(null);
  const [scrollPage, setScrollPage] = useState(1);
  const [isOracleFlipped, setIsOracleFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const getDaysInMonth = (monthStr: string, yearStr: string) => {
    const m = Number(monthStr);
    const y = Number(yearStr) || 2000;
    if (!m) return 31;
    if (m === 2) {
      const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      return isLeap ? 29 : 28;
    }
    if ([4, 6, 9, 11].includes(m)) return 30;
    return 31;
  };

  const MONTHS = useMemo(() => [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ], []);

  const DAYS = useMemo(() => {
    const count = getDaysInMonth(birthMonth, birthYear);
    return Array.from({ length: count }, (_, i) => String(i + 1).padStart(2, '0'));
  }, [birthMonth, birthYear]);

  const YEARS = useMemo(() => {
    const currYear = new Date().getFullYear();
    return Array.from({ length: currYear - 1900 + 1 }, (_, i) => String(currYear - i));
  }, []);

  useEffect(() => {
    if (birthMonth) {
      const maxDays = getDaysInMonth(birthMonth, birthYear);
      if (birthDay && Number(birthDay) > maxDays) {
        setBirthDay(String(maxDays).padStart(2, '0'));
      }
    }
  }, [birthMonth, birthYear, birthDay]);

  useEffect(() => {
    if (birthMonth && birthDay && birthYear) {
      setUserBirthday(`${birthYear}-${birthMonth}-${birthDay}`);
    } else {
      setUserBirthday('');
    }
  }, [birthMonth, birthDay, birthYear]);

  useEffect(() => {
    // Smoothly snap back to the top of the page when the quiz question or stage changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, currentQuestionIndex]);

  const getZodiacInfo = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const m = month;
    const d = day;

    let sign = '';
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) sign = 'Aries';
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) sign = 'Taurus';
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) sign = 'Gemini';
    else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) sign = 'Cancer';
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) sign = 'Leo';
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) sign = 'Virgo';
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) sign = 'Libra';
    else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) sign = 'Scorpio';
    else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) sign = 'Sagittarius';
    else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) sign = 'Capricorn';
    else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) sign = 'Aquarius';
    else sign = 'Pisces';

    const ZODIAC_DATA: Record<string, any> = {
      Aries: { element: "Fire", quality: "Initiator", wisdom: "The spark of creation begins with your first step. Your fire illuminates the path for those who follow.", starCode: "IGNIS-ALPHA" },
      Taurus: { element: "Earth", quality: "Stabilizer", wisdom: "True power is found in the patience of the blossoming flower. You anchor the divine into form.", starCode: "TERRA-FIXA" },
      Gemini: { element: "Air", quality: "Messenger", wisdom: "You are the bridge between thoughts. Your words carry the frequency of dualities merged into one.", starCode: "AER-DUALIS" },
      Cancer: { element: "Water", quality: "Nurturer", wisdom: "The moon’s reflection in your heart allows for the deepest ocean of compassion to heal the world.", starCode: "AQUA-LUNA" },
      Leo: { element: "Fire", quality: "Radiant", wisdom: "Your heart is a sun. When you shine without shame, you give others permission to be glorious.", starCode: "SOLAR-REGEN" },
      Virgo: { element: "Earth", quality: "Refiner", wisdom: "Sacred geometry is found in the details. You bring heaven’s order to the earthly plane.", starCode: "TERRA-PURUS" },
      Libra: { element: "Air", quality: "Balancer", wisdom: "Justice is a harmony of the heart. You teach the world the beauty of the middle way.", starCode: "AER-LIBRA" },
      Scorpio: { element: "Water", quality: "Transmuter", wisdom: "You dive into the depths to find the pearls. Your intensity is the forge of soul evolution.", starCode: "AQUA-HIDDEN" },
      Sagittarius: { element: "Fire", quality: "Explorer", wisdom: "Truth is the only arrow worth shooting. Your quest expands the horizons of the collective mind.", starCode: "IGNIS-COSMOS" },
      Capricorn: { element: "Earth", quality: "Architect", wisdom: "The mountaintop is reached one steady step at a time. You build legacies that outlast time.", starCode: "TERRA-AETERNA" },
      Aquarius: { element: "Air", quality: "Visionary", wisdom: "The future is a memory you are bringing back to us. You carry the nectar of the collective soul.", starCode: "AER-QUANTUM" },
      Pisces: { element: "Water", quality: "Dreamer", wisdom: "You swim in the infinite ocean where all things are one. Your dreams are the blueprints of the new earth.", starCode: "AQUA-OMNIA" },
    };

    return { sign, ...ZODIAC_DATA[sign] };
  };

  const handleDownloadPDF = async () => {
    const scrollElement = document.getElementById('divine-scroll-content');
    if (!scrollElement) return;

    setIsGeneratingPDF(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // We render each page 1-6 independently if possible, or capture the long scroll
      // For this app, I'll render a hidden version of the scroll specifically for PDF
      const hiddenScroll = document.getElementById('pdf-render-container');
      if (!hiddenScroll) {
        // Fallback to current view if hidden not found
        const canvas = await html2canvas(scrollElement, {
          scale: 2,
          backgroundColor: '#020617',
          logging: false,
          useCORS: true
        });
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${userName}_Divine_Blueprint.pdf`);
      } else {
        // Prepare hidden scroll for capture - ensure it's "visible" to the browser but off-screen
        const originalLeft = hiddenScroll.style.left;
        const originalOpacity = hiddenScroll.style.opacity;
        
        hiddenScroll.style.left = '0';
        hiddenScroll.style.opacity = '1';
        
        // Give the browser a moment to layout the hidden pages
        await new Promise(r => setTimeout(r, 100));
        
        const pages = hiddenScroll.querySelectorAll('.pdf-page');
        
        for (let i = 0; i < pages.length; i++) {
          if (i > 0) pdf.addPage();
          
          const canvas = await html2canvas(pages[i] as HTMLElement, {
            scale: 2,
            backgroundColor: '#020617',
            logging: false,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 210 * 4, // More generous width for layout calc
            windowHeight: 297 * 4
          });
          const imgData = canvas.toDataURL('image/png', 1.0);
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        }
        
        hiddenScroll.style.left = originalLeft;
        hiddenScroll.style.opacity = originalOpacity;
        pdf.save(`${userName}_Divine_Blueprint.pdf`);
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback to print
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const classifyCustomResponse = async (text: string) => {
    setIsClassifying(true);
    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.result || '';
      
      // Map back to ArchetypeKey
      const found = Object.values(ArchetypeKey).find(key => 
        responseText.toLowerCase().includes(key.toLowerCase())
      );
      
      return (found as ArchetypeKey) || ArchetypeKey.VISIONARY;
    } catch (error) {
      console.error("Classification error:", error);
      return ArchetypeKey.VISIONARY; // Safe fallback
    } finally {
      setIsClassifying(false);
    }
  };

  // Sound Engine
  const playHapticSound = (type: 'light' | 'pulse' | 'success' | 'space') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'light') {
        // High quick crystal tick
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } else if (type === 'pulse') {
        // Deep resonant tone for option selection
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.25);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, ctx.currentTime);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'success') {
        // Bright divine chord
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(528, ctx.currentTime); // Solfeggio gold
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // Perfect Major Third
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        
        gain2.gain.setValueAtTime(0.07, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        
        osc.connect(gain);
        osc2.connect(gain2);
        
        gain.connect(ctx.destination);
        gain2.connect(ctx.destination);
        
        osc.start();
        osc2.start();
        osc.stop(ctx.currentTime + 0.7);
        osc2.stop(ctx.currentTime + 0.7);
      } else if (type === 'space') {
        // Swelling space frequency response
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.0);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 1.0);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.3);
      }
    } catch (e) {
      console.warn("Haptic sound block or restriction", e);
    }
  };

  const toggleFrequency = (freqStr: string) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        console.warn("AudioContext not supported in this environment.");
        return;
      }

      if (isPlaying) {
        if (oscillatorRef.current) {
          try {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
          } catch (e) {}
          oscillatorRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          try {
            audioContextRef.current.close();
          } catch (e) {}
          audioContextRef.current = null;
        }
        setIsPlaying(false);
        return;
      }

      const freq = parseInt(freqStr) || 528;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Warm & soft sound envelope (so it doesn't sound harsh)
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.4); // Smooth fade-in

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      setIsPlaying(true);

      // Auto security timeout: Stop frequency after 15 seconds to be gentle to ears
      setTimeout(() => {
        setIsPlaying(state => {
          if (state) {
            if (oscillatorRef.current) {
              try { oscillatorRef.current.stop(); } catch(e) {}
              oscillatorRef.current = null;
            }
            if (audioContextRef.current) {
              try { audioContextRef.current.close(); } catch(e) {}
              audioContextRef.current = null;
            }
            return false;
          }
          return state;
        });
      }, 15000);

    } catch (e) {
      console.error("Failed to toggle frequency synthesizer:", e);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch(e) {}
      }
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch(e) {}
      }
    };
  }, []);

  // Calculate results
  useEffect(() => {
    if (step === 'decoding') {
      const timer = setTimeout(() => {
        const counts: Record<string, number> = {};
        answers.forEach(a => {
          counts[a] = (counts[a] || 0) + 1;
        });
        
        let maxCount = 0;
        let winner = ArchetypeKey.VISIONARY;
        
        Object.entries(counts).forEach(([key, count]) => {
          if (count > maxCount) {
            maxCount = count;
            winner = key as ArchetypeKey;
          }
        });

        setResultArchetype(ARCHETYPES[winner]);
        
        if (userBirthday) {
          setZodiacInfo(getZodiacInfo(userBirthday));
        }
        
        setStep('result');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step, answers, userBirthday]);

  const handleAnswer = (archetype: ArchetypeKey) => {
    const newAnswers = [...answers, archetype];
    setAnswers(newAnswers);
    setCustomValue('');
    setShowCustomInput(false);
    setCurrentQuestionIndex(prev => prev + 1);

    // Force an immediate smooth scroll to top on step progression
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  };

  const handleSelectOption = (archetype: ArchetypeKey, idx: number) => {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(idx);
    playHapticSound('pulse');
    
    // Smooth delay for shake/glow transition
    setTimeout(() => {
      handleAnswer(archetype);
      setSelectedOptionIndex(null);
    }, 600);
  };

  const getArchetypeIcon = (key: ArchetypeKey) => {
    switch (key) {
      case ArchetypeKey.VISIONARY: return <Compass className="w-8 h-8" />;
      case ArchetypeKey.CREATOR: return <Aperture className="w-8 h-8" />;
      case ArchetypeKey.MYSTIC: return <Moon className="w-8 h-8" />;
      case ArchetypeKey.ALCHEMIST: return <Zap className="w-8 h-8" />;
      case ArchetypeKey.SOVEREIGN: return <Globe className="w-8 h-8" />;
      case ArchetypeKey.ORACLE: return <Wind className="w-8 h-8" />;
      case ArchetypeKey.EMPATH: return <Heart className="w-8 h-8" />;
    }
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-indigo-500/20 font-sans relative overflow-x-hidden">
      <StarryBackground />
      <PortalOverlay />

      {/* Premium Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-8 py-4 md:py-6 flex justify-between items-center pointer-events-none no-print"
      >
        <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-amber-500/20 flex items-center justify-center bg-[#07070d]/90 shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-xl">
            <svg 
              className="w-7 h-7 md:w-8 md:h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              {/* Outer circle */}
              <circle cx="50" cy="50" r="45" strokeWidth="2" className="opacity-90" />
              {/* Center circle */}
              <circle cx="50" cy="50" r="20" className="opacity-80" />
              {/* 6 surrounding circles intersecting the center circle at 60-degree intervals */}
              <circle cx="70" cy="50" r="20" className="opacity-60" />
              <circle cx="60" cy="67.32" r="20" className="opacity-60" />
              <circle cx="40" cy="67.32" r="20" className="opacity-60" />
              <circle cx="30" cy="50" r="20" className="opacity-60" />
              <circle cx="40" cy="32.68" r="20" className="opacity-60" />
              <circle cx="60" cy="32.68" r="20" className="opacity-60" />
              {/* Center core */}
              <circle cx="50" cy="50" r="3" fill="currentColor" className="animate-pulse" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] font-mono tracking-[0.3em] md:tracking-[0.5em] uppercase text-amber-100 font-bold leading-none">DESTINY DECODE</span>
            <span className="text-[6px] md:text-[7px] font-sans tracking-widest uppercase text-amber-500 font-semibold leading-normal mt-0.5">By Lisa Garcia Ruiz</span>
          </div>
        </div>
        <div className="hidden md:flex gap-8 pointer-events-auto">
          <span className="text-[9px] font-mono tracking-widest uppercase text-indigo-200/60 font-semibold">Vibration: Balanced</span>
          <span className="text-[9px] font-mono tracking-widest uppercase text-indigo-200/60 font-semibold">Scroll Codex: IX.IX</span>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl"
            >
              {/* High-contrast padded glassmorphic text box behind the front page introduction elements */}
              <div className="p-8 sm:p-12 md:p-16 bg-indigo-950/50 backdrop-blur-xl border border-white/10 rounded-[44px] shadow-2xl space-y-8 md:space-y-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="flex flex-col items-center gap-4 justify-center"
                >
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-indigo-500/25 bg-indigo-950/40 backdrop-blur-md shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-indigo-200">Now Aligning Star Coordinates</span>
                  </div>
                  <span className="text-sm sm:text-base font-mono font-extrabold uppercase tracking-[0.25em] text-amber-400">Presented By Lisa Garcia Ruiz</span>
                </motion.div>

                <h1 className="text-5xl sm:text-7xl md:text-[85px] lg:text-[105px] font-extrabold tracking-tight leading-[1] sm:leading-[0.95] md:leading-[0.9] bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-indigo-100 text-glow">
                  Destiny Decode <br />
                  Mini-Reading
                </h1>
                
                <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-left max-w-4xl mx-auto items-end">
                  <div className="space-y-4">
                    <p className="text-[12px] font-mono font-bold text-indigo-200 uppercase tracking-widest">Your Name</p>
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Enter Your Name..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-white border-2 border-indigo-100 rounded-2xl px-5 py-4 text-xl focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all placeholder:text-slate-400 font-semibold text-slate-950 shadow-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-6 md:space-y-8">
                    <p className="text-lg md:text-2xl text-slate-250 leading-relaxed font-bold">
                      Get immediate access to the Destiny Decode Quiz & your personal Divine Scroll Blueprint. A high-impact celestial transcription of your eternal soul-glyphs and birth alignment.
                    </p>
                    
                    <button 
                      onClick={() => { playHapticSound('success'); setStep('quiz'); }}
                      disabled={!userName}
                      className="w-full sm:w-auto group relative inline-flex items-center justify-between sm:justify-start gap-8 py-5 px-10 bg-indigo-600 text-white rounded-full hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 shadow-lg shadow-indigo-600/20 hover:bg-slate-950 cursor-pointer overflow-hidden font-bold"
                    >
                      <span className="text-base font-bold uppercase tracking-[0.15em]">Decode Your Destiny</span>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Explanations Section - How the mini reading works & our unique system */}
              <div className="max-w-4xl mx-auto mt-24 md:mt-32 text-left border-t-2 border-indigo-100/20 pt-16 md:pt-24 space-y-16">
                  {/* Padded high-readability glassmorphic card for Methodology intro section */}
                  <div className="text-center max-w-3xl mx-auto p-8 sm:p-12 md:p-14 bg-indigo-950/50 backdrop-blur-xl border border-white/10 rounded-[36px] shadow-2xl space-y-4">
                    <h2 className="text-amber-400 font-mono text-xs sm:text-sm tracking-[0.5em] uppercase font-bold">The Sacred Unification Methodology</h2>
                    <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-glow">How the Destiny Decode Works</h3>
                    <p className="text-lg text-indigo-100 italic font-bold leading-relaxed">
                      Lisa Garcia Ruiz’s unique three-fold alignment system maps the eternal architecture of your soul through ancient star-scripts and vibrational light codes.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                     {/* Card 1: Our Unique System */}
                     <div className="p-8 sm:p-10 rounded-[32px] bg-white border-2 border-indigo-100/80 shadow-md relative overflow-hidden flex flex-col justify-between text-slate-900">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-900 pointer-events-none">
                           <Compass className="w-24 h-24" />
                        </div>
                        <div className="space-y-6">
                           <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-amber-700 uppercase">Part I // The Sacred Codex System</span>
                           <h4 className="text-2xl font-extrabold text-indigo-950">Our Unique Alignment Method</h4>
                           <p className="text-slate-800 leading-relaxed font-semibold">
                             Instead of superficial fortunes, our unique methodology utilizes a three-fold celestial inquiry to transcribe your soul's original energetic signature:
                           </p>
                           <ul className="space-y-4 text-slate-800 bg-transparent">
                             <li className="flex gap-3">
                               <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-800 font-bold text-xs mt-0.5">1</div>
                               <p className="text-sm font-semibold"><strong className="text-indigo-950 font-extrabold">The Birth-Gate Coordinates:</strong> Mapping the solar gatekeepers and ancestral star-seals presiding over your entrance to this physical plane.</p>
                             </li>
                             <li className="flex gap-3">
                               <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-800 font-bold text-xs mt-0.5">2</div>
                               <p className="text-sm font-semibold"><strong className="text-indigo-950 font-extrabold">The Seven Eternal Archetypes:</strong> Tracing your essence-longing to determine which ancient archetype (Mystic, Alchemist, Sovereign, or Creator) leads your tapestry.</p>
                             </li>
                             <li className="flex gap-3">
                               <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-800 font-bold text-xs mt-0.5">3</div>
                               <p className="text-sm font-semibold"><strong className="text-indigo-950 font-extrabold">Solfeggio Sound Alignment:</strong> Sounding holy, ancient vibrations (like 432 Hz and 528 Hz) directly in your browser to anchor your transcription into your body.</p>
                             </li>
                           </ul>
                        </div>
                     </div>

                     {/* Card 2: How the Mini Reading works */}
                     <div className="p-8 sm:p-10 rounded-[32px] bg-white border-2 border-amber-100/80 shadow-md relative overflow-hidden flex flex-col justify-between text-slate-900">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-900 pointer-events-none">
                           <Moon className="w-24 h-24" />
                        </div>
                        <div className="space-y-6">
                           <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-indigo-800 uppercase">Part II // Your Initiation Loop</span>
                           <h4 className="text-2xl font-extrabold text-indigo-950">How Your Session Unfolds</h4>
                           <p className="text-slate-800 leading-relaxed font-semibold">
                             Your immediate mini-reading is structured as a series of celestial thresholds, yielding a permanent digital relic of your soul-signature:
                           </p>
                           <ol className="space-y-4 text-slate-800">
                             <li className="flex gap-3">
                               <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-800 font-mono text-[10px] font-bold mt-0.5">A</div>
                               <p className="text-sm font-semibold"><strong className="text-indigo-950 font-extrabold">Name & Birth Reflection:</strong> Establishing your presence and retrieving your original celestial astrological sign coordinates.</p>
                             </li>
                             <li className="flex gap-3">
                               <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-800 font-mono text-[10px] font-bold mt-0.5">B</div>
                               <p className="text-sm font-semibold"><strong className="text-indigo-950 font-extrabold">The Seven Inquiry Seals:</strong> Calibrating your archetype. Choose from sacred text options or enter your own custom intention writing, processed directly through our divine AI translation lens.</p>
                             </li>
                             <li className="flex gap-3">
                               <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-800 font-mono text-[10px] font-bold mt-0.5">C</div>
                               <p className="text-sm font-semibold"><strong className="text-indigo-950 font-extrabold">The 8-Page Divine Scroll:</strong> Instantly revealing your detailed gift details, daily integration ritual, and printable PDF archive.</p>
                             </li>
                           </ol>
                        </div>
                     </div>
                  </div>
              </div>

              <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-indigo-200/60 font-bold mt-16 md:mt-24 pointer-events-none select-none">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Cinematic Resolution
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest">
                  <Moon className="w-4 h-4 text-indigo-400" /> Lunar Alignment
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest">
                  <Download className="w-4 h-4 text-indigo-400" /> Archival Export
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 max-w-5xl mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-screen"
          >
            {currentQuestionIndex < QUIZ_QUESTIONS.length ? (
              <>
                <div className="w-full mb-20 text-center">
                  <motion.span 
                    key={`q-meta-${currentQuestionIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-amber-400 font-mono text-[12px] tracking-[0.5em] uppercase mb-4 block font-bold"
                  >
                    Soul Calibration {currentQuestionIndex + 1} // {QUIZ_QUESTIONS.length}
                  </motion.span>
                  <div className="h-2 w-64 bg-slate-200/20 rounded-full mx-auto overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentQuestionIndex / QUIZ_QUESTIONS.length) * 100}%` }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                  <motion.div
                    key={`q-text-${currentQuestionIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 md:space-y-8 p-8 sm:p-12 md:p-14 bg-indigo-950/50 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl text-left"
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.2] tracking-tight text-white text-glow">
                      {QUIZ_QUESTIONS[currentQuestionIndex].text}
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
                  </motion.div>

              <div className="grid gap-3 sm:gap-4 w-full">
                {!showCustomInput ? (
                  <>
                    <AnimatePresence mode="popLayout">
                      {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                        <motion.button
                          key={`q-${currentQuestionIndex}-opt-${idx}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={
                            selectedOptionIndex === idx 
                              ? { 
                                  x: [0, -8, 8, -6, 6, -4, 4, -2, 2, 0],
                                  scale: 1.03,
                                  borderColor: '#fbbf24', // amber-400
                                  boxShadow: '0 0 30px rgba(245,158,11,0.6)',
                                  backgroundColor: '#ffffff'
                                }
                              : selectedOptionIndex !== null
                                ? { opacity: 0.2, scale: 0.95 }
                                : { opacity: 1, y: 0 }
                          }
                          transition={
                            selectedOptionIndex === idx
                              ? { duration: 0.5, ease: "easeInOut" }
                              : selectedOptionIndex !== null
                                ? { duration: 0.3 }
                                : { delay: idx * 0.1 }
                          }
                          onClick={() => handleSelectOption(option.archetype, idx)}
                          disabled={selectedOptionIndex !== null}
                          className="w-full text-left p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border-2 border-slate-200/80 bg-white/95 hover:border-indigo-600 hover:bg-indigo-50/20 hover:scale-[1.01] transition-all group backdrop-blur-xl relative overflow-hidden shadow-sm disabled:cursor-not-allowed"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="text-xl sm:text-2xl md:text-[26px] text-slate-900 group-hover:text-indigo-950 transition-colors font-extrabold italic relative z-10 block pr-8 leading-relaxed">"{option.text}"</span>
                          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                            <ChevronRight className="w-6 h-6 text-indigo-600" />
                          </div>
                        </motion.button>
                      ))}
                    </AnimatePresence>
                    <button
                      onClick={() => { playHapticSound('light'); setShowCustomInput(true); }}
                      className="w-full text-center p-4 rounded-full border border-indigo-500/20 bg-indigo-950/20 text-indigo-200 font-mono text-[10px] uppercase font-bold tracking-[0.25em] mt-8 hover:bg-indigo-500/10 hover:text-white hover:border-indigo-500/40 transition-all cursor-pointer"
                    >
                      + Custom Alignment Vector
                    </button>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <textarea 
                      autoFocus
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      placeholder="Describe your internal resonance..."
                      className="w-full h-48 bg-white border border-indigo-200 rounded-[32px] p-8 text-xl focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 backdrop-blur-xl transition-all placeholder:text-slate-400 font-semibold leading-relaxed text-slate-900 shadow-inner"
                    />
                    <div className="flex gap-4">
                      <button 
                        onClick={() => { playHapticSound('light'); setShowCustomInput(false); }}
                        className="px-8 py-5 rounded-full text-white border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/40 hover:border-indigo-500/50 transition-all text-sm uppercase tracking-widest font-mono font-bold cursor-pointer"
                      >
                        Return
                      </button>
                      <button 
                        disabled={!customValue.trim() || isClassifying}
                        onClick={async () => {
                          playHapticSound('success');
                          const archetype = await classifyCustomResponse(customValue);
                          handleAnswer(archetype);
                        }}
                        className="flex-1 px-8 py-5 rounded-full bg-indigo-600 text-white font-bold hover:bg-slate-950 transition-all shadow-xl active:scale-95 disabled:opacity-40 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                      >
                        {isClassifying ? (
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        Decode Vector
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl text-center space-y-12 md:space-y-16"
          >
             <div className="space-y-4 md:space-y-6">
                <span className="text-amber-400 font-mono text-[12px] tracking-[0.5em] uppercase block font-bold">Celestial Birth-Gate Retrieval</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white text-glow">Arrival Context</h2>
                <p className="text-lg md:text-2xl text-indigo-200 font-medium italic max-w-lg mx-auto px-4">When did your essence first interact with the physical plane? (Birthday)</p>
             </div>
             
             <div className="max-w-xl mx-auto px-4">
                <div className="grid grid-cols-3 gap-3 md:gap-4 text-left">
                  {/* Month Selection */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] md:text-xs font-mono font-bold text-amber-400 uppercase tracking-widest pl-1">
                      Month
                    </label>
                    <div className="relative">
                      <select
                        value={birthMonth}
                        aria-label="Birth Month"
                        onChange={(e) => { playHapticSound('light'); setBirthMonth(e.target.value); }}
                        className="w-full bg-[#0d0c15]/90 text-white border border-indigo-500/30 hover:border-indigo-500/50 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all px-3 md:px-4 py-4 rounded-2xl font-semibold shadow-lg focus:outline-none appearance-none cursor-pointer text-sm sm:text-base text-center"
                      >
                        <option value="" className="bg-[#0c0c16] text-slate-400 text-left">Select</option>
                        {MONTHS.map((m) => (
                          <option key={m.value} value={m.value} className="bg-[#0c0c16] text-white text-left">
                            {m.name}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-indigo-400/70">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Day Selection */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] md:text-xs font-mono font-bold text-amber-400 uppercase tracking-widest pl-1">
                      Day
                    </label>
                    <div className="relative">
                      <select
                        value={birthDay}
                        aria-label="Birth Day"
                        onChange={(e) => { playHapticSound('light'); setBirthDay(e.target.value); }}
                        className="w-full bg-[#0d0c15]/90 text-white border border-indigo-500/30 hover:border-indigo-500/50 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all px-3 md:px-4 py-4 rounded-2xl font-semibold shadow-lg focus:outline-none appearance-none cursor-pointer text-sm sm:text-base text-center"
                      >
                        <option value="" className="bg-[#0c0c16] text-slate-400 text-left">Select</option>
                        {DAYS.map((d) => (
                          <option key={d} value={d} className="bg-[#0c0c16] text-white text-left">
                            {Number(d)}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-indigo-400/70">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Year Selection */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] md:text-xs font-mono font-bold text-amber-400 uppercase tracking-widest pl-1">
                      Year
                    </label>
                    <div className="relative">
                      <select
                        value={birthYear}
                        aria-label="Birth Year"
                        onChange={(e) => { playHapticSound('light'); setBirthYear(e.target.value); }}
                        className="w-full bg-[#0d0c15]/90 text-white border border-indigo-500/30 hover:border-indigo-500/50 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all px-3 md:px-4 py-4 rounded-2xl font-semibold shadow-lg focus:outline-none appearance-none cursor-pointer text-sm sm:text-base text-center"
                      >
                        <option value="" className="bg-[#0c0c16] text-slate-400 text-left">Select</option>
                        {YEARS.map((y) => (
                          <option key={y} value={y} className="bg-[#0c0c16] text-white text-left">
                            {y}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-indigo-400/70">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
             </div>

             <button 
              onClick={() => { playHapticSound('space'); setStep('decoding'); }}
              disabled={!userBirthday}
              className="px-12 md:px-16 py-5 md:py-6 rounded-full bg-indigo-600 text-white font-extrabold hover:bg-slate-950 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 shadow-lg shadow-indigo-600/20 uppercase tracking-[0.2em] text-xs cursor-pointer"
             >
               Open Celestial Scroll
             </button>
          </motion.div>
        )}
      </motion.div>
    )}

        {step === 'decoding' && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02020a]">
            <div className="noise-overlay absolute inset-0 z-0 opacity-[0.05]" />
            <StarryBackground />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative w-80 h-80 flex items-center justify-center"
            >
              <div className="absolute inset-0 border-2 border-indigo-200/20 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 border border-indigo-300/10 rounded-full animate-spin-slow [animation-direction:reverse]" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-12 border-2 border-amber-500/10 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />
              
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-center space-y-2 relative z-10"
              >
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-indigo-200 text-glow tracking-[0.5em] ml-4">TRANSCRIBING</div>
                <div className="text-[12px] font-mono font-bold text-amber-400 uppercase tracking-[0.8em]">Original Star-Code</div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12 space-y-4 text-center max-w-sm relative z-10"
            >
              <div className="flex justify-center gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`decoding-dot-${i}`}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                  />
                ))}
              </div>
              <p className="text-indigo-200/80 font-mono text-[11px] font-bold uppercase tracking-widest">
                Assembling your sacred blueprint...
              </p>
            </motion.div>
          </div>
        )}

        {step === 'result' && resultArchetype && (
          <motion.div 
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col gap-10"
          >
            {/* Main Premium Dashboard Mode Switcher */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 border border-white/10 rounded-[28px] p-4.5 backdrop-blur-xl no-print shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                <span className="text-xs font-mono tracking-widest text-indigo-200/80 font-bold uppercase font-black">Membership Activated</span>
              </div>
              <div className="flex bg-indigo-950/40 p-1.5 rounded-[20px] border border-white/15 w-full sm:w-auto">
                <button
                  onClick={() => { playHapticSound('light'); setDashboardMode('scroll'); }}
                  className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${dashboardMode === 'scroll' ? 'bg-[#fdfcf7] text-[#1e1b4b] shadow-sm' : 'text-indigo-200/50 hover:text-indigo-100 font-bold'}`}
                >
                  📜 Divine Scroll Codex
                </button>
                <button
                  onClick={() => { playHapticSound('space'); setDashboardMode('sanctuary'); }}
                  className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${dashboardMode === 'sanctuary' ? 'bg-amber-500 text-[#1e1b4b] shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'text-indigo-200/50 hover:text-indigo-100 font-bold'}`}
                >
                  ✨ Daily Member Sanctuary
                </button>
              </div>
            </div>

            {dashboardMode === 'scroll' ? (
              <div className="w-full flex flex-col lg:flex-row gap-12">
            {/* Navigation / TOC for mobile */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 scrollbar-hide no-print">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(p => (
                <button 
                  key={`mob-nav-${p}`} 
                  onClick={() => { playHapticSound('light'); setScrollPage(p); }}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest transition-all ${scrollPage === p ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-indigo-200 text-indigo-950/80 shadow-sm'}`}
                >
                  Page {p}
                </button>
              ))}
              <button 
                onClick={() => { playHapticSound('space'); handleDownloadPDF(); }}
                className="flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-600 text-white border border-amber-600 flex items-center gap-2 shadow-sm"
              >
                <Download className="w-3 h-3" /> PDF
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="hidden lg:flex flex-col gap-6 w-80 pt-12 no-print">
              <div className="sticky top-32">
                <div className="mb-12">
                  <h3 className="text-sm font-mono text-amber-400 tracking-[0.4em] uppercase mb-2 font-bold">Scribe Credentials</h3>
                  <p className="text-2xl font-semibold text-indigo-100 italic">Celestial Resonance: {resultArchetype.signature.frequency}</p>
                </div>

                <nav className="space-y-6">
                    {[
                      { id: 1, label: "Core Blueprint", sub: "Original Star-Code" },
                      { id: 2, label: "Sacred Essence", sub: "Archetype Revelation" },
                      { id: 3, label: "Celestial Harmonics", sub: "Tonal Resonance" },
                      { id: 4, label: "Stellar Mapping", sub: "Birth astronomy signs" },
                      { id: 5, label: "Activation Seals", sub: "Celestial Codes" },
                      { id: 6, label: "Direct Revelation", sub: "Oracle Prophecy" },
                      { id: 7, label: "Sacred Integration", sub: "Essence Tuning" },
                      { id: 8, label: "Evolutionary Pathways", sub: "Soul Expansion" },
                    ].map(p => (
                    <button 
                      key={`side-nav-${p.id}`}
                      onClick={() => { playHapticSound('light'); setScrollPage(p.id); }}
                      className={`group relative flex flex-col gap-1 w-full text-left transition-all ${scrollPage === p.id ? 'translate-x-4' : 'hover:translate-x-2'}`}
                    >
                      <div className={`absolute -left-6 top-0 bottom-0 w-1 transition-all duration-500 ${scrollPage === p.id ? 'bg-amber-400 scale-y-100' : 'bg-indigo-100/40 scale-y-0 group-hover:scale-y-50'}`} />
                      <span className={`text-xs font-mono uppercase tracking-widest font-bold ${scrollPage === p.id ? 'text-amber-400' : 'text-[#f0ece1]/45'}`}>0{p.id}</span>
                      <span className={`text-lg transition-colors font-bold ${scrollPage === p.id ? 'text-[#fdfcf7] font-extrabold text-glow' : 'text-[#f0ece1]/70 font-semibold group-hover:text-[#fdfcf7]'}`}>{p.label}</span>
                      <span className="text-[10px] text-indigo-200/40 font-bold uppercase tracking-widest">{p.sub}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-20">
                  <button 
                    onClick={() => { playHapticSound('space'); handleDownloadPDF(); }}
                    className="w-full flex items-center justify-between p-6 rounded-3xl bg-indigo-600 text-white hover:bg-slate-950 hover:scale-105 active:scale-95 transition-all shadow-md shadow-indigo-600/10 font-bold"
                  >
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-extrabold">Export Archival PDF</span>
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* The "Scroll" Pages */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  id="divine-scroll-content"
                  key={scrollPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="min-h-[600px] md:min-h-[700px] border-2 border-indigo-100 bg-white/95 shadow-[0_30px_70px_rgba(79,70,229,0.06)] rounded-[32px] md:rounded-[40px] p-6 sm:p-8 md:p-16 relative overflow-hidden text-slate-900"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    {getArchetypeIcon(resultArchetype.key)}
                  </div>
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.04]" 
                    style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/sacred-geometry.png")` }} 
                  />

                  {/* Page Content Rendering */}
                  {scrollPage === 1 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12 relative">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-16 relative"
                      >
                        <div className="absolute inset-0 blur-[100px] bg-indigo-500/10 rounded-full" />
                        <div className="absolute inset-0 blur-[40px] bg-amber-500/5 rounded-full" />
                        
                        <div 
                          className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-indigo-100 flex items-center justify-center relative z-10 backdrop-blur-3xl bg-indigo-50/40 shadow-md overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                          <div className="text-indigo-400 opacity-25 animate-spin-slow scale-150">
                            {getArchetypeIcon(resultArchetype.key)}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-32 h-32 border border-indigo-200 rounded-full animate-ping [animation-duration:4s]" />
                             <div className="absolute scale-[2] text-indigo-700">
                                {getArchetypeIcon(resultArchetype.key)}
                             </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div className="max-w-2xl">
                        <motion.h2 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="text-[12px] font-mono text-amber-700 tracking-[0.8em] uppercase mb-8 font-bold"
                        >
                          Celestial Scroll Revealed
                        </motion.h2>
                        
                        <motion.h3 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-4xl sm:text-5xl md:text-[80px] font-extrabold tracking-tight mb-8 md:mb-12 leading-[1.0] text-indigo-950"
                        >
                          Soul Signature: <br />
                          {resultArchetype.key}
                        </motion.h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 text-left border-t border-indigo-100 pt-8 md:pt-12">
                          <div>
                            <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-2 md:mb-4">Frequency Holder</p>
                            <p className="text-2xl md:text-3xl text-slate-900 font-extrabold italic">{userName}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-2 md:mb-4">Celestial Signature</p>
                            <p className="text-2xl md:text-3xl text-indigo-800 font-extrabold italic">{resultArchetype.signature.frequency}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {scrollPage === 2 && (
                    <div className="h-full flex flex-col justify-center py-6">
                      <div className="max-w-5xl md:max-w-6xl mx-auto w-full">
                        <h2 className="text-[12px] font-mono text-amber-700 tracking-[0.6em] uppercase mb-8 font-bold">Divine Essence Transcription</h2>
                        
                        <div className="space-y-12 text-left">
                          {/* Title & Large Description */}
                          <div className="space-y-6">
                            <h3 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-indigo-950 italic">The {resultArchetype.key}</h3>
                            <p className="text-2xl sm:text-3xl md:text-[34px] text-indigo-950 font-extrabold italic leading-relaxed border-l-8 border-amber-400 pl-8 py-6 my-8 bg-amber-50/50 rounded-r-[32px] pr-8 shadow-sm">
                              "{resultArchetype.description}"
                            </p>
                          </div>
                          
                          {/* Bento Grid layout with larger text and high-contrast readable options */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Primary Gift */}
                            <div className="group p-8 rounded-[36px] bg-emerald-50/70 border-2 border-emerald-100 shadow-sm transition-all hover:bg-emerald-50/90 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-4 mb-6">
                                  <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-700">
                                    <Sparkles className="w-6 h-6" />
                                  </div>
                                  <h4 className="text-[11px] font-mono text-emerald-900 font-extrabold uppercase tracking-widest">Primary Gift</h4>
                                </div>
                                <p className="text-xl md:text-2xl text-slate-900 font-extrabold leading-relaxed">{resultArchetype.gift}</p>
                              </div>
                            </div>
                            
                            {/* Shadow Duality */}
                            <div className="group p-8 rounded-[36px] bg-rose-50/70 border-2 border-rose-100 shadow-sm transition-all hover:bg-rose-50/95 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-4 mb-6">
                                  <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-700">
                                    <Moon className="w-6 h-6" />
                                  </div>
                                  <h4 className="text-[11px] font-mono text-rose-900 font-extrabold uppercase tracking-widest">Shadow Duality</h4>
                                </div>
                                <p className="text-xl md:text-2xl text-slate-850 leading-relaxed font-bold italic">{resultArchetype.shadow}</p>
                              </div>
                            </div>

                            {/* Growth Path */}
                            <div className="group p-8 rounded-[36px] bg-amber-50/70 border-2 border-amber-200 shadow-sm transition-all hover:bg-amber-50/95 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-4 mb-6">
                                  <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-750 animate-pulse">
                                    <TrendingUp className="w-6 h-6" />
                                  </div>
                                  <h4 className="text-[11px] font-mono text-amber-900 font-extrabold uppercase tracking-widest">Evolution Vector</h4>
                                </div>
                                <p className="text-xl md:text-2xl text-slate-900 leading-relaxed font-extrabold">{resultArchetype.growthPath}</p>
                              </div>
                            </div>
                          </div>

                          {/* Full Width Major Inspired Life Changing Advice Card */}
                          <div className="p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-indigo-50/80 via-white to-amber-50/70 border-4 border-indigo-200/60 shadow-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 text-indigo-500/10 pointer-events-none select-none">
                              <Sparkles className="w-32 h-32 animate-spin-slow" />
                            </div>
                            <div className="relative z-10 space-y-6">
                              <div className="flex items-center gap-4">
                                <span className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-700">
                                  <Sparkles className="w-6 h-6" />
                                </span>
                                <h4 className="text-[12px] font-mono text-indigo-950 font-extrabold uppercase tracking-[0.25em]">Life-Changing Growth Advice</h4>
                              </div>
                              <p className="text-2xl sm:text-3xl md:text-[34px] leading-[1.6] text-slate-900 font-black italic">
                                "{resultArchetype.lifeChangingAdvice}"
                              </p>
                              <div className="pt-4 border-t border-indigo-100 flex items-center justify-between">
                                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold">Integration Practice: Read Daily for 21 Days</span>
                                <span className="text-[10px] font-mono text-indigo-900 font-extrabold uppercase tracking-wider bg-indigo-100/60 px-3 py-1 rounded-full">Source Decoded</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {scrollPage === 3 && (
                    <div className="flex flex-col h-full justify-center py-8">
                      <div className="max-w-4xl">
                        <h2 className="text-[12px] font-mono text-amber-700 tracking-[0.6em] uppercase mb-8 md:mb-12 font-bold">Celestial Harmonic Vibrations</h2>
                        
                        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                          <div className="relative max-w-[280px] mx-auto md:max-w-none">
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                              className="w-full aspect-square border border-indigo-100/40 rounded-full flex items-center justify-center p-8 md:p-12"
                            >
                               <div className="w-full h-full border border-indigo-500/15 rounded-full scale-90 border-dashed" />
                               <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
                                 <Sparkles className="w-32 h-32 md:w-48 md:h-48 text-indigo-600" />
                               </div>
                               <div className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent,_rgba(79,70,229,0.06),_transparent)] rounded-full animate-spin-slow" />
                            </motion.div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                              <span className="text-4xl md:text-6xl font-extrabold mb-2 text-indigo-950">{resultArchetype.signature.frequency}</span>
                              <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-indigo-800 font-bold">Hz Resonance</span>
                            </div>
                          </div>

                          <div className="space-y-6 md:space-y-8">
                            {[
                              { label: "Radiant Ray", value: resultArchetype.signature.color },
                              { label: "Elemental Core", value: resultArchetype.signature.element },
                              { label: "Geometric Fractal", value: resultArchetype.signature.symbol },
                            ].map((item, idx) => (
                              <motion.div 
                                key={item.label}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="border-b border-indigo-100 pb-4 md:pb-6"
                              >
                                <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-slate-500 font-bold block mb-2">{item.label}</span>
                                <span className="text-xl md:text-3xl font-bold text-indigo-950 italic">{item.value}</span>
                              </motion.div>
                            ))}
                            <div className="p-6 md:p-8 rounded-[24px] md:rounded-3xl bg-amber-50 border-2 border-amber-200/50 shadow-sm">
                               <p className="text-xs md:text-sm text-amber-900 leading-relaxed italic font-mono uppercase tracking-wider font-semibold text-center">
                                 "Your activation mantra: {resultArchetype.signature.mantra}"
                               </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {scrollPage === 4 && (
                    <div className="h-full flex flex-col justify-center py-8">
                      <div className="max-w-4xl">
                        <h2 className="text-[12px] font-mono text-amber-700 tracking-[0.6em] uppercase mb-8 md:mb-12 font-bold">Cosmic Coordinate Retrieval</h2>

                       {zodiacInfo ? (
                         <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="p-8 md:p-10 rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-indigo-50/60 to-amber-50/50 border-2 border-indigo-100 shadow-md flex flex-col items-center text-center">
                               <Sparkles className="w-12 h-12 md:w-20 md:h-20 text-amber-600 mb-4 md:mb-6 animate-spin-slow" />
                               <h4 className="text-3xl md:text-4xl font-extrabold mb-1 md:mb-2 text-indigo-950">{zodiacInfo.sign}</h4>
                               <p className="text-[12px] font-mono text-amber-800 font-extrabold uppercase tracking-widest">{zodiacInfo.element} Element • {zodiacInfo.quality}</p>
                            </div>
                            <div className="space-y-6 md:space-y-8">
                               <div>
                                  <h4 className="text-[11px] font-mono text-indigo-900 font-bold uppercase tracking-widest mb-2">Sacred Wisdom</h4>
                                  <p className="text-xl md:text-2xl font-semibold italic text-slate-850 leading-relaxed">"{zodiacInfo.wisdom}"</p>
                               </div>
                               <div>
                                  <h4 className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-widest mb-2">Star-Code Hash</h4>
                                  <p className="text-lg sm:text-xl md:text-2xl font-mono text-indigo-950/80 font-bold tracking-[0.15em] break-all bg-indigo-50/40 p-4 rounded-2xl border border-indigo-100/60">{zodiacInfo.starCode}</p>
                               </div>
                            </div>
                         </div>
                       ) : (
                         <div className="text-xl italic text-slate-400"> celestial calculations missing... </div>
                       )}
                      </div>
                    </div>
                  )}

                  {scrollPage === 5 && (
                    <div className="h-full flex flex-col justify-center py-8">
                      <div className="max-w-5xl">
                        <h2 className="text-[12px] font-mono text-amber-700 tracking-[0.6em] uppercase mb-8 md:mb-12 font-bold">Celestial Star-Codes</h2>
                      
                        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                          <div className="lg:col-span-2 space-y-8 md:space-y-12">
                            <p className="text-xl md:text-3xl font-semibold leading-relaxed text-slate-850">
                              The following star-script configurations have been recorded for your 
                              current evolutionary cycle.
                            </p>
                            <div className="flex flex-wrap gap-3 md:gap-6">
                              {resultArchetype.activationCodes.map((code, i) => (
                                <motion.div 
                                  key={`main-code-${code}-${i}`}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl bg-indigo-50/60 border-2 border-indigo-100 text-indigo-950 text-sm md:text-lg font-mono font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase hover:border-indigo-600 hover:bg-slate-900 hover:text-white transition-all cursor-crosshair shadow-sm"
                                >
                                  {code}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                                             <div className="bg-indigo-50 border-2 border-indigo-200/50 rounded-[32px] p-6 md:p-10 flex flex-col justify-between group shadow-sm">
                              <div>
                                <Zap className="w-8 h-8 md:w-10 md:h-10 text-amber-600 mb-6 md:mb-8 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl md:text-2xl font-extrabold text-indigo-950 mb-4">Activation Ritual</h4>
                                <p className="text-slate-800 leading-relaxed font-semibold text-base md:text-lg">
                                  Place your index finger on your heart. Breathe into the {resultArchetype.signature.color} light. 
                                  Whisper your mantra once to seal your alignment.
                                </p>
                              </div>
                              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-indigo-200/60">
                                 <button 
                                   onClick={() => { playHapticSound('light'); toggleFrequency(resultArchetype.signature.frequency); }}
                                   className={`w-full py-4 rounded-full border-2 transition-all flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest font-mono font-extrabold cursor-pointer ${isPlaying ? 'bg-amber-600 text-white border-amber-600' : 'bg-transparent text-indigo-900 border-indigo-200 hover:bg-indigo-50'}`}
                                 >
                                    {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                                    {isPlaying ? "Frequency Active" : "Initialize Sound Activation"}
                                 </button>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {scrollPage === 6 && (
                    <div className="h-full flex flex-col justify-center py-8">
                       <div className="max-w-4xl">
                        <h2 className="text-[12px] font-mono text-amber-700 tracking-[0.6em] uppercase mb-8 md:mb-12 font-bold">Direct Source Transmission</h2>

                        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
                           <div className="perspective-1000">
                             <motion.div 
                               onClick={() => { playHapticSound('light'); setIsOracleFlipped(!isOracleFlipped); }}
                               className="w-64 sm:w-72 h-[400px] sm:h-[450px] cursor-pointer preserve-3d relative"
                               animate={{ rotateY: isOracleFlipped ? 180 : 0 }}
                               transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
                             >
                                {/* Card Front */}
                                <div className="absolute inset-0 w-full h-full backface-hidden rounded-[32px] sm:rounded-[40px] border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100/40 overflow-hidden flex flex-col items-center justify-center p-8 group shadow-md bg-white">
                                   <div className="absolute inset-0 noise-overlay opacity-[0.05]" />
                                   <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-indigo-200 mb-6 sm:mb-8 flex items-center justify-center group-hover:scale-110 transition-transform bg-indigo-50/50">
                                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
                                   </div>
                                   <p className="text-[12px] font-mono font-bold tracking-[0.4em] text-indigo-900/60 uppercase mb-4">Stellar Deck</p>
                                   <div className="w-12 h-0.5 bg-indigo-200" />
                                   <p className="mt-8 text-[11px] font-mono uppercase font-bold tracking-widest text-indigo-900 text-center">Tap to Transcribe Glyph</p>
                                </div>

                                {/* Card Back */}
                                <div className="absolute inset-0 w-full h-full backface-hidden rounded-[32px] sm:rounded-[40px] border-2 border-amber-300 bg-amber-50 p-8 sm:p-10 flex flex-col items-center justify-center text-center rotate-y-180 shadow-md">
                                   <div className="absolute inset-0 bg-amber-200/[0.1] blur-3xl rounded-full" />
                                   <div className="text-amber-800 opacity-20 scale-125 sm:scale-150 mb-8 sm:mb-12">
                                      {getArchetypeIcon(resultArchetype.key)}
                                   </div>
                                   <h4 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 mb-4 sm:mb-6 tracking-tight">The Star-Glyph</h4>
                                   <div className="w-8 h-0.5 bg-amber-500/50 mb-6 sm:mb-8" />
                                   <p className="text-base sm:text-lg text-amber-950 font-bold leading-relaxed italic">
                                     Shift your perspective. The obstacle is the portal.
                                   </p>
                                </div>
                             </motion.div>
                           </div>

                           <div className="w-full flex-1 space-y-8 md:space-y-12">
                               <div>
                                 <h3 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-indigo-950">
                                   Your Oracle <br /> Transmission
                                 </h3>
                               </div>
                               <div className="p-8 md:p-12 rounded-[40px] bg-gradient-to-br from-indigo-50 via-white to-amber-50/30 border-2 border-indigo-100 italic text-2xl sm:text-3xl md:text-[36px] font-black text-indigo-950 leading-relaxed shadow-md">
                                 "{resultArchetype.oracleMessage.message}"
                               </div>
                                <p className="text-slate-500 font-bold uppercase tracking-widest">Timestamp: {new Date().toLocaleTimeString()} // Scroll Registered</p>
                             </div>
                          </div>
                       </div>
                     </div>
                  )}

                  {scrollPage === 7 && (
                    <div className="h-full flex flex-col justify-center py-8">
                      <div className="max-w-4xl">
                        <h2 className="text-[12px] font-mono text-amber-700 tracking-[0.6em] uppercase mb-8 md:mb-12 font-bold">Sacred Integration</h2>

                        <div className="grid md:grid-cols-2 gap-8 md:gap-20">
                          <div className="space-y-4 md:space-y-6">
                            {resultArchetype.ritual.map((step, i) => (
                              <motion.div 
                                key={`ritual-step-${i}`}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex items-start gap-4 md:gap-6 p-6 md:p-8 rounded-[32px] bg-indigo-50/50 border-2 border-indigo-100/80 shadow-md transition-all hover:bg-indigo-100/30 text-left"
                              >
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 text-white font-mono text-sm font-black shadow-sm">
                                  {i + 1}
                                </div>
                                <p className="text-xl md:text-2xl text-slate-900 leading-[1.6] font-extrabold italic">
                                  {step}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex flex-col gap-8 md:gap-10">
                            <div className="p-8 md:p-12 rounded-[40px] md:rounded-[60px] bg-gradient-to-br from-indigo-50/80 to-indigo-50/20 border-2 border-indigo-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
                               <motion.div 
                                 animate={{ 
                                   scale: [1, 1.2, 1],
                                   opacity: [0.1, 0.3, 0.1]
                                 }}
                                 transition={{ duration: 8, repeat: Infinity }}
                                 className="absolute inset-0 bg-indigo-150/40 blur-[100px]"
                               />
                               <div className="relative z-10">
                                 <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-indigo-200 bg-white flex items-center justify-center mb-6 md:mb-8 mx-auto">
                                   <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-indigo-600 animate-ping" />
                                 </div>
                                 <span className="text-[10px] font-mono text-indigo-900 font-bold uppercase tracking-[0.3em] block mb-4">Essence Tuning</span>
                                 <p className="text-xl md:text-2xl text-slate-900 font-extrabold mb-6 md:mb-8 italic">"Inhale Expansion // Exhale Authority"</p>
                                 
                                 <button 
                                   onClick={() => { playHapticSound('light'); toggleFrequency(resultArchetype.signature.frequency); }}
                                   className={`px-6 md:px-8 py-3.5 md:py-4 rounded-full border-2 transition-all text-[10px] font-mono font-bold uppercase tracking-[0.2em] cursor-pointer ${isPlaying ? 'bg-amber-600 text-white border-amber-600 shadow-md' : 'bg-white text-indigo-900 border-indigo-200 hover:bg-slate-900 hover:text-white'}`}
                                 >
                                   {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse mr-2 inline" /> : <Volume2 className="w-4 h-4 mr-2 inline" />}
                                   {isPlaying ? "Frequency Flowing" : "Activate Frequency Loop"}
                                 </button>
                               </div>
                            </div>

                            <div className="p-6 md:p-8 rounded-[28px] bg-amber-50 border border-amber-100 shadow-sm">
                               <h4 className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-widest mb-4">Archival Note</h4>
                               <p className="text-sm text-slate-700 leading-relaxed italic font-semibold">
                                 Export your Divine Scroll as a PDF to preserve these frequencies. Return to this ritual for 21 days to fully anchor the celestial alignment.
                               </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-12 md:mt-20 p-8 md:p-12 text-center rounded-[40px] md:rounded-[60px] bg-indigo-50/50 border-2 border-indigo-100 backdrop-blur-3xl shadow-sm">
                           <p className="text-xl md:text-3xl font-bold text-indigo-950 mb-8 md:mb-12 italic leading-relaxed">
                             "You have been decoded, beloved star. <br className="hidden sm:block" /> Walk with the knowing that your blueprint is alive and evolving."
                           </p>
                           <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                              <button 
                                onClick={() => { playHapticSound('space'); handleDownloadPDF(); }}
                                className="w-full sm:w-auto px-10 py-5 rounded-full bg-amber-600 text-white font-bold hover:bg-slate-950 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer shadow-md"
                              >
                                {isGeneratingPDF ? (
                                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                  <Download className="w-5 h-5" />
                                )}
                                <span className="uppercase tracking-widest text-[10px] font-bold">{isGeneratingPDF ? "Generating..." : "Archive Scroll (PDF)"}</span>
                              </button>
                              
                              <button 
                                onClick={() => { playHapticSound('light'); setScrollPage(8); }}
                                className="w-full sm:w-auto px-10 py-5 rounded-full bg-indigo-600 text-white font-bold hover:bg-slate-950 transition-all active:scale-95 uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 cursor-pointer shadow-md"
                              >
                                <span>Continue To Expansion</span>
                                <ChevronRight className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {scrollPage === 8 && (
                    <div className="h-full flex flex-col justify-center py-8">
                      <div className="max-w-4xl mx-auto w-full">
                        <div className="text-center mb-12">
                          <h2 className="text-[12px] font-mono font-bold text-amber-700 tracking-[0.6em] uppercase mb-4">Evolutionary Paths</h2>
                          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-950 mb-6 font-bold">Your Next Evolution</h3>
                          <p className="text-xl text-slate-700 font-bold italic max-w-2xl mx-auto">
                            The journey of the {resultArchetype.key} is just beginning. Choose your vector of expansion.
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Upsell 1 */}
                          <div className="group relative p-8 rounded-[40px] bg-indigo-50/70 border-2 border-indigo-200 hover:border-indigo-400 shadow-sm transition-all flex flex-col justify-between overflow-hidden bg-white">
                            <div className="absolute top-6 right-6 z-10">
                              <span className="px-3.5 py-1.5 rounded-full bg-amber-600 text-[10px] font-extrabold text-white uppercase tracking-widest">Most Transformative</span>
                            </div>
                            <div>
                              <div className="w-12 h-12 rounded-full bg-indigo-100/80 flex items-center justify-center mb-6 border border-indigo-200">
                                <Sparkles className="w-6 h-6 text-amber-600" />
                              </div>
                              <h4 className="text-xs font-mono font-bold text-indigo-800 uppercase tracking-widest mb-2">8-Week Immersive</h4>
                              <h5 className="text-2xl font-extrabold text-indigo-950 mb-4">The Destiny Portal Experience™</h5>
                              <p className="text-slate-800 font-semibold leading-relaxed mb-8">
                                The full initiatory journey. 8 weeks of live calls, energy clearings, and communal evolution to recode your entire energetic architecture.
                              </p>
                            </div>
                            <div>
                               <a 
                                 href="https://link.fastpaydirect.com/payment-link/69e649cf557558e89e52139e"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="w-full py-4 rounded-full bg-indigo-600 text-white text-center font-bold text-[11px] uppercase tracking-widest block hover:bg-slate-950 hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                               >
                                 Access The Portal
                               </a>
                            </div>
                          </div>
                          
                          {/* Upsell 2 */}
                          <div className="group relative p-8 rounded-[40px] bg-amber-50/70 border-2 border-amber-200 hover:border-amber-300 transition-all flex flex-col justify-between shadow-sm bg-white">
                            <div className="absolute top-6 right-6 z-10">
                              <span className="px-3.5 py-1.5 rounded-full bg-indigo-600 text-[10px] font-extrabold text-white uppercase tracking-widest">Premium Session</span>
                            </div>
                            <div>
                               <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-6 border border-amber-200">
                                 <Heart className="w-6 h-6 text-amber-700 font-bold" />
                               </div>
                               <h4 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest mb-2">VIP 1:1 Reading</h4>
                               <h5 className="text-2xl font-extrabold text-indigo-950 mb-4">VIP 90 Minute Reading</h5>
                               <p className="text-slate-800 font-semibold leading-relaxed mb-8">
                                 Premium 90-minute 1:1 VIP astrology reading. Direct access to your Akashic records and strategic alignment for your business & heart.
                               </p>
                            </div>
                            <div>
                               <a 
                                 href="https://link.fastpaydirect.com/payment-link/69f284d58e7406bd4d4a4409"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="w-full py-4 rounded-full bg-amber-600 text-white text-center font-bold text-[11px] uppercase tracking-widest block hover:bg-slate-950 hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                               >
                                 Book VIP Space
                               </a>
                            </div>
                          </div>
                        </div>

                        <div className="mt-16 text-center space-y-4">
                           <p className="text-slate-500 font-mono text-[11px] font-bold uppercase tracking-[0.4em]">Have any questions?</p>
                           <a 
                             href="https://www.instagram.com/thecosmictemple_/"
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-3 text-indigo-800 hover:text-indigo-950 transition-colors group font-bold bg-indigo-50/50 hover:bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100 shadow-sm"
                           >
                             <span className="text-lg font-extrabold text-indigo-900">Message me on Instagram @thecosmictemple_</span>
                             <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </a>
                        </div>
                      </div>
                    </div>
                  )}

                      {/* Navigation Arrows */}
                      <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 flex gap-3 md:gap-4 no-print">
                        {scrollPage > 1 && (
                          <button 
                            onClick={() => { playHapticSound('light'); setScrollPage(p => p - 1); }}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-indigo-200 flex items-center justify-center hover:bg-indigo-950 hover:text-white hover:border-indigo-950 transition-all bg-white text-indigo-950 shadow-sm cursor-pointer"
                          >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 font-bold" />
                          </button>
                        )}
                        {scrollPage < 8 && (
                          <button 
                            onClick={() => { playHapticSound('light'); setScrollPage(p => p + 1); }}
                            className="group bg-indigo-600 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-slate-950 transition-all shadow-md active:scale-95 cursor-pointer border-2 border-indigo-700"
                          >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 font-bold group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <MemberSanctuary
                userName={userName}
                resultArchetype={resultArchetype}
                zodiacSign={zodiacInfo?.sign || "Aries"}
                userBirthday={userBirthday}
                playHapticSound={playHapticSound}
                toggleFrequency={toggleFrequency}
                isPlayingFrequency={isPlaying}
              />
            )}
          </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isGeneratingPDF && (
              <ShimmerOverlay message="Assembling your sacred blueprint for archival..." />
            )}
            {showPortal && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="max-w-2xl w-full bg-indigo-950/20 border border-indigo-500/30 rounded-[40px] p-12 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 to-transparent" />
                  <Compass className="w-16 h-16 text-amber-500 mx-auto mb-8 animate-spin-slow" />
                  <h2 className="text-4xl font-medium mb-6">The Portal is Opening</h2>
                  <p className="text-xl text-indigo-100/60 mb-12 leading-relaxed">
                    The Destiny Map is a deep-dive immersion into your soul's celestial star-tapestry. Your threshold pathway to the Council of Elder Stars is currently being aligned.
                  </p>
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                       <p className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-2">Next Threshold</p>
                       <p className="text-white/80 italic">"Watch your cosmic parchment feed (inbox) for the scroll alignment key to the Full Destiny Session."</p>
                    </div>
                    <button 
                      onClick={() => setShowPortal(false)}
                      className="px-8 py-4 rounded-full bg-indigo-600 font-medium hover:bg-indigo-500 transition-all"
                    >
                      Return to Study This Scroll
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
              <div id="pdf-render-container" className="fixed top-0 left-[-9999px] w-[210mm] pointer-events-none opacity-0 overflow-hidden" style={{ zIndex: -100 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(page => (
              <div key={`pdf-page-${page}`} className="pdf-page w-[210mm] h-[297mm] bg-[#020617] p-16 relative overflow-hidden text-white mb-4">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_#4f46e5,_transparent)]" />
                
                {page === 1 && resultArchetype && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <div 
                        className="w-48 h-48 rounded-full border-2 flex items-center justify-center mb-12"
                        style={{ borderColor: resultArchetype.signature.accent + '66' }}
                      >
                        {getArchetypeIcon(resultArchetype.key)}
                      </div>
                      <h2 className="text-[#fbbf24] text-[8px] font-mono tracking-[0.5em] uppercase mb-2">Presented By Lisa Garcia Ruiz</h2>
                      <h3 className="text-xl font-mono text-indigo-400 tracking-[0.4em] uppercase mb-8">Destiny Decode</h3>
                      <h4 className="text-3xl font-medium tracking-tight mb-4">Your Divine Scroll Blueprint</h4>
                      <p className="text-xl text-white opacity-60 leading-relaxed font-light mb-8">
                        Decoded for {userName}
                      </p>
                      <div className="grid grid-cols-2 gap-8 text-xs font-mono tracking-widest uppercase text-[#4f46e5]">
                        <div><span className="block text-white opacity-30 mb-1">Archetype</span>{resultArchetype.key}</div>
                        <div><span className="block text-white opacity-30 mb-1">Frequency</span>{resultArchetype.signature.frequency}</div>
                      </div>
                    </div>
                  )}

                  {page === 2 && resultArchetype && (
                    <div className="h-full space-y-6">
                       <h2 className="text-xs font-mono text-[#fbbf24] tracking-widest uppercase">The Revelation</h2>
                       <h3 className="text-3xl font-bold mb-4 italic">The {resultArchetype.key}</h3>
                       <p className="text-lg text-white opacity-85 leading-relaxed italic mb-4">"{resultArchetype.description}"</p>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-5 rounded-2xl bg-[#4f46e51a] border border-[#4f46e533]">
                             <h4 className="text-[10px] font-mono text-[#818cf8] uppercase tracking-widest mb-2">Core Gift</h4>
                             <p className="text-sm text-white font-medium">{resultArchetype.gift}</p>
                          </div>
                          <div className="p-5 rounded-2xl bg-[#f43f5e1a] border border-[#f43f5e33]">
                             <h4 className="text-[10px] font-mono text-[#fb7185] uppercase tracking-widest mb-2">Shadow Duality</h4>
                             <p className="text-sm text-white font-medium">{resultArchetype.shadow}</p>
                          </div>
                       </div>

                       <div className="p-6 rounded-2xl bg-[#fbbf241a] border border-[#fbbf2433]">
                          <h4 className="text-[10px] font-mono text-[#fbbf24] uppercase tracking-widest mb-2">Your Path Of Growth</h4>
                          <p className="text-[#fde68a] text-sm font-semibold">{resultArchetype.growthPath}</p>
                       </div>

                       <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-[#1e1b4b] border border-[#4f46e555]">
                          <h4 className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest mb-2">Life-Changing Cosmic Counsel</h4>
                          <p className="text-white text-sm leading-relaxed italic">
                             "{resultArchetype.lifeChangingAdvice}"
                          </p>
                       </div>
                    </div>
                  )}

                  {page === 3 && resultArchetype && (
                    <div className="h-full">
                       <h2 className="text-sm font-mono text-[#fbbf24] tracking-widest uppercase mb-4">Waveform</h2>
                       <h3 className="text-4xl font-medium mb-12">Vibrational Matrix</h3>
                       <div className="grid grid-cols-2 gap-12 pt-12">
                          {[
                            { label: "Color Ray", value: resultArchetype.signature.color },
                            { label: "Elemental", value: resultArchetype.signature.element },
                            { label: "Geometry", value: resultArchetype.signature.symbol },
                            { label: "Solfeggio", value: resultArchetype.signature.frequency },
                          ].map(item => (
                            <div key={`pdf-wave-${item.label}`} className="border-b border-white opacity-10 pb-4">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-white opacity-30 block mb-1">{item.label}</span>
                              <span className="text-2xl font-light text-white">{item.value}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {page === 4 && resultArchetype && (
                    <div className="h-full">
                       <h2 className="text-sm font-mono text-[#fbbf24] tracking-widest uppercase mb-4">Celestial Alignment</h2>
                       <h3 className="text-4xl font-medium mb-12">Star Wisdom</h3>
                       {zodiacInfo && (
                         <div className="space-y-12">
                            <div className="p-12 rounded-[40px] border border-white opacity-10 bg-white opacity-5 text-center">
                               <h4 className="text-5xl font-light mb-4">{zodiacInfo.sign}</h4>
                               <p className="text-xs font-mono text-[#6366f1] uppercase tracking-widest">{zodiacInfo.quality} • {zodiacInfo.element} Element</p>
                            </div>
                            <div className="space-y-8">
                               <div>
                                  <h4 className="text-[10px] font-mono text-white opacity-30 uppercase tracking-widest mb-2">Sacred Message</h4>
                                  <p className="text-3xl text-white font-light italic leading-relaxed">"{zodiacInfo.wisdom}"</p>
                               </div>
                               <div>
                                  <h4 className="text-[10px] font-mono text-white opacity-30 uppercase tracking-widest mb-2">Star-Code Hash</h4>
                                  <p className="text-4xl font-mono text-[#fbbf24] tracking-[0.4em]">{zodiacInfo.starCode}</p>
                               </div>
                            </div>
                         </div>
                       )}
                    </div>
                  )}

                  {page === 5 && resultArchetype && (
                    <div className="h-full">
                       <h3 className="text-4xl font-medium mb-12">Activation Codes</h3>
                       <div className="flex flex-wrap gap-6">
                          {resultArchetype.activationCodes.map((code, i) => (
                            <div key={`pdf-code-${code}-${i}`} className="px-8 py-4 rounded-full bg-[#4f46e51a] border border-[#4f46e54d] text-[#c7d2fe] text-lg font-mono tracking-widest uppercase">
                              {code}
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {page === 6 && resultArchetype && (
                    <div className="h-full">
                       <h3 className="text-4xl font-medium mb-12">Oracle Message</h3>
                       <div className="p-12 bg-white opacity-5 rounded-3xl border border-white opacity-10">
                          <p className="text-3xl font-light italic leading-relaxed mb-8">"{resultArchetype.oracleMessage.message}"</p>
                          <hr className="border-white opacity-10 mb-8" />
                          <p className="text-[#fbbf24] font-mono text-sm uppercase tracking-widest">{resultArchetype.oracleMessage.card}</p>
                       </div>
                    </div>
                  )}

                  {page === 7 && resultArchetype && (
                    <div className="h-full">
                       <h3 className="text-4xl font-medium mb-12">Divine Ritual</h3>
                       <div className="space-y-6">
                          {resultArchetype.ritual.map((r, i) => (
                            <div key={`pdf-ritual-${i}`} className="p-6 rounded-2xl bg-white opacity-5 border border-white opacity-10 flex gap-6">
                               <div className="text-[#6366f1] font-mono">{i+1}</div>
                               <p className="text-xl text-white">{r}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {page === 8 && resultArchetype && (
                    <div className="h-full">
                       <h3 className="text-4xl font-medium mb-12">Expansion Vector</h3>
                       <div className="p-12 rounded-[40px] border border-white opacity-10 bg-[#4f46e50d] mb-8">
                          <h4 className="text-sm font-mono text-[#6366f1] tracking-widest uppercase mb-4">The Destiny Portal Immersive</h4>
                          <p className="text-lg text-white opacity-80 leading-relaxed italic">
                            Recode your energetic architecture in our 8-week initiatory journey.
                          </p>
                       </div>
                       <div className="p-12 rounded-[40px] border border-white opacity-10 bg-white opacity-5">
                          <h4 className="text-sm font-mono text-white opacity-30 tracking-widest uppercase mb-4">VIP reading</h4>
                          <p className="text-lg text-white opacity-80 leading-relaxed italic">
                            Strategic heart & business alignment via Direct Akashic access.
                          </p>
                       </div>
                    </div>
                  )}

                  {/* PDF Footer on every page */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.3em] opacity-30 text-center w-full">
                    Destiny Decode Divine Scroll • {userName} • Presented By Lisa Garcia Ruiz • Page {page} of 8
                  </div>
                </div>
              ))}
            </div>
    

      {/* Footer Branding */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-20 text-center">
         <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-white/50 block mb-1">Destiny Decode • Lisa Garcia Ruiz</span>
         <span className="text-[7px] font-mono tracking-[0.2em] uppercase text-white/30 block">Quantum Activation • 2026</span>
      </div>
    </div>
  );
}
