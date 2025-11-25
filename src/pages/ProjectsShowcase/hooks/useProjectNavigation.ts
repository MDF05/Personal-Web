import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { projects } from "@/data/projects.data";
import type { ProjectSlug } from "../types";

export const useProjectNavigation = () => {
  const { projectSlug } = useParams<{ projectSlug?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const projectSlugs = projects.map((project) => project.slug);

  const [activeSlug, setActiveSlug] = useState<ProjectSlug>(
    (projectSlug && projectSlugs.includes(projectSlug)
      ? (projectSlug as ProjectSlug)
      : projectSlugs[0]) as ProjectSlug
  );

  const [isObserverDisabled, setIsObserverDisabled] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToSlug = useCallback((slug: string, smooth = true) => {
    const node = sectionRefs.current[slug];
    if (!node) return;
    const offset = 120;
    const top = node.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  }, []);

  const updateRouteForSlug = useCallback(
    (slug: string) => {
      const targetPath = `/portfolio/${slug}`;
      if (location.pathname === targetPath) return;
      navigate(targetPath, { replace: false });
    },
    [location.pathname, navigate]
  );

  // Sync state whenever route param changes
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
    }
  }, [projectSlug, projectSlugs, activeSlug, navigate, toast]);

  // Scroll to project when activeSlug changes and we have a projectSlug in URL
  useEffect(() => {
    if (!projectSlug || projectSlug !== activeSlug) {
      return;
    }

    setIsObserverDisabled(true);

    const scrollToProject = () => {
      const node = sectionRefs.current[activeSlug];
      if (node) {
        const offset = 120;
        const top = node.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "auto" });
      }
    };

    scrollToProject();

    const timeoutId = setTimeout(scrollToProject, 100);
    const timeoutId2 = setTimeout(scrollToProject, 300);

    const enableObserverTimeout = setTimeout(() => {
      setIsObserverDisabled(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      clearTimeout(enableObserverTimeout);
    };
  }, [projectSlug, activeSlug]);

  // IntersectionObserver to detect active project and update URL
  useEffect(() => {
    if (isObserverDisabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            if (Math.abs(b.intersectionRatio - a.intersectionRatio) > 0.1) {
              return b.intersectionRatio - a.intersectionRatio;
            }
            return a.boundingClientRect.top - b.boundingClientRect.top;
          })[0];

        if (!visible) return;
        const slug = visible.target.getAttribute("data-slug") as ProjectSlug;
        if (slug && slug !== activeSlug) {
          setActiveSlug(slug);
          updateRouteForSlug(slug);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    projectSlugs.forEach((slug) => {
      const ref = sectionRefs.current[slug];
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [activeSlug, projectSlugs, updateRouteForSlug, isObserverDisabled]);

  return {
    activeSlug,
    setActiveSlug,
    sectionRefs,
    scrollToSlug,
    updateRouteForSlug,
    projectSlugs,
  };
};
