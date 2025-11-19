interface listImageProjects {
  HP: string[];
  TB: string[];
  LP: string[];
}

export interface ProjectTypes {
  id: number;
  title: string;
  description: string;
  category: "web" | "mobile" | "desktop";
  technologies: string[];
  image: listImageProjects;
  github: string;
  demo: string;
  featured: boolean;
  caseStudy: string;
  duration: string;
  teamSize: string;
  startDate: string;
  endDate: string;
  status: string;
  qrCodeImage: string;
  features: string[];
}
