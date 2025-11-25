import { useEffect, useState } from "react";
import type { ProjectTypes } from "@/types/projects.types";
import { getTechIcon } from "../utils/getTechIcon";

type ProjectInfoPanelProps = {
  project: ProjectTypes;
  primaryColor: string;
};

const InfoRow = ({
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
  primaryColor,
}: ProjectInfoPanelProps) => (
  <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
    {/* // ! detail project */}
    <div className="grid gap-4 text-sm">
      <InfoRow
        label="Timeline"
        value={project.duration}
        colorClass={primaryColor}
      />
      <InfoRow
        label="Start Date"
        value={project.startDate}
        colorClass={primaryColor}
      />
      <InfoRow
        label="Deadline"
        value={project.endDate}
        colorClass={primaryColor}
      />
      <InfoRow
        label="Kategori"
        value={project.category.toUpperCase()}
        colorClass={primaryColor}
      />
      <InfoRow
        label="Team"
        value={project.teamSize}
        colorClass={primaryColor}
      />
    </div>

    {/* // ! features */}
    <div data-section="features">
      <p className="text-xs uppercase tracking-[0.5em] text-white/40">
        Features
      </p>
      <div className="mt-2 grid gap-2 text-sm text-white/80">
        {project.features.map((feature) => (
          <div
            key={feature}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
          >
            {feature}
          </div>
        ))}
      </div>
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

    {/* // ! github link */}
    <div>
      <p className="text-xs uppercase tracking-[0.5em] text-white/40">
        github link
      </p>
      <a
        href={project.demo}
        target="_blank"
        rel="noreferrer"
        className="hover:text-white text-cyan-200 "
      >
        {project.github}
      </a>
    </div>

    {/* // ! qr-code image */}
    <div>
      <p className="text-xs uppercase tracking-[0.5em] text-white/40">
        live demo
      </p>
      <a
        href={project.demo}
        target="_blank"
        rel="noreferrer"
        className="hover:text-white text-cyan-200 "
      >
        {project.demo}
      </a>
      <div className="qr-shell mt-4 w-full rounded-2xl border border-white/10 p-4">
        <p className="mb-2 text-xs text-white/40">SCAN ME</p>
        <img
          src={project.qrCodeImage}
          alt={`${project.title} QR`}
          className="mx-auto h-52 w-full object-contain"
        />
      </div>
    </div>

    {/* // ! action link */}
    {/* <div
      className="flex flex-wrap gap-3 text-cyan-200 justify-center text-2xl"
      data-section="links"
    >
      <a
        href={project.demo}
        target="_blank"
        rel="noreferrer"
        className="hover:text-white"
      >
        Live Demo
      </a>
      <span className="text-white/30">•</span>
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="hover:text-white"
      >
        GitHub
      </a>
    </div> */}
  </div>
);
