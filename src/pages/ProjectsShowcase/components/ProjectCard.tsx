import { Badge } from "@/components/ui/badge";
import type { ProjectTypes } from "@/types/projects.types";
import { cn } from "@/lib/utils";
import { DeviceShowcase } from "./DeviceShowcase";
import { ProjectInfoPanel } from "./ProjectInfoPanel";

type ProjectCardProps = {
  project: ProjectTypes;
  isActive: boolean;
  registerRef: (node: HTMLDivElement | null) => void;
};

export const ProjectCard = ({
  project,
  isActive,
  registerRef,
}: ProjectCardProps) => {
  const primaryColor = isActive ? "text-cyan-300" : "text-white/60";

  return (
    <article
      id={`project-${project.slug}`}
      data-slug={project.slug}
      ref={registerRef}
      className={cn(
        "project-card rounded-3xl border px-6 py-4 shadow-xl transition-all bg-red-500",
        isActive ? "border-cyan-500/60 shadow-cyan-500/20" : "border-white/5"
      )}
    >
      <header className="mb-3 flex flex-wrap items-center justify-between gap-4 ">
        <div>
          <div className=" text-3xl flex gap-2">
            <p className=" uppercase tracking-[0.4em] text-white/50">
              #{project.id.toString().padStart(2, "0")}
            </p>
            <h2 className=" font-bold text-white">{project.title}</h2>
          </div>
          <a
            href={`${project.demo}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white text-cyan-200 "
          >
            {`${project.demo}`}
          </a>
        </div>
        <Badge
          className={cn(
            "px-4 py-2 text-xs uppercase tracking-wide",
            project.status.toLowerCase().includes("complete")
              ? "bg-emerald-500/20 text-emerald-200"
              : "bg-yellow-500/20 text-yellow-200"
          )}
        >
          {project.status}
        </Badge>
      </header>

      <div className="grid gap-8 ">
        <DeviceShowcase project={project} />

        <div className="flex flex-col gap-6 ">
          <ProjectInfoPanel project={project} primaryColor={primaryColor} />
        </div>
      </div>
    </article>
  );
};
