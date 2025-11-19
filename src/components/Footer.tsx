import { Github, Linkedin, Mail, Phone, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:", label: "Email" },
    { icon: Phone, href: "https://wa.me/", label: "WhatsApp" },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-background/80 backdrop-blur-lg border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-orbitron font-bold gradient-text">
              &lt;MDF/&gt;
            </div>
            <p className="text-muted-foreground font-rajdhani leading-relaxed">
              Fullstack Developer specializing in creating futuristic web
              experiences with cutting-edge technology and innovative solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg neon-border bg-card/20 hover:bg-primary/20 transition-all duration-300 hover:scale-110 group"
                >
                  <social.icon className="h-5 w-5 text-primary group-hover:text-primary-glow transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-orbitron font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-rajdhani"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-orbitron font-semibold text-foreground">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground font-rajdhani">
                  mdavafahreza05@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground font-rajdhani">
                  +62 82246859943
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground font-rajdhani text-center md:text-left">
            © {currentYear} Muhammad Dava Fahreza. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-muted-foreground font-rajdhani">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>using Next.js & TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
