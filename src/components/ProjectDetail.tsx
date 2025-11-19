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
  ShieldCheck,
} from "lucide-react";
import { ProjectTypes } from "@/types/projects.types";

interface ProjectDetailProps {
  project: ProjectTypes;
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

        <div className="flex-1 overflow-y-auto px-6 py-6 w-full">
          <div className="mx-auto space-y-8 ">
            {/* //! Project Overview */}
            <div className="flex gap-6 max-w-fit ">
              {/* //! Main Image */}
              <div className="space-y-4 ">
                <div className="relative rounded-lg overflow-hidden neon-border w-max">
                  <img
                    src={project.qrCodeImage}
                    alt={project.title}
                    className="p-5"
                    width={"400px"}
                    height={"400px"}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-primary/10" />
                </div>

                {/* //! Action Buttons project */}
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
              {/* // ! Project Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-orbitron font-semibold text-primary mb-2">
                    Project Description
                  </h3>
                  <p className="text-muted-foreground font-rajdhani leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* // ! Project Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    <div>
                      {/* // ! Duration */}
                      <p className="text-xs text-muted-foreground font-rajdhani">
                        Duration
                      </p>
                      <p className="font-orbitron font-semibold text-sm">
                        {project.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-secondary" />
                    <div>
                      {/* // ! team size */}
                      <p className="text-xs text-muted-foreground font-rajdhani">
                        Team Size
                      </p>
                      <p className="font-orbitron font-semibold text-sm">
                        {project.teamSize}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      {/* // ! start date */}
                      <p className="text-xs text-muted-foreground font-rajdhani">
                        Start Date
                      </p>
                      <p className="font-orbitron font-semibold text-sm">
                        {project.startDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <div>
                      {/* // ! status */}
                      <p className="text-xs text-muted-foreground font-rajdhani">
                        Status
                      </p>
                      <p className="font-orbitron font-semibold text-sm">
                        {project.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      {/* // ! end date deadline */}
                      <p className="text-xs text-muted-foreground font-rajdhani">
                        Deadline
                      </p>
                      <p className="font-orbitron font-semibold text-sm">
                        {project.endDate}
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
                {project.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-primary" />
                    <span className="text-muted-foreground font-rajdhani">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Study */}
            <div className="space-y-3">
              <h3 className="text-xl font-orbitron font-semibold text-primary">
                Case Study
              </h3>
              <p className="text-muted-foreground font-rajdhani leading-relaxed">
                {project.caseStudy}
              </p>
            </div>

            {/* //! screenshots sections*/}
            {/* 📸 Screenshots Sections */}
            <div className="space-y-12  w-full">
              {/* 💻 Laptop Screenshots */}
              {project.image.LP?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-orbitron font-semibold text-secondary text-center">
                    Laptop Screenshots
                  </h3>
                  <div className="flex flex-wrap justify-center gap-8">
                    {project.image.LP.map(
                      (screenshot: string, index: number) => (
                        <div
                          key={`lp-${index}`}
                          className="bg-muted/30 p-4 rounded-xl shadow-md neon-border hover:shadow-lg transition-all duration-300"
                        >
                          <img
                            src={screenshot}
                            alt={`Laptop Screenshot ${index + 1}`}
                            className="w-[420px] h-auto object-contain rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* 📱 Tablet Screenshots */}
              {project.image.TB?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-orbitron font-semibold text-accent text-center">
                    Tablet Screenshots
                  </h3>
                  <div className="flex flex-wrap justify-center gap-8">
                    {project.image.TB.map(
                      (screenshot: string, index: number) => (
                        <div
                          key={`tb-${index}`}
                          className="bg-muted/30 p-4 rounded-xl shadow-md neon-border hover:shadow-lg transition-all duration-300"
                        >
                          <img
                            src={screenshot}
                            alt={`Tablet Screenshot ${index + 1}`}
                            className="w-[300px] h-auto object-contain rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* 📱 Handphone Screenshots */}
              {project.image.HP?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-orbitron font-semibold text-primary text-center">
                    Handphone Screenshots
                  </h3>
                  <div className="flex flex-wrap justify-center gap-8">
                    {project.image.HP.map(
                      (screenshot: string, index: number) => (
                        <div
                          key={`hp-${index}`}
                          className="bg-muted/30 p-4 rounded-xl shadow-md neon-border hover:shadow-lg transition-all duration-300"
                        >
                          <img
                            src={screenshot}
                            alt={`Handphone Screenshot ${index + 1}`}
                            className="w-[220px] h-auto object-contain rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
