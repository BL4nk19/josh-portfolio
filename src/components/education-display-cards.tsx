"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import { GraduationCap, Calendar, ExternalLink, School, Cloud, Code, Palette, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationItem {
  id: number;
  school: string;
  degree: string;
  period: string;
  description?: string;
  href?: string;
  status: "completed" | "current";
  type: "education" | "certification";
  credentialId?: string;
}

function EducationCard({
  education,
  className,
  isHovered,
  onHover,
  onLeave,
  style,
}: {
  education: EducationItem;
  className?: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  style?: React.CSSProperties;
}) {
  const getIcon = () => {
    switch (education.type) {
      case "education":
        return <School className="size-5 text-blue-300" />;
      case "certification":
        if (education.school.includes("AWS")) return <Cloud className="size-5 text-orange-300" />;
        if (education.school.includes("Harvard")) return <Code className="size-5 text-red-300" />;
        if (education.school.includes("Uxcel")) return <Palette className="size-5 text-purple-300" />;
        if (education.school.includes("Google") || education.school.includes("IxDF")) return <FileText className="size-5 text-green-300" />;
        return <FileText className="size-5 text-blue-300" />;
      default:
        return <School className="size-5 text-blue-300" />;
    }
  };

  const getIconBgColor = () => {
    switch (education.type) {
      case "education":
        return "bg-blue-800";
      case "certification":
        if (education.school.includes("AWS")) return "bg-orange-800";
        if (education.school.includes("Harvard")) return "bg-red-800";
        if (education.school.includes("Uxcel")) return "bg-purple-800";
        if (education.school.includes("Google") || education.school.includes("IxDF")) return "bg-green-800";
        return "bg-blue-800";
      default:
        return "bg-blue-800";
    }
  };

  const getTitleColor = () => {
    switch (education.type) {
      case "education":
        return "text-blue-500";
      case "certification":
        if (education.school.includes("AWS")) return "text-orange-500";
        if (education.school.includes("Harvard")) return "text-red-500";
        if (education.school.includes("Uxcel")) return "text-purple-500";
        if (education.school.includes("Google") || education.school.includes("IxDF")) return "text-green-500";
        return "text-blue-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-52 w-[26rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 backdrop-blur-sm px-5 py-4 transition-all duration-[var(--card-transition-duration)] ease-[var(--card-easing)] after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] cursor-pointer [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        isHovered 
          ? "bg-background/95 border-white/50 shadow-2xl shadow-white/20 scale-110 z-50 transform-gpu" 
          : "bg-muted/60 border-border/40 hover:border-white/30 hover:bg-muted/80 hover:scale-105 transform-gpu",
        className
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={style}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className={cn("relative inline-block rounded-full p-2", getIconBgColor())}>
            {getIcon()}
          </span>
          <div>
            <p className={cn("text-lg font-semibold", getTitleColor())}>
              {education.school}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  education.type === 'education' 
                    ? 'border-blue-500/30 text-blue-600 dark:text-blue-400' 
                    : 'border-purple-500/30 text-purple-600 dark:text-purple-400'
                }`}
              >
                {education.type === 'education' ? 'Education' : 'Certification'}
              </Badge>
              {education.status === 'current' && (
                <Badge variant="default" className="bg-primary/20 text-primary text-xs">
                  Active
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Degree and Period */}
      <div className="space-y-3">
        <p className="text-base font-medium text-foreground leading-tight">{education.degree}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{education.period}</span>
          </div>
          {education.href && (
            <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
          )}
        </div>
      </div>

      {/* Credential ID or Description */}
      <div className="space-y-3">
        {education.credentialId ? (
          <div className="p-3 bg-secondary/30 rounded-md border border-border/40">
            <p className="text-xs text-muted-foreground font-mono">
              Credential ID: {education.credentialId}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {education.description}
          </p>
        )}
      </div>
    </div>
  );
}

export function EducationDisplayCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Josh's refined education and certification data - 5 cards only
  const educationData: EducationItem[] = [
    {
      id: 1,
      school: "Emirates Aviation College",
      degree: "National Diploma in Aerospace Engineering (Btech)",
      period: "2012",
      description: "Comprehensive aerospace engineering programme covering aircraft systems, aerodynamics, and engineering principles.",
      status: "completed",
      type: "education",
      href: "https://www.emiratesaviationcollege.com"
    },
    {
      id: 2,
      school: "Google / IxDF",
      degree: "UX Design Professional Certificates",
      period: "2020-2021",
      description: "Professional UX design certification covering research, prototyping, and design thinking methodologies.",
      status: "completed",
      type: "certification",
      href: "https://www.interaction-design.org"
    },
    {
      id: 3,
      school: "Amazon Web Services (AWS)",
      degree: "AWS Certified Cloud Practitioner",
      period: "Aug 2025 - Aug 2028",
      description: "Foundational AWS certification covering cloud concepts, security, and core AWS services.",
      status: "current",
      type: "certification",
      href: "https://aws.amazon.com/certification",
      credentialId: "AWS-CCP-2025-001"
    },
    {
      id: 4,
      school: "Uxcel",
      degree: "Product Design & UX Courses",
      period: "2023-2024",
      description: "Comprehensive UX design programme with 25+ completed courses covering the full design process.",
      status: "completed",
      type: "certification",
      href: "https://uxcel.com"
    },
    {
      id: 5,
      school: "Harvard Online",
      degree: "CS50 Introduction to Computer Science",
      period: "Nov 2024",
      description: "Harvard's flagship computer science course covering programming fundamentals and computational thinking.",
      status: "completed",
      type: "education",
      href: "https://cs50.harvard.edu",
      credentialId: "65a8f2b3c4d5e6f7"
    }
  ];

  // Create the stacked cards with proper transform classes - 5 cards only
  const stackedCards = [
    {
      education: educationData[0], // Emirates Aviation College (back)
      className: "[grid-area:stack] translate-x-0 translate-y-0 hover:-translate-y-20",
    },
    {
      education: educationData[1], // Google / IxDF
      className: "[grid-area:stack] translate-x-16 translate-y-8 hover:-translate-y-16",
    },
    {
      education: educationData[2], // AWS
      className: "[grid-area:stack] translate-x-32 translate-y-16 hover:-translate-y-12",
    },
    {
      education: educationData[3], // Uxcel
      className: "[grid-area:stack] translate-x-48 translate-y-24 hover:-translate-y-8",
    },
    {
      education: educationData[4], // Harvard CS50 (front)
      className: "[grid-area:stack] translate-x-64 translate-y-32 hover:-translate-y-4",
    },
  ];

  return (
    <div className="w-full space-y-8">
      <BlurFade delay={0.2}>
        <div className="text-center space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            Education & Certifications
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Academic foundation and professional credentials that drive innovation
          </p>
        </div>
      </BlurFade>

      {/* Stacked Cards Container */}
      <div className="flex justify-start pl-4">
        <div 
          className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 min-h-[450px] max-w-[700px]"
        >
          {stackedCards.map(({ education, className }, index) => (
            <EducationCard
              key={education.id}
              education={education}
              className={cn(
                className,
                "will-change-transform",
                hoveredCard && hoveredCard !== education.id 
                  ? "opacity-40" 
                  : "opacity-100"
              )}
              style={{
                transition: 'all 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              isHovered={hoveredCard === education.id}
              onHover={() => setHoveredCard(education.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
