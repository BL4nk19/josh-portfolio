"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import { IconCloud } from "@/components/ui/interactive-icon-cloud";
import { motion, AnimatePresence } from "framer-motion";
import { Code, PocketKnife, Brain } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

// Curated list of Josh's tools using Simple Icons slugs
const toolSlugs = [
  // Design Tools
  "figma",
  "framer",
  
  // Development 
  "react",
  "nextdotjs",
  "typescript",
  "javascript",
  "html5",
  "css3",
  "tailwindcss",
  
  // Professional Tools
  "github",
  "notion",
  "jira",
  "microsoftteams", 
  "microsoftoutlook",
  "googledrive",
  "slack",
  
  // Cloud & AI
  "claude",
  "amazonaws",
  "vercel",
  
  // Additional
  "git",
  "visualstudiocode",
  "spotify",
  "apple",
];

// Expanded skills list for better marquee population
const skills = [
    // Strategic Leadership & Impact
    "Banking UX Leadership",
    "Fintech Innovation Specialist", 
    "Cross-Squad Design Consistency",
    "Systems Thinker",
    "Design System Architecture",
    "Workflow OptimisationImplementation",
    "Extreme Ownership Enthusiast",
    "Team Performance Accelerator",
    "Action Bias Leader",
    "Unrelenting Customer Advocate",

    // Technical Credibility
    "Harvard CS50 Computer Science",
    "AWS Certified Cloud Practitioner",
    "Aerospace Engineer",
    "Top 15% Globally Ranked UX Designer",
    "Design-to-Development Handoff",
    "Dashboard Interface Designer",
    "Legacy System Transformer",
    
    // Creative Excellence
    "Dynamic AI Integration & ChatBot Designer",
    "Gamification Strategy Architect",
    "Interactive Prototype Builder",
    "Brand Identity Revolution",
    "Eagle Eye Reviewer",
    
    // Business Impact
    "Cross-Functional Team Leader",
    "Premium Brand Market Positioner",
    "Regulatory Compliance Designer",
    
    // Technical Skills
    "Figma: Expert Level",
    "Advanced Prototyping",
    "Responsive Web Development",
    "Data-Informed Designer",
    "Accessibility Design Champion",
    "Performance Optimisation Focus",
    
    // Process & Innovation
    "Design Ops Excellence",
    "Knowledge Sharing Facilitator",
    "Change Management Success",
    "Quality Assurance Vanguard",
    "Stakeholder Alignment Whisperer",
    "Innovation Workshop Leader"
  ];

// Skill Badge Component (simplified)
function SkillBadge({ skill }: { skill: string }) {
  return (
    <Badge 
      variant="secondary" 
      className="whitespace-nowrap text-sm px-4 py-2 mx-2 bg-primary/10 hover:bg-primary/20 border-primary/20"
    >
      {skill}
    </Badge>
  );
}

// 3D Skills Marquee Component with optimized motion, increased speed, and performance mode
function SkillsMarquee({ performanceMode }: { performanceMode: boolean }) {
  // Adaptive scroll speed based on performance mode
  const baseDurations = performanceMode ? [20, 25, 30, 35] : [25, 30, 35, 40];
  
  // Calculate optimal travel distance based on content height
  // Each skill badge is roughly 40px (py-2) + 16px (gap) = 56px
  // With 3x duplicated content, we need to travel the full height of one set
  const singleSetHeight = skills.length * 56; // Height of one complete set
  const travelDistance = singleSetHeight + 100; // Add buffer for smooth transition

  // Duplicate skills array to create seamless infinite loop
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div 
      className="relative flex h-96 w-full max-w-[600px] flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:300px]"
      style={{
        maskImage: `
          linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
          linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
        `,
        maskComposite: 'intersect',
        WebkitMaskImage: `
          linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
          linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
        `,
        WebkitMaskComposite: 'source-in'
      }}
    >
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform: 'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
        }}
      >
        {/* Column 1: Downward scroll with seamless loop */}
        <motion.div 
          className="flex flex-col gap-4"
          animate={{ y: [0, -travelDistance] }}
          transition={{ 
            duration: baseDurations[0],
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop",
            repeatDelay: 0
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <SkillBadge key={`col1-${skill}-${index}`} skill={skill} />
          ))}
        </motion.div>
        
        {/* Column 2: Upward scroll with seamless loop - slight delay for natural feel */}
        <motion.div 
          className="flex flex-col gap-4"
          animate={{ y: [-travelDistance, 0] }}
          transition={{ 
            duration: baseDurations[1],
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop",
            repeatDelay: 0,
            delay: 0.5
          }}
        >
          {duplicatedSkills.slice().reverse().map((skill, index) => (
            <SkillBadge key={`col2-${skill}-${index}`} skill={skill} />
          ))}
        </motion.div>
        
        {/* Column 3: Downward scroll with seamless loop - slight delay for natural feel */}
        <motion.div 
          className="flex flex-col gap-4"
          animate={{ y: [0, -travelDistance] }}
          transition={{ 
            duration: baseDurations[2],
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop",
            repeatDelay: 0,
            delay: 1
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <SkillBadge key={`col3-${skill}-${index}`} skill={skill} />
          ))}
        </motion.div>
        
        {/* Column 4: Upward scroll with seamless loop - slight delay for natural feel */}
        <motion.div 
          className="flex flex-col gap-4"
          animate={{ y: [-travelDistance, 0] }}
          transition={{ 
            duration: baseDurations[3],
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop",
            repeatDelay: 0,
            delay: 1.5
          }}
        >
          {duplicatedSkills.slice().reverse().map((skill, index) => (
            <SkillBadge key={`col4-${skill}-${index}`} skill={skill} />
          ))}
        </motion.div>
        
        {/* CSS MASK GRADIENTS - Smooth fade-to-transparent edges */}
      </div>
    </div>
  );
}

export function SkillsToolsSection() {
  const [viewMode, setViewMode] = useState<'tools' | 'skills'>('tools');
  const { performanceMode } = usePerformanceMode();

  // Define tabs with Tools first (left) and Skills second (right)
  const tabs = [
    { title: "Tools", icon: PocketKnife },
    { title: "Skills", icon: Brain },
  ];

  const handleTabChange = (index: number | null) => {
    if (index === 0) setViewMode('tools');
    if (index === 1) setViewMode('skills');
    // If index is null, keep the current viewMode unchanged
  };

  return (
    <section id="skills-tools" className="space-y-6">
      <BlurFade delay={0.4}>
        <div className="flex flex-col space-y-6">
          {/* CENTERED header with expandable tabs */}
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Skills & Tools</h2>
            
            {/* Expandable Tabs */}
            <div className="flex items-center justify-center">
              <ExpandableTabs 
                tabs={tabs} 
                onChange={handleTabChange}
                activeColor="text-primary"
                defaultSelected={0} // Start with Tools tab expanded
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {viewMode === 'tools' ? (
                <motion.div 
                  key="tools"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg px-20 pb-20 pt-8">
                    <IconCloud iconSlugs={toolSlugs} />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-full"
                >
                  <SkillsMarquee performanceMode={performanceMode} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
