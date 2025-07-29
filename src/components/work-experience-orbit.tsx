"use client";

import OrbitalTimeline from "@/components/ui/orbital-timeline";
import BlurFade from "@/components/magicui/blur-fade";
import { Building2, Smartphone, Cpu, Users } from "lucide-react";

export function WorkExperienceOrbit() {
  const workExperienceData = [
    {
      id: 1,
      title: "Lead Product Designer",
      company: "OM Bank",
      period: "2023 - Present",
      description: "Leading digital transformation initiatives at South Africa's largest mutual insurer, focusing on mobile-first experiences and customer journey optimisation.",
      skills: ["Product Strategy", "Design Systems", "Fintech UX"],
      icon: Building2,
      status: "current" as const,
      color: "#22c55e",
      energy: 95,
      relatedIds: [2],
      metrics: {
        teamSize: "8 People",
        products: "3 Apps",
        users: "2.1M+",
        npsScore: "+67"
      },
      achievements: [
        {
          name: "Mobile Banking Redesign",
          description: "Complete UX overhaul & conversion optimisation",
          impact: "+34% conversion"
        },
        {
          name: "Design System Implementation",
          description: "Cross-platform component library rollout",
          impact: "12 teams"
        },
        {
          name: "Customer Onboarding",
          description: "Streamlined digital journey & flow optimisation",
          impact: "-45% time"
        }
      ]
    },
    {
      id: 2,
      title: "Senior UX/UI Designer", 
      company: "Rank Interactive",
      period: "2021 - 2023",
      description: "Designed engaging digital experiences for entertainment and gaming platforms, focusing on user retention and conversion optimisation across web and mobile applications.",
      skills: ["Mobile Design", "User Research", "Design Systems"],
      icon: Smartphone,
      status: "completed" as const,
      color: "#3b82f6",
      energy: 85,
      relatedIds: [1, 3],
      metrics: {
        teamSize: "5 People",
        products: "4 Platforms",
        users: "500K+",
        npsScore: "+72"
      },
      achievements: [
        {
          name: "Gaming Platform Redesign",
          description: "Complete user experience overhaul",
          impact: "+28% engagement"
        },
        {
          name: "Mobile App Launch",
          description: "Cross-platform mobile experience",
          impact: "85% retention"
        }
      ]
    },
    {
      id: 3,
      title: "Product Designer",
      company: "IoT.nxt", 
      period: "2019 - 2021",
      description: "Crafted intuitive interfaces for complex IoT dashboards and enterprise software, making industrial data accessible and actionable for business users.",
      skills: ["IoT Design", "Data Visualisation", "Enterprise UX"],
      icon: Cpu,
      status: "completed" as const,
      color: "#8b5cf6",
      energy: 75,
      relatedIds: [2, 4],
      metrics: {
        teamSize: "3 People",
        products: "2 Platforms",
        users: "50K+",
        npsScore: "+59"
      },
      achievements: [
        {
          name: "IoT Dashboard Framework",
          description: "Unified interface system for industrial data",
          impact: "+40% efficiency"
        },
        {
          name: "Enterprise Mobile App",
          description: "Real-time monitoring capabilities",
          impact: "24/7 access"
        }
      ]
    },
    {
      id: 4,
      title: "UX Designer",
      company: "OpenCollab",
      period: "2017 - 2019", 
      description: "Designed collaborative tools and interfaces for remote teams, focusing on seamless communication and project management experiences.",
      skills: ["Collaboration Tools", "User Interface Design", "Creative Solutions"],
      icon: Users,
      status: "completed" as const,
      color: "#f59e0b",
      energy: 65,
      relatedIds: [3],
      metrics: {
        teamSize: "4 People",
        products: "1 Platform",
        users: "25K+",
        npsScore: "+64"
      },
      achievements: [
        {
          name: "Collaboration Platform",
          description: "Complete team workflow solution",
          impact: "+50% productivity"
        },
        {
          name: "Real-time Features",
          description: "Live collaboration capabilities",
          impact: "Instant sync"
        }
      ]
    }
  ];

  return (
    <div className="w-full h-full min-h-[50px]">
      <BlurFade delay={0.2}>
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl font-bold">Career Journey</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Interactive timeline of my recent career - click each node to explore
          </p>
        </div>
      </BlurFade>
      
      <BlurFade delay={0.4}>
        <OrbitalTimeline items={workExperienceData} />
      </BlurFade>
    </div>
  );
}
