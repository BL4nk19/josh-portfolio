import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Josh Vilensky",
  initials: "JV",
  url: "https://joshvilensky.dev", // Update this when you deploy
  location: "Olympus, Pretoria, South Africa",
  locationLink: "https://www.google.com/maps/place/pretoria",
  description:
    "Lead Product Designer transforming complex financial services into intuitive digital banking experiences. I combine strategic UX vision with cross-functional execution to deliver user-centred solutions that drive business growth.",
  summary:
    "Dynamic Product Design leader with proven ability to transform complex financial services requirements into intuitive digital banking experiences. Currently serving as Lead Product Designer at OM Bank, I've established robust design processes, mentored high-performing teams across multiple squads, and seamlessly collaborated with stakeholders at all levels to align design with banking business objectives. Known for innovation in digital banking UX and building design systems that scale.",
  avatarUrl: "/avatar.jpg", // Add your photo here later
  skills: [
    "Figma",
    "Sketch", 
    "Adobe XD",
    "Design Systems",
    "User Research",
    "Prototyping",
    "Financial Services UX",
    "Team Leadership",
    "Stakeholder Management",
    "Agile Development",
    "Information Architecture",
    "Accessibility Design",
    "Data-Informed Design",
    "Cross-functional Collaboration",
    "Process Optimisation",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "josh_vilensky@live.co.uk",
    tel: "+27782722704",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/BL4nk19",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn", 
        url: "https://www.linkedin.com/in/josh-vilensky/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:josh_vilensky@live.co.uk",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Old Mutual",
      href: "https://www.oldmutual.co.za/",
      badges: [],
      location: "Johannesburg, South Africa",
      title: "Lead Product Designer - OM Bank",
      logoUrl: "/oldmutual-logo.png", // Add logo later
      start: "Feb 2025",
      end: "Present",
      description:
        "Leading design excellence across multiple product squads whilst establishing consistent quality standards and mentoring design teams. Architecting streamlined design delivery processes and facilitating design sprints with senior leadership to drive banking innovation initiatives.",
    },
    {
      company: "Old Mutual", 
      href: "https://www.oldmutual.co.za/",
      badges: [],
      location: "Johannesburg, South Africa", 
      title: "Senior Product Designer",
      logoUrl: "/oldmutual-logo.png",
      start: "Oct 2023",
      end: "Feb 2025",
      description:
        "Drove UX/UI design innovations by developing critical banking app frameworks and enhancing user experiences across multiple product squads. Established comprehensive Insight Card methodology, redesigned savings goal journeys with gamification, and conducted accessibility reworks ensuring compliance with banking standards.",
    },
    {
      company: "Rank Interactive",
      href: "https://rankinteractive.com/",
      badges: [],
      location: "Remote",
      title: "Senior Product Designer", 
      logoUrl: "/rank-logo.png",
      start: "Jul 2023",
      end: "Oct 2023",
      description:
        "Spearheaded complete redesign of business-critical 'COGS' platform powering 80% of revenue-generating promotions. Transformed outdated legacy system into modern, streamlined solution that significantly enhanced operational efficiency and user experience for B2B clients.",
    },
    {
      company: "IoT.nxt",
      href: "https://iot.nxt.co.za/",
      badges: [],
      location: "Centurion, South Africa",
      title: "UX/UI Product Designer",
      logoUrl: "/iot-logo.png", 
      start: "Feb 2022",
      end: "Jul 2023",
      description:
        "Transformed complex IoT data systems into intuitive user experiences, pioneering user-centred design approach for IoT dashboard interfaces. Established cohesive design system and led cross-functional collaboration between product, engineering, and client teams.",
    },
    {
      company: "OpenCollab",
      href: "https://opencollab.co.za/",
      badges: [],
      location: "Cape Town, South Africa",
      title: "Freelance UX/UI Product Designer",
      logoUrl: "/opencollab-logo.png",
      start: "Mar 2022", 
      end: "Dec 2022",
      description:
        "Led comprehensive redesign initiative for educational platform through intensive user research and collaborative design processes. Delivered strategic UX roadmap with actionable recommendations and high-fidelity prototypes that enabled seamless development implementation.",
    },
  ],
  education: [
    {
      school: "Harvard University",
      href: "https://cs50.harvard.edu/",
      degree: "CS50 Introduction to Computer Science",
      logoUrl: "/harvard-logo.png",
      start: "2024",
      end: "2024",
    },
    {
      school: "Uxcel",
      href: "https://uxcel.com/",
      degree: "Verified Designer Assessment - Top 15% Globally", 
      logoUrl: "/uxcel-logo.png",
      start: "2023",
      end: "2023",
    },
    {
      school: "Amazon Web Services",
      href: "https://aws.amazon.com/",
      degree: "Certified Cloud Practitioner",
      logoUrl: "/aws-logo.png", 
      start: "2022",
      end: "2022",
    },
    {
      school: "Google",
      href: "https://grow.google/certificates/ux-design/",
      degree: "UX Design Professional Certificate",
      logoUrl: "/google-logo.png",
      start: "2021", 
      end: "2021",
    },
  ],
  projects: [
    {
      title: "OM Bank - Insight Card Methodology",
      href: "#",
      dates: "2024 - Present",
      active: true,
      description:
        "Established comprehensive data visualisation methodology now used throughout the banking app, transforming how users engage with financial data through intuitive card-based interfaces.",
      technologies: [
        "Figma",
        "Design Systems", 
        "User Research",
        "Data Visualisation",
        "Banking UX",
      ],
      links: [
        {
          type: "Case Study",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "", // Add project image later
      video: "", // Optional video
    },
    {
      title: "COGS Platform Redesign",
      href: "#", 
      dates: "2023",
      active: false,
      description:
        "Complete transformation of business-critical B2B platform powering 80% of revenue-generating promotions. Modernised legacy system resulting in significant operational efficiency gains.",
      technologies: [
        "B2B Design",
        "Legacy Modernisation", 
        "User Research",
        "Stakeholder Management",
        "Revenue Optimisation",
      ],
      links: [
        {
          type: "Case Study", 
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "IoT Dashboard Interface System",
      href: "#",
      dates: "2022 - 2023", 
      active: false,
      description:
        "Pioneered user-centred design approach for enterprise IoT dashboard interfaces, dramatically improving data visualisation and reducing cognitive load for complex data systems.",
      technologies: [
        "IoT Design",
        "Enterprise UX",
        "Data Visualisation", 
        "Design Systems",
        "User Testing",
      ],
      links: [
        {
          type: "Case Study",
          href: "#", 
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Banking Gamification Strategy",
      href: "#",
      dates: "2024",
      active: true, 
      description:
        "Redesigned savings goal user journey introducing innovative gamification strategies that increased user engagement and goal completion rates within the banking app.",
      technologies: [
        "Gamification Design",
        "Behavioural Psychology",
        "Mobile UX", 
        "User Journey Mapping",
        "A/B Testing",
      ],
      links: [
        {
          type: "Case Study",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [], // We'll replace this section with UI Labs later
} as const;