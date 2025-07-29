"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

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

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 180;
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

  return (
    <div
      className="w-full h-[600px] flex flex-col items-start justify-start pt-0 overflow-visible"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center transform -translate-y-24"
          ref={orbitRef}
        >
          <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40 flex items-center justify-center z-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-primary/10 animate-pulse"></div>
            <div className="absolute w-16 h-16 rounded-full border border-primary/20 animate-ping opacity-30" style={{ animationDuration: '3s' }}></div>
            <div className="w-6 h-6 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center relative z-10">
              <div className="text-xs font-bold text-primary">J</div>
            </div>
          </div>

          <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-muted-foreground/20"></div>

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
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)`,
                    width: `${Math.min(item.energy * 0.4 + 30, 50)}px`,
                    height: `${Math.min(item.energy * 0.4 + 30, 50)}px`,
                    left: `-${(Math.min(item.energy * 0.4 + 30, 50) - 36) / 2}px`,
                    top: `-${(Math.min(item.energy * 0.4 + 30, 50) - 36) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-primary text-primary-foreground"
                      : isRelated
                      ? "bg-primary/60 text-primary-foreground"
                      : "bg-background text-foreground"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-primary shadow-lg shadow-primary/30"
                      : isRelated
                      ? "border-primary shadow-md shadow-primary/20"
                      : "border-border"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-125" : isRelated ? "scale-105" : ""}
                `}
                  style={isRelated ? { 
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' 
                  } : undefined}
                >
                  <Icon size={14} />
                </div>

                <div
                  className={`
                  absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-foreground scale-110" : "text-muted-foreground"}
                `}
                >
                  {item.company}
                </div>

                {isExpanded && (
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-96 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-50">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-border"></div>
                    
                    <div className="p-6 pb-4 border-b border-border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                            <Badge className={`px-2 text-xs ${
  item.status === "current" 
    ? "bg-green-500/20 text-green-400 border-green-500/30" 
    : "bg-muted text-muted-foreground"
}`}>
  {item.status === "current" ? "Current" : "Previous"}
</Badge>
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
                          className="ml-2 p-1 hover:bg-muted rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="max-h-[45vh] overflow-y-auto">
                     <div className="p-6 pt-4 pb-8">
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {item.description}
                        </p>

                        {item.metrics && (
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            {item.metrics.teamSize && (
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Team Size</div>
                                <div className="text-sm font-semibold">{item.metrics.teamSize}</div>
                              </div>
                            )}
                            {item.metrics.products && (
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Products</div>
                                <div className="text-sm font-semibold">{item.metrics.products}</div>
                              </div>
                            )}
                            {item.metrics.users && (
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Users</div>
                                <div className="text-sm font-semibold">{item.metrics.users}</div>
                              </div>
                            )}
                            {item.metrics.npsScore && (
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">NPS Score</div>
                                <div className="text-sm font-semibold">{item.metrics.npsScore}</div>
                              </div>
                            )}
                          </div>
                        )}

                        {item.achievements && item.achievements.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span>🏆</span>
                              <h4 className="text-sm font-semibold">Key Achievements</h4>
                            </div>
                            <div className="space-y-3">
                              {item.achievements.map((achievement, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                                  <div className="flex-1">
                                    <div className="text-sm font-medium">{achievement.name}</div>
                                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                                  </div>
                                  <div className="ml-3 text-xs font-semibold text-green-400">{achievement.impact}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <h4 className="text-xs font-semibold mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {item.skills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs px-2 py-0">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {item.relatedIds && item.relatedIds.length > 0 && (
  <div className="pb-2">
    <h4 className="text-xs font-semibold mb-2">Journey</h4>
    <div className="flex justify-between items-center">
      {/* Previous (Left side) */}
      <div className="flex gap-1">
        {item.relatedIds
          .filter(relatedId => {
            // Previous jobs have higher IDs (opposite of what we had)
            const relatedItem = items.find((i) => i.id === relatedId);
            return relatedItem && relatedId > item.id;
          })
          .sort((a, b) => a - b) // Sort ascending for previous
          .map((relatedId) => {
            const relatedItem = items.find((i) => i.id === relatedId);
            if (!relatedItem) return null;
            
            return (
              <Button
                key={relatedId}
                variant="outline"
                size="sm"
                className="flex items-center h-6 px-2 py-0 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(relatedId);
                }}
              >
                <ArrowRight size={8} className="mr-1 rotate-180" />
                {relatedItem.company}
              </Button>
            );
          })}
      </div>

      {/* Next (Right side) */}
      <div className="flex gap-1">
        {item.relatedIds
          .filter(relatedId => {
            // Next jobs have lower IDs
            const relatedItem = items.find((i) => i.id === relatedId);
            return relatedItem && relatedId < item.id;
          })
          .sort((a, b) => b - a) // Sort descending for next
          .map((relatedId) => {
            const relatedItem = items.find((i) => i.id === relatedId);
            if (!relatedItem) return null;
            
            return (
              <Button
                key={relatedId}
                variant="outline"
                size="sm"
                className="flex items-center h-6 px-2 py-0 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(relatedId);
                }}
              >
                {relatedItem.company}
                <ArrowRight size={8} className="ml-1" />
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
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}