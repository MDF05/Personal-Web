import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { TechStackDetail } from "./TechStackDetail";
import { techCategories } from "@/data/technologies.data";
import { TechCategoryTypes } from "@/types/technologies.types";

const TechStack = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] =
    useState<TechCategoryTypes>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("tech-stack");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tech-stack"
      className="min-h-screen flex items-center py-20 px-6 bg-gradient-dark"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Section title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              Tech <span className="gradient-text">Stack</span>
            </h2>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto">
              Cutting-edge technologies I use to build exceptional digital
              experiences
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
          </div>

          {/* Tech categories grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techCategories.map((category, index) => (
              <Card
                key={category.title}
                className={`group p-6 bg-card/30 backdrop-blur-sm neon-border hover:neon-border-${
                  category.color
                } transition-all duration-500 hover:scale-105 cursor-pointer relative overflow-hidden ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } ${category.isComingSoon ? "opacity-75" : ""}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => {
                  setActiveCategory(index);
                  setSelectedCategory(category);
                }}
              >
                {/* Coming soon badge */}
                {category.isComingSoon && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground font-orbitron text-xs px-2 py-1">
                    Coming Soon
                  </Badge>
                )}

                {/* Background gradient effect */}
                <div
                  className={`absolute inset-0 bg-gradient-${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`relative z-10 flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-lg bg-gradient-${category.color} glow-effect`}
                >
                  <category.icon className="h-8 w-8 text-background" />
                </div>

                {/* Title */}
                <h3
                  className={`relative z-10 text-xl font-orbitron font-semibold text-center mb-6 text-${category.color}`}
                >
                  {category.title}
                </h3>

                {/* Technologies */}
                <div className="relative z-10 flex flex-wrap gap-2 justify-center">
                  {category.technologies.slice(0, 4).map((tech) => {
                    return (
                      <Badge
                        key={tech[0]}
                        variant="outline"
                        className={`border-${category.color}/30 text-${
                          category.color
                        } hover:bg-${
                          category.color
                        }/10 transition-colors duration-300 font-rajdhani ${
                          tech[0] === "Coming Soon"
                            ? "text-accent border-accent/50"
                            : ""
                        }`}
                      >
                        {tech[0]}
                      </Badge>
                    );
                  })}
                  {category.technologies.length > 4 && (
                    <Badge
                      variant="outline"
                      className="border-muted-foreground/30 text-muted-foreground font-rajdhani"
                    >
                      +{category.technologies.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Hover effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10+", label: "Projects Completed" },
              { number: "2+", label: "Years Experience" },
              { number: "20+", label: "Technologies" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transform transition-all duration-1000 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${1000 + index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-rajdhani">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Detail Modal */}
      {selectedCategory && (
        <TechStackDetail
          category={selectedCategory}
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </section>
  );
};

export default TechStack;
