import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/seperator";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  ExternalLink,
  Github,
  X,
  Calendar,
  Users,
  Clock,
  Star,
  GitBranch,
  Eye,
} from "lucide-react";

interface ProjectDetailProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetail = ({
  project,
  isOpen,
  onClose,
}: ProjectDetailProps) => {
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

  if (!project) return null;

  // Mock additional project data for detailed view
  const projectDetails = {
    ...project,
    duration: "3 months",
    teamSize: "4 developers",
    startDate: "2024-01-15",
    status: "Completed",
    metrics: {
      stars: 42,
      forks: 15,
      views: 1250,
      commits: 180,
    },
    features: [
      "User Authentication & Authorization",
      "Real-time Data Synchronization",
      "Responsive Design for All Devices",
      "Advanced Search & Filtering",
      "Performance Optimization",
      "Comprehensive Testing Suite",
    ],
    caseStudy:
      "This project was built to solve the challenge of efficient team collaboration in remote work environments. The solution implements real-time synchronization, intuitive user interface, and robust security features to ensure seamless workflow management.",
    screenshots: [
      project.image,
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    ],
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[90vh] bg-background/95 backdrop-blur-md border-primary/20 neon-border">
        <DrawerHeader className="relative border-b border-primary/10">
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 w-8 h-8 p-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>

          <DrawerTitle className="text-2xl font-orbitron font-bold gradient-text text-left pr-12">
            {project.title}
          </DrawerTitle>

          <DrawerDescription className="text-lg text-muted-foreground font-rajdhani text-left">
            {project.category === "web"
              ? "Web Application"
              : project.category === "mobile"
              ? "Mobile Application"
              : "Desktop Application"}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Project Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Main Image */}
              <div className="space-y-4">
                <div className="relative h-64 rounded-lg overflow-hidden neon-border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-primary/10" />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-gradient-primary hover:bg-gradient-glow text-primary-foreground font-orbitron font-medium"
                    onClick={() => window.open(project.demo, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 neon-border hover:bg-accent/10 font-orbitron font-medium"
                    onClick={() => window.open(project.github, "_blank")}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-orbitron font-semibold text-primary mb-2">
                    Project Description
                  </h3>
                  <p className="text-muted-foreground font-rajdhani leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Project Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground font-rajdhani">
                        Duration
                      </p>
                      <p className="font-orbitron font-semibold text-sm">
                        {projectDetails.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground font-rajdhani">
                        Team Size
                      </p>
                      <p className="font-orbitron font-semibold text-sm">
                        {projectDetails.teamSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground font-rajdhani">
                        Status
                      </p>
                      <p className="font-orbitron font-semibold text-sm">
                        {projectDetails.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground font-rajdhani">
                        GitHub Stars
                      </p>
                      <p className="font-orbitron font-semibold text-sm">
                        {projectDetails.metrics.stars}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-primary/20" />

            {/* Technologies Used */}
            <div className="space-y-3">
              <h3 className="text-xl font-orbitron font-semibold text-accent">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10 transition-colors duration-300 font-rajdhani"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-xl font-orbitron font-semibold text-secondary">
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 gap-2">
                {projectDetails.features.map(
                  (feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-primary" />
                      <span className="text-muted-foreground font-rajdhani">
                        {feature}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Case Study */}
            <div className="space-y-3">
              <h3 className="text-xl font-orbitron font-semibold text-primary">
                Case Study
              </h3>
              <p className="text-muted-foreground font-rajdhani leading-relaxed">
                {projectDetails.caseStudy}
              </p>
            </div>

            {/* GitHub Statistics */}
            <div className="space-y-3">
              <h3 className="text-xl font-orbitron font-semibold text-accent">
                Project Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-card/20 rounded-lg neon-border">
                  <Star className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xl font-orbitron font-bold gradient-text">
                    {projectDetails.metrics.stars}
                  </p>
                  <p className="text-xs text-muted-foreground font-rajdhani">
                    Stars
                  </p>
                </div>

                <div className="text-center p-4 bg-card/20 rounded-lg neon-border">
                  <GitBranch className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <p className="text-xl font-orbitron font-bold gradient-text">
                    {projectDetails.metrics.forks}
                  </p>
                  <p className="text-xs text-muted-foreground font-rajdhani">
                    Forks
                  </p>
                </div>

                <div className="text-center p-4 bg-card/20 rounded-lg neon-border">
                  <Eye className="h-6 w-6 mx-auto mb-2 text-secondary" />
                  <p className="text-xl font-orbitron font-bold gradient-text">
                    {projectDetails.metrics.views}
                  </p>
                  <p className="text-xs text-muted-foreground font-rajdhani">
                    Views
                  </p>
                </div>

                <div className="text-center p-4 bg-card/20 rounded-lg neon-border">
                  <Github className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xl font-orbitron font-bold gradient-text">
                    {projectDetails.metrics.commits}
                  </p>
                  <p className="text-xs text-muted-foreground font-rajdhani">
                    Commits
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Screenshots */}
            <div className="space-y-3">
              <h3 className="text-xl font-orbitron font-semibold text-secondary">
                Screenshots
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {projectDetails.screenshots.map(
                  (screenshot: string, index: number) => (
                    <div
                      key={index}
                      className="relative h-32 rounded-lg overflow-hidden neon-border"
                    >
                      <img
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
