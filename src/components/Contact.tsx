import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Github, Linkedin, Send, MapPin } from "lucide-react";

const Contact = () => {
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

    const element = document.getElementById("contact");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "developer@example.com",
      link: "mailto:developer@example.com",
      description: "Send me an email for project inquiries",
      color: "primary",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      value: "+62 xxx-xxxx-xxxx",
      link: "https://wa.me/62xxxxxxxxx",
      description: "Quick chat for immediate responses",
      color: "accent",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "@yourusername",
      link: "https://github.com/yourusername",
      description: "Check out my latest code repositories",
      color: "secondary",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Your Name",
      link: "https://linkedin.com/in/yourprofile",
      description: "Connect with me professionally",
      color: "primary",
    },
  ];

  return (
    <section
      id="contact"
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
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto">
              Ready to bring your next project to life? Let's collaborate and
              create something amazing together.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact info */}
            <div className="space-y-8">
              <div
                className={`transform transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                <h3 className="text-3xl font-orbitron font-bold text-primary mb-6">
                  Let's Start a Conversation
                </h3>

                <p className="text-lg text-muted-foreground font-rajdhani leading-relaxed mb-8">
                  I'm always excited to work on new projects and collaborate
                  with passionate teams. Whether you have a project in mind or
                  just want to connect, I'd love to hear from you.
                </p>

                {/* Location */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-gradient-accent rounded-lg glow-effect">
                    <MapPin className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-semibold text-foreground">
                      Location
                    </h4>
                    <p className="text-muted-foreground font-rajdhani">
                      Indonesia
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact methods */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <Card
                    key={method.title}
                    className={`group p-6 bg-card/30 backdrop-blur-sm neon-border hover:neon-border-${
                      method.color
                    } transition-all duration-500 hover:scale-105 cursor-pointer ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <a href={method.link} className="block">
                      <div className={`flex items-center gap-4 mb-3`}>
                        <div
                          className={`p-3 bg-gradient-${method.color} rounded-lg glow-effect`}
                        >
                          <method.icon className="h-5 w-5 text-background" />
                        </div>
                        <div>
                          <h4
                            className={`font-orbitron font-semibold text-${method.color}`}
                          >
                            {method.title}
                          </h4>
                          <p className="text-sm text-muted-foreground font-rajdhani">
                            {method.value}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground font-rajdhani">
                        {method.description}
                      </p>
                    </a>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick message form */}
            <Card
              className={`p-8 bg-card/30 backdrop-blur-sm neon-border transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <h3 className="text-2xl font-orbitron font-bold text-primary mb-6">
                Send a Quick Message
              </h3>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-rajdhani font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300 font-rajdhani"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300 font-rajdhani"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-foreground mb-2">
                    Project Type
                  </label>
                  <select className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300 font-rajdhani">
                    <option>Web Application</option>
                    <option>Mobile Application</option>
                    <option>Desktop Application</option>
                    <option>Consultation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-rajdhani font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300 font-rajdhani resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:bg-gradient-glow text-primary-foreground font-orbitron font-semibold py-3 glow-effect transition-all duration-300"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div
              className={`transform transition-all duration-1000 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h3 className="text-2xl font-orbitron font-bold text-foreground mb-4">
                Ready to Build Something{" "}
                <span className="gradient-text">Extraordinary</span>?
              </h3>
              <p className="text-muted-foreground font-rajdhani mb-6">
                Let's turn your vision into reality with cutting-edge technology
                and innovative solutions.
              </p>
              <Button
                size="lg"
                className="bg-gradient-accent hover:bg-gradient-glow text-accent-foreground font-orbitron font-semibold px-8 py-4 glow-effect"
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
