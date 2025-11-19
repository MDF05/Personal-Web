import { ProjectTypes } from "@/types/projects.types";
import { ExternalLink, Github, LucideProps } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

export default function ProjectItem({
  project,
  CategoryIcon,
  index,
  isVisible,
  setSelectedProject,
}: {
  project: ProjectTypes;
  CategoryIcon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  index: number;
  isVisible: boolean;
  setSelectedProject: React.Dispatch<React.SetStateAction<ProjectTypes | null>>;
}) {
  const randomLpImageIndex = Math.floor(
    Math.random() * project.image.LP.length
  );
  const randomTbImageIndex = Math.floor(
    Math.random() * project.image.TB.length
  );
  const randomHpImageIndex = Math.floor(
    Math.random() * project.image.HP.length
  );

  return (
    <div
      className={`group cursor-pointer overflow-hidden bg-card/30 backdrop-blur-sm neon-border hover:neon-border-primary transition-all duration-500 hover:scale-105 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 "
      } ${project.featured ? "ring-2 ring-accent/30" : ""}`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onClick={() => setSelectedProject(project)}
    >
      <div className="relative h-48 overflow-hidden flex justify-center ">
        <img
          src={
            project.category == "web"
              ? project.image.LP[randomLpImageIndex]
              : project.category == "mobile"
              ? project.image.TB[randomTbImageIndex]
              : project.image.HP[randomHpImageIndex]
          }
          alt={project.title}
          className={
            project.category == "desktop"
              ? "w-[95%] h-[95%] transition-transform duration-500 group-hover:scale-110"
              : project.category == "mobile"
              ? "w-[45%] transition-transform duration-500 group-hover:scale-110"
              : "w-[100%px] scale-125 transition-transform duration-500 group-hover:scale-15  0"
          }
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

        {/* Category icon */}
        <div className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg">
          <CategoryIcon className="h-4 w-4 text-primary" />
        </div>

        {/* Featured badge */}
        {project.featured && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground font-orbitron text-xs">
            Featured
          </Badge>
        )}
      </div>

      {/* Project content */}
      <div className="p-6">
        <h3 className="text-xl font-orbitron font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-muted-foreground font-rajdhani mb-4 leading-relaxed line-clamp-4">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 transition-colors duration-300 font-rajdhani text-xs"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            size="sm"
            className="flex-1 bg-gradient-primary hover:bg-gradient-glow text-primary-foreground font-orbitron font-medium transition-all duration-300"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="neon-border hover:bg-accent/10 font-orbitron font-medium"
          >
            <Github className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
