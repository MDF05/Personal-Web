import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/seperator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  X,
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  Star,
  Award,
  Zap,
} from "lucide-react";

interface TechStackDetailProps {
  category: any;
  isOpen: boolean;
  onClose: () => void;
}

export const TechStackDetail = ({
  category,
  isOpen,
  onClose,
}: TechStackDetailProps) => {
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!category) return null;

  // Mock detailed tech stack data
  const techDetails = {
    ...category,
    description: category.isComingSoon
      ? "IoT development represents the next frontier in technology. I'm currently preparing to expand my expertise into Internet of Things development, focusing on embedded systems, sensor networks, and smart device integration."
      : `Comprehensive expertise in ${category.title.toLowerCase()} covering modern frameworks, best practices, and cutting-edge technologies. Specialized in building scalable, performant, and maintainable applications.`,

    experience: category.isComingSoon ? "Planned" : "3+ years",

    proficiencyLevels: category.isComingSoon
      ? [
          { name: "Arduino", level: 0, learning: true },
          { name: "Raspberry Pi", level: 0, learning: true },
          { name: "ESP32", level: 0, learning: true },
          { name: "MQTT", level: 0, learning: true },
          { name: "Sensors", level: 0, learning: true },
          { name: "Embedded Systems", level: 0, learning: true },
        ]
      : category.technologies.map((tech: string) => ({
          name: tech,
          level: Math.floor(Math.random() * 30) + 70, // 70-100% for existing skills
          learning: false,
        })),

    learningRoadmap: category.isComingSoon
      ? [
          {
            phase: "Phase 1: Fundamentals",
            items: [
              "Arduino Programming",
              "Basic Electronics",
              "Sensor Integration",
            ],
            timeline: "Q1 2025",
          },
          {
            phase: "Phase 2: Advanced Systems",
            items: [
              "Raspberry Pi Projects",
              "Network Communication",
              "Data Processing",
            ],
            timeline: "Q2 2025",
          },
          {
            phase: "Phase 3: Integration",
            items: [
              "Cloud Integration",
              "Mobile App Connectivity",
              "Real-time Monitoring",
            ],
            timeline: "Q3 2025",
          },
        ]
      : [
          {
            phase: "Current Focus",
            items: [
              "Performance Optimization",
              "Advanced Patterns",
              "Testing Strategies",
            ],
            timeline: "Ongoing",
          },
          {
            phase: "Next Quarter",
            items: [
              "New Framework Features",
              "Security Best Practices",
              "DevOps Integration",
            ],
            timeline: "Q1 2025",
          },
        ],

    projects: category.isComingSoon
      ? [
          {
            name: "Smart Home Hub",
            status: "Planned",
            description: "IoT-based home automation system",
          },
          {
            name: "Environmental Monitor",
            status: "Planned",
            description: "Air quality and weather monitoring station",
          },
          {
            name: "Smart Garden",
            status: "Planned",
            description: "Automated plant care system with sensors",
          },
        ]
      : [
          {
            name: "E-Commerce Platform",
            status: "Completed",
            description: "Full-stack solution with payment integration",
          },
          {
            name: "Real-time Chat App",
            status: "Completed",
            description: "WebSocket-based messaging platform",
          },
          {
            name: "Analytics Dashboard",
            status: "In Progress",
            description: "Data visualization and reporting tool",
          },
        ],

    achievements: category.isComingSoon
      ? [
          {
            title: "Learning Plan Created",
            description: "Comprehensive IoT learning roadmap established",
          },
          {
            title: "Hardware Acquired",
            description: "Arduino and Raspberry Pi development kits obtained",
          },
          {
            title: "Community Joined",
            description: "Active in IoT developer communities and forums",
          },
        ]
      : [
          {
            title: "Performance Expert",
            description:
              "Optimized applications achieving 95%+ lighthouse scores",
          },
          {
            title: "Community Contributor",
            description: "Active contributor to open-source projects",
          },
          {
            title: "Best Practices Advocate",
            description: "Mentor for clean code and architecture patterns",
          },
        ],
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-md border-primary/20 neon-border">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 w-8 h-8 p-0 text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-lg bg-gradient-${category.color} glow-effect`}
            >
              <category.icon className="h-8 w-8 text-background" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-orbitron font-bold gradient-text text-left">
                {category.title}
                {category.isComingSoon && (
                  <Badge className="ml-3 bg-accent text-accent-foreground font-orbitron text-xs">
                    Coming Soon
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground font-rajdhani text-left">
                {techDetails.experience} Experience •{" "}
                {category.technologies.length} Technologies
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-orbitron font-semibold text-primary flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Overview
            </h3>
            <p className="text-muted-foreground font-rajdhani leading-relaxed">
              {techDetails.description}
            </p>
          </div>

          <Separator className="bg-primary/20" />

          {/* Technology Proficiency */}
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-semibold text-accent flex items-center gap-2">
              <Target className="h-5 w-5" />
              Technology Proficiency
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {techDetails.proficiencyLevels.map((tech: any, index: number) => (
                <div key={tech.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-orbitron font-medium">
                      {tech.name}
                    </span>
                    {tech.learning ? (
                      <Badge
                        variant="outline"
                        className="border-accent/50 text-accent font-rajdhani text-xs"
                      >
                        Coming Soon
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground font-rajdhani"></span>
                    )}
                  </div>
                  {/* <Progress
                    value={tech.learning ? 0 : tech.level}
                    className="h-2"
                  /> */}
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-primary/20" />

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-semibold text-primary flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Related Projects
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {techDetails.projects.map((project: any, index: number) => (
                <div
                  key={project.name}
                  className="p-4 bg-card/20 rounded-lg neon-border hover:bg-card/30 transition-colors duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-orbitron font-semibold text-foreground">
                      {project.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`font-rajdhani text-xs ${
                        project.status === "Completed"
                          ? "border-green-500/50 text-green-400"
                          : project.status === "In Progress"
                          ? "border-blue-500/50 text-blue-400"
                          : "border-amber-500/50 text-amber-400"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-rajdhani">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-primary/20" />

          {/* Achievements */}
          <div className="space-y-4">
            <h3 className="text-xl font-orbitron font-semibold text-accent flex items-center gap-2">
              <Award className="h-5 w-5" />
              Key Achievements
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {techDetails.achievements.map(
                (achievement: any, index: number) => (
                  <div
                    key={achievement.title}
                    className="flex gap-3 p-4 bg-card/20 rounded-lg neon-border"
                  >
                    <Star className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-orbitron font-semibold text-foreground mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground font-rajdhani">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {category.isComingSoon && (
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-primary hover:bg-gradient-glow text-primary-foreground font-orbitron font-medium">
                <Clock className="mr-2 h-4 w-4" />
                Follow Progress
              </Button>
              <Button
                variant="outline"
                className="neon-border hover:bg-accent/10 font-orbitron font-medium"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Learning Resources
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
