"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import { Icons } from "@/components/icons";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Code, Palette, Users } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

// Tool icons mapping to your existing Icons component
const toolIcons = [
  { key: "figma", icon: Icons.figma, label: "Figma" },
  { key: "react", icon: Icons.react, label: "React" },
  { key: "typescript", icon: Icons.typescript, label: "TypeScript" },
  { key: "nextjs", icon: Icons.nextjs, label: "Next.js" },
  { key: "tailwindcss", icon: Icons.tailwindcss, label: "Tailwind CSS" },
  { key: "framermotion", icon: Icons.framermotion, label: "Framer Motion" },
  { key: "github", icon: Icons.github, label: "GitHub" },
  { key: "notion", icon: Icons.notion, label: "Notion" },
  { key: "openai", icon: Icons.openai, label: "OpenAI" },
  { key: "googleDrive", icon: Icons.googleDrive, label: "Google Drive" },
];

// Expanded skills list for better marquee population
const skills = [
    // Strategic Leadership & Impact
    "Banking UX Leadership",
    "Fintech Innovation Specialist", 
    "Cross-Squad Design Consistency",
    "Revenue-Generating Platform Design",
    "Design System Architecture",
    "Stage Gate Workflow Implementation",
    "Extreme Ownership Philosophy",
    "Team Performance Acceleration",
    "Action Bias Leader",
    
    // Technical Credibility
    "Harvard CS50 Computer Science",
    "AWS Certified Cloud Practitioner",
    "Top 15% UX Designer Globally",
    "Design-to-Development Handoff",
    "Dashboard Interface Designer",
    "Legacy System Transformer",
    
    // Creative Excellence
    "AI Integration & ChatBot Design",
    "Gamification Strategy Design",
    "Interactive Prototype Development",
    "Brand Identity Revolution",
    "Eagal Eye Reviewer",
    
    // Business Impact
    "Cross-Functional Team Leader",
    "Premium Brand Market Positioning",
    "Regulatory Compliance Design",
    
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

// Individual Icon Component with optimized motion and performance mode
function IconItem({ tool, index, mouseX, mouseY, performanceMode }: { 
  tool: typeof toolIcons[0], 
  index: number, 
  mouseX: any, 
  mouseY: any,
  performanceMode: boolean
}) {
  const x = useTransform(mouseX, [-200, 200], [-20, 20]);
  const y = useTransform(mouseY, [-200, 200], [-20, 20]);
  const rotateX = useTransform(mouseY, [-200, 200], [15, -15]);
  const rotateY = useTransform(mouseX, [-200, 200], [-15, 15]);
  
  // Adaptive spring physics based on performance mode
  const springConfig = performanceMode 
    ? { stiffness: 300, damping: 30, mass: 0.6, restDelta: 0.005 } // High performance
    : { stiffness: 200, damping: 25, mass: 0.8, restDelta: 0.01 }; // Normal mode
  
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Calculate position in a circle
  const angle = (index / toolIcons.length) * 2 * Math.PI;
  const radius = 120;
  const baseX = Math.cos(angle) * radius;
  const baseY = Math.sin(angle) * radius;

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        x: useTransform(springX, (val) => baseX + val),
        y: useTransform(springY, (val) => baseY + val),
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      whileHover={{ 
        scale: 1.2, 
        z: 50,
        transition: { 
          type: "spring", 
          stiffness: performanceMode ? 500 : 400, 
          damping: 20,
          mass: 0.6
        }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        mass: 0.8
      }}
    >
      <div className="relative">
        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-muted/50 border backdrop-blur-sm group-hover:bg-muted/80 transition-all duration-300">
          <tool.icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            mass: 0.8
          }}
        >
          <span className="text-xs font-medium bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md border whitespace-nowrap">
            {tool.label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// 3D Icon Cloud Component with optimized mouse tracking and performance mode
function IconCloud({ performanceMode }: { performanceMode: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (performanceMode) {
      // High precision tracking in performance mode
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(event.clientX - centerX);
      mouseY.set(event.clientY - centerY);
    } else {
      // Reduced precision in normal mode for better performance
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Throttle updates in normal mode
      const x = Math.round((event.clientX - centerX) / 5) * 5;
      const y = Math.round((event.clientY - centerY) / 5) * 5;
      
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="relative w-full h-[400px] flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {toolIcons.map((tool, index) => (
        <IconItem 
          key={tool.key} 
          tool={tool} 
          index={index} 
          mouseX={mouseX} 
          mouseY={mouseY}
          performanceMode={performanceMode}
        />
      ))}
      
      {/* NO GRADIENT OVERLAYS - Let content blend naturally like other components */}
    </div>
  );
}

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
    { title: "Tools", icon: Palette },
    { title: "Skills", icon: Users },
  ];

  const handleTabChange = (index: number | null) => {
    if (index === 0) setViewMode('tools');
    if (index === 1) setViewMode('skills');
  };

  return (
    <section id="skills-tools" className="space-y-6">
      <BlurFade delay={0.4}>
        <div className="flex flex-col space-y-6">
          {/* CENTERED header with expandable tabs */}
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
              <Code className="w-6 h-6 text-primary" />
              Skills & Tools
            </h2>
            
            {/* Expandable Tabs */}
            <div className="flex items-center justify-center">
              <ExpandableTabs 
                tabs={tabs} 
                onChange={handleTabChange}
                activeColor="text-primary"
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {viewMode === 'tools' ? (
              // Tools Mode: 3D Icon Cloud
              <div className="w-full">
                <IconCloud performanceMode={performanceMode} />
              </div>
            ) : (
              // Skills Mode: 3D Marquee
              <div className="w-full">
                <SkillsMarquee performanceMode={performanceMode} />
              </div>
            )}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
