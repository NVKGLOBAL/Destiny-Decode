import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, Lock, ExternalLink, ArrowLeft } from 'lucide-react';

interface WarpStar {
  x: number;
  y: number;
  z: number;
  color: string;
}

export default function PortalOverlay() {
  const [isActive, setIsActive] = useState(false);
  const [logMessage, setLogMessage] = useState('');
  const [targetHref, setTargetHref] = useState('');
  const [targetIsNewTab, setTargetIsNewTab] = useState(false);
  const [targetAnchorId, setTargetAnchorId] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [isWarpingComplete, setIsWarpingComplete] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatusText, setLoadingStatusText] = useState('INITIATING CELESTIAL PROTOCOLS...');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const handleClose = () => {
    setIframeUrl('');
    setIsActive(false);
    setIsWarpingComplete(false);
    setIframeLoaded(false);
    setLoadingProgress(0);
  };

  // Sound generator
  const triggerPortalSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Deep space atmospheric hum
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(36, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(144, ctx.currentTime + 1.8);

      // Warm filter mapping
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(90, ctx.currentTime);
      lowpass.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 1.8);
      lowpass.Q.setValueAtTime(2.5, ctx.currentTime);

      // Stereo panning spatial chime sweeps (resonant frequency 432Hz & 528Hz)
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(432, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(864, ctx.currentTime + 1.8);

      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(528, ctx.currentTime);
      osc3.frequency.exponentialRampToValueAtTime(1584, ctx.currentTime + 1.8);

      const panner2 = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (panner2) {
        panner2.pan.setValueAtTime(-0.8, ctx.currentTime);
        panner2.pan.linearRampToValueAtTime(0.8, ctx.currentTime + 1.8);
      }

      // Envelopes
      gain1.gain.setValueAtTime(0, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.3);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.3);

      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.6);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.3);

      // Connect nodes
      osc1.connect(lowpass);
      lowpass.connect(gain1);
      gain1.connect(ctx.destination);

      if (panner2) {
        osc2.connect(panner2);
        osc3.connect(panner2);
        panner2.connect(gain2);
      } else {
        osc2.connect(gain2);
        osc3.connect(gain2);
      }
      gain2.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc3.start();

      osc1.stop(ctx.currentTime + 2.4);
      osc2.stop(ctx.currentTime + 2.4);
      osc3.stop(ctx.currentTime + 2.4);
    } catch (e) {
      // Audio node fails gracefully if browser blocks autoplays
    }
  };

  // Intercept click listener
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = e.target as HTMLElement;
      const anchorNode = target.closest('a');
      
      if (!anchorNode) return;

      const href = anchorNode.getAttribute('href');
      const targetAttr = anchorNode.getAttribute('target');

      // Ignore standard local anchor/nav link overrides or non-link triggers or print features
      if (!href || href === '#' || href.startsWith('javascript:') || anchorNode.classList.contains('no-portal')) return;

      // Prevent redirection immediately and launch Portal warp
      e.preventDefault();

      // Assess destination parameters
      const isNewTab = targetAttr === '_blank';
      const isAnchor = href.startsWith('#');
      const anchorId = isAnchor ? href.slice(1) : '';

      setTargetHref(href);
      setTargetIsNewTab(isNewTab);
      setTargetAnchorId(anchorId);
      setIsActive(true);
      setIsWarpingComplete(false);
      setIframeLoaded(false);
      setLoadingProgress(0);
      setLoadingStatusText("INITIATING CELESTIAL PROTOCOLS...");

      if (!anchorId && href) {
        setIframeUrl(href);
      }

      // Tailor beautiful cosmic and astrological logs based on destiny pathway click
      if (isAnchor) {
        const readableSection = href.replace('#', ' ').toUpperCase();
        setLogMessage(`ALCHEMIZING YOUR SOUL MAPS... TUNING TO THE ASTROLOGICAL HOUSE OF [${readableSection.trim()}]`);
      } else if (href.includes('instagram.com')) {
        setLogMessage("RADIATING YOUR SACRED AURA ACROSS STARDUST DIMENSIONS... [TELEPATHIC GALAXY SYNC]");
      } else if (href.includes('payment-link') || href.includes('stripe.com')) {
        setLogMessage("DISSOLVING TERRESTRIAL KARMA... RELEASING OLD EARTH ILLUSIONS & COMMENCING CELESTIAL ORBIT...");
      } else if (href.includes('distrokid.com')) {
        setLogMessage("TUNING YOUR BREATH TO THE SACRED HARMONY OF THE SOLAR EPHEMERIS...");
      } else {
        setLogMessage("UNLOCKING SOVEREIGN CLASS CODES... REACHING THE HIGHER STELLAR SANCTUARY...");
      }

      // Play synthesize wave sound on clicks
      triggerPortalSound();
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  // Starfield 3D Warp effect loop
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const stars: WarpStar[] = [];
    const starCount = 200;
    const maxDepth = 1000;
    const fov = 250;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * maxDepth,
        color: Math.random() > 0.4 ? '#ffffff' : '#c5a059',
      });
    }

    let speed = 4;
    let frameNum = 0;

    const render = () => {
      frameNum++;
      ctx.fillStyle = 'rgba(2, 2, 5, 0.25)'; // trail smear opacity
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Let warp accelerate progressively to warp-speed
      if (speed < 42) speed += 0.45;

      stars.forEach((star) => {
        // Draw path line from previous position to create stargate light streak
        const prevZ = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        const px = (star.x / star.z) * fov + centerX;
        const py = (star.y / star.z) * fov + centerY;

        const prevPx = (star.x / prevZ) * fov + centerX;
        const prevPy = (star.y / prevZ) * fov + centerY;

        const depthScale = 1.0 - star.z / maxDepth;
        const size = depthScale * 2.5;

        // Draw motion line
        ctx.strokeStyle = star.color;
        ctx.lineWidth = size;
        ctx.globalAlpha = depthScale;

        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.stroke();
      });

      ctx.globalAlpha = 1.0;

      // Draw mathematical expanding sacred concentric overlay rings
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.15)';
      ctx.lineWidth = 1;
      for (let r = 1; r <= 4; r++) {
        const ringRad = ((frameNum * (2 + r) * 0.5) % 300) + 10;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRad, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs lines
        ctx.beginPath();
        ctx.moveTo(centerX - ringRad, centerY);
        ctx.lineTo(centerX + ringRad, centerY);
        ctx.moveTo(centerX, centerY - ringRad);
        ctx.lineTo(centerX, centerY + ringRad);
        ctx.stroke();
      }

      // Draw central high-intensity space portal core
      const pulseSize = 120 + Math.sin(frameNum * 0.1) * 15;
      const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, pulseSize);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.1, '#c5a059');
      grad.addColorStop(0.3, 'rgba(99, 102, 241, 0.4)');
      grad.addColorStop(0.8, 'rgba(10, 10, 20, 0.1)');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Cosmic rotating texts overlay
      ctx.fillStyle = 'rgba(197, 160, 89, 0.35)';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(frameNum * 0.005);
      ctx.fillText("SOUL COGNITION ACTIVATED // CELESTIAL ALIGNMENT OF SACRED CONSTELLATIONS", 0, -180);
      ctx.restore();

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    // Trigger eventual redirection action after cinematic peaks
    const redirectTimeout = setTimeout(() => {
      if (targetAnchorId) {
        // Same tab scroll layout anchors
        const el = document.getElementById(targetAnchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        // Gracefully collapse overlay to return to smooth-scrolled temple page
        setIsActive(false);
      } else {
        // The cinematic stargate ride has finished! Reveal our beautifully preloaded and loading iframe
        setIsWarpingComplete(true);
      }
    }, 2400); // 2.4 seconds duration allows users to fully absorb stargate warp

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(redirectTimeout);
    };
  }, [isActive, targetHref, targetIsNewTab, targetAnchorId]);

  // Progressive cosmic loading bar simulation for immersive ritual atmosphere
  useEffect(() => {
    if (!isActive || !targetHref || targetAnchorId) {
      setLoadingProgress(0);
      setLoadingStatusText("INITIATING CELESTIAL PROTOCOLS...");
      return;
    }

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (iframeLoaded) {
          setLoadingStatusText("CELESTIAL CHANNELS SYNCHRONIZED");
          return 100;
        }

        // Simulative smooth climb that gets slightly slower towards the top
        if (prev < 45) {
          setLoadingStatusText("CHANNELING STARDUST RESONANCE...");
          return prev + Math.floor(Math.random() * 8) + 4; // Faster climb initially
        } else if (prev < 75) {
          setLoadingStatusText("CALIBRATING CONSTELLATION HOUSES...");
          return prev + Math.floor(Math.random() * 5) + 2;
        } else if (prev < 90) {
          setLoadingStatusText("INTERSECTING SOUL GEOMETRIES...");
          return prev + Math.floor(Math.random() * 3) + 1;
        } else if (prev < 98) {
          setLoadingStatusText("STABILIZING HIGH-FREQUENCY PORTALS...");
          return prev + 0.5;
        }
        return prev;
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, [isActive, targetHref, targetAnchorId, iframeLoaded]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="portal-space-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 w-full h-full z-[9999] bg-[#020205] overflow-hidden flex flex-col justify-between items-center py-16 px-6"
        >
          {/* Main 3D Particle Warp Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

          {/* Golden Corner Trim Accents */}
          <div className="absolute top-10 left-10 w-8 h-8 border-l border-t border-celestial-gold/30 z-10 pointer-events-none" />
          <div className="absolute top-10 right-10 w-8 h-8 border-r border-t border-celestial-gold/30 z-10 pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-8 h-8 border-l border-b border-celestial-gold/30 z-10 pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-8 h-8 border-r border-b border-celestial-gold/30 z-10 pointer-events-none" />

          {/* Cosmic Sanctuary Status */}
          <div className="text-center z-10 space-y-2 pointer-events-none select-none max-w-md">
            <span className="text-[10px] font-display uppercase tracking-[0.4em] text-celestial-gold font-bold block">
              CELESTIAL CONSTELLATION ALIGNMENT
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-celestial-gold animate-ping" />
              <span className="text-[9px] font-mono text-[#f0ece1]/50 uppercase tracking-[0.1em]">
                SACRED HARMONIC GATEWAY RESOUNDING (432Hz)
              </span>
            </div>
          </div>

          {/* Center concentric focal interface */}
          <div className="pointer-events-none select-none z-10 relative flex flex-col items-center justify-center text-center">
            {/* Spinning Golden Compass */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
              className="w-24 h-24 border border-celestial-gold/20 rounded-full flex items-center justify-center absolute bg-transparent pointer-events-none"
            >
              <Compass className="w-8 h-8 text-celestial-gold/60" strokeWidth={1} />
            </motion.div>
          </div>

          {/* Bottom Sacred Intonation Readout */}
          <div className="relative z-10 text-center max-w-xl space-y-4 pointer-events-none select-none">
            <div className="px-5 py-3 glass-morphism border border-celestial-gold/20 rounded-xl bg-celestial-black/80 shadow-[0_0_20px_rgba(197,160,89,0.1)]">
              <span className="text-[10px] font-display uppercase tracking-[0.25em] text-celestial-gold font-bold block mb-1">
                HARMONIZING ASTROLOGICAL HOUSES
              </span>
              <p className="font-serif text-lg tracking-wide italic text-[#f0ece1] transition-all duration-300">
                "{logMessage}"
              </p>
            </div>

            <span className="text-[8px] font-mono text-[#f0ece1]/30 tracking-widest block font-bold">
              ACTIVATING HIGH-FREQUENCY SOUL LIGHT AND CELESTIAL DECREES. SILENTLY BREATHE.
            </span>
          </div>

          {/* Focused Fullscreen / Mobile-Optimized Embedded IFrame Viewer */}
          <AnimatePresence>
            {iframeUrl && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ 
                  opacity: isWarpingComplete ? 1 : 0, 
                  scale: isWarpingComplete ? 1 : 0.93,
                  y: isWarpingComplete ? 0 : 30,
                }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ type: "spring", damping: 28, stiffness: 140 }}
                className={`absolute inset-0 flex items-center justify-center p-0 md:p-6 bg-[#020205]/95 backdrop-blur-md ${isWarpingComplete ? 'z-50 pointer-events-auto' : '-z-50 pointer-events-none'}`}
              >
                {/* Embedded Frame Device Mockup */}
                <div className="w-full h-full md:max-w-md md:h-[88vh] bg-[#0c0c12] md:rounded-[32px] md:border-2 md:border-celestial-gold/40 shadow-[0_0_60px_rgba(197,160,89,0.3)] overflow-hidden flex flex-col relative">
                  {/* Floating Device Notch Accent on desktop */}
                  <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#020205] rounded-b-xl z-50 border-x border-b border-celestial-gold/15" />

                  {/* Browser/Celestial Bridge Control Bar */}
                  <div className="bg-[#0e0e16] border-b border-celestial-gold/20 px-4 py-3 flex items-center justify-between z-40 select-none">
                    <button
                      onClick={handleClose}
                      className="flex items-center gap-1.5 text-[10px] font-display uppercase tracking-widest text-[#f1e4c3] hover:text-celestial-gold transition-colors font-bold cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Retreat
                    </button>

                    {/* Celestial SSL Indicator */}
                    <div className="flex items-center gap-1.5 bg-celestial-black/50 border border-celestial-gold/10 px-2.5 py-1 rounded-full max-w-[150px] md:max-w-[180px]">
                      <Lock className="w-2.5 h-2.5 text-celestial-gold fill-celestial-gold/20 animate-pulse" />
                      <span className="text-[8px] font-mono tracking-wider text-celestial-gold truncate">
                        {(() => {
                          try {
                            return new URL(iframeUrl).hostname;
                          } catch {
                            return 'secure-celestial-channel';
                          }
                        })()}
                      </span>
                    </div>

                    <a
                      href={iframeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[10px] text-white/50 hover:text-celestial-gold transition-colors font-bold font-display uppercase tracking-wider"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Direct
                    </a>
                  </div>

                  {/* High Performance Embedded Web Frame */}
                  <div className="flex-1 bg-white relative overflow-hidden">
                    {/* Immersive Cosmic Progress Gate */}
                    {!iframeLoaded && (
                      <div className="absolute inset-0 bg-[#0a0a0f] flex flex-col items-center justify-center p-6 z-30 select-none">
                        {/* Concentric rotating astrological rings */}
                        <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                            className="absolute inset-0 border border-dashed border-celestial-gold/30 rounded-full"
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                            className="absolute inset-2 border border-celestial-gold/20 rounded-full"
                            style={{ borderTopColor: '#c5a059' }}
                          />
                          
                          {/* Percentage center dial */}
                          <div className="text-center z-10 flex flex-col justify-center items-center">
                            <span className="text-[8.5px] font-mono tracking-[0.2em] text-celestial-gold/50 uppercase block font-bold">ALIGNING</span>
                            <span className="font-display font-medium text-2xl text-white tracking-tighter block mt-0.5">
                              {Math.floor(loadingProgress)}%
                            </span>
                          </div>
                        </div>

                        {/* Gold Progress bar and status indicator */}
                        <div className="w-full max-w-[200px] space-y-3.5">
                          <div className="h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                              className="absolute left-0 top-0 h-full bg-celestial-gold shadow-[0_0_8px_rgba(197,160,89,0.7)]"
                              style={{ width: `${loadingProgress}%` }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>
                          
                          <div className="text-center">
                            <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-[#f1e4c3] min-h-[14px] leading-relaxed font-bold">
                              {loadingStatusText}
                            </p>
                            <span className="text-[6px] font-sans font-semibold text-white/30 uppercase tracking-[0.15em] block mt-1.5">
                              SHIELDED BROADCAST PROTOCOL
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <iframe
                      src={iframeUrl}
                      title="Destiny Decode Session"
                      onLoad={() => {
                        setIframeLoaded(true);
                        setLoadingProgress(100);
                      }}
                      className={`w-full h-full border-0 transition-opacity duration-1000 ${
                        iframeLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      allow="accelerometer; autoplay; camera; clipboard-write; encrypted-media; gyroscope; picture-in-picture; geolocation"
                    />
                  </div>

                  {/* Fallback & Helper Footnote bar */}
                  <div className="bg-[#0a0a0f] py-2.5 px-4 border-t border-white/5 text-center flex flex-col items-center justify-center gap-1">
                    <span className="text-[8px] font-mono tracking-wider text-[#f1e4c3]/40 font-bold">
                      SECURED TRANSCENDENT PROTOCOL // SHIELDED BY COSMIC FIELD
                    </span>
                    <a
                      href={iframeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] font-sans font-medium text-celestial-gold hover:underline flex items-center gap-1 mt-0.5"
                    >
                      Trouble viewing? Decrypt direct connection link <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
