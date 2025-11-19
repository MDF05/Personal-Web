import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Link2,
  Share2,
  Download,
  Maximize2,
  Eye,
  FileDown,
  Printer,
  Mail,
  Sparkles,
} from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useToast } from "@/hooks/use-toast";
import { projects } from "@/data/projects.data";
import type { ProjectTypes } from "@/types/projects.types";
import { cn } from "@/lib/utils";

import profileImage from "@/assets/hero/1.png";
import "@/css/projects-page.css";

type ProjectSlug = (typeof projects)[number]["slug"];
type PdfTarget = "active" | "all" | ProjectSlug;

type PdfOptions = {
  layout: "portrait" | "landscape";
  quality: "standard" | "high";
  includeCaseStudy: boolean;
  includeFeatures: boolean;
};

const defaultPdfOptions: PdfOptions = {
  layout: "portrait",
  quality: "high",
  includeCaseStudy: true,
  includeFeatures: true,
};

const ProjectsShowcase = () => {
  const { projectSlug } = useParams<{ projectSlug?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const projectSlugs = useMemo(
    () => projects.map((project) => project.slug),
    []
  );

  const [activeSlug, setActiveSlug] = useState<ProjectSlug>(
    (projectSlug && projectSlugs.includes(projectSlug)
      ? (projectSlug as ProjectSlug)
      : projectSlugs[0]) as ProjectSlug
  );
  const [typedHeroText, setTypedHeroText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfTarget, setPdfTarget] = useState<PdfTarget>("active");
  const [pdfOptions, setPdfOptions] = useState<PdfOptions>(defaultPdfOptions);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState("");

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const binaryParticles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        id: `bit-${index}`,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        value: Math.random() > 0.5 ? "0101" : "1010",
      })),
    []
  );

  const activeProject =
    projects.find((project) => project.slug === activeSlug) ?? projects[0];

  /**
   * Typing animation for hero headline
   */
  useEffect(() => {
    const targetText = "FULLSTACK DEVELOPER";
    let idx = 0;
    const interval = setInterval(() => {
      setTypedHeroText(targetText.slice(0, idx));
      idx += 1;
      if (idx > targetText.length) {
        clearInterval(interval);
        setTypedHeroText(targetText);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  /**
   * Track scroll progress to power top neon bar
   */
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  /**
   * Sync state whenever route param changes (e.g. user visits /projects/circle)
   */
  useEffect(() => {
    if (!projectSlug) {
      return;
    }

    if (!projectSlugs.includes(projectSlug)) {
      navigate("/projects", { replace: true });
      toast({
        title: "Project tidak ditemukan",
        description: "Kami mengarahkan Anda ke daftar project.",
      });
      return;
    }

    if (projectSlug !== activeSlug) {
      setActiveSlug(projectSlug as ProjectSlug);
      setTimeout(() => scrollToSlug(projectSlug, false), 300);
    }
  }, [projectSlug, projectSlugs, activeSlug, navigate, toast]);

  /**
   * IntersectionObserver to detect active project and update URL
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const slug = visible.target.getAttribute("data-slug") as ProjectSlug;
        if (slug && slug !== activeSlug) {
          setActiveSlug(slug);
          updateRouteForSlug(slug);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    projectSlugs.forEach((slug) => {
      const ref = sectionRefs.current[slug];
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeSlug, projectSlugs]);

  /**
   * Helpers
   */
  const scrollToSlug = useCallback((slug: string, smooth = true) => {
    const node = sectionRefs.current[slug];
    if (!node) return;
    const offset = 120;
    const top = node.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  }, []);

  const updateRouteForSlug = useCallback(
    (slug: string) => {
      const targetPath = `/projects/${slug}`;
      if (location.pathname === targetPath) return;
      navigate(targetPath, { replace: false });
    },
    [location.pathname, navigate]
  );

  const handleShare = useCallback(
    async (slug?: string) => {
      const targetSlug = slug ?? activeSlug;
      const url = `${window.location.origin}/projects/${targetSlug}`;
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

  const handleCopyLink = useCallback(
    async (slug: string) => {
      const url = `${window.location.origin}/projects/${slug}`;
      await navigator.clipboard.writeText(url);
      toast({
        title: "Tautan disalin",
        description: url,
      });
    },
    [toast]
  );

  const generatePdf = useCallback(
    async (
      target: PdfTarget,
      options: PdfOptions,
      { silent }: { silent?: boolean } = {}
    ) => {
      const elements: HTMLElement[] =
        target === "all"
          ? projectSlugs
              .map((slug) => sectionRefs.current[slug])
              .filter(Boolean) as HTMLElement[]
          : (() => {
              const slug =
                target === "active" ? activeSlug : (target as ProjectSlug);
              const node = sectionRefs.current[slug];
              return node ? [node] : [];
            })();

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
          const teardown = applyPdfVisibility(element, options);
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
            : `${(
                target === "active" ? activeSlug : (target as string)
              ).replace(/-/g, "_")}.pdf`;
        pdf.save(filename);
        toast({
          title: "PDF siap!",
          description: "Berhasil membuat dokumen portfolio.",
        });

        if (!silent) {
          setPdfModalOpen(false);
        }
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
    [activeSlug, projectSlugs, toast]
  );

  const handleHeroPrint = () => {
    window.print();
  };

  const heroSocials = [
    {
      label: "GitHub",
      href: "https://github.com/MDF05",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/muhammad-dava-fahreza/",
    },
    {
      label: "Dribbble",
      href: "https://dribbble.com/",
    },
    {
      label: "X / Twitter",
      href: "https://x.com/",
    },
  ];

  return (
    <div className="projects-page min-h-screen">
      <Navigation />
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      <section className="cyber-hero relative print-hidden">
        <div className="binary-stream">
          {binaryParticles.map((particle) => (
            <span
              key={particle.id}
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            >
              {particle.value}
            </span>
          ))}
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 py-24 lg:flex-row lg:items-stretch">
          <div className="w-full space-y-8 text-center lg:text-left">
            <p className="text-sm uppercase tracking-[1.2em] text-cyan-400 drop-shadow-[0_0_12px_rgba(0,243,255,0.9)]">
              MY PORTFOLIO
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-orbitron text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-300 bg-clip-text text-transparent">
                Muhammad Dava Fahreza
              </span>
            </motion.h1>

            <div className="text-lg font-semibold text-cyan-200">
              <span>{typedHeroText}</span>
              <span
                className={cn(
                  "ml-2 text-cyan-400",
                  cursorVisible ? "opacity-100" : "opacity-0"
                )}
              >
                |
              </span>
            </div>

            <div className="text-base text-white/80">
              <a
                href="mailto:mdavafahreza05@gmail.com"
                className="inline-flex items-center gap-2 text-cyan-300 transition hover:text-cyan-100"
              >
                <Mail className="h-5 w-5" />
                mdavafahreza05@gmail.com
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              {heroSocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hologram-icon rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Button
                onClick={handleHeroPrint}
                size="lg"
                className="magnetic-button bg-cyan-500 text-black shadow-[0_0_30px_rgba(0,243,255,0.5)] hover:bg-cyan-400"
              >
                <Printer className="h-5 w-5" />
                CETAK PDF
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="magnetic-button border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10"
                onClick={() => handleShare()}
              >
                <Share2 className="h-5 w-5" />
                Bagikan
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="magnetic-button text-purple-300 hover:bg-purple-500/10"
                onClick={() => {
                  setPdfTarget("active");
                  setPdfModalOpen(true);
                }}
              >
                <FileDown className="h-5 w-5" />
                Custom PDF
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-panel relative w-full max-w-md rounded-3xl p-8"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="tech-frame h-52 w-52 overflow-hidden">
                <img
                  src={profileImage}
                  alt="Muhammad Dava Fahreza"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="text-center text-sm uppercase tracking-[0.8em] text-white/60">
                Mode Futuristik
              </div>
              <div className="grid w-full gap-4 text-white/80">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/50">Proyek Aktif</p>
                  <p className="text-2xl font-semibold text-white">
                    {activeProject.title}
                  </p>
                  <p className="text-sm text-cyan-200">
                    {projectSlugs.indexOf(activeProject.slug) + 1} /{" "}
                    {projects.length}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.5em] text-white/50">
                    Tech Stack
                  </p>
                  <p className="text-base text-white">
                    {activeProject.technologies.slice(0, 4).join(" • ")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-24 pt-12 lg:flex-row">
        <aside className="project-tracker print-hidden">
          <div className="mb-4 flex items-center justify-between text-sm text-white/70">
            <span>
              Project #{projectSlugs.indexOf(activeSlug) + 1}/
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
                onClick={() => {
                  scrollToSlug(project.slug);
                  setActiveSlug(project.slug);
                  updateRouteForSlug(project.slug);
                }}
              >
                {project.title}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 space-y-16">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isActive={project.slug === activeSlug}
              registerRef={(node) => {
                sectionRefs.current[project.slug] = node;
              }}
              onCopyLink={() => handleCopyLink(project.slug)}
              onShare={() => handleShare(project.slug)}
              onGenerate={() => {
                setPdfTarget(project.slug);
                setPdfModalOpen(true);
              }}
              onDownloadQuick={() =>
                generatePdf(project.slug, pdfOptions, { silent: true })
              }
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
        onGenerate={() => generatePdf(pdfTarget, pdfOptions)}
      />
    </div>
  );
};

type ProjectCardProps = {
  project: ProjectTypes;
  isActive: boolean;
  registerRef: (node: HTMLDivElement | null) => void;
  onShare: () => void;
  onCopyLink: () => void;
  onGenerate: () => void;
  onDownloadQuick: () => void;
};

const ProjectCard = ({
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

const DeviceShowcase = ({ project }: { project: ProjectTypes }) => {
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
              className="h-56 w-full rounded-2xl object-cover"
            />
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_0.75fr]">
          <div className="device-shell tablet-shell">
            <p className="mb-2 text-xs text-white/50">TABLET</p>
            {tabletImage && (
              <img
                src={tabletImage}
                alt={`${project.title} tablet preview`}
                className="h-48 w-full rounded-2xl object-cover"
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
                  className="h-48 w-full rounded-2xl object-cover"
                />
              )}
            </div>
            <div className="qr-shell mt-4 w-full rounded-2xl border border-white/10 p-4">
              <p className="mb-2 text-xs text-white/40">SCAN ME</p>
              <img
                src={project.qrCodeImage}
                alt={`${project.title} QR`}
                className="mx-auto h-32 w-32 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ActionBarProps = {
  onDownload: () => void;
  onGenerate: () => void;
  onShare: () => void;
  onCopy: () => void;
  demoUrl: string;
};

const ActionBar = ({
  onCopy,
  onDownload,
  onGenerate,
  onShare,
  demoUrl,
}: ActionBarProps) => {
  const openDemo = () => window.open(demoUrl, "_blank", "noopener,noreferrer");
  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
      <Button
        onClick={onDownload}
        variant="outline"
        className="magnetic-button border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/10"
      >
        <Download className="h-4 w-4" />
        Download
      </Button>
      <Button
        onClick={onGenerate}
        className="magnetic-button bg-purple-500/80 text-white hover:bg-purple-500"
      >
        <FileDown className="h-4 w-4" />
        Generate
      </Button>
      <Button
        onClick={onShare}
        variant="ghost"
        className="magnetic-button text-emerald-200 hover:bg-emerald-400/10"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <Button
        onClick={onCopy}
        variant="ghost"
        className="magnetic-button text-white/80 hover:bg-white/10"
      >
        <Link2 className="h-4 w-4" />
        Copy link
      </Button>
      <Button
        onClick={openDemo}
        variant="outline"
        className="magnetic-button border-white/20 text-white/80 hover:bg-white/10"
      >
        <Eye className="h-4 w-4" />
        Preview
      </Button>
      <Button
        onClick={openDemo}
        variant="outline"
        className="magnetic-button border-white/20 text-white/80 hover:bg-white/10"
      >
        <Maximize2 className="h-4 w-4" />
        Fullscr
      </Button>
    </div>
  );
};

const ProjectInfoPanel = ({
  project,
  primaryColor,
}: {
  project: ProjectTypes;
  primaryColor: string;
}) => (
  <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
    <div className="grid gap-4 text-sm">
      <InfoRow
        label="Timeline"
        value={project.duration}
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

    <div>
      <p className="text-xs uppercase tracking-[0.5em] text-white/40">
        TECHNOLOGIES
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-cyan-400/40 px-3 py-1 text-xs text-cyan-100"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

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

    <div className="flex flex-wrap gap-3 text-sm text-cyan-200" data-section="links">
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
    </div>
  </div>
);

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

const TypewriterText = ({ text }: { text: string }) => {
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

const PdfCustomizationDialog = ({
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
                  variant={
                    options.layout === layout ? "default" : "outline"
                  }
                  className="flex-1"
                  onClick={() =>
                    onOptionsChange({ ...options, layout })
                  }
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
                  variant={
                    options.quality === quality ? "default" : "outline"
                  }
                  className="flex-1"
                  onClick={() =>
                    onOptionsChange({ ...options, quality })
                  }
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

const applyPdfVisibility = (element: HTMLElement, options: PdfOptions) => {
  const toggledNodes: Array<{ node: HTMLElement; previousDisplay: string }> =
    [];

  const toggleSection = (section: string, visible: boolean) => {
    if (visible) return;
    const nodes = element.querySelectorAll<HTMLElement>(
      `[data-section="${section}"]`
    );
    nodes.forEach((node) => {
      toggledNodes.push({
        node,
        previousDisplay: node.style.display,
      });
      node.style.display = "none";
    });
  };

  toggleSection("case-study", options.includeCaseStudy);
  toggleSection("features", options.includeFeatures);

  return () => {
    toggledNodes.forEach(({ node, previousDisplay }) => {
      node.style.display = previousDisplay;
    });
  };
};

export default ProjectsShowcase;

