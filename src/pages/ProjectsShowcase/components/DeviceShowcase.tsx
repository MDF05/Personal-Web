import type { ProjectTypes } from "@/types/projects.types";

type DeviceShowcaseProps = {
  project: ProjectTypes;
};

export const DeviceShowcase = ({ project }: DeviceShowcaseProps) => {
  const laptopImage = project.image.LP[0] ?? project.image.HP[0];
  const tabletImage = project.image.TB[0] ?? project.image.HP[1];
  const mobileImage = project.image.HP[0] ?? project.image.LP[1];

  return (
    <div className="glass-panel rounded-3xl h-[700px] overflow-hidden p-2 ">
      <div className="grid gap-6">
        <div className="grid gap-4 grid-cols-[69%_29%] w-full">
          <div className="device-shell h-[300px]">
            {laptopImage && (
              <img
                src={laptopImage}
                alt={`${project.title} laptop preview`}
                className="w-[480px] h-[280px] rounded-2xl "
              />
            )}
          </div>
          <div className="device-shell w-full mobile-shell flex">
            {mobileImage && (
              <img
                src={mobileImage}
                alt={`${project.title} mobile preview`}
                className="h-[280px] rounded-2xl object-cover"
              />
            )}
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 w-full  justify-center items-center">
          <div className="device-shell tablet-shell h-[340px] flex justify-center items-center">
            {tabletImage && (
              <img
                src={tabletImage}
                alt={`${project.title} tablet preview`}
                className="h-[300px] rounded-2xl object-cover"
              />
            )}
          </div>
          <div className=" h-[340px] flex flex-col ">
            <div className="qr-shell mt-4 w-full rounded-2xl border border-white/10 p-4">
              <p className="mb-2 text-xs text-white/40">SCAN ME</p>
              <img
                src={project.qrCodeImage}
                alt={`${project.title} QR`}
                className="mx-auto h-52 w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
