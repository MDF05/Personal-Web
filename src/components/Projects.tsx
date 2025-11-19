import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ProjectDetail } from "./ProjectDetail";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { projects } from "../data/projects.data";
import ProjectItem from "./ProjectItem";
import { categories, getCategoryIcon } from "@/data/category-project.data";
import { ProjectTypes } from "@/types/projects.types";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectTypes>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("projects");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Section title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto">
              Showcasing innovative solutions across web, mobile, and desktop
              platforms
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
          </div>
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className={`font-orbitron font-medium px-6 py-3 transition-all duration-300 ${
                  filter === category.id
                    ? "bg-gradient-primary text-primary-foreground glow-effect"
                    : "neon-border hover:neon-border-accent hover:bg-accent/10"
                }`}
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
          {/* Projects grid */}

          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto" // boleh diganti angka default, nanti ditimpa breakpoints
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            style={{ paddingBottom: "50px" }}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 16, // jarak antar slide di HP
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
          >
            {filteredProjects.map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.category);

              return (
                <SwiperSlide key={project.id}>
                  <ProjectItem
                    project={project}
                    CategoryIcon={CategoryIcon}
                    index={index}
                    isVisible={isVisible}
                    setSelectedProject={setSelectedProject}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="neon-border-accent border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground font-orbitron font-semibold px-8 py-4"
            >
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Project Detail Drawer */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
