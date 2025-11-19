import { IconType } from "react-icons";
import { achiementsTechDetail } from "./achievmentsTechDetail.types";

export interface LearningRoadmap {
  phase: string;
  items: string[];
  timeline: string;
}

export interface TechCategoryTypes {
  icon: IconType; // Icon utama kategori (lucide-react / react-icons)
  title: string; // Judul kategori (mis: Web Development)
  color: "primary" | "accent"; // Warna tema kategori
  description: string; // Ringkasan kategori
  technologies: [string, IconType][]; // List teknologi dengan ikon
  skills: string[]; // Skill utama kategori
  learningRoadmap: LearningRoadmap[]; // Roadmap belajar
  isComingSoon?: boolean; // Flag kategori masih draft
  featured?: boolean; // Kategori yang ditonjolkan
  image?: string; // Banner/ilustrasi opsional
  learnging?: boolean; // Flag kategori yang sedang dipelajari
  skillsMapping: { name: string; icon: IconType; learning: boolean }[];
  experience: string; // Mapping skill dari technologies
  achievements: achiementsTechDetail;
}
