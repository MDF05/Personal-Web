import { CertificationTypes } from "@/types/certifications.types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, ExternalLink, Calendar } from "lucide-react";

export default function CertificationsCard({
  cert,
  setSelectedCertification,
  isVisible,
  index,
}: {
  cert: CertificationTypes;
  setSelectedCertification: React.Dispatch<
    React.SetStateAction<CertificationTypes>
  >;
  index: number;
  isVisible: boolean;
}) {
  return (
    <Card
      key={cert.id}
      className={`group cursor-pointer w-[80%] p-6  bg-card/30 backdrop-blur-sm neon-border hover:neon-border-primary transition-all duration-500 hover:scale-105 relative overflow-hidden ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${cert.featured ? "ring-2 ring-accent/30" : ""}`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onClick={() => setSelectedCertification(cert)}
    >
      {/* Featured badge */}
      {cert.featured && (
        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground font-orbitron text-xs">
          Featured
        </Badge>
      )}

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

      {/* Certificate badge/icon */}
      <div className="relative z-10 flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-primary glow-effect">
        <Award className="h-8 w-8 text-background" />
      </div>

      {/* Certificate title */}
      <h3 className="relative z-10 text-lg font-orbitron font-semibold text-center mb-2 text-primary group-hover:text-accent transition-colors duration-300">
        {cert.title}
      </h3>

      {/* Issuer */}
      <p className="relative z-10 text-sm text-muted-foreground font-rajdhani text-center mb-3">
        {cert.issuer}
      </p>

      {/* Issue date */}
      <div className="relative z-10 flex items-center justify-center gap-2 mb-4">
        <Calendar className="h-4 w-4 text-accent" />
        <span className="text-xs text-muted-foreground font-rajdhani">
          {new Date(cert.issueDate).toLocaleDateString()}
        </span>
      </div>

      {/* Skills preview */}
      <div className="relative z-10 flex flex-wrap gap-1 justify-center mb-4">
        {cert.skills.slice(0, 2).map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 transition-colors duration-300 font-rajdhani text-xs"
          >
            {skill}
          </Badge>
        ))}
        {cert.skills.length > 2 && (
          <Badge
            variant="outline"
            className="border-muted-foreground/30 text-muted-foreground font-rajdhani text-xs"
          >
            +{cert.skills.length - 2}
          </Badge>
        )}
      </div>

      {/* Action buttons */}
      <div className="relative z-10 flex gap-2">
        <Button
          size="sm"
          className="flex-1 bg-gradient-primary hover:bg-gradient-glow text-primary-foreground font-orbitron font-medium transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            // Handle download
          }}
        >
          <Download className="mr-1 h-3 w-3" />
          PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="neon-border hover:bg-accent/10 font-orbitron font-medium"
          onClick={(e) => {
            e.stopPropagation();
            // Handle verification
          }}
        >
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>

      {/* Hover effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
}
