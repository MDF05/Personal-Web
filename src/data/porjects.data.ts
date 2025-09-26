import { ProjectTypes } from "@/types/projects.types";

  export const projects:ProjectTypes[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with advanced features, payment integration, and real-time inventory management.",
      category: "web",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      github: "#",
      demo: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Cross-platform mobile application for team collaboration and project management with real-time synchronization.",
      category: "mobile",
      technologies: ["React Native", "Firebase", "TypeScript", "Redux"],
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
      github: "#",
      demo: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description:
        "Desktop application for data visualization and business intelligence with interactive charts and reports.",
      category: "desktop",
      technologies: ["Electron", "React", "D3.js", "Node.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      github: "#",
      demo: "#",
      featured: false,
    },
    {
      id: 4,
      title: "AI Chat Interface",
      description:
        "Modern chat interface with AI integration, real-time messaging, and advanced natural language processing.",
      category: "web",
      technologies: ["Next.js", "OpenAI", "WebSocket", "Tailwind"],
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
      github: "#",
      demo: "#",
      featured: true,
    },
    {
      id: 5,
      title: "Fitness Tracker",
      description:
        "Mobile fitness application with workout tracking, nutrition monitoring, and social features.",
      category: "mobile",
      technologies: ["Flutter", "Firebase", "HealthKit", "Charts"],
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
      github: "#",
      demo: "#",
      featured: false,
    },
    {
      id: 6,
      title: "Code Editor Pro",
      description:
        "Professional code editor with syntax highlighting, IntelliSense, and plugin architecture.",
      category: "desktop",
      technologies: ["Tauri", "Rust", "Monaco Editor", "TypeScript"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      github: "#",
      demo: "#",
      featured: false,
    },
  ];
