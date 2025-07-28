"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
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
  relatedIds?: number[]; // Make optional
}

interface OrbitalTimelineProps {
  items: TimelineItem[];
}

export function OrbitalTimeline({ items }: OrbitalTimelineProps) {
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

        // Fix: Check if relatedIds exists and handle safely
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
    const radius = 180; // Reduced from 200 to fit better
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.6, // Increased minimum opacity
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = items.find((item) => item.id === itemId);
    return currentItem?.relatedIds || []; // Safe fallback
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <div
      className="w-full h-[500px] flex flex-col items-center justify-center overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
        >
         {/* Central Hub with Sophisticated Pulse */}
<div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40 flex items-center justify-center z-10">
  {/* Gentle breathing effect using Tailwind */}
  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-primary/10 animate-pulse"></div>
  
  {/* Single gentle ring */}
  <div className="absolute w-16 h-16 rounded-full border border-primary/20 animate-ping opacity-30" style={{ animationDuration: '3s' }}></div>
  
  <div className="w-6 h-6 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center relative z-10">
    <div className="text-xs font-bold text-primary">J</div>
  </div>
</div>

          {/* Orbital Path */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-muted-foreground/20"></div>

          {/* Orbital Items */}
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
                {/* Energy Glow Effect */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)`,
                    width: `${Math.min(item.energy * 0.4 + 30, 50)}px`, // Reduced glow size
                    height: `${Math.min(item.energy * 0.4 + 30, 50)}px`,
                    left: `-${(Math.min(item.energy * 0.4 + 30, 50) - 36) / 2}px`,
                    top: `-${(Math.min(item.energy * 0.4 + 30, 50) - 36) / 2}px`,
                  }}
                ></div>

               {/* Node Circle */}
{/* Node Circle */}
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
      ? "border-primary shadow-md shadow-primary/20" // Remove animate-pulse
      : "border-border"
  }
  transition-all duration-300 transform
  ${isExpanded ? "scale-125" : isRelated ? "scale-105" : ""}
`}
  // Add slower custom pulse for related nodes
  style={isRelated ? { 
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' 
  } : undefined}
>
  <Icon size={14} />
</div>

                {/* Company Label */}
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

                {/* Expanded Card */}
                {isExpanded && (
                  <Card className="absolute top-16 left-1/2 -translate-x-1/2 w-56 bg-card/95 backdrop-blur-lg border shadow-xl overflow-visible">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-border"></div>
                    <CardHeader className="pb-2 p-4">
                      <div className="flex justify-between items-center">
                        <Badge className="px-2 text-xs">
                          {item.status === "current" ? "CURRENT" : "COMPLETED"}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">
                          {item.period}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground p-4 pt-0">
                      <p className="leading-relaxed">{item.description}</p>

                      <div className="mt-3 pt-3 border-t">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Experience
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/60"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds && item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-muted-foreground mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                              Related
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = items.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-5 px-2 py-0 text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.company}
                                  <ArrowRight size={8} className="ml-1" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
