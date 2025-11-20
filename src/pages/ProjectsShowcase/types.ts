import { projects } from "@/data/projects.data";

export type ProjectSlug = (typeof projects)[number]["slug"];

export type PdfTarget = "active" | "all" | "hero" | ProjectSlug;

export type PdfOptions = {
  layout: "portrait" | "landscape";
  quality: "standard" | "high";
  includeCaseStudy: boolean;
  includeFeatures: boolean;
};

export const defaultPdfOptions: PdfOptions = {
  layout: "portrait",
  quality: "high",
  includeCaseStudy: true,
  includeFeatures: true,
};

