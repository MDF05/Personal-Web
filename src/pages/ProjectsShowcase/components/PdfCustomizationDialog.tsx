import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switcth";
import { Label } from "@/components/ui/lable";
import { projects } from "@/data/projects.data";
import type { PdfTarget, PdfOptions } from "../types";

type PdfCustomizationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: PdfOptions;
  onOptionsChange: (options: PdfOptions) => void;
  progress: string;
  isGenerating: boolean;
  target: PdfTarget;
  onTargetChange: (target: PdfTarget) => void;
  onGenerate: () => void;
};

const ToggleRow = ({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center justify-between rounded-2xl border border-white/10 p-4">
    <span className="text-sm text-white/70">{label}</span>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);

export const PdfCustomizationDialog = ({
  open,
  onOpenChange,
  options,
  onOptionsChange,
  progress,
  isGenerating,
  target,
  onTargetChange,
  onGenerate,
}: PdfCustomizationDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-[#0b0b12] text-white">
      <DialogHeader>
        <DialogTitle>Custom PDF Portfolio</DialogTitle>
        <DialogDescription className="text-white/70">
          Pilih kualitas, orientasi, dan konten PDF sebelum diunduh.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div>
          <Label htmlFor="pdf-target" className="text-white/80">
            Ruang lingkup
          </Label>
          <select
            id="pdf-target"
            value={target}
            onChange={(event) =>
              onTargetChange(event.target.value as PdfTarget)
            }
            className="mt-2 w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-white focus:outline-none"
          >
            <option value="active" className="bg-[#0b0b12] text-white">
              Project aktif
            </option>
            <option value="all" className="bg-[#0b0b12] text-white">
              Semua project
            </option>
            <option value="hero" className="bg-[#0b0b12] text-white">
              Hero Intro (Halaman Pertama)
            </option>
            {projects.map((project) => (
              <option
                key={project.slug}
                value={project.slug}
                className="bg-[#0b0b12] text-white"
              >
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-sm text-white/70">Orientasi</p>
            <div className="mt-3 flex gap-3">
              {(["portrait", "landscape"] as const).map((layout) => (
                <Button
                  key={layout}
                  variant={options.layout === layout ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => onOptionsChange({ ...options, layout })}
                >
                  {layout === "portrait" ? "Portrait" : "Landscape"}
                </Button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-sm text-white/70">Kualitas</p>
            <div className="mt-3 flex gap-3">
              {(["standard", "high"] as const).map((quality) => (
                <Button
                  key={quality}
                  variant={options.quality === quality ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => onOptionsChange({ ...options, quality })}
                >
                  {quality === "standard" ? "Standard" : "High"}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ToggleRow
            label="Sertakan case study"
            checked={options.includeCaseStudy}
            onCheckedChange={(checked) =>
              onOptionsChange({ ...options, includeCaseStudy: checked })
            }
          />
          <ToggleRow
            label="Sertakan daftar fitur"
            checked={options.includeFeatures}
            onCheckedChange={(checked) =>
              onOptionsChange({ ...options, includeFeatures: checked })
            }
          />
        </div>

        {progress && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            {progress}
          </div>
        )}
      </div>

      <DialogFooter>
        <Button
          variant="ghost"
          onClick={() => onOpenChange(false)}
          disabled={isGenerating}
        >
          Batal
        </Button>
        <Button
          onClick={onGenerate}
          disabled={isGenerating}
          className="bg-cyan-500 text-black hover:bg-cyan-400"
        >
          {isGenerating ? "Sedang memproses..." : "Generate PDF"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

