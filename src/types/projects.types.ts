export interface ProjectTypes {
  id: number;
  title: string;
  description: string;
  category: "web" | "mobile" | "desktop";
  technologies: string[];
  image: string;
  github: string;
  demo: string;
  featured: boolean;
}