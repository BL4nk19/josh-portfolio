"use client";

import { OrbitalTimeline } from "@/components/ui/orbital-timeline";
import BlurFade from "@/components/magicui/blur-fade";
import { Building2, Smartphone, Cpu, Users } from "lucide-react";

export function WorkExperienceOrbit() {
  const workExperienceData = [
    {
      id: 1,
      title: "Lead Product Designer",
      company: "OM Bank",
      period: "2023 - Present",
      description: "Leading digital transformation initiatives at South Africa's largest mutual insurer.",
      skills: ["Product Strategy", "Design Systems", "Fintech UX"],
      icon: Building2,
      status: "current" as const,
      color: "#22c55e",
      energy: 95,
      relatedIds: [2]
    },
    {
      id: 2,
      title: "Senior UX/UI Designer", 
      company: "Rank Interactive",
      period: "2021 - 2023",
      description: "Spearheaded mobile-first design initiatives for digital products.",
      skills: ["Mobile Design", "User Research", "Design Systems"],
      icon: Smartphone,
      status: "completed" as const,
      color: "#3b82f6",
      energy: 85,
      relatedIds: [1, 3]
    },
    {
      id: 3,
      title: "Product Designer",
      company: "IoT.nxt", 
      period: "2019 - 2021",
      description: "Designed IoT interfaces and data visualisation dashboards for enterprise clients.",
      skills: ["IoT Design", "Data Visualisation", "Enterprise UX"],
      icon: Cpu,
      status: "completed" as const,
      color: "#8b5cf6",
      energy: 75,
      relatedIds: [2, 4]
    },
    {
      id: 4,
      title: "UX Designer",
      company: "OpenCollab",
      period: "2017 - 2019", 
      description: "Began my design journey working on collaborative tools and creative solutions.",
      skills: ["Collaboration Tools", "User Interface Design", "Creative Solutions"],
      icon: Users,
      status: "completed" as const,
      color: "#f59e0b",
      energy: 65,
      relatedIds: [3]
    }
  ];

  return (
    <div className="w-full h-full min-h-[500px]">
      <BlurFade delay={0.2}>
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold">Career Journey</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Interactive timeline of my design career - click each role to explore
          </p>
        </div>
      </BlurFade>
      
      <BlurFade delay={0.4}>
        <OrbitalTimeline items={workExperienceData} />
      </BlurFade>
    </div>
  );
}