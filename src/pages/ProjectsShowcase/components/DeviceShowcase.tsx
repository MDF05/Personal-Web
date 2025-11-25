import { Sparkles } from "lucide-react";
import type { ProjectTypes } from "@/types/projects.types";
import { TypewriterText } from "./ProjectInfoPanel";

type DeviceShowcaseProps = {
  project: ProjectTypes;
};

export const DeviceShowcase = ({ project }: DeviceShowcaseProps) => {
  const laptopImage = project.image.LP[0] ?? project.image.HP[0];
  const tabletImage = project.image.TB[0] ?? project.image.HP[1];
  const mobileImage = project.image.HP[0] ?? project.image.LP[1];

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.5em] text-white/40">
        <Sparkles className="h-4 w-4 text-cyan-300" />
        CYBER SHOWCASE
      </div>

      <div className="grid gap-6">
        <div className="device-shell">
          <p className="mb-2 text-xs text-white/50">LAPTOP</p>
          {laptopImage && (
            <img
              src={laptopImage}
              alt={`${project.title} laptop preview`}
              className="w-full rounded-2xl "
            />
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_0.75fr] ">
          <div className="device-shell tablet-shell ">
            <p className="mb-2 text-xs text-white/50">TABLET</p>
            {tabletImage && (
              <img
                src={tabletImage}
                alt={`${project.title} tablet preview`}
                className="h-[450px] rounded-2xl object-cover"
              />
            )}
          </div>
          <div className="device-shell mobile-shell flex flex-col items-center justify-between">
            <div className="w-full">
              <p className="mb-2 text-xs text-white/50">MOBILE</p>
              {mobileImage && (
                <img
                  src={mobileImage}
                  alt={`${project.title} mobile preview`}
                  className="h-[450px] rounded-2xl object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* // ! info project */}
        <div className="grid gap-5">
          <div data-section="description" className="space-y-2">
            <p className="text-xs uppercase tracking-[0.5em] text-white/40">
              Description
            </p>
            <TypewriterText text={project.description} />
          </div>

          <div data-section="case-study">
            <p className="text-xs uppercase tracking-[0.5em] text-white/40">
              Case Study
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              {project.caseStudy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
