import { Smartphone, Globe, Monitor } from "lucide-react";


export const categories = [
    { id: "all", name: "All Projects", icon: Globe },
    { id: "web", name: "Web Apps", icon: Globe },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone },
    { id: "desktop", name: "Desktop Apps", icon: Monitor },
  ];

export const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return Globe;
      case "mobile":
        return Smartphone;
      case "desktop":
        return Monitor;
      default:
        return Globe;
    }
  };
