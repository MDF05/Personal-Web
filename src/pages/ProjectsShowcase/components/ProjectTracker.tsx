import type { ProjectTypes } from "@/types/projects.types";
import { cn } from "@/lib/utils";
import type { ProjectSlug } from "../types";

type ProjectTrackerProps = {
  projects: ProjectTypes[];
  activeSlug: ProjectSlug;
  activeProject: ProjectTypes;
  onProjectClick: (slug: ProjectSlug) => void;
};

export const ProjectTracker = ({
  projects,
  activeSlug,
  activeProject,
  onProjectClick,
}: ProjectTrackerProps) => {
  return (
    <aside className="project-tracker print-hidden">
      <div className="mb-4 flex items-center justify-between text-sm text-white/70">
        <span>
          Project #{projects.findIndex((p) => p.slug === activeSlug) + 1}/
          {projects.length}
        </span>
        <span className="text-cyan-300">{activeProject.title}</span>
      </div>
      <div className="space-y-2">
        {projects.map((project) => (
          <button
            key={project.slug}
            className={cn(
              project.slug === activeSlug ? "active" : "",
              "transition-colors"
            )}
            onClick={() => onProjectClick(project.slug)}
          >
            {project.title}
          </button>
        ))}
      </div>
    </aside>
  );
};
