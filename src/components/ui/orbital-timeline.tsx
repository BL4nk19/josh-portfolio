"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, X, ArrowLeft, Lock, Unlock, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Component as Orb } from "@/components/ui/orb";

interface ProgressionStep {
  role: string;
  period: string;
  duration: string;
  highlights: string[];
}

interface TimelineItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  icon: LucideIcon;
  status: "current" | "completed";
  color: string;
  energy: number;
  relatedIds?: number[];
  metrics?: {
    teamSize?: string;
    products?: string;
    users?: string;
    npsScore?: string;
  };
  achievements?: Array<{
    name: string;
    description: string;
    impact: string;
  }>;
  // NEW PROPERTIES (all optional)
  hasProgression?: boolean;
  progressionSteps?: ProgressionStep[];
  isProtected?: boolean;
  passwordHint?: string;
  sessionTimeout?: number;
  protectedMetrics?: Record<string, string>;
  protectedAchievements?: Array<{
    name: string;
    description: string;
    impact: string;
  }>;
}

interface OrbitalTimelineProps {
  items: TimelineItem[];
}

export default function OrbitalTimeline({ items }: OrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [radius] = useState<number>(180); // Fixed radius for consistent sizing
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  
  // ADD THESE STATE VARIABLES to your existing useState declarations:
  const [unlockedItems, setUnlockedItems] = useState<Record<number, boolean>>({});
  const [passwordInputs, setPasswordInputs] = useState<Record<number, string>>({});
  const [unlockTimers, setUnlockTimers] = useState<Record<number, NodeJS.Timeout>>({});
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        if (relatedItems && relatedItems.length > 0) {
          relatedItems.forEach((relId) => {
            newPulseEffect[relId] = true;
          });
        }
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = items.findIndex((item) => item.id === nodeId);
    const totalNodes = items.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  // ADD THESE FUNCTIONS (place them before your existing toggleItem function):
  const handlePasswordSubmit = (itemId: number, password: string) => {
    const correctPassword = "designleader2024"; // Change this to your preferred password
    
    if (password === correctPassword) {
      setUnlockedItems(prev => ({ ...prev, [itemId]: true }));
      setPasswordInputs(prev => ({ ...prev, [itemId]: "" }));
      
      // Set timeout for re-locking
      const item = items.find(i => i.id === itemId);
      if (item?.sessionTimeout) {
        const timer = setTimeout(() => {
          setUnlockedItems(prev => ({ ...prev, [itemId]: false }));
        }, item.sessionTimeout);
        
        setUnlockTimers(prev => {
          if (prev[itemId]) clearTimeout(prev[itemId]);
          return { ...prev, [itemId]: timer };
        });
      }
    } else {
      setPasswordInputs(prev => ({ ...prev, [itemId]: "" }));
    }
  };

  const renderProgressionStepper = (steps: ProgressionStep[]) => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-muted-foreground mb-3">Career Progression</h4>
      <div className="relative">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-3 h-3 rounded-full border-2 bg-background",
                index === steps.length - 1 
                  ? "border-green-500 bg-green-500" 
                  : "border-muted-foreground"
              )} />
              {index < steps.length - 1 && (
                <div className="w-0.5 h-8 bg-muted-foreground/30 mt-2" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h5 className="text-sm font-medium">{step.role}</h5>
                {index === steps.length - 1 && (
                  <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                    Current
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {step.period} • {step.duration}
              </p>
              <ul className="space-y-1">
                {step.highlights.map((highlight, i) => (
                  <li key={i} className="text-xs text-muted-foreground leading-relaxed">
                    • {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProtectedContent = (item: TimelineItem) => {
    const isUnlocked = unlockedItems[item.id];
    
    if (!isUnlocked) {
      return (
        <div className="relative">
          <div className="filter blur-lg select-none pointer-events-none opacity-30">
            <div className="space-y-6">
              {/* Description placeholder */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-muted-foreground">Strategic Projects</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Confidential strategic design initiatives and product development projects currently in stealth mode.
                  This content is intentionally blurred to maintain the card&apos;s natural height and structure.
                </p>
              </div>
              
              {/* Metrics placeholder */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Stage</p>
                  <p className="text-sm font-semibold">Stealth Mode</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Sector</p>
                  <p className="text-sm font-semibold">AI Innovation</p>
                </div>
              </div>
              
              {/* Achievements placeholder */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-muted-foreground">Key Initiatives</h5>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    • AI platform design foundation
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    • Strategic UX framework development
                  </div>
                </div>
              </div>
              
              {/* Skills placeholder */}
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-muted-foreground">Core Focus</h5>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Strategic Design</Badge>
                  <Badge variant="secondary" className="text-xs">AI Innovation</Badge>
                  <Badge variant="secondary" className="text-xs">Stealth Projects</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
            <div className="h-full flex flex-col">
              {/* Header Section - Same structure as unlocked cards */}
              <div className="p-6 pb-4 border-b border-border/50">
                <div className="text-center space-y-3">
                  <Lock className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h4 className="text-lg font-medium">Protected Content</h4>
                  <p className="text-sm text-muted-foreground">{item.passwordHint}</p>
                </div>
              </div>
              
                            {/* Content Section - Distributed to fill space like unlocked cards */}
              <div className="flex-1 p-6 space-y-6">
                {/* Password Input Section */}
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showPassword[item.id] ? "text" : "password"}
                      placeholder="Enter password"
                      value={passwordInputs[item.id] || ""}
                      onChange={(e) => setPasswordInputs(prev => ({ 
                        ...prev, 
                        [item.id]: e.target.value 
                      }))}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') {
                          handlePasswordSubmit(item.id, passwordInputs[item.id] || "");
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="pr-10 w-full"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPassword(prev => ({ 
                          ...prev, 
                          [item.id]: !prev[item.id] 
                        }));
                      }}
                    >
                      {showPassword[item.id] ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="space-y-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePasswordSubmit(item.id, passwordInputs[item.id] || "");
                      }}
                      size="sm"
                      className="w-full"
                    >
                      <Unlock className="h-4 w-4 mr-2" />
                      Unlock
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">* Session expires after 2 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-4">
          <Unlock className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-500 font-medium">Content Unlocked</span>
        </div>
        
        {item.protectedMetrics && (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(item.protectedMetrics).map(([key, value]) => (
              <div key={key} className="bg-muted/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground capitalize mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-sm font-medium">{value}</div>
              </div>
            ))}
          </div>
        )}
        
        {item.protectedAchievements && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Key Achievements</h4>
            <div className="space-y-1">
              {item.protectedAchievements.map((achievement, index) => (
                <div key={index} className="text-xs text-muted-foreground leading-relaxed">
                  • {achievement.description} - {achievement.impact}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.6,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = items.find((item) => item.id === itemId);
    return currentItem?.relatedIds || [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const navigateToItem = (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      toggleItem(itemId);
    }
  };

  return (
    <div
      className="w-full h-[400px] sm:h-[500px] md:h-[600px] flex flex-col items-start justify-start pt-0 overflow-visible"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center transform -translate-y-12 sm:-translate-y-16 md:-translate-y-24"
          ref={orbitRef}
        >
          {/* Central Node - WebGL Orb */}
          <div className="absolute w-16 h-16 rounded-full flex items-center justify-center z-10">
            <Orb
              hoverIntensity={0.3}
              rotateOnHover={true}
              hue={240}
              forceHoverState={false}
            />
          </div>

          {/* Orbit Circle - Fixed size for consistent mobile experience */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-muted-foreground/20"></div>

          {/* Orbital Nodes */}
          {items.map((item, index) => {
            const position = calculateNodePosition(index, items.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Node with Enhanced Hover Effects */}
                <div className="relative group">
                  {/* Energy Pulse Effect */}
                  <div
                    className={`absolute rounded-full -inset-1 ${
                      isPulsing ? "animate-pulse duration-1000" : ""
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)`,
                      width: `${Math.min(item.energy * 0.3 + 24, 40)}px`,
                      height: `${Math.min(item.energy * 0.3 + 24, 40)}px`,
                      left: `-${(Math.min(item.energy * 0.3 + 24, 40) - 28) / 2}px`,
                      top: `-${(Math.min(item.energy * 0.3 + 24, 40) - 28) / 2}px`,
                    }}
                  ></div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-primary/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Node Icon */}
                  <div
                    className={cn(
                      "relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300",
                      "border-2 backdrop-blur-sm shadow-lg",
                      isExpanded
                        ? "bg-primary text-primary-foreground border-primary shadow-primary/30 scale-125"
                        : isRelated
                        ? "bg-primary/60 text-primary-foreground border-primary shadow-primary/20 scale-105"
                        : "bg-background text-foreground border-border",
                      "group-hover:shadow-2xl group-hover:scale-110"
                    )}
                    style={isRelated ? { 
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' 
                    } : undefined}
                  >
                    <Icon size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                  </div>

                  {/* Company Label */}
                  <div
                    className={cn(
                      "absolute top-8 sm:top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap",
                      "text-xs font-semibold tracking-wider transition-all duration-300",
                      isExpanded ? "text-foreground scale-110" : "text-muted-foreground"
                    )}
                  >
                    <span className="hidden sm:inline">{item.company}</span>
                    <span className="sm:hidden">{item.company.split(' ')[0]}</span>
                  </div>

                  {/* Protection Indicator */}
                  {item.isProtected && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background flex items-center justify-center">
                      <Lock className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>

                {/* Expanded Card with Glowing Effect */}
                {isExpanded && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="fixed top-16 inset-x-0 z-50 flex justify-center"
                    >
                      <div style={{ width: '400px', maxWidth: '95vw', minWidth: '400px', flexShrink: 0 }}>
                        {/* Outer container with double border effect */}
                        <div className="relative">
                          {/* Outer border frame */}
                          <div className="absolute inset-0 rounded-[1.25rem] border-[0.75px] border-border p-1 md:rounded-[1.5rem] md:p-2">
                            {/* Glowing Effect Component with proper rounded corners */}
                            <GlowingEffect
                              spread={40}
                              glow={true}
                              disabled={false}
                              proximity={64}
                              inactiveZone={0.01}
                              borderWidth={3}
                            />
                          </div>
                          
                          {/* Card Content Container with inner border */}
                          <div className="relative rounded-[1.25rem] border-[0.75px] border-border p-1 md:rounded-[1.5rem] md:p-2">
                            <div className="relative rounded-xl border-[0.75px] bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                              {/* Connection Line */}
                              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-4 bg-border"></div>
                        
                              {/* Fixed Header - Hidden for protected content when locked */}
                              {!item.isProtected || unlockedItems[item.id] ? (
                                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border/50">
                                  <div className="p-6 pb-4">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                          <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                            {item.title}
                                          </h3>
                                          {/* Status badge without hover state */}
                                          <span className={cn(
                                            "px-2 py-0.5 text-xs font-medium rounded-full cursor-default",
                                            item.status === "current" 
                                              ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                                              : "bg-muted text-muted-foreground border border-border"
                                          )}>
                                            {item.status === "current" ? "Current" : "Previous"}
                                          </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <div className="text-sm text-muted-foreground">{item.company}</div>
                                          <div className="text-xs text-muted-foreground">{item.period}</div>
                                        </div>
                                      </div>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleItem(item.id);
                                        }}
                                        className="ml-2 p-1.5 rounded-lg hover:bg-muted/50 transition-colors group"
                                      >
                                        <X className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                /* Minimal header for locked state - only close button */
                                <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border/50">
                                  <div className="p-6 pb-4">
                                    <div className="flex justify-end">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleItem(item.id);
                                        }}
                                        className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors group"
                                      >
                                        <X className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Scrollable Content */}
                              <div className="max-h-[45vh] overflow-y-auto">
                                <div className="p-6 pt-4 pb-8 space-y-4">
                                  
                                  {/* Handle protected content */}
                                  {item.isProtected ? (
                                    renderProtectedContent(item)
                                  ) : (
                                    <>
                                      {/* Description */}
                                      <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item.description}
                                      </p>

                                      {/* Old Mutual Progression Stepper */}
                                      {item.hasProgression && item.progressionSteps && 
                                        renderProgressionStepper(item.progressionSteps)
                                      }

                                      {/* Metrics Grid - only show if no progression */}
                                      {item.metrics && !item.hasProgression && (
                                        <div className="grid grid-cols-2 gap-3">
                                          {Object.entries(item.metrics).map(([key, value]) => (
                                            <div key={key} className="bg-muted/30 rounded-lg p-3 border border-border/30">
                                              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                              </p>
                                              <p className="text-sm font-semibold">{value}</p>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {/* Achievements */}
                                      {item.achievements && (
                                        <div className="space-y-2">
                                          <h4 className="text-sm font-medium text-muted-foreground">Key Achievements</h4>
                                          <div className="space-y-1">
                                            {item.achievements.map((achievement, index) => (
                                              <div key={index} className="text-xs text-muted-foreground leading-relaxed">
                                                • {achievement.description} - {achievement.impact}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Skills */}
                                      <div className="flex flex-wrap gap-2">
                                        {item.skills.map((skill, index) => (
                                          <Badge key={index} variant="secondary" className="text-xs">
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    </>
                                  )}

                                  {/* Career Journey Navigation - Hidden for protected content when locked */}
                                  {item.relatedIds && item.relatedIds.length > 0 && (!item.isProtected || unlockedItems[item.id]) && (
                                    <div className="pt-4 border-t border-border/30">
                                      <h4 className="text-xs font-semibold mb-3">Career Journey</h4>
                                      <div className="flex justify-between items-center">
                                        {/* Previous (Left side) - Lower IDs */}
                                        <div className="flex gap-2">
                                          {item.relatedIds
                                            .filter(relatedId => {
                                              const relatedItem = items.find((i) => i.id === relatedId);
                                              return relatedItem && relatedId < item.id;
                                            })
                                            .sort((a, b) => b - a)
                                            .map((relatedId) => {
                                              const relatedItem = items.find((i) => i.id === relatedId);
                                              if (!relatedItem) return null;
                                              
                                              return (
                                                <Button
                                                  key={relatedId}
                                                  variant="outline"
                                                  size="sm"
                                                  className="flex items-center gap-2 px-3 py-1.5 text-xs bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors group"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigateToItem(relatedId);
                                                  }}
                                                >
                                                  <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
                                                  {relatedItem.company}
                                                </Button>
                                              );
                                            })}
                                        </div>

                                        {/* Next (Right side) - Higher IDs */}
                                        <div className="flex gap-2">
                                          {item.relatedIds
                                            .filter(relatedId => {
                                              const relatedItem = items.find((i) => i.id === relatedId);
                                              return relatedItem && relatedId > item.id;
                                            })
                                            .sort((a, b) => a - b)
                                            .map((relatedId) => {
                                              const relatedItem = items.find((i) => i.id === relatedId);
                                              if (!relatedItem) return null;
                                              
                                              return (
                                                <Button
                                                  key={relatedId}
                                                  variant="outline"
                                                  size="sm"
                                                  className="flex items-center gap-2 px-3 py-1.5 text-xs bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors group"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigateToItem(relatedId);
                                                  }}
                                                >
                                                  {relatedItem.company}
                                                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                                                </Button>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
