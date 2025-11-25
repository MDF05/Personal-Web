import { useEffect, useState } from "react";
import type { ProjectTypes } from "@/types/projects.types";
import { getTechIcon } from "../utils/getTechIcon";
import { profileData } from "@/data/profile.data";

type ProjectInfoPanelProps = {
  project: ProjectTypes;
  primaryColor: string;
};

export const InfoRow = ({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string;
  colorClass: string;
}) => (
  <div className="flex items-center justify-between text-sm text-white/70">
    <span>{label}</span>
    <span className={colorClass}>{value}</span>
  </div>
);

export const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index));
      index += 1;
      if (index > text.length) {
        clearInterval(interval);
        setDisplayed(text);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="text-sm leading-relaxed text-white/80">
      {displayed}
      <span className="ml-1 text-cyan-300">▌</span>
    </p>
  );
};

export const ProjectInfoPanel = ({
  project,
}: // primaryColor,
ProjectInfoPanelProps) => (
  <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
    {/* // ! detail project */}
    <div className="grid gap-4 text-sm grid-cols-[30%_50%] justify-between ">
      <InfoRow
        label="Kategori"
        value={project.category.toUpperCase()}
        colorClass={"text-emerald-300"}
      />
      <InfoRow
        label="Start Date"
        value={project.startDate}
        colorClass={"text-emerald-300"}
      />
      <InfoRow
        label="Team"
        value={project.teamSize}
        colorClass={"text-emerald-300"}
      />
      <InfoRow
        label="Deadline"
        value={project.endDate}
        colorClass={"text-emerald-300"}
      />
    </div>

    <div data-section="description" className="space-y-2">
      <p className="text-xs uppercase tracking-[0.5em] text-white/40">
        Description
      </p>
      <TypewriterText text={project.description} />
    </div>

    {/* // ! techonologies */}
    <div>
      <p className="text-xs uppercase tracking-[0.5em] text-white/40">
        TECHNOLOGIES
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.technologies.map((tech) => {
          const TechIcon = getTechIcon(tech);
          return (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 px-3 py-1 text-xs text-cyan-100"
            >
              {TechIcon && <TechIcon className="h-3.5 w-3.5" />}
              {tech}
            </span>
          );
        })}
      </div>
    </div>

    <div>
      <div className="flex justify-center items-center gap-1">
        <p className="text-xs uppercase tracking-[0.5em] text-white/40">
          source code :
        </p>
        <a
          href={`${project.github}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white text-cyan-200 "
        >
          {project.github}
        </a>
      </div>
      <div className="flex justify-center items-center gap-1">
        <p className="text-xs uppercase tracking-[0.5em] text-white/40">
          more about this project :
        </p>
        <a
          href={`${profileData.currentUrl}/project/${project.title
            .split(" ")
            .join("-")
            .toLocaleLowerCase()}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-white text-cyan-200 "
        >
          {`${profileData.currentUrl}/project/${project.title
            .split(" ")
            .join("-")
            .toLocaleLowerCase()}`}
        </a>
      </div>
    </div>
  </div>
);
