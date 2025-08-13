/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import { GraduationCap, Calendar, School } from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationItem {
  id: number;
  school: string;
  degree: string;
  period: string;
  description?: string;
  href?: string;
  status: "completed" | "current";
  type: "education" | "certification" | "certifications";
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
  const getLogo = () => {
    if (education.school.includes("Harvard")) {
      return <img src="/harvard-logo.svg" alt="Harvard University" className="w-8 h-8" />;
    } else if (education.school.includes("AWS")) {
      return <img src="/aws-logo.svg" alt="Amazon Web Services" className="w-8 h-8" />;
    } else if (education.school.includes("Google")) {
      return <img src="/google-logo.svg" alt="Google" className="w-8 h-8" />;
    } else if (education.school.includes("Emirates")) {
      return <img src="/emirates-logo.svg" alt="Emirates Aviation" className="w-8 h-8" />;
    } else if (education.school.includes("Uxcel")) {
      return <img src="/uxcel-logo.svg" alt="Uxcel" className="w-8 h-8" />;
    } else {
      return <School className="size-8 text-blue-300" />;
    }
  };

  const getBrandColor = () => {
    if (education.school.includes("Harvard")) {
      return "#A51C30"; // Harvard Crimson
    } else if (education.school.includes("AWS")) {
      return "#FF9900"; // AWS Orange
    } else if (education.school.includes("Google")) {
      return "#4285F4"; // Google Blue
    } else if (education.school.includes("Emirates")) {
      return "#D71921"; // Emirates Red
    } else if (education.school.includes("Uxcel")) {
      return "#6366F1"; // Uxcel Purple
    } else {
      return "#3B82F6"; // Default Blue
    }
  };

  const getTitleColor = () => {
    if (education.school.includes("Harvard")) {
      return "text-red-600 dark:text-red-400";
    } else if (education.school.includes("AWS")) {
      return "text-orange-600 dark:text-orange-400";
    } else if (education.school.includes("Google")) {
      return "text-blue-600 dark:text-blue-400";
    } else if (education.school.includes("Emirates")) {
      return "text-red-600 dark:text-red-400";
    } else if (education.school.includes("Uxcel")) {
      return "text-purple-600 dark:text-purple-400";
    } else {
      return "text-blue-600 dark:text-blue-400";
    }
  };

  return (
    <div
      className={cn(
        "relative flex w-[24rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 backdrop-blur-sm px-5 py-4 transition-all duration-300 ease-in-out after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] cursor-pointer [&>*]:flex [&>*]:items-center [&>*]:gap-2 overflow-hidden",
        isHovered 
          ? "bg-background/95 border-white/50 shadow-2xl shadow-white/20 scale-110 z-50 transform-gpu h-56" 
          : "bg-muted/60 border-border/40 hover:border-white/30 hover:bg-muted/80 hover:scale-105 transform-gpu h-44",
        className
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={style}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12">
            {getLogo()}
          </div>
          <div>
            <p className={cn("text-lg font-semibold", getTitleColor())}>
              {education.school}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                variant="outline" 
                className="border-2 border-border/60 text-foreground text-xs font-medium px-3 py-1"
              >
                {education.type === 'education' ? 'Education' : education.type === 'certification' ? 'Certification' : 'Certifications'}
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
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-foreground leading-tight flex-1">{education.degree}</p>
          <div className="flex items-center gap-2 text-sm text-foreground font-medium whitespace-nowrap ml-4">
            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-foreground">{education.period}</span>
          </div>
        </div>
      </div>

      {/* Credential ID or Description */}
      <div className="space-y-3">
        {education.credentialId ? (
          <div className="p-3 bg-secondary/30 rounded-md border border-border/40">
            <p className="text-xs text-muted-foreground font-mono break-all">
              Credential ID: {education.credentialId}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {education.description}
          </p>
        )}
      </div>
    </div>
  );
}

export function EducationDisplayCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Josh's refined education and certification data - 5 cards
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
      school: "Google & IxDF",
      degree: "UX Design Professional Certificates",
      period: "2020-2023",
      description: "Professional UX design certification covering research, prototyping, and design thinking methodologies.",
      status: "completed",
      type: "certifications",
      href: "https://www.interaction-design.org"
    },
    {
      id: 3,
      school: "Amazon Web Services (AWS)",
      degree: "AWS Certified Cloud Practitioner",
      period: "Valid 2022 - 2028",
      description: "Foundational AWS certification covering cloud concepts, security, and core AWS services.",
      status: "completed",
      type: "certification",
      href: "https://aws.amazon.com/certification",
      credentialId: "AWS-CCP-2025-001"
    },
    {
      id: 4,
      school: "Uxcel",
      degree: "Product Design & UX Courses",
      period: "2023 - Now",
      description: "Comprehensive UX design programme with 25+ completed courses covering the full design process.",
      status: "completed",
      type: "certifications",
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

  // Create the stacked cards with LEFT-SIDE positioning and proper fan-out stacking for 5 cards
  const stackedCards = [
    {
      education: educationData[0], // Emirates Aviation College (back)
      className: "[grid-area:stack] translate-x-0 translate-y-0 hover:-translate-y-20",
    },
    {
      education: educationData[1], // Google & IxDF
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
    }
  ];

  return (
    <div className="w-full space-y-4">
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

      {/* Stacked Cards Container - LEFT-SIDE POSITIONING */}
      <div className="flex justify-start -ml-4 lg:-ml-8 xl:-ml-12 2xl:-ml-16">
        <div 
          className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 min-h-[400px] max-w-[700px] scale-85 lg:scale-90 xl:scale-95"
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
