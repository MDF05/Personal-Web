import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Code, Rocket, Zap } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("about");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable, and efficient code following best practices",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description:
        "Exploring cutting-edge technologies to build next-generation web applications",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Optimizing applications for maximum speed and user experience",
    },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Section title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6">
              <span className="gradient-text">About</span> Me
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile content */}
            <div className="space-y-8">
              <div
                className={`transform transition-all duration-500 delay-300 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <h3 className="text-3xl font-orbitron font-bold text-primary mb-6">
                  Fullstack Developer & Tech Enthusiast
                </h3>

                <div className="space-y-6 text-lg text-muted-foreground font-rajdhani leading-relaxed">
                  <p>
                    Passionate about creating{" "}
                    <span className="text-primary font-semibold">
                      innovative digital experiences
                    </span>{" "}
                    using modern web technologies. Specialized in building
                    scalable applications with Next.js, TypeScript, and
                    cutting-edge frameworks.
                  </p>

                  <p>
                    My journey in software development started with a curiosity
                    for how things work behind the scenes. Today, I focus on{" "}
                    <span className="text-secondary font-semibold">
                      fullstack development
                    </span>
                    , creating solutions that bridge the gap between complex
                    backend systems and intuitive user interfaces.
                  </p>

                  <p>
                    Currently expanding my expertise into{" "}
                    <span className="text-accent font-semibold">
                      IoT development and Machine Learning
                    </span>
                    , aiming to connect physical and digital worlds through
                    innovative applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights cards */}
            <div className="space-y-6">
              {highlights.map((highlight, index) => (
                <Card
                  key={highlight.title}
                  className={`p-6 bg-card/50 backdrop-blur-sm neon-border hover:neon-border-accent transition-all duration-500 hover:scale-105 transform ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-primary rounded-lg glow-effect">
                      <highlight.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="text-xl font-orbitron font-semibold text-foreground mb-2">
                        {highlight.title}
                      </h4>
                      <p className="text-muted-foreground font-rajdhani">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
