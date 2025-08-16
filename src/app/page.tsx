/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { WorkExperienceOrbit } from "@/components/work-experience-orbit";
import { EducationDisplayCards } from "@/components/education-display-cards";
import { SkillsToolsSection } from "@/components/skills-tools-section";
import { VisitorCounter } from "@/components/visitor-counter";
import Link from "next/link";
import Markdown from "react-markdown";
import { HexagonBackground } from '@/components/animate-ui/backgrounds/hexagon'; 
import { Code, Users } from "lucide-react";
import { Highlighter } from "@/components/magicui/highlighter";

const BLUR_FADE_DELAY = 0.04;

export const metadata: Metadata = {
  title: "Josh's Portfolio | UX/UI Product Designer",
  description: "Epic UX/UI Designer Portfolio showcasing creative projects and design work",
  keywords: ["UX Designer", "UI Designer", "Portfolio", "Creative Design"],
  authors: [{ name: "Josh" }],
  creator: "Josh",
  openGraph: {
    title: "Josh's Portfolio | UX/UI Designer",
    description: "Epic UX/UI Designer Portfolio showcasing creative projects and design work",
    type: "website",
  },
}

export default function Page() {
  return (
    <main className="relative flex flex-col min-h-[100dvh] space-y-6">
      <HexagonBackground 
        className="fixed inset-0 -z-10 opacity-30 dark:opacity-50" 
      />
      
      {/* HERO SECTION - Mobile First Responsive */}
<section id="hero" className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 sm:space-y-8">
  <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
    <BlurFade delay={BLUR_FADE_DELAY}>
      <Avatar className="size-24 sm:size-32 md:size-40 lg:size-48 border-4">
        <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
        <AvatarFallback>{DATA.initials}</AvatarFallback>
      </Avatar>
    </BlurFade>
    
    <div className="space-y-3 sm:space-y-4">
      <BlurFadeText
        delay={BLUR_FADE_DELAY * 2}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
        yOffset={8}
        text="Josh Vilensky"
      />
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg md:text-xl text-muted-foreground">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 3}
          className="text-center"
          text="Lead Product Designer"
        />
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <span className="hidden sm:inline">·</span>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span className="text-sm sm:text-base">Working at</span>
            <img 
              src="/ombank-logo-green.svg" 
              alt="OM Bank"
              className="h-6 sm:h-8 dark:hidden"
            />
            <img 
              src="/ombank-logo-white.svg" 
              alt="OM Bank"
              className="h-6 sm:h-8 hidden dark:block"
            />
          </div>
        </BlurFade>
      </div>
    </div>
  </div>
</section>

      {/* TWO-COLUMN CONTENT SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-4">
        
        {/* LEFT COLUMN - About Content */}
        <div className="space-y-6 sm:space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold">About Me</h2>
              
              {/* Content - left aligned */}
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-pretty">
                  Dynamic Product Design leader specialising in fintech innovation,
                  with proven ability to transform complex financial services
                  requirements into intuitive digital experiences.
                </p>
                <p className="text-pretty">
                  Currently serving as Lead Product Designer at Old Mutual Bank,
                  where I&apos;ve established robust design processes across multiple
                  squads and mentored high-performing teams. I&apos;ve also worked with
                  AI startups, providing design direction and concepts for their
                  diverse product offerings - from chatbots and business integrations
                  to specialised pharmaceutical mobile applications.
                </p>
                <p className="text-pretty">
                  Outside of work, I&apos;m a curious soul who devours everything from
                  design theory to emerging tech trends. You&apos;ll find me maintaining
                  discipline at the gym, attempting (badly) to master the guitar, and
                  constantly exploring whatever piques my interest - hence this
                  portfolio site where{" "}
                  <Highlighter action="underline" color="#E3F2FD">
                    I&apos;m building an interactive app-like experience
                  </Highlighter>{" "}
                  with AI integrations and experimental features.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* RIGHT COLUMN - Work Experience Orbit */}
        <div className="min-h-[400px] sm:min-h-[500px]">
  <WorkExperienceOrbit />
</div>
      </section>


      
      {/* Education & Skills Section */}
      <section id="education" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start relative -mt-2">
        {/* LEFT: Education Display Cards */}
        <div className="order-1 lg:order-1 lg:pr-4 overflow-visible">
          <EducationDisplayCards />
        </div>
        
        {/* RIGHT: Skills & Tools Section */}
        <div className="order-2 lg:order-2 lg:pl-8">
          <SkillsToolsSection />
        </div>
      </section>
      
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <h2 className="text-2xl font-bold tracking-tight text-center">Check out my latest work</h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 13 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <h2 className="text-2xl font-bold tracking-tight text-center">Get in Touch</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Want to chat? Just shoot me a dm{" "}
              <Link
                href={DATA.contact.social.LinkedIn.url}
                className="text-blue-500 hover:underline"
              >
                with a direct question on LinkedIn
              </Link>{" "}
              and I&apos;ll respond whenever I can. Professional enquiries welcome.
            </p>
          </BlurFade>
          
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <VisitorCounter className="mb-8" />
          </BlurFade>
        </div>
      </section>
    </main>
  );
}