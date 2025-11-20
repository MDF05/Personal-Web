import { useCallback, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";
import { projects } from "@/data/projects.data";
import type { PdfTarget, PdfOptions, ProjectSlug } from "../types";
import { applyPdfVisibility } from "../utils/applyPdfVisibility";

export const usePdfGeneration = (
  activeSlug: ProjectSlug,
  sectionRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>,
  projectSlugs: string[]
) => {
  const { toast } = useToast();
  const heroRef = useRef<HTMLElement | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState("");

  const generatePdf = useCallback(
    async (
      target: PdfTarget,
      options: PdfOptions,
      { silent }: { silent?: boolean } = {}
    ) => {
      let elements: HTMLElement[] = [];

      if (target === "hero") {
        if (!heroRef.current) {
          toast({
            title: "Bagian tidak ditemukan",
            description: "Hero section tidak ditemukan.",
            variant: "destructive",
          });
          return;
        }
        elements = [heroRef.current];
      } else if (target === "all") {
        const projectElements = projectSlugs
          .map((slug) => sectionRefs.current[slug])
          .filter(Boolean) as HTMLElement[];
        if (heroRef.current) {
          elements = [heroRef.current, ...projectElements];
        } else {
          elements = projectElements;
        }
      } else {
        const slug =
          target === "active" ? activeSlug : (target as ProjectSlug);
        const node = sectionRefs.current[slug];
        if (!node) {
          toast({
            title: "Bagian tidak ditemukan",
            description: "Coba gulir hingga project tampil penuh.",
            variant: "destructive",
          });
          return;
        }
        elements = [node];
      }

      if (!elements.length) {
        toast({
          title: "Bagian tidak ditemukan",
          description: "Coba gulir hingga project tampil penuh.",
          variant: "destructive",
        });
        return;
      }

      setIsGeneratingPdf(true);
      setPdfProgress("Menyiapkan render...");
      try {
        const orientation = options.layout === "portrait" ? "p" : "l";
        const pdf = new jsPDF(orientation, "mm", "a4");

        for (let index = 0; index < elements.length; index += 1) {
          setPdfProgress(`Rendering ${index + 1}/${elements.length}...`);
          const element = elements[index];

          const isHero = element === heroRef.current;
          const teardown = isHero
            ? () => {}
            : applyPdfVisibility(element, options);

          const canvas = await html2canvas(element, {
            scale: options.quality === "high" ? 2 : 1.2,
            useCORS: true,
            backgroundColor: "#05050f",
            windowWidth: element.scrollWidth,
          });
          teardown();

          const img = canvas.toDataURL("image/png", 1);
          const imgProps = pdf.getImageProperties(img);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          if (index !== 0) pdf.addPage();
          pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
        }

        const filename =
          target === "all"
            ? "mdf-all-projects.pdf"
            : target === "hero"
            ? "mdf-hero-intro.pdf"
            : `${(
                target === "active" ? activeSlug : (target as string)
              ).replace(/-/g, "_")}.pdf`;
        pdf.save(filename);
        toast({
          title: "PDF siap!",
          description: "Berhasil membuat dokumen portfolio.",
        });
      } catch (error) {
        toast({
          title: "Gagal membuat PDF",
          description:
            error instanceof Error ? error.message : "Terjadi kesalahan.",
          variant: "destructive",
        });
      } finally {
        setIsGeneratingPdf(false);
        setPdfProgress("");
      }
    },
    [activeSlug, projectSlugs, sectionRefs, toast]
  );

  return {
    heroRef,
    isGeneratingPdf,
    pdfProgress,
    generatePdf,
  };
};

