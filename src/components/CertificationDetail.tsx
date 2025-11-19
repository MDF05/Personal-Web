import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Award,
  Download,
  ExternalLink,
  Calendar,
  Building2,
  Hash,
  X,
} from "lucide-react";
import { CertificationTypes } from "@/types/certifications.types";

interface CertificationDetailProps {
  certification: CertificationTypes;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificationDetail = ({
  certification,
  isOpen,
  onClose,
}: CertificationDetailProps) => {
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!certification) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-md border-primary/20 neon-border">
        <DialogHeader className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 w-8 h-8 p-0 text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <DialogTitle className="text-2xl font-orbitron font-bold gradient-text pr-8">
            {certification.title}
          </DialogTitle>

          <DialogDescription className="text-lg text-muted-foreground font-rajdhani">
            Professional Certification Details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Certificate Image/Badge */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden neon-border bg-card/20">
                <img
                  src={certification.image}
                  alt={certification.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-primary/20" />

                {/* Certificate icon overlay */}
                <div className="absolute top-4 left-4 p-3 bg-background/80 backdrop-blur-sm rounded-lg neon-border">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>

            {/* Certificate Info */}
            <div className="flex-1 space-y-4">
              {/* Issuer */}
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground font-rajdhani">
                    Issued by
                  </p>
                  <p className="text-lg font-orbitron font-semibold text-foreground">
                    {certification.issuer}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground font-rajdhani">
                      Issue Date
                    </p>
                    <p className="font-orbitron font-semibold">
                      {new Date(certification.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground font-rajdhani">
                      Valid Until
                    </p>
                    <p className="font-orbitron font-semibold">
                      {new Date(certification.validUntil).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Credential ID */}
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground font-rajdhani">
                    Credential ID
                  </p>
                  <p className="font-mono text-sm bg-card/30 px-3 py-1 rounded neon-border">
                    {certification.credentialId}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-gradient-primary hover:bg-gradient-glow text-primary-foreground font-orbitron font-medium transition-all duration-300"
                  onClick={() =>
                    window.open(certification.downloadUrl, "_blank")
                  }
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </Button>

                <Button
                  variant="outline"
                  className="neon-border hover:bg-accent/10 font-orbitron font-medium"
                  onClick={() =>
                    window.open(certification.verificationUrl, "_blank")
                  }
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Verify
                </Button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-orbitron font-semibold text-primary">
              About This Certification
            </h3>
            <p className="text-muted-foreground font-rajdhani leading-relaxed">
              {certification.description}
            </p>
          </div>

          {/* Skills & Technologies */}
          <div className="space-y-3">
            <h3 className="text-xl font-orbitron font-semibold text-accent">
              Skills & Technologies Covered
            </h3>
            <div className="flex flex-wrap gap-2">
              {certification.skills.map((skill: string) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/10 transition-colors duration-300 font-rajdhani"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
