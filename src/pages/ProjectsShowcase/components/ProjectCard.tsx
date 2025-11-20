import { Badge } from "@/components/ui/badge";
import type { ProjectTypes } from "@/types/projects.types";
import { cn } from "@/lib/utils";
import { DeviceShowcase } from "./DeviceShowcase";
import { ActionBar } from "./ActionBar";
import { ProjectInfoPanel } from "./ProjectInfoPanel";

type ProjectCardProps = {
  project: ProjectTypes;
  isActive: boolean;
  registerRef: (node: HTMLDivElement | null) => void;
  onShare: () => void;
  onCopyLink: () => void;
  onGenerate: () => void;
  onDownloadQuick: () => void;
};

export const ProjectCard = ({
  project,
  isActive,
  registerRef,
  onCopyLink,
  onShare,
  onGenerate,
  onDownloadQuick,
}: ProjectCardProps) => {
  const primaryColor = isActive ? "text-cyan-300" : "text-white/60";

  return (
    <article
      id={`project-${project.slug}`}
      data-slug={project.slug}
      ref={registerRef}
      className={cn(
        "project-card rounded-3xl border px-6 py-10 shadow-xl transition-all",
        isActive ? "border-cyan-500/60 shadow-cyan-500/20" : "border-white/5"
      )}
    >
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">
            #{project.id.toString().padStart(2, "0")}
          </p>
          <h2 className="text-3xl font-bold text-white">{project.title}</h2>
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

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <DeviceShowcase project={project} />

        <div className="flex flex-col gap-6">
          <ActionBar
            onDownload={onDownloadQuick}
            onGenerate={onGenerate}
            onShare={onShare}
            onCopy={onCopyLink}
            demoUrl={project.demo}
          />

          <ProjectInfoPanel project={project} primaryColor={primaryColor} />
        </div>
      </div>
    </article>
  );
};

