import { useCallback, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects.data";
import { useToast } from "@/hooks/use-toast";
import { defaultPdfOptions, type PdfOptions, type PdfTarget } from "./types";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useHeroAnimation } from "./hooks/useHeroAnimation";
import { useProjectNavigation } from "./hooks/useProjectNavigation";
import { usePdfGeneration } from "./hooks/usePdfGeneration";
import { HeroSection } from "./components/HeroSection";
import { ProjectTracker } from "./components/ProjectTracker";
import { ProjectCard } from "./components/ProjectCard";
import { PdfCustomizationDialog } from "./components/PdfCustomizationDialog";
import "@/css/projects-page.css";

const ProjectsShowcase = () => {
  const { toast } = useToast();
  const scrollProgress = useScrollProgress();
  const { typedHeroText, cursorVisible } = useHeroAnimation();

  const {
    activeSlug,
    setActiveSlug,
    sectionRefs,
    scrollToSlug,
    updateRouteForSlug,
    projectSlugs,
  } = useProjectNavigation();

  const { heroRef, isGeneratingPdf, pdfProgress, generatePdf } =
    usePdfGeneration(activeSlug, sectionRefs, projectSlugs);

  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfTarget, setPdfTarget] = useState<PdfTarget>("active");
  const [pdfOptions, setPdfOptions] = useState<PdfOptions>(defaultPdfOptions);

  const activeProject =
    projects.find((project) => project.slug === activeSlug) ?? projects[0];

  const handleShare = useCallback(
    async (slug?: string) => {
      const targetSlug = slug ?? activeSlug;
      const url = `${window.location.origin}/portfolio/${targetSlug}`;
      try {
        if (navigator.share) {
          await navigator.share({
            title: `Portfolio • ${activeProject.title}`,
            url,
          });
        } else {
          await navigator.clipboard.writeText(url);
          toast({
            title: "Link siap dibagikan",
            description: "Kami salin tautan ke clipboard.",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [activeProject.title, activeSlug, toast]
  );

  const handleHeroPrint = () => {
    window.print();
  };

  const handleProjectClick = (slug: typeof activeSlug) => {
    scrollToSlug(slug);
    setActiveSlug(slug);
    updateRouteForSlug(slug);
  };

  const activeSlugIndex = projectSlugs.indexOf(activeSlug);

  return (
    <div className="projects-page min-h-screen w-full">
      <Navigation />
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      <HeroSection
        typedHeroText={typedHeroText}
        cursorVisible={cursorVisible}
        activeProject={activeProject}
        activeSlugIndex={activeSlugIndex}
        totalProjects={projects.length}
        onPrint={handleHeroPrint}
        onShare={() => handleShare()}
        onCustomPdf={() => {
          setPdfTarget("active");
          setPdfModalOpen(true);
        }}
        heroRef={heroRef}
      />

      <div className="flex w-full flex-col pb-24 pt-12 ">
        <ProjectTracker
          projects={projects}
          activeSlug={activeSlug}
          activeProject={activeProject}
          onProjectClick={handleProjectClick}
        />

        <div className="flex-1 space-y-16 grid w-full justify-center ">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isActive={project.slug === activeSlug}
              registerRef={(node) => {
                sectionRefs.current[project.slug] = node;
              }}
            />
          ))}
        </div>
      </div>

      <Footer />

      <PdfCustomizationDialog
        open={pdfModalOpen}
        onOpenChange={setPdfModalOpen}
        options={pdfOptions}
        onOptionsChange={setPdfOptions}
        isGenerating={isGeneratingPdf}
        progress={pdfProgress}
        target={pdfTarget}
        onTargetChange={setPdfTarget}
        onGenerate={async () => {
          await generatePdf(pdfTarget, pdfOptions);
          setPdfModalOpen(false);
        }}
      />
    </div>
  );
};

export default ProjectsShowcase;
