"use client";

import OrbitalTimeline from "@/components/ui/orbital-timeline";
import BlurFade from "@/components/magicui/blur-fade";
import { Building2, Smartphone, Cpu, Users, Lock } from "lucide-react";

export function WorkExperienceOrbit() {
  const workExperienceData = [
    {
      id: 1,
      title: "Freelance UX/UI Product Designer",
      company: "OpenCollab",
      period: "2017 - 2019",
      description: "Led comprehensive redesign initiative for educational platform through intensive user research and collaborative design processes. Delivered strategic UX roadmap with actionable recommendations and high-fidelity prototypes.",
      skills: ["Collaboration Tools", "User Interface Design", "Creative Solutions"],
      icon: Users,
      status: "completed" as const,
      color: "#f59e0b",
      energy: 65,
      relatedIds: [2],
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
    },
    {
      id: 2,
      title: "UX/UI Product Designer",
      company: "IoT.nxt", 
      period: "2019 - 2023",
      description: "Transformed complex IoT data systems into intuitive user experiences, pioneering user-centred design approach for enterprise dashboards. Established cohesive design system and led cross-functional collaboration.",
      skills: ["IoT Design", "Data Visualisation", "Enterprise UX"],
      icon: Cpu,
      status: "completed" as const,
      color: "#8b5cf6",
      energy: 75,
      relatedIds: [1, 3],
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
      id: 3,
      title: "Senior Product Designer",
      company: "Rank Interactive",
      period: "2021 - 2023",
      description: "Spearheaded complete redesign of business-critical platform powering 80% of revenue-generating promotions. Transformed outdated legacy system into modern, streamlined solution for B2B clients.",
      skills: ["Mobile Design", "User Research", "Design Systems"],
      icon: Smartphone,
      status: "completed" as const,
      color: "#3b82f6",
      energy: 85,
      relatedIds: [2, 4],
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
      id: 4,
      title: "Product Design Leadership", 
      company: "Old Mutual",
      period: "2023 - Present",
      description: "Driving design excellence across multiple product squads whilst establishing consistent quality standards and mentoring design teams. Leading banking innovation initiatives.",
      skills: ["Product Strategy", "Design Systems", "Fintech UX"],
      icon: Building2,
      status: "current" as const,
      color: "#22c55e",
      energy: 95,
      relatedIds: [3, 5],
      // Special data for Old Mutual progression stepper
      hasProgression: true,
      progressionSteps: [
        {
          role: "Lead Product Designer - OM Bank",
          period: "Feb 2025 - Present",
          duration: "7 mos", 
          highlights: [
            "Cross-squad leadership: Mentoring teams across multiple squads",
            "Strategic process design: Streamlined delivery methodologies",
            "Executive collaboration: Design sprints with senior leadership"
          ]
        },
        {
          role: "Senior Product Designer",
          period: "Oct 2023 - Feb 2025",
          duration: "1 yr 5 mos",
          highlights: [
            "Established Insight Card methodology (banking-wide adoption)",
            "Redesigned savings goal journeys with gamification", 
            "Conducted accessibility reworks for compliance standards"
          ]
        }
      ],
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
      id: 5,
      title: "Strategic Projects",
      company: "Secret",
      period: "2024 - Present", 
      description: "Confidential strategic design initiatives and product development projects.",
      skills: ["Strategic Design", "Product Innovation", "Confidential"],
      icon: Lock,
      status: "current" as const,
      color: "#ef4444",
      energy: 88,
      relatedIds: [4],
      // Password protection
      isProtected: true,
      passwordHint: "Enter access code to view confidential projects",
      sessionTimeout: 120000, // 2 minutes
      protectedMetrics: {
        startupStage: "Series A",
        sector: "AI Innovation", 
        users: "Growing Fast",
        impact: "Stealth Mode"
      },
      protectedAchievements: [
        {
          name: "AI Platform Design",
          description: "Leading product design for breakthrough AI platform",
          impact: "Stealth Mode"
        },
        {
          name: "Design Foundations",
          description: "Establishing design foundations for rapidly scaling startup", 
          impact: "Foundational"
        },
        {
          name: "UX Strategy",
          description: "Driving user experience strategy for emerging technology",
          impact: "Strategic"
        }
      ]
    }
  ];

  return (
    <div className="w-full h-full min-h-[50px]">
      <BlurFade delay={0.2}>
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold">Career Journey</h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
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