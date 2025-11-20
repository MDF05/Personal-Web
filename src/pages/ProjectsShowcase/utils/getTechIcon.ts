import { IconType } from "react-icons";
import { Code2 } from "lucide-react";
import {
  SiReact,
  SiExpress,
  SiChakraui,
  SiCloudinary,
  SiPrisma,
  SiSocketdotio,
  SiVuedotjs,
  SiPostcss,
  SiVite,
  SiLaravel,
  SiPhp,
  SiTailwindcss,
  SiStripe,
} from "react-icons/si";
import { techCategories } from "@/data/technologies.data";

/**
 * Get icon for technology name
 */
export const getTechIcon = (techName: string): IconType | null => {
  // Normalize tech name for matching
  const normalizedName = techName.toLowerCase().trim();

  // First, try to find in techCategories
  for (const category of techCategories) {
    const tech = category.technologies.find(
      ([name]) => name.toLowerCase() === normalizedName
    );
    if (tech) {
      return tech[1];
    }
  }

  // Additional mappings for technologies not in categories
  const additionalMappings: Record<string, IconType> = {
    "react.js": SiReact,
    react: SiReact,
    "express.js": SiExpress,
    express: SiExpress,
    "chakra-ui": SiChakraui,
    "chakra ui": SiChakraui,
    cloudinary: SiCloudinary,
    midtrans: SiStripe, // Fallback, no direct icon
    midtarns: SiStripe, // Typo fix
    prisma: SiPrisma,
    "shadcn ui": SiReact, // Fallback
    shadcn: SiReact,
    "socket.io": SiSocketdotio,
    socketio: SiSocketdotio,
    "vue router": SiVuedotjs,
    "vue-router": SiVuedotjs,
    pinia: SiVuedotjs, // Vue state management
    gsap: Code2, // Fallback, no direct icon
    postcss: SiPostcss,
    vite: SiVite,
    laravel: SiLaravel,
    composer: SiPhp, // PHP package manager
    artisan: SiLaravel, // Laravel CLI
    "rest api": Code2, // Fallback to generic code icon
    restapi: Code2,
    api: Code2,
    tailwind: SiTailwindcss,
    "tailwind css": SiTailwindcss,
  };

  return additionalMappings[normalizedName] || null;
};

